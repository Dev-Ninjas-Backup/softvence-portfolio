"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Stat = {
  value: string;
  label: string;
  featured?: boolean;
};

const STATS: Stat[] = [
  { value: "5K+", label: "Businesses Formed", featured: true },
  { value: "48hrs", label: "Average Setup Time" },
  { value: "25+", label: "Countries Served" },
  { value: "99%", label: "Client Satisfaction" },
];

export function AboutStory() {
  return (
    <section className="bg-white pb-[90px] lg:pb-[140px]">
      <div className="page-container">
        <div className="content-1480 flex flex-col items-center gap-[50px] lg:flex-row lg:items-center lg:justify-between lg:gap-[35px]">
          <Reveal className="relative h-[480px] w-full max-w-[567px] overflow-hidden rounded-[32px] bg-[#eaf7ee] sm:h-[560px] lg:h-[637px]">
            <div className="absolute inset-0 bg-[rgba(0,171,12,0.06)]" />
            <Image
              src="/figma/about-page-img/advisor.png"
              alt="Softvence advisor"
              fill
              sizes="567px"
              className="object-cover object-[28%_center]"
            />
            <Link
              href="#contact"
              className="absolute bottom-[64px] left-1/2 inline-flex -translate-x-1/2 items-center gap-[12px] rounded-full bg-brand py-[2px] pr-[2px] pl-[18px] transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="text-[18px] leading-[29px] font-semibold whitespace-nowrap text-white sm:text-[20px]">
                Talk to an Advisor
              </span>
              <span className="flex size-[46px] items-center justify-center rounded-full bg-[#050c0b]">
                <img
                  src="/figma/about-page-img/advisor-arrow.svg"
                  alt=""
                  width={18.5}
                  height={17.3438}
                />
              </span>
            </Link>
          </Reveal>

          <div className="flex w-full max-w-[869px] flex-col gap-[37px]">
            <Reveal>
              <span className="inline-flex h-[47px] items-center justify-center rounded-[30px] bg-[#e3e3e3] px-[18px] text-[20px] leading-[23px] font-medium text-[#050c0b]">
                About Us
              </span>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-justify text-[20px] leading-[34px] text-[#242424] sm:text-[26px] sm:leading-[44px]">
                SwiftForm was created to simplify the process of launching and
                growing a business. Many founders struggle with complex formation
                procedures, compliance requirements, and operational structure
                during the early stages of their companies.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 gap-[23px] sm:grid-cols-2">
              {STATS.map((stat, index) => (
                <Reveal key={stat.label} delay={120 + index * 70}>
                  <article
                    className={cn(
                      "flex h-[158px] flex-col justify-center gap-[22px] rounded-[24px] p-[23px]",
                      stat.featured
                        ? "bg-brand text-white"
                        : "border border-[#e3e8e3] bg-[#f3f8f3] text-[#050c0b]",
                    )}
                  >
                    <RollingValue
                      value={stat.value}
                      className={stat.featured ? "text-white" : "text-[#050c0b]"}
                    />
                    <p
                      className={cn(
                        "text-[18px] leading-[26px]",
                        stat.featured ? "text-white" : "text-[#050c0b]",
                      )}
                    >
                      {stat.label}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RollingValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlay(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className={cn(
        "flex items-end text-[52px] leading-[62px] tracking-[-0.62px] sm:text-[62px]",
        className,
      )}
    >
      {Array.from(value).map((char, index) =>
        /\d/.test(char) ? (
          <span
            key={`${char}-${index}`}
            className={cn("about-digit inline-block overflow-hidden", play && "is-playing")}
          >
            <span style={{ animationDelay: `${index * 80}ms` }}>{char}</span>
          </span>
        ) : (
          <span key={`${char}-${index}`}>{char}</span>
        ),
      )}
    </p>
  );
}
