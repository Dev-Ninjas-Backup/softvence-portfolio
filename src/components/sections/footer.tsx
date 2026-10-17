"use client";

import Image from "next/image";
import Link from "next/link";

type FooterPill = {
  label: string;
  href: string;
  rotation: string;
};

const PILLS: FooterPill[] = [
  { label: "UI/UX Design", href: "#services", rotation: "-rotate-[21.6deg] hover:-rotate-12" },
  { label: "AI Development", href: "#services", rotation: "rotate-[15deg] hover:rotate-[6deg]" },
  { label: "Instagram", href: "https://instagram.com", rotation: "-rotate-[12.5deg] hover:rotate-0" },
  { label: "WordPress", href: "#services", rotation: "rotate-[11.7deg] hover:rotate-6" },
  { label: "Shopify", href: "#services", rotation: "-rotate-[30deg] hover:-rotate-12" },
  { label: "App Development ", href: "#services", rotation: "rotate-[15deg] hover:rotate-0" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden rounded-t-[30px] bg-[#161616] text-white"
    >
      {/* High fidelity ambient glow backdrop exported directly from Figma */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/figma/765-6160.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-95"
        />
        {/* Soft supplementary radial gradient for seamless transition */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 65%, rgba(0, 171, 12, 0.12) 0%, rgba(22, 22, 22, 0.4) 60%, rgba(22, 22, 22, 0.85) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col justify-between px-6 pt-[100px] sm:px-12 lg:px-[140px] lg:pt-[144px] 2xl:px-[295px]">
        <div className="flex flex-col gap-[52px]">
          {/* Top Row: Social Icons (Left) + Contact Details (Right) */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Social Circle Links */}
            <div className="flex items-center gap-[12px]">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="group flex size-[52px] items-center justify-center rounded-full border border-white/16 bg-white/[0.08] backdrop-blur-[15px] transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-brand/20"
              >
                <img src="/figma/765-6163.svg" alt="" className="size-full" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="group flex size-[52px] items-center justify-center rounded-full border border-white/16 bg-white/[0.08] backdrop-blur-[15px] transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-brand/20"
              >
                <img src="/figma/765-6167.svg" alt="" className="size-full" />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Dribbble"
                className="group flex size-[52px] items-center justify-center rounded-full border border-white/16 bg-white/[0.08] backdrop-blur-[15px] transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-brand/20"
              >
                <img src="/figma/765-6173.svg" alt="" className="size-full" />
              </a>
            </div>

            {/* Contact Info (Email, Phone, Location) with 1px dividers matching Figma */}
            <div className="flex flex-wrap items-center">
              {/* Email */}
              <div className="flex flex-col gap-[4px] pr-8 sm:pr-[52px]">
                <span className="text-[15px] font-medium leading-[24px] text-white/70">
                  Email
                </span>
                <a
                  href="mailto:Softvence@gmail.com"
                  className="group relative inline-flex flex-col text-[20px] font-semibold leading-[30px] text-white transition-colors hover:text-[#3FD14B]"
                >
                  <span>Softvence@gmail.com</span>
                  <span className="h-[1.5px] w-full scale-x-0 bg-[#3FD14B] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-[4px] border-l border-white/16 px-8 sm:px-[52px]">
                <span className="text-[15px] font-medium leading-[24px] text-white/70">
                  Phone number
                </span>
                <a
                  href="tel:+8801731317107"
                  className="group relative inline-flex flex-col text-[20px] font-semibold leading-[30px] text-white transition-colors hover:text-[#3FD14B]"
                >
                  <span>+8801731317107</span>
                  <span className="h-[1.5px] w-full scale-x-0 bg-[#3FD14B] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-[4px] border-l border-white/16 pl-8 sm:pl-[52px]">
                <span className="text-[15px] font-medium leading-[24px] text-white/70">
                  Location
                </span>
                <span className="text-[20px] font-semibold leading-[30px] text-white">
                  Ambon. Complex
                </span>
              </div>
            </div>
          </div>

          {/* Frosted Glass Middle Bar (Back to Top + Copyright) */}
          <div className="flex min-h-[88px] w-full flex-col items-center justify-between gap-6 rounded-[20px] border border-white/16 bg-white/[0.08] px-[32px] py-[24px] backdrop-blur-[15px] sm:flex-row sm:px-[40px]">
            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex cursor-pointer items-center gap-[14px] text-[16px] font-medium leading-[24px] text-white transition-colors hover:text-[#3FD14B]"
            >
              <span>Back to top</span>
              <span className="flex size-[36px] items-center justify-center rounded-full border border-white/16 bg-white/[0.05] transition-all duration-300 group-hover:border-[#3FD14B] group-hover:bg-[#00AB0C]/20">
                <span className="block size-[14px] transition-transform duration-300 group-hover:-translate-y-0.5">
                  <img src="/figma/765-6186.svg" alt="" className="size-full" />
                </span>
              </span>
            </button>

            {/* Copyright text matching Figma typography & #3FD14B brand links */}
            <div className="text-center text-[15px] font-medium leading-[24px] text-white/90 sm:text-right">
              <span>© 2026 Copyright - </span>
              <a
                href="https://twitter.com/uxshakil"
                target="_blank"
                rel="noreferrer"
                className="text-[#3FD14B] underline decoration-[#3FD14B] transition-opacity hover:opacity-80"
              >
                uxshakil
              </a>
              <span> | Designed by &quot;</span>
              <a
                href="https://twitter.com/uxshakil"
                target="_blank"
                rel="noreferrer"
                className="text-[#3FD14B] underline decoration-[#3FD14B] transition-opacity hover:opacity-80"
              >
                uxshakil
              </a>
              <span>&quot; | </span>
              <Link
                href="/license"
                className="text-[#3FD14B] underline decoration-[#3FD14B] transition-opacity hover:opacity-80"
              >
                License
              </Link>
              <span> - Powered by </span>
              <Link
                href="/"
                className="text-[#3FD14B] underline decoration-[#3FD14B] transition-opacity hover:opacity-80"
              >
                softvence
              </Link>
            </div>
          </div>
        </div>

        {/* Stage: Floating Interactive Service Pills above Big Wordmark */}
        <div className="relative mt-[56px] h-[330px] w-full overflow-hidden">
          {/* Big SOFTVENCE Wordmark with Green 'T' and Figma gradient */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 w-full -translate-x-1/2 text-center select-none">
            <span
              className="inline-block font-manrope text-[clamp(72px,13.5vw,242px)] font-bold tracking-[-0.01em] uppercase leading-[0.92]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 1) 25%, rgba(139, 139, 139, 0.6) 69%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SOF
              <span
                style={{
                  WebkitTextFillColor: "#00AB0C",
                  color: "#00AB0C",
                }}
              >
                T
              </span>
              VENCE
            </span>
          </div>

          {/* Dynamic Floating Glass Pills matching exact Figma chip titles */}
          <div className="relative z-10 mx-auto flex max-w-[1480px] flex-wrap items-center justify-center gap-3 pt-3 sm:gap-5 sm:pt-6 lg:gap-7">
            {PILLS.map((pill, i) => (
              <a
                key={`${pill.label}-${i}`}
                href={pill.href}
                className={`inline-flex items-center justify-center rounded-[60px] border border-white/16 bg-white/[0.08] px-[36px] py-[18px] text-[18px] font-medium leading-[28px] text-white shadow-lg backdrop-blur-[15px] transition-all duration-300 hover:scale-105 hover:border-[#3FD14B] hover:bg-[#00AB0C]/20 hover:text-[#3FD14B] sm:px-[44px] sm:py-[23px] sm:text-[22px] sm:leading-[32px] ${pill.rotation}`}
              >
                {pill.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
