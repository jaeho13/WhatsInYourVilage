"use client";
import { useRouter } from "next/navigation";
import style from "./backbtn.module.css";
import { ReactNode } from "react";

export default function BackBtn({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <button className={style.btn} onClick={() => router.back()}>
      {children}
    </button>
  );
}
