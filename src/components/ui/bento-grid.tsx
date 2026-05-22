"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 14 },
  },
};

interface BentoGridShowcaseProps {
  /** Left column — free-form scatter layout */
  leftColumn: React.ReactNode;
  /** Center col — portrait */
  mainFeature: React.ReactNode;
  /** Right col — one card per entry, evenly spaced */
  poems: React.ReactNode[];
  className?: string;
}

// Absolute positions for 6 poem cards in a 2-sub-column scatter on desktop.
// Card height ≈ 295px. Row spacing = 330px → ~35px vertical gap per column.
// X gutter: B column at ~238px, A ends at 215px → ~23px horizontal gap.
// Organic variation: A left shifts ±10px, B left shifts ±6px, row stagger ±22px.
const poemPositions = [
  { top: -80, left: 38,  width: 215 },  // A1
  { top: -78, left: 378, width: 215 },  // B1 — fans wide right
  { top: 310, left: 60,  width: 215 },  // A2  (A1 bottom ~295, gap 35px ✓)
  { top: 322, left: 472, width: 215 },  // B2 — fans wide right  (B1 bottom ~317, gap 35px ✓)
  { top: 660, left: 6,   width: 215 },  // A3  (A2 bottom ~625, gap 35px ✓)
  { top: 682, left: 280, width: 215 },  // B3 — fans wide right  (B2 bottom ~647, gap 35px ✓)
];

export const BentoGridShowcase = ({
  leftColumn,
  mainFeature,
  poems,
  className,
}: BentoGridShowcaseProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("w-full", className)}
    >
      <div className="grid w-full grid-cols-1 gap-y-8 gap-x-0 lg:grid-cols-[minmax(0,22rem)_1fr_minmax(0,13rem)] lg:items-stretch lg:gap-x-8">
        {/* Left — polaroid scatter, overflow-visible so rotated cards bleed outside */}
        <motion.div
          variants={itemVariants}
          className="overflow-visible"
        >
          {leftColumn}
        </motion.div>

        {/* Center — portrait, takes all remaining width (1fr) */}
        <motion.div
          variants={itemVariants}
          className="h-full min-h-72 lg:min-h-0"
        >
          {mainFeature}
        </motion.div>

        {/* Right — poems: mobile 2-col grid / desktop absolute scatter that bleeds right */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-visible"
        >
          {/* Mobile: 2-col staggered grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 lg:hidden">
            {poems.map((poem, i) => (
              <div
                key={React.isValidElement(poem) && poem.key != null ? String(poem.key) : `poem-${i}`}
                style={{ paddingTop: i % 2 === 1 ? 20 : 0 }}
              >
                {poem}
              </div>
            ))}
          </div>

          {/* Desktop: absolute scatter within the column, right sub-col bleeds outside */}
          <div className="relative hidden overflow-visible lg:block" style={{ minHeight: 980 }}>
            {poems.map((poem, i) => {
              const pos = poemPositions[i] ?? { top: i * 140, left: 0, width: 172 };
              return (
                <div
                  key={React.isValidElement(poem) && poem.key != null ? String(poem.key) : `poem-${i}`}
                  className="absolute"
                  style={{ top: pos.top, left: pos.left, width: pos.width, zIndex: i + 1 }}
                >
                  {poem}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
