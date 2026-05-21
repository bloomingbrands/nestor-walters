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
  /** Left col, rows 1-2 (tall) */
  integrations: React.ReactNode;
  /** Left col, row 3 */
  secondaryFeature: React.ReactNode;
  /** Left col, row 4 */
  journey: React.ReactNode;
  /** Center col, spans all rows */
  mainFeature: React.ReactNode;
  /** Right col — one card per entry, evenly spaced */
  poems: React.ReactNode[];
  className?: string;
}


export const BentoGridShowcase = ({
  integrations,
  mainFeature,
  secondaryFeature,
  journey,
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
      {/*
        One grid: desktop 3 columns — polaroids (3 rows) | portrait (row-span 3) | poems (row-span 3).
        Poem column height = polaroid stack height; portrait follows that same row sum.
        Mobile: column flow reordered with `order-*`.
      */}
      <div
        className="grid w-full grid-cols-1 gap-y-6 gap-x-0 md:grid-cols-[minmax(0,15rem)_minmax(11rem,1fr)_minmax(0,12.5rem)] md:items-stretch md:gap-x-2 md:gap-y-2"
        style={{ gridTemplateRows: "repeat(3, minmax(0, auto))" }}
      >
        <motion.div
          variants={itemVariants}
          className="min-h-0 md:col-start-1 md:row-start-1"
        >
          {integrations}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="min-h-0 md:col-start-1 md:row-start-2"
        >
          {secondaryFeature}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="min-h-0 md:col-start-1 md:row-start-3"
        >
          {journey}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="h-full min-h-72 md:col-start-2 md:row-span-3 md:row-start-1 md:min-h-0"
        >
          {mainFeature}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex min-h-0 flex-col justify-between gap-0.5 py-0.5 md:col-start-3 md:row-span-3 md:row-start-1 md:h-full"
        >
          {poems.map((poem, i) => (
            <div
              key={React.isValidElement(poem) && poem.key != null ? String(poem.key) : `poem-${i}`}
              className="min-h-0 flex-1 basis-0 md:flex md:min-h-0 md:flex-col md:justify-center"
            >
              <div className="min-h-0 md:h-full md:overflow-hidden">{poem}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
