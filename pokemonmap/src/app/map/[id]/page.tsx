import Image from "next/image";
import style from "./page.module.css";
import { localeMap } from "@/types";

export default async function Page({ params }: { params: { id: string } }) {
  const localeKey = params.id;

  const localeName = localeMap[localeKey] ?? "알 수 없는 지역";

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/3`);

  if (!res.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const pokemon = await res.json();

  return (
    <div className={style.container}>
      <div className={style.localeText}>{localeName}에 있을 수 있는 포켓몬</div>
      <div className={style.boxBind}>
        <div className={style.infoBox}>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={150}
            height={150}
          />
        </div>
        <div className={style.infoBox}>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={150}
            height={150}
          />
        </div>

        <div className={style.infoBox}>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={150}
            height={150}
          />
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.shareBtn}>공유하기</div>
      </div>
    </div>
  );
}
