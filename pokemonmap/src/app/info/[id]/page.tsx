import Image from "next/image";
import style from "./page.module.css";
import {
  typeMap,
  PokemonSpecies,
  FlavorTextEntry,
  PokemonName,
  MoveDetail,
  typeColorMap,
} from "@/types";
import BackBtn from "@/components/backbtn";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let pokemon;
  let pokemonSpecies: PokemonSpecies;
  let koreanName: string;
  let koreanDescription: string;
  let koreanTypes: string[] = [];
  let koreanSkill: string[] = [];
  let backgroundColor: string = "white";

  try {
    // 1. 포켓몬 기본 정보 가져오기
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error();
    pokemon = await res.json();

    // 2. 종(species) 정보 가져오기
    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    if (!speciesRes.ok) throw new Error();
    pokemonSpecies = await speciesRes.json();

    // 3. 한국어 이름/설명
    koreanName =
      pokemonSpecies.names.find(
        (name: PokemonName) => name.language.name === "ko"
      )?.name || pokemon.name;

    koreanDescription =
      pokemonSpecies.flavor_text_entries.find(
        (entry: FlavorTextEntry) => entry.language.name === "ko"
      )?.flavor_text || "설명을 찾을 수 없습니다.";

    // 4. 포켓몬 타입 한글명 & 배경색 처리
    koreanTypes = pokemon.types.map(
      (t: any) => typeMap[t.type.name] || t.type.name
    );
    const primaryType = pokemon.types?.[0]?.type?.name;
    backgroundColor = typeColorMap[primaryType] || "white";

    // 5. 포켓몬 기술 2개만 가져와서 한글명 fetch
    const moveUrls = pokemon.moves.slice(0, 4).map((m: any) => m.move.url);

    const moveResults = await Promise.all(
      moveUrls.map(async (url: any) => {
        const res = await fetch(url);
        if (!res.ok) return null;
        const data: MoveDetail = await res.json();
        const korean = data.names.find((n) => n.language.name === "ko");
        return korean?.name || "이름 없음";
      })
    );

    koreanSkill = moveResults.filter(Boolean) as string[];
  } catch (error) {
    console.log(error);
    return <div>포켓몬을 찾을 수 없습니다...</div>;
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.background} style={{ backgroundColor }}>
          <div className={style.pokemon}>
            <h3>{koreanName}</h3>&nbsp;&nbsp;
            <h4>
              키: {pokemon.height / 10}m&nbsp;몸무게: {pokemon.weight / 10}
              kg&nbsp;/&nbsp;{koreanTypes.join(", ")} 타입
            </h4>
          </div>
          <div className={style.imageBox}>
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={350}
              height={350}
            />
          </div>

          <div className={style.infoContainer}>
            <div className={style.infoBox}>{koreanDescription}</div>
            <br />
            <div>기술 - {koreanSkill.join(", ")}</div>
            <br />
          </div>
        </div>
      </div>

      <div className={style.btnContainer}>
        <BackBtn>확인</BackBtn>
      </div>
    </>
  );
}
