"use client";

import Link from "next/link";
import { useState } from "react";
import { CtaButton } from "@/components/ui/cta-button";

const NAV_ITEMS = [
  { label: "Home", href: "#home", active: true },
  { label: "About", href: "#about", active: false },
  { label: "Service", href: "#services", active: false },
  { label: "Case Study", href: "#case-study", active: false },
  { label: "Project", href: "#projects", active: false },
  { label: "Career", href: "#career", active: false },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-[30px] z-50">
      <div className="page-container">
        <div className="content-1480 mx-auto flex h-[83px] items-center justify-between rounded-[42px] bg-white/40 px-4 backdrop-blur-[18px]">
          {/* Brand — Figma: 174x49 box at x16, ink 172x28 (Manrope 500 37px/-0.48).
              Per-character fills: "Sof" #242424, "t" #02830b, "vence" #242424. */}
          <Link
            href="#home"
            className="text-[37px] leading-[49px] font-medium tracking-[-0.48px] text-[#242424]"
          >
            Sof<span className="text-[#02830b]">t</span>vence
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center rounded-full bg-[#9f9f9f]/8 xl:flex">
            {NAV_ITEMS.map((item) =>
              item.active ? (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current="page"
                  className="flex h-14 items-center justify-center rounded-full bg-brand-deep px-8 text-[16px] leading-6 font-medium text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex h-14 items-center justify-center rounded-full px-8 text-[16px] leading-6 text-ink-2 transition-colors duration-200 hover:text-brand"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <CtaButton href="#contact">Let&apos;s Collaborate</CtaButton>
            </div>

            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="flex size-14 items-center justify-center rounded-full border-[1.5px] border-brand text-brand xl:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                {open ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open ? (
          <nav className="content-1480 mt-3 flex flex-col gap-1 rounded-[28px] bg-white/90 p-3 backdrop-blur-xl xl:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex h-12 items-center rounded-full px-6 text-[16px] leading-6 ${
                  item.active
                    ? "bg-brand-deep font-medium text-white"
                    : "text-ink-2"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
