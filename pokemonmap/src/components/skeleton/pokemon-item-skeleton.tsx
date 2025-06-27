import style from "./pokemon-item-skeleton.module.css";

export default function PokemonSkeleton() {
  return (
    <>
      <div className={style.pokemonCard}>
        <div className={style.cardLink}>
          <div className={style.imageContainer}>
            <div className={style.skeletonShimmer}></div>
          </div>
          <div className={style.pokemonName}>
            <div className={style.skeletonShimmer}></div>
          </div>
        </div>
      </div>
    </>
  );
}
