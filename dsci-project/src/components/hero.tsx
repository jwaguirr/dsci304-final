"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden border-b-[4px] border-black bg-white snap-start"
    >
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid grid-cols-8 grid-rows-8"
      >
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} className="border border-black/[0.04]" />
        ))}
      </div>

      {/* Red accent bar — top */}
      <div className="absolute top-0 left-0 h-2 w-full bg-[#ff3333]" />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Label badge */}
        <div className="mb-10 inline-flex items-center gap-3 border-[3px] border-black px-4 py-2 shadow-[4px_4px_0_0_#000000]">
          <span className="h-2.5 w-2.5 bg-[#ff3333]" />
          <span className="text-xs font-black uppercase tracking-[0.35em]">
            DSCI-304 * 2026
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-[clamp(3rem,11vw,8.5rem)] font-black uppercase leading-[0.88] tracking-tighter text-black">
          Are CS Majors
        </h1>

        {/* "cooked?" — italic, primary red */}
        <h1 className="mt-2 text-[clamp(3rem,11vw,8.5rem)] font-black italic leading-[0.88] tracking-tighter text-[#ff3333]">
          cooked?
        </h1>

        {/* Divider */}
        <div className="my-10 h-[4px] w-full max-w-2xl bg-black" />

        {/* Subtitle */}
        <p className="mb-12 max-w-xl text-lg font-medium leading-relaxed text-black/70">
          An analysis of our current job market, and learning if we were sold a lie. This data will focus on Software Engineering (SWE) jobs.
        </p>

        {/* Scroll prompt */}
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <span className="text-[11px] font-black uppercase tracking-[0.35em]">
            Scroll to Explore
          </span>
          <div className="h-8 w-[2px] bg-black" />
        </motion.div>
      </motion.div>
    </section>
  );
}
