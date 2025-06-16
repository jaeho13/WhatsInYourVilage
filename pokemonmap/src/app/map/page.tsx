import Image from "next/image";
import style from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "우리 동네 포켓몬 찾기",
  description: "우리 동네에는 어떤 포켓몬이 살까",
  openGraph: {
    title: "우리 동네 포켓몬 찾기",
    description: "우리 동네에는 어떤 포켓몬이 살까",
    // images: ["/thumbnail.png"],
  },
};

export default function Page() {
  return (
    <>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.mainImg}>
            <Image src="/map.png" alt="test" width={500} height={500} />
          </div>
        </div>
      </div>
    </>
  );
}
