import Image from "next/image";
import style from "./page.module.css";
import { localeMap, pokemonByLocale } from "@/types";
import Link from "next/link";
import ShareBtn from "@/components/shareBtn";
import { typeColorMap } from "@/types";

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

  return (
    <div className={style.container}>
      <div className={style.localeText}>{localeName}에 있을 수 있는 포켓몬</div>
      <div className={style.boxBind}>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className={style.infoBox}>
            <Link href={`/info/${pokemon.id}`}>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={150}
                height={150}
              />
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
