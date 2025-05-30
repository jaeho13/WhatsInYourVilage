import Link from "next/link";
import "./globals.css";
import style from "./layout.module.css";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>
              <Image src="/logo.png" width={60} height={60} alt="로고" />
            </Link>
            <div>우리 동네 포켓몬 찾기</div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
