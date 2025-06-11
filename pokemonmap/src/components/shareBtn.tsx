"use client";

import { useState } from "react";
import style from "./shareBtn.module.css";

export default function ShareBtn() {
  const [isShared, setIsShared] = useState(false);

  const handleShare = async () => {
    if (isShared) return;

    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      setTimeout(() => {
        setIsShared(false);
      }, 1500);
    } catch (err) {
      console.error("URL 복사 실패:", err);
    }
  };

  return (
    <>
      <button
        className={style.btnOption}
        onClick={handleShare}
        disabled={isShared}
      >
        {isShared ? "복사 완료!!" : "공유하기"}
      </button>
    </>
  );
}
