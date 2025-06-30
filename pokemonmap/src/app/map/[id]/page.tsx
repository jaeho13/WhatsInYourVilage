import Image from "next/image";
import style from "./page.module.css";
import { localeMap, pokemonByLocale } from "@/types";
import Link from "next/link";
import ShareBtn from "@/components/shareBtn";
import { typeColorMap, PokemonName } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";
import PokemonListSkeleton from "@/components/skeleton/pokemon-list-skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const localeKey = id;
  const localeName = localeMap[localeKey] ?? "알 수 없는 지역";

  return {
    title: `${localeName}에 어떤 포켓몬이 살까`,
    description: `${localeName}에 사는 포켓몬 보러 가기`,
    openGraph: {
      title: `${localeName}에 어떤 포켓몬이 살까`,
      description: `${localeName}에 사는 포켓몬 보러 가기`,
      images: ["/thumbnail.png"],
    },
  };
}

// 포켓몬 데이터만 비동기로 처리하는 함수
async function fetchPokemonData(localeKey: string) {
  const isValidLocale = localeMap[localeKey] !== undefined;
  const pokeIds = isValidLocale
    ? pokemonByLocale[localeKey]
    : [144, 145, 146, 149, 150, 151];

  try {
    const responses = await Promise.all(
      pokeIds.map(async (id) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_POKEMON_API_URL}/${id}`
        );
        if (!res.ok) {
          throw new Error();
        }
        return await res.json();
      })
    );

    // 포켓몬들의 종(species) 정보도 함께 가져오기
    const pokemonsWithSpecies = await Promise.all(
      responses.map(async (pokemon) => {
        const speciesRes = await fetch(
          `${process.env.NEXT_PUBLIC_POKEMON_SPECIES_API_URL}/${pokemon.id}`
        );
        const speciesData = await speciesRes.json();
        const koreanName =
          speciesData.names.find(
            (name: PokemonName) => name.language.name === "ko"
          )?.name || pokemon.name;

        return { ...pokemon, koreanName };
      })
    );

    // 포켓몬들에 배경색 정보를 미리 추가
    return pokemonsWithSpecies.map((pokemon) => ({
      ...pokemon,
      backgroundStyle:
        typeColorMap[pokemon.types?.[0]?.type?.name] ||
        "linear-gradient(135deg, #E0E0E0 0%, #9E9E9E 50%, #424242 100%)",
    }));
  } catch (error) {
    console.log(error);
    throw new Error("포켓몬 데이터를 불러올 수 없습니다.");
  }
}

// 비동기 렌더링 컴포넌트
async function PokemonCards({ localeKey }: { localeKey: string }) {
  const pokemonsWithColors = await fetchPokemonData(localeKey);

  return (
    <>
      {pokemonsWithColors.map((pokemon) => (
        <div key={pokemon.id} className={style.pokemonCard}>
          <Link href={`/info/${pokemon.id}`} className={style.cardLink}>
            <div
              className={style.imageContainer}
              style={{ background: pokemon.backgroundStyle }}
            >
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={150}
                height={150}
                className={style.pokemonImage}
                style={{
                  filter: "brightness(0) contrast(100%)",
                }}
              />
            </div>
            <div className={style.pokemonName}>???</div>
          </Link>
        </div>
      ))}
    </>
  );
}

// 메인 페이지 컴포넌트 (동기)
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // params만 먼저 await로 받고
  const { id } = await params;
  const localeKey = id;

  const isValidLocale = localeMap[localeKey] !== undefined;
  const localeName = isValidLocale ? localeMap[localeKey] : "알 수 없는 지역";

  return (
    <div className={style.container}>
      <div className={style.localeText}>
        {isValidLocale
          ? `${localeName}에 있을 수 있는 포켓몬`
          : `알 수 없는 지역입니다.`}
      </div>
      <div className={style.boxBind}>
        <Suspense fallback={<PokemonListSkeleton count={6} />}>
          <PokemonCards localeKey={localeKey} />
        </Suspense>
      </div>
      <div className={style.bottom}>
        <ShareBtn />
      </div>
    </div>
  );
}
