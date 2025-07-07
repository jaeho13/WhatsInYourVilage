import React from "react";
import style from "./pokemon-detail-skeleton.module.css";

interface PokemonDetailSkeletonProps {
  isModal?: boolean;
}

export default function PokemonDetailSkeleton({
  isModal = false,
}: PokemonDetailSkeletonProps) {
  return (
    <div
      className={`${style.modalPageContainer} ${!isModal ? style.border : ""}`}
    >
      <div className={style.background}>
        <div className={style.topLine}>
          <div className={style.rowBind}>
            <div className={style.pokemonImageSkeleton}></div>
            <div className={style.columnBind}>
              <div className={style.pokemonNameSkeleton}></div>
              <div className={style.pokemonGenusSkeleton}></div>
              <div className={style.pokemonTypeSkeleton}></div>
            </div>
          </div>
          <div className={style.backIconSkeleton}></div>
        </div>

        <div className={style.pokemonInfo}>
          <div className={style.infoItem}>
            <div className={style.infoTextSkeleton}></div>
            <div className={style.infonumberSkeleton}></div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoTextSkeleton}></div>
            <div className={style.infonumberSkeleton}></div>
          </div>
          <div className={style.infoItem}>
            <div className={style.infoTextSkeleton}></div>
            <div className={style.infonumberSkeleton}></div>
          </div>
        </div>
      </div>

      <div className={style.tabsContainer}>
        <div className={style.tabHeaders}>
          <div className={style.tabHeaderSkeleton}></div>
          <div className={style.tabHeaderSkeleton}></div>
          <div className={style.tabHeaderSkeleton}></div>
        </div>

        <div className={style.tabContent}>
          <div className={style.descriptionSkeleton}></div>
          <div className={style.descriptionSkeleton}></div>
          <div className={style.descriptionSkeleton}></div>
        </div>
      </div>
    </div>
  );
}
