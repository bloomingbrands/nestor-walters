"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PolaroidCardProps {
  src: string;
  alt: string;
  caption: string;
  rotate?: number;
  /** Larger frame and image (e.g. bento beside portrait) */
  size?: "default" | "large";
}

export function PolaroidCard({ src, alt, caption, rotate = 0, size = "default" }: PolaroidCardProps) {
  const large = size === "large";
  const imageSizes = large
    ? "(max-width: 768px) 92vw, 280px"
    : "(max-width: 768px) 80vw, 200px";
  return (
    <div className={cn("flex h-full min-h-0 items-center justify-center", large ? "p-2 md:p-3" : "p-4")}>
      <motion.div
        className={cn(
          "group flex w-full cursor-pointer flex-col bg-white shadow-xl",
          large ? "max-w-60 p-3 pb-8 md:max-w-66" : "max-w-44 p-2.5 pb-7",
        )}
        style={{ rotate, zIndex: 1, position: "relative" }}
        whileHover={{
          scale: 1.06,
          rotate: rotate * -0.4,
          boxShadow: "0 24px 48px rgba(0,0,0,0.55)",
          y: -6,
          zIndex: 20,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
      >
        <div className="relative w-full aspect-4/3 overflow-hidden bg-zinc-200">
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
            large ? "text-lg md:text-xl" : "text-base",
          )}
        >
          {caption}
        </p>
      </motion.div>
    </div>
  );
}
