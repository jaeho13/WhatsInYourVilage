"use client";
import { useRouter } from "next/navigation";
import { XCircle } from "@deemlol/next-icons";

interface BackIconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export default function BackIcon({
  size = 32,
  color = "#000000",
  style = {},
}: BackIconProps) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <XCircle
      size={size}
      color={color}
      onClick={handleClick}
      style={{
        cursor: "pointer",
        ...style,
      }}
    />
  );
}
