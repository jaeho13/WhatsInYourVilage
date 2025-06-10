"use client";

import { useState } from "react";
import style from "./pokemonTabs.module.css";
import { TabType, PokemonStat, PokemonTabsProps } from "@/types";

export default function PokemonTabs({
  koreanDescription,
  stats,
  koreanSkill,
}: PokemonTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("소개");

  const statNameMap: { [key: string]: string } = {
    hp: "HP",
    attack: "공격",
    defense: "방어",
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "소개":
        return (
          <div>
            <h3 className={style.bottomText}>특징</h3>
            <div>{koreanDescription}</div>
          </div>
        );

      case "능력치":
        return (
          <div>
            <h3 className={style.bottomText}>능력치</h3>
            <div className={style.statsContainer}>
              {stats
                .filter((stat) =>
                  ["hp", "attack", "defense"].includes(stat.stat.name)
                )
                .map((stat, index) => (
                  <div key={index} className={style.statItem}>
                    <div className={style.statName}>
                      {statNameMap[stat.stat.name] || stat.stat.name}
                    </div>
                    <div className={style.statBarContainer}>
                      <div className={style.statBarBackground}>
                        <div
                          className={style.statBarFill}
                          style={{
                            width: `${Math.min(
                              (stat.base_stat / 150) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className={style.statValue}>{stat.base_stat}</div>
                  </div>
                ))}
            </div>
          </div>
        );

      case "기술":
        return (
          <div>
            <h3 className={style.bottomText}>주요 기술</h3>
            <div className={style.skillsContainer}>
              {koreanSkill.map((skill, index) => (
                <div key={index} className={style.skillItem}>
                  ⚡{skill}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className={style.tabContainer}>
        {(["소개", "능력치", "기술"] as TabType[]).map((tab) => (
          <div
            key={tab}
            className={`${style.tabItem} ${
              activeTab === tab ? style.activeTab : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className={style.bottomArea}>
        {renderTabContent()}
        <div className={style.btnBind}>
          <button className={style.btnOption}>카드보기</button>
          <button className={style.btnOption}>즐겨찾기</button>
        </div>
      </div>
    </>
  );
}
