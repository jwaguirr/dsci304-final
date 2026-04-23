"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import Image from "next/image";
import v1 from "~/imgs/v1.png";
import v2 from "~/imgs/v2.png";
import v3 from "~/imgs/v3.png";
import v4 from "~/imgs/v4.png";
import v5 from "~/imgs/v5.png";

const SECTIONS = [
  {
    num: "01",
    total: "05",
    label: "Talent Supply",
    title: "Way Too Many Of Us.",
    subtitle: "Bachelor's degrees in computer & information sciences in US",
    img: v1,
    color: "#ff3333",
    textOnColor: "white" as const,
    body: "There has been a massive increase in the supply of new tech talent. The number of bachelor's degrees awarded in computer and information sciences has increased, pretty much doubling and flooding the job market with candidates.",
    finding: "Degrees awarded nearly doubled to approach 80,000 by 2017",
  },
  {
    num: "02",
    total: "05",
    label: "Hiring Demand",
    title: "We're No Longer Needed?",
    subtitle: "Annual average of LinkedIn SWE Job Postings Index (2021-2024)",
    img: v2,
    color: "#ffff00",
    textOnColor: "black" as const,
    body: "After peaking in 2022, LinkedIn's software engineering postings fell hard and kept falling through 2024. This means less opportunities for software engineers.",
    finding: "Postings index got killed from a peak of 196 in 2022 to under 75 in 2024. Average is 100, so in 2022 it was 96% higher than usual.",
  },
  {
    num: "03",
    total: "05",
    label: "Industry Hiring",
    title: "They're Laying Us Off.",
    subtitle: "Total employees laid off from tech companies per year",
    img: v3,
    color: "#0066ff",
    textOnColor: "white" as const,
    body: "The tech industry shifted rapidly from high loyalty in 2021 to lots of cuts. This peaked at 177,000 layoffs in 2023. However, even in 2024, the volume of layoffs remains consistent compared to pre-2022 levels.",
    finding: "Layoffs spiked from just 7K in 2021 to a massive 177K peak in 2023...",
  },
  {
    num: "04",
    total: "05",
    label: "Flow of Engineers",
    title: "Hiring Stops, Yet Firing Continues?",
    subtitle: "Index relative to 2021 comparing SWE Postings and Tech Layoffs",
    img: v4,
    color: "#00cc00",
    textOnColor: "black" as const,
    body: "When looking at data in respective relation to 2021, we see a weird relationship between fewer jobs yet rising unemployment. Job postings fell 65 percent while layoffs oddly increased over 1,700 percent, showing the industry stopping hiring yet still removing workers.",
    finding: "When Postings fell 65%, Layoffs rose over 1,700%",
  },
  {
    num: "05",
    total: "05",
    label: "Targeted Cuts",
    title: "CS Is Getting Hit Hard.",
    subtitle: "Layoffs broken down by CS Industries vs Other Industries",
    img: v5,
    color: "#cc00cc",
    textOnColor: "white" as const,
    body: "When looking at the industry we see huge workforce cuts specifically in tech fields like software, hardware, and AI. These cuts are not just hitting other roles, but are really hitting jobs that computer science graduates target.",
    finding: "An increasing majority of layoffs are directly hitting software, hardware, and AI sectors",
  },
] as const;

type Section = (typeof SECTIONS)[number];

function ChartSection({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Chart placeholder moves faster → appears further back (parallax depth)
  const chartY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const chartOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [0, 1, 1, 1],
  );

  // Text card moves slower → appears closer to viewer
  const textY = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.2, 0.88, 1],
    [0, 1, 1, 1],
  );

  const isFlipped = index % 2 === 1;

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden border-t-[4px] border-black bg-white snap-start"
    >
      {/* Large background section number — decorative watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[22vw] font-black leading-none text-black opacity-[0.035]"
      >
        {section.num}
      </span>

      <div className="relative z-10 flex min-h-screen items-center px-6 py-24 md:px-14">
        <div className={cn("mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:gap-20", isFlipped ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]")}>
          {/* ── Chart placeholder ── */}
          <motion.div
            style={{ y: chartY, opacity: chartOpacity }}
            className={cn("flex flex-col gap-4", isFlipped && "md:order-2")}
          >
            {/* Colored box */}
            <div
              className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 overflow-hidden border-[4px] border-black shadow-[10px_10px_0_0_#000000]"
              style={{ backgroundColor: section.color }}
            >
              {/* Corner accents */}
              <span
                className="absolute left-3 top-3 block h-5 w-5 border-[3px]"
                style={{
                  borderColor:
                    section.textOnColor === "white"
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(0,0,0,0.25)",
                }}
              />
              <span
                className="absolute bottom-3 right-3 block h-5 w-5 border-[3px]"
                style={{
                  borderColor:
                    section.textOnColor === "white"
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(0,0,0,0.25)",
                }}
              />

              <Image
                src={section.img}
                alt={section.title}
                fill
                className="object-contain"
              />

              <div
                className="absolute bottom-0 left-0 right-0 border-t-[3px] px-5 py-3"
                style={{
                  borderColor:
                    section.textOnColor === "white"
                      ? "rgba(255,255,255,0.35)"
                      : "rgba(0,0,0,0.2)",
                  color:
                    section.textOnColor === "white"
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(0,0,0,0.75)",
                }}
              >
                <p className="mt-0.5 text-xs font-semibold">{section.subtitle}</p>
              </div>
            </div>

            {/* Counter label below chart */}
            <div className="flex items-center gap-3">
              <div
                className="h-[3px] w-8"
                style={{ backgroundColor: section.color }}
              />
              <span className="text-xs font-black uppercase tracking-widest text-black/40">
                {section.num} / {section.total}
              </span>
            </div>
          </motion.div>

          {/* ── Text analysis card ── */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className={cn(isFlipped && "md:order-1")}
          >
            <Card className="gap-0 rounded-none border-[4px] border-black p-0 ring-0 shadow-[8px_8px_0_0_#000000]">
              <CardHeader className="rounded-none border-b-[4px] border-black px-6 py-5">
                {/* Top meta row */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
                    {section.label}
                  </span>
                  <span
                    className="inline-block h-3.5 w-3.5 border-[2px] border-black"
                    style={{ backgroundColor: section.color }}
                  />
                </div>

                <CardTitle className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-black uppercase leading-tight tracking-tight">
                  {section.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-6 py-6">
                <p className="text-base leading-relaxed text-black/60">
                  {section.body}
                </p>

                {/* Key finding — inverted block */}
                <div className="mt-6 bg-black px-4 py-3 text-white">
                  <p className="mb-1 text-[9px] font-black uppercase tracking-[0.35em] text-white/50">
                    Key Finding
                  </p>
                  <p className="text-sm font-bold">{section.finding}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ChartSections() {
  return (
    <>
      {SECTIONS.map((section, index) => (
        <ChartSection key={section.num} section={section} index={index} />
      ))}

      {/* ── Verdict footer ── */}
      <footer className="snap-start border-t-[4px] border-black bg-black px-6 py-20 text-white md:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
              The Verdict
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-tighter">
              A little bit
              <br />
              <span className="italic text-[#ff3333]">cooked.</span>
            </h2>
          </div>

          <div className="max-w-sm border-[3px] border-white px-6 py-5 shadow-[6px_6px_0_0_#ff3333]">
            <p className="text-xs font-black uppercase tracking-widest text-white/50">
              Bottom Line
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-white/80">
              New hire jobs are dwindling down, layoffs are increasing and AI is lowering the required skill set. 
              Who knows what the future looks like.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
