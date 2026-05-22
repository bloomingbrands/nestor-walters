"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PolaroidCardProps {
  src: string;
  alt: string;
  caption: string;
  rotate?: number;
  size?: "sm" | "default" | "large";
  deep?: boolean;
}

const SHADOW_DEFAULT = "0 25px 50px -12px rgba(0,0,0,0.28)";
const SHADOW_DEEP    = "0 40px 90px rgba(0,0,0,0.55), 0 10px 28px rgba(0,0,0,0.30)";
const HOVER_DEFAULT  = "0 28px 56px rgba(0,0,0,0.62)";
const HOVER_DEEP     = "0 55px 110px rgba(0,0,0,0.72), 0 18px 40px rgba(0,0,0,0.42)";

export function PolaroidCard({ src, alt, caption, rotate = 0, size = "default", deep = false }: PolaroidCardProps) {
  const large = size === "large";
  const sm = size === "sm";
  const width = large ? 313 : sm ? 148 : 180;
  const imageSizes = large
    ? "(max-width: 768px) 92vw, 313px"
    : sm
    ? "(max-width: 768px) 45vw, 148px"
    : "(max-width: 768px) 80vw, 180px";
  return (
    <motion.div
      className={cn(
        "group flex cursor-pointer flex-col bg-white",
        large ? "p-3 pb-9" : sm ? "p-2 pb-6" : "p-2.5 pb-7",
      )}
      style={{
        rotate,
        width,
        position: "relative",
        zIndex: 1,
        boxShadow: deep ? SHADOW_DEEP : SHADOW_DEFAULT,
      }}
      whileHover={{
        scale: 1.05,
        rotate: rotate * -0.3,
        boxShadow: deep ? HOVER_DEEP : HOVER_DEFAULT,
        y: -8,
        zIndex: 20,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
    >
      <div className="relative w-full overflow-hidden bg-zinc-200" style={{ aspectRatio: "4 / 3.45" }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={imageSizes}
          className="object-cover sepia transition-all duration-500 ease-out group-hover:sepia-0 group-hover:saturate-110"
        />
      </div>
      <p
        className={cn(
          "mt-2.5 text-center leading-tight text-zinc-700",
          large ? "text-base" : sm ? "text-xs" : "text-sm",
        )}
      >
        {caption}
      </p>
    </motion.div>
  );
}
