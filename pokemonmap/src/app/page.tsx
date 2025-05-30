import Image from "next/image";
import style from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={style.background}>
        <Image width={600} height={600} src="/main.png" alt="test" />

        <Link href={"/map"}>
          <button>시작하기</button>
        </Link>

        {/* <Link href={"/test"}>
          <button>테스트용</button>
        </Link> */}
      </div>
    </>
  );
}
