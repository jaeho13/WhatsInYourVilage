"use client";

import { useParams } from "next/navigation";
import style from "./page.module.css";

const localeMap: { [key: string]: string } = {
  Gangnam: "강남구",
  Gangdong: "강동구",
  Gangbuk: "강북구",
  Gangseo: "강서구",
  Gwanak: "관악구",
  Gwangjin: "광진구",
  Guro: "구로구",
  Geumcheon: "금천구",
  Nowon: "노원구",
  Dobong: "도봉구",
  Dongdaemun: "동대문구",
  Dongjak: "동작구",
  Mapo: "마포구",
  Seodaemun: "서대문구",
  Seocho: "서초구",
  Seongdong: "성동구",
  Seongbuk: "성북구",
  Songpa: "송파구",
  Yangcheon: "양천구",
  Yeongdeungpo: "영등포구",
  Yongsan: "용산구",
  Eunpyeong: "은평구",
  Jongno: "종로구",
  Jung: "중구",
  Jungnang: "중랑구",
};

export default function Page() {
  const { id } = useParams();
  const localeKey = id as string;

  const localeName = localeMap[localeKey] ?? "알 수 없는 지역";

  return (
    <div className={style.container}>
      <div className={style.localeText}>{localeName}에 있을 수 있는 포켓몬</div>
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
