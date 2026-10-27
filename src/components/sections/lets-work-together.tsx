"use client";

import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/cta-button";

type StatItem = {
  plus: string;
  number: string;
  label: string;
};

const STATS: StatItem[] = [
  {
    plus: "+",
    number: "76",
    label: "Projects Completed",
  },
  {
    plus: "+",
    number: "80",
    label: "Real Clients here",
  },
  {
    plus: "+",
    number: "22",
    label: "Winning Awards",
  },
  {
    plus: "+",
    number: "12",
    label: "Years of experience",
  },
];

const COUNT_MS = 1400;

function useCountUp(target: number, play: boolean, delay: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!play) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let frame = 0;
    const startTimer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / COUNT_MS);
        const eased = 1 - (1 - progress) ** 3;
        setValue(Math.round(eased * target));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(frame);
    };
  }, [play, target, delay]);

  return value;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);
  const value = useCountUp(Number(stat.number), play, index * 120);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlay(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setPlay(true);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="group relative flex h-[300px] flex-col justify-end rounded-[24px] border-t border-l border-[rgba(23,23,23,0.08)] p-[32px] transition-all duration-300 hover:shadow-[0_16px_40px_-8px_rgba(15,26,15,0.08)]"
      style={{
        background: "linear-gradient(180deg, #F1FCF3 0%, #F5FDF6 36%, #FAFEFA 58%, #FFFFFF 72%)",
      }}
    >
      <span
        aria-hidden
        className="absolute top-[20px] right-[32px] block h-[16px] w-[15.2px] rounded-[16px] border-[3px] border-brand bg-[#F5F5F5] transition-transform duration-300 group-hover:scale-110"
      />

      <div className="flex items-center">
        <span className="text-[64px] leading-[72px] font-semibold tracking-[-0.02em] text-brand">
          {stat.plus}
        </span>
        <span className="inline-block min-w-[2ch] text-[64px] leading-[72px] font-semibold tracking-[-0.02em] text-[#171717] tabular-nums">
          {value}
        </span>
      </div>

      <p className="mt-[8px] text-[16px] leading-[24px] font-medium text-[#5C635E]">{stat.label}</p>
    </article>
  );
}

export function LetsWorkTogether() {
  return (
    <section id="contact" className="overflow-hidden bg-white py-[80px] lg:py-[112px]">
      <div className="page-container">
        <div className="content-1480 flex flex-col items-center gap-[64px]">
          {/* Header */}
          <div className="flex max-w-[1020px] flex-col items-center text-center">
            {/* Eyebrow */}
            <span className="text-[14px] font-semibold leading-[20px] tracking-[0.08em] text-[#171717] uppercase">
              <span className="text-brand">{"//"}</span>
              {" Let’s Work Together"}
            </span>

            {/* H2 Title */}
            <h2 className="mt-[28px] max-w-[1018px] text-[40px] font-bold leading-[48px] tracking-[-0.02em] text-[#1B1B1B] uppercase sm:text-[56px] sm:leading-[64px]">
              Complete Digital Solutions
              <br />
              From Idea to Launch
            </h2>

            {/* Subtitle / Lead Paragraph */}
            <p className="mt-[15px] max-w-[792px] text-[18px] leading-[30px] text-[#5C635E]">
              From strategy and UI/UX to full-stack development and deployment,
              we deliver end-to-end digital solutions designed to help businesses grow.
            </p>

            {/* CTA Button Component */}
            <div className="mt-[28px]">
              <CtaButton overlay variant="outline">
                Become a Client
              </CtaButton>
            </div>
          </div>

          {/* 4 Stat Cards Row */}
          <div className="grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
