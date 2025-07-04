"use client";

import Image from "next/image";
import style from "./shareModal.module.css";
import { XCircle } from "@deemlol/next-icons";
import { useState } from "react";
import { shareCurrentPage } from "./share/kakaoShare";

interface ShareModalProps {
  onClose: () => void;
}

export default function ShareModal({ onClose }: ShareModalProps) {
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

  const handleKakaoShare = () => {
    shareCurrentPage({});
  };

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.top}>
          <div className={style.title}>공유</div>
          <button className={style.btn} onClick={onClose}>
            <XCircle size={32} />
          </button>
        </div>
        <div className={style.icons}>
          {/* 카카오 공유 버튼 */}
          <button className={style.btnEvent} onClick={handleKakaoShare}>
            <Image src="/kakao.svg" alt="kakaoIcon" width={55} height={55} />
          </button>

          <button
            className={style.btnEvent}
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`,
                "_blank",
                "width=600,height=400"
              )
            }
          >
            <Image
              src="/facebook.svg"
              alt="facebookIcon"
              width={55}
              height={55}
            />
          </button>

          <button
            className={style.btnEvent}
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}`,
                "_blank",
                "width=600,height=400"
              )
            }
          >
            <Image
              src="/twitter.svg"
              alt="twitterIcon"
              width={55}
              height={55}
            />
          </button>
        </div>
        <div className={style.copyArea}>
          <div className={style.copyUrl}>{window.location.href}</div>
          <button className={style.copyBtn} onClick={handleShare}>
            {isShared ? "완료" : "복사"}
          </button>
        </div>
      </div>
    </div>
  );
}
