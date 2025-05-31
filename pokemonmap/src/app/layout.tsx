"use client";

import Link from "next/link";
import "./globals.css";
import style from "./layout.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <Link href={"/"}>
              <Image src="/logo.png" width={60} height={60} alt="로고" />
            </Link>
            <div>우리 동네 포켓몬 찾기</div>

            {pathname === "/map" && <button>지도용 버튼</button>}
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
