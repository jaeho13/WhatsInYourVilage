"use client";

import { useParams } from "next/navigation";
import style from "./page.module.css";

export default function Page() {
  const { id } = useParams();

  return (
    <div className={style.container}>
      <div className={style.localeText}>{id} 서초구에 있을 수 있는 포켓몬</div>
      <div className={style.boxBind}>
        <div className={style.infoBox}>테스트</div>
        <div className={style.infoBox}>테스트</div>
        <div className={style.infoBox}>테스트</div>
        <div className={style.infoBox}>테스트</div>
        <div className={style.infoBox}>테스트</div>
      </div>
      <div className={style.bottom}>
        <div className={style.shareBtn}>공유하기</div>
      </div>
    </div>
  );
}
