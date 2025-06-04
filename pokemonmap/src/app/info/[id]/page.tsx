import Image from "next/image";
import style from "./page.module.css";

interface PokemonName {
  language: {
    name: string;
  };
  name: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}
interface PokemonSpecies {
  names: PokemonName[];
  flavor_text_entries: FlavorTextEntry[];
}

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

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error();
    pokemon = await res.json();

    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    if (!speciesRes.ok) throw new Error();

    pokemonSpecies = await speciesRes.json();

    koreanName =
      pokemonSpecies.names.find(
        (name: PokemonName) => name.language.name === "ko"
      )?.name || pokemon.name;

    koreanDescription =
      pokemonSpecies.flavor_text_entries.find(
        (entry: FlavorTextEntry) => entry.language.name === "ko"
      )?.flavor_text || "설명을 찾을 수 없습니다.";
  } catch (error) {
    console.log(error);
    return <div>포켓몬을 찾을 수 없습니다...</div>;
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.imageBox}>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={200}
            height={200}
          />
        </div>
        <div className={style.textBox}>
          <h2>포켓몬 : {koreanName}</h2>
          <h4>
            키: {pokemon.height / 10}m 몸무게: {pokemon.weight / 10}kg
          </h4>
          <h4>설명: {koreanDescription}</h4>
        </div>
      </div>
    </>
  );
}
