import Image from "next/image";
import style from "./page.module.css";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "우리 동네 포켓몬 찾기",
  description: "우리 동네에는 어떤 포켓몬이 살까",
  openGraph: {
    title: "우리 동네 포켓몬 찾기",
    description: "우리 동네에는 어떤 포켓몬이 살까",
    images: ["/thumbnail.png"],
  },
};

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.mainImg}>
            <Image
              src="/main.png"
              alt="mainImg"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <Link href={"/map"}>
            <button className={style.btn}>시작하기</button>
          </Link>
        </div>
      </div>
    </>
  );
}
