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
import BackIcon from "@/components/backIcon";
import PokemonTabs from "./pokemonTabs";

export default async function Page({
  params,
  isModal = false,
}: {
  params: Promise<{ id: string }>;
  isModal?: boolean;
}) {
  const { id } = await params;

  let rarity: string;
  let pokemon;
  let pokemonSpecies: PokemonSpecies;
  let koreanName: string;
  let koreanGenus: string;

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

    const rate = pokemonSpecies.capture_rate;

    if (rate <= 29) {
      rarity = "전설/환상";
    } else if (rate <= 70) {
      rarity = "희귀";
    } else if (rate <= 120) {
      rarity = "일반";
    } else {
      rarity = "흔함";
    }

    // 3. 한국어 이름/설명
    koreanName =
      pokemonSpecies.names.find(
        (name: PokemonName) => name.language.name === "ko"
      )?.name || pokemon.name;

    koreanDescription =
      pokemonSpecies.flavor_text_entries.find(
        (entry: FlavorTextEntry) => entry.language.name === "ko"
      )?.flavor_text || "설명을 찾을 수 없습니다.";

    koreanGenus =
      pokemonSpecies.genera.find((g) => g.language.name === "ko")?.genus ||
      "분류 없음";

    // 4. 포켓몬 타입 한글명 & 배경색 처리
    koreanTypes = pokemon.types.map(
      (t: any) => typeMap[t.type.name] || t.type.name
    );
    const primaryType = pokemon.types?.[0]?.type?.name;
    backgroundColor = typeColorMap[primaryType] || "white";

    // 5. 포켓몬 기술 4개만 가져와서 한글명 fetch
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
      <div
        className={`${style.modalPageContainer} ${
          !isModal ? style.border : ""
        }`}
      >
        <div
          className={style.background}
          style={{ background: backgroundColor }}
        >
          <div className={style.topLine}>
            <div className={style.rowBind}>
              <div>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  style={{
                    transform: "scale(1.3)",
                    transformOrigin: "center",
                  }}
                />
              </div>
              <div className={style.columnBind}>
                <div className={style.pokemonName}>{koreanName}</div>
                <div className={style.pokemonGenus}>{koreanGenus}</div>
                <div className={style.pokemonType}>
                  {koreanTypes.join(", ")} 타입
                </div>
              </div>
            </div>
            <BackIcon size={32} color="#000000" />
          </div>

          <div className={style.pokemonInfo}>
            <div className={style.infoItem}>
              <div className={style.infoText}>키</div>
              <div className={style.infonumber}>{pokemon.height / 10}m</div>
            </div>
            <div className={style.infoItem}>
              <div className={style.infoText}>무게</div>
              <div className={style.infonumber}>{pokemon.weight / 10}kg</div>
            </div>
            <div className={style.infoItem}>
              <div className={style.infoText}>희귀도</div>
              <div className={style.infonumber}>{rarity}</div>
            </div>
          </div>
        </div>

        <PokemonTabs
          koreanDescription={koreanDescription}
          stats={pokemon.stats}
          koreanSkill={koreanSkill}
        />
      </div>
    </>
  );
}
