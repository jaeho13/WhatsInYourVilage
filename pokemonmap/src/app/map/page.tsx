import Image from "next/image";
import style from "./page.module.css";

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
