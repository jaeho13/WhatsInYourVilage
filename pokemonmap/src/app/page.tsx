import Image from "next/image";
import style from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.mainImg}>
            <Image src="/main.png" alt="test" width={500} height={500} />
          </div>
          <Link href={"/map"}>
            <button className={style.btn}>시작하기</button>
          </Link>
        </div>
      </div>
    </>
  );
}
