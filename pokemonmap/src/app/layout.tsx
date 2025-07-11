"use client";

import Link from "next/link";
import "./globals.css";
import style from "./layout.module.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ReactNode } from "react";
import Script from "next/script";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: ReactNode;
}>) {
  const pathname = usePathname();
  const [defaultValue, setDefaultValue] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js"
          onLoad={() => {
            const kakao = (window as any).Kakao;
            if (kakao && !kakao.isInitialized()) {
              kakao.init("08c8b8645f7b16889157e11a1dd6b8c9");
            }
          }}
        />
        <div className={style.container}>
          <header className={style.header}>
            <div className={style.headerText}>
              <Link href={"/"}>
                <Image src="/logo.png" width={60} height={60} alt="로고" />
              </Link>
              <div>우리 동네 포켓몬 찾기</div>
            </div>

            {(pathname.startsWith("/map") || pathname.startsWith("/info")) && (
              <div className={style.headerSelect}>
                <select
                  className={style.selectOption}
                  value={defaultValue}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setDefaultValue(selectedValue);
                    setIsNavigating(true);
                    router.push(`/map/${selectedValue}`);
                  }}
                >
                  <option value="" disabled>
                    동네 선택하기
                  </option>
                  <option value="Gangnam">강남구</option>
                  <option value="Gangdong">강동구</option>
                  <option value="Gangbuk">강북구</option>
                  <option value="Gangseo">강서구</option>
                  <option value="Gwanak">관악구</option>
                  <option value="Gwangjin">광진구</option>
                  <option value="Guro">구로구</option>
                  <option value="Geumcheon">금천구</option>
                  <option value="Nowon">노원구</option>
                  <option value="Dobong">도봉구</option>
                  <option value="Dongdaemun">동대문구</option>
                  <option value="Dongjak">동작구</option>
                  <option value="Mapo">마포구</option>
                  <option value="Seodaemun">서대문구</option>
                  <option value="Seocho">서초구</option>
                  <option value="Seongdong">성동구</option>
                  <option value="Seongbuk">성북구</option>
                  <option value="Songpa">송파구</option>
                  <option value="Yangcheon">양천구</option>
                  <option value="Yeongdeungpo">영등포구</option>
                  <option value="Yongsan">용산구</option>
                  <option value="Eunpyeong">은평구</option>
                  <option value="Jongno">종로구</option>
                  <option value="Jung">중구</option>
                  <option value="Jungnang">중랑구</option>
                  <option value="unknown">???</option>
                </select>
              </div>
            )}
          </header>

          {isNavigating && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 100,
              }}
            ></div>
          )}

          <main>{children}</main>
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
