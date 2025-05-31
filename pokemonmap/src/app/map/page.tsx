import Image from "next/image";
import style from "./page.module.css";

export default function Page() {
  return (
    <>
      <div className={style.container}>
        <div className={style.mainImg}>
          <Image
            src="/map.png"
            alt="test"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </>
  );
}
