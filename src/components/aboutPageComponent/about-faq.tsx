"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What type of clients do you usually work with?",
    answer:
      "We partner with founders, growing companies, and established brands that want product, brand, and digital experiences built with clarity and craft.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Focused product work typically takes 7–30 days. Larger brand and platform builds span a few months, depending on scope and collaboration.",
  },
  {
    question: "Do you offer ongoing support after a project ends?",
    answer:
      "Yes. We offer retainers and post-launch support so your product keeps improving after the first release.",
  },
  {
    question: "How do I get started or request a proposal?",
    answer:
      "Share a short brief or book a call. We’ll review your goals, propose a path, and send a clear proposal.",
  },
];

export function AboutFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-[90px] lg:py-[140px]">
      <div className="page-container">
        <div className="content-1480 flex flex-col gap-[24px]">
          <Reveal>
            <h2 className="max-w-[1000px] text-[36px] leading-[44px] font-bold tracking-[-1.12px] text-[#0f1011] uppercase sm:text-[56px] sm:leading-[64px]">
              Still got questions?
            </h2>
          </Reveal>
          <div className="h-px w-full border-t border-dashed border-[#808080]" />

          <div className="flex flex-col gap-[40px] lg:flex-row lg:items-start lg:justify-between">
            <Reveal className="flex w-full max-w-[736px] flex-col gap-[6px]">
              <div className="flex min-h-[90px] flex-wrap items-center justify-between gap-4 rounded-[9px] bg-white px-[20px] py-4">
                <div className="flex w-[234px] items-center gap-[10px] border-r border-[#ddd] pr-4">
                  <div className="relative h-[43px] w-[40px] overflow-hidden rounded-[6px] bg-[#f4f4f4]">
                    <Image
                      src="/figma/about-page-img/faq-chris.png"
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[13px] leading-[16px] text-[#0b0b0c]">
                      Talk to Chris
                    </p>
                    <p className="text-[12px] leading-[18px] text-[#666]">
                      Support at Softvence™
                    </p>
                  </div>
                </div>
                <ContactMeta label="Email" value="hello@softvence.com" href="mailto:hello@softvence.com" />
                <ContactMeta label="LinkedIn" value="@softvence" href="https://www.linkedin.com" />
                <ContactMeta label="Phone" value="+88 01731317107" href="tel:+8801731317107" />
              </div>
              <div className="relative h-[220px] overflow-hidden rounded-[24px] sm:h-[269px]">
                <Image
                  src="/figma/about-page-img/faq-banner.png"
                  alt="Softvence product mockup"
                  fill
                  sizes="736px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="flex w-full max-w-[736px] flex-col gap-[7px]">
              {FAQS.map((item, index) => {
                const isOpen = open === index;
                return (
                  <Reveal key={item.question} delay={index * 70}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="w-full rounded-[5px] bg-white px-[20px] py-[24px] text-left"
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-[14px]">
                          <span className="flex size-[19px] shrink-0 items-center justify-center rounded-[10px] bg-[#0f1011] text-[12px] leading-[12px] text-white">
                            {index + 1}
                          </span>
                          <span className="text-[18px] leading-[23px] text-[#0f1011] sm:text-[20px]">
                            {item.question}
                          </span>
                        </span>
                        <img
                          src="/figma/about-page-img/faq-plus.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="shrink-0 transition-transform duration-300"
                          style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                        />
                      </span>
                      <span
                        aria-hidden={!isOpen}
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300",
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="mt-3 block pl-[33px] text-[16px] leading-[26px] text-body">
                            {item.answer}
                          </span>
                        </span>
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactMeta({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="min-w-[96px] tracking-[-0.29px]">
      <p className="text-[12px] leading-[14px] font-medium text-[#707070] uppercase underline">
        {label}
      </p>
      <p className="mt-[3px] text-[14px] leading-[20px] text-black">{value}</p>
    </a>
  );
}
