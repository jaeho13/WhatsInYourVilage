import Image from "next/image";
import style from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <div className={style.mainImg}>
          <Image
            src="/main.png"
            alt="test"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className={style.bind}>
          <Link href={"/map"}>
            <button className={style.btn}>시작하기</button>
          </Link>
        </div>
      </div>
    </>
  );
}
