"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/cta-button";
import { ProjectDetailsModal } from "@/components/ui/project-details-modal";

const DESCRIPTION =
  "They understood our vision, transformed complex requirements into a clear digital product, and delivered an experience built for growth.";

const CHIPS = [
  "All",
  "SaaS",
  "Fintech",
  "Real Estate",
  "Retail",
  "Fashion",
  "Food & Delivery",
  "Healthcare",
  "Events",
  "Gaming",
  "Sports",
  "Energy",
  "Non-profit",
  "Smart",
  "Home",
  "Mobility",
  "Travel",
  "AI",
  "Entertainment",
] as const;

const TECHNOLOGY_OPTIONS = ["All", "SaaS", "AI"] as const;
const INDUSTRY_OPTIONS = [
  "Education",
  "All",
  "Fintech",
  "Real Estate",
  "Retail",
  "Fashion",
  "Food & Delivery",
  "Healthcare",
  "Events",
  "Gaming",
  "Sports",
  "Energy",
  "Non-profit",
  "Smart",
  "Home",
  "Mobility",
  "Travel",
  "Entertainment",
] as const;

const STUDIES = [
  { image: "/figma/case-study/case-1.png", tags: ["SaaS", "Fintech"], imageClassName: "" },
  { image: "/figma/case-study/case-2.png", tags: ["SaaS", "Fintech"], imageClassName: "origin-[58%_40%] scale-[1.28]" },
  { image: "/figma/case-study/case-4.png", tags: ["SaaS", "Fintech"] },
  { image: "/figma/case-study/case-5.png", tags: ["SaaS", "Fintech"] },
  { image: "/figma/case-study/case-6.png", tags: ["SaaS", "Fintech"] },
  { image: "/figma/case-study/case-7.png", tags: ["SaaS", "Fintech"] },
  { image: "/figma/case-study/case-8.png", tags: ["SaaS", "Fintech"] },
  { image: "/figma/case-study/case-9.png", tags: ["SaaS", "Fintech"] },
  { image: "/figma/case-study/case-10.png", tags: ["SaaS", "Fintech"] },
] as const;

function matchesFilter(tags: readonly string[], value: string) {
  return value === "All" || value === "Education" || tags.includes(value);
}

function FilterSelect({
  label,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: {
  label: string;
  value: string;
  options: readonly string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (next: string) => void;
}) {
  const listId = useId();

  return (
    <div className="flex items-center gap-[12px]">
      <p className="text-[14px] leading-[1.4] font-bold text-[#4a5568]">{label}</p>
      <div className="relative">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={onToggle}
          className="flex w-[138px] items-center justify-between rounded-[69px] border border-[#ededed] bg-white px-[16px] py-[10px] text-[14px] leading-[1.4] font-medium text-[#171717]"
        >
          {value}
          <img src="/figma/case-study/chevron.svg" alt="" className="rotate-90" />
        </button>
        {open ? (
          <ul
            id={listId}
            className="absolute top-[calc(100%+8px)] left-0 z-20 max-h-[240px] w-[180px] overflow-auto rounded-[16px] border border-[#ededed] bg-white py-[6px] shadow-[0px_16px_40px_rgba(15,26,15,0.08)]"
          >
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => onSelect(option)}
                  className={`w-full px-[16px] py-[8px] text-left text-[14px] ${
                    option === value ? "font-semibold text-brand" : "text-[#171717]"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export function CaseStudies() {
  const [chip, setChip] = useState<(typeof CHIPS)[number]>("All");
  const [technology, setTechnology] = useState<(typeof TECHNOLOGY_OPTIONS)[number]>("All");
  const [industry, setIndustry] = useState<(typeof INDUSTRY_OPTIONS)[number]>("Education");
  const [openMenu, setOpenMenu] = useState<"technology" | "industry" | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!filtersRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const visible = STUDIES.filter(
    (study) =>
      matchesFilter(study.tags, chip) &&
      matchesFilter(study.tags, technology) &&
      matchesFilter(study.tags, industry),
  );

  return (
    <section className="bg-white pt-[148px] pb-[80px] lg:pt-[172px] lg:pb-[120px]">
      <div className="page-container">
        <div className="content-1480 flex flex-col items-center gap-[30px]">
          <div className="flex flex-col items-center gap-[8px] text-center">
            <p className="flex items-center gap-[12px] text-[16px] leading-[24px] font-medium text-black">
              <img src="/figma/case-study/eyebrow-dot.svg" alt="" />
              Case Studies
            </p>
            <h1 className="text-[40px] leading-[1.05] font-medium text-black uppercase sm:text-[64px] lg:text-[100px]">
              Featured <span className="text-[#00ab0c]">Case Studies</span>
            </h1>
          </div>

          <div ref={filtersRef} className="flex w-full flex-col items-center gap-[26px]">
            <div className="flex flex-wrap items-center justify-center gap-x-[24px] gap-y-[12px]">
              <FilterSelect
                label="Technology:"
                value={technology}
                options={TECHNOLOGY_OPTIONS}
                open={openMenu === "technology"}
                onToggle={() => setOpenMenu((current) => (current === "technology" ? null : "technology"))}
                onSelect={(next) => {
                  setTechnology(next as (typeof TECHNOLOGY_OPTIONS)[number]);
                  setOpenMenu(null);
                }}
              />
              <FilterSelect
                label="Industry:"
                value={industry}
                options={INDUSTRY_OPTIONS}
                open={openMenu === "industry"}
                onToggle={() => setOpenMenu((current) => (current === "industry" ? null : "industry"))}
                onSelect={(next) => {
                  setIndustry(next as (typeof INDUSTRY_OPTIONS)[number]);
                  setOpenMenu(null);
                }}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-[16px]">
              {CHIPS.map((item) => {
                const selected = item === chip;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setChip(item)}
                    className={
                      selected
                        ? "rounded-[40px] bg-[#00ab0c] px-[20px] py-[8px] text-[16px] leading-[24px] font-medium text-[#f8fff6]"
                        : "rounded-[40px] border border-[#8a9886] px-[20px] py-[8px] text-[16px] leading-[24px] font-medium text-[#8a9886]"
                    }
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-[27px] flex w-full flex-col gap-[60px]">
            {visible.length === 0 ? (
              <p className="py-[48px] text-center text-[18px] text-[#4a5568]">
                No case studies match these filters.
              </p>
            ) : (
              visible.map((study) => (
                <article
                  key={study.image}
                  className="flex flex-col items-stretch gap-[28px] lg:flex-row lg:items-center lg:gap-[24px]"
                >
                  <div className="flex w-full flex-col gap-[31px] lg:w-[728px] lg:shrink-0">
                    <div className="flex flex-col gap-[20px]">
                      <div className="flex flex-col gap-[4px]">
                        <h2 className="text-[32px] leading-[44px] font-bold text-[#3f3f3f] sm:text-[40px] sm:leading-[58px]">
                          InvestIQ
                        </h2>
                        <p className="text-[18px] leading-[1.6] text-[#4a5568] sm:text-[20px]">
                          {DESCRIPTION}
                        </p>
                      </div>
                      <div className="flex gap-[16px]">
                        {study.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-[40px] border border-[#8a9886] px-[20px] py-[8px] text-[16px] leading-[24px] font-medium text-[#8a9886]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <CtaButton arrowMotion onClick={() => setDetailsOpen(true)}>
                        View Case Studies
                      </CtaButton>
                    </div>
                  </div>

                  <div className="relative h-[280px] w-full min-w-0 overflow-hidden rounded-[15px] border border-[#f8f8f8] bg-[#fdfdfd] p-[20px] shadow-[-4px_4px_8px_rgba(31,31,31,0.04)] sm:h-[360px] lg:h-[448px] lg:flex-1">
                    <div className="relative size-full overflow-hidden rounded-[12px]">
                      <img
                        src={study.image}
                        alt="InvestIQ case study"
                        className={`absolute inset-0 size-full object-cover ${"imageClassName" in study ? study.imageClassName : ""}`}
                      />
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
      {detailsOpen ? <ProjectDetailsModal onClose={() => setDetailsOpen(false)} /> : null}
    </section>
  );
}
