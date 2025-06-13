import Image from "next/image";
import style from "./page.module.css";
import { localeMap, pokemonByLocale } from "@/types";
import Link from "next/link";
import ShareBtn from "@/components/shareBtn";
import {
  typeColorMap,
  PokemonName,
  PokemonSpecies,
  FlavorTextEntry,
} from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const localeKey = id;
  const localeName = localeMap[localeKey] ?? "알 수 없는 지역";

  const pokeIds = pokemonByLocale[localeKey] ?? pokemonByLocale[""];

  let pokemons;

  try {
    const responses = await Promise.all(
      pokeIds.map(async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) {
          throw new Error();
        }
        return await res.json();
      })
    );
    pokemons = responses;
  } catch (error) {
    console.log(error);
    return <div>오류가 발생했습니다...</div>;
  }

  // 포켓몬들의 종(species) 정보도 함께 가져오기
  const pokemonsWithSpecies = await Promise.all(
    pokemons.map(async (pokemon) => {
      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`
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
  const pokemonsWithColors = pokemonsWithSpecies.map((pokemon) => ({
    ...pokemon,
    backgroundStyle:
      typeColorMap[pokemon.types?.[0]?.type?.name] ||
      "linear-gradient(135deg, #E0E0E0 0%, #9E9E9E 50%, #424242 100%)",
  }));

  return (
    <div className={style.container}>
      <div className={style.localeText}>{localeName}에 있을 수 있는 포켓몬</div>
      <div className={style.boxBind}>
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
                />
              </div>
              <div className={style.pokemonName}>{pokemon.koreanName}</div>
            </Link>
          </div>
        ))}
      </div>
      <div className={style.bottom}>
        <ShareBtn />
      </div>
    </div>
  );
}
