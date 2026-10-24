"use client";

import Link from "next/link";
import { Globe, type GlobeMarker } from "@/components/ui/globe";

const GLOBE_MARKERS: GlobeMarker[] = [
  { location: [23.8103, 90.4125], size: 0.06 },
  { location: [51.5074, -0.1278], size: 0.045 },
  { location: [40.7128, -74.006], size: 0.045 },
  { location: [25.2048, 55.2708], size: 0.04 },
  { location: [1.3521, 103.8198], size: 0.04 },
];

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
  { label: "App Development", href: "#services", rotation: "rotate-[15deg] hover:rotate-0" },
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
      {/* Pure CSS atmospheric aurora lighting matching Figma ambient glow without static image duplication */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="pointer-events-auto absolute top-[-8%] left-1/2 h-[920px] w-[min(1040px,92vw)] -translate-x-1/2">
          <Globe
            className="h-full min-h-0"
            phi={1.7}
            theta={0.28}
            dark={1}
            scale={1.05}
            diffuse={1.7}
            mapSamples={16000}
            mapBrightness={8}
            baseColor="#07140c"
            markerColor="#5dff62"
            glowColor="#0e4d1c"
            markers={GLOBE_MARKERS}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.004}
          />
        </div>

        {/* Deep emerald radiant core glow */}
        <div className="absolute -top-[10%] left-1/2 h-[700px] w-[1400px] -translate-x-1/2">
          <div
            className="drift-a h-full w-full rounded-[100%]"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0, 171, 12, 0.08) 0%, rgba(0, 171, 12, 0.02) 55%, transparent 75%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        {/* Ambient bottom-left & bottom-right green wisps */}
        <div className="absolute -bottom-[20%] -left-[10%] h-[550px] w-[750px]">
          <div
            className="drift-b h-full w-full rounded-[100%]"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 171, 12, 0.18) 0%, rgba(0, 171, 12, 0.03) 60%, transparent 80%)",
              filter: "blur(60px)",
            }}
          />
        </div>
        <div className="absolute -bottom-[20%] -right-[10%] h-[550px] w-[750px]">
          <div
            className="drift-streak h-full w-full rounded-[100%]"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 171, 12, 0.18) 0%, rgba(0, 171, 12, 0.03) 60%, transparent 80%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Subtle center stage backdrop glow behind SOFTVENCE */}
        <div
          className="absolute bottom-0 left-1/2 h-[350px] w-[1100px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0, 171, 12, 0.14) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1920px] flex-col justify-between px-6 pt-[100px] sm:px-12 lg:px-[140px] lg:pt-[144px] 2xl:px-[295px]">
        <div className="flex flex-col gap-[52px]">
          {/* Top Row: Social Icons (Left) + Contact Details (Right) */}
          <div className="pointer-events-auto flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
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
          <div className="pointer-events-auto flex min-h-[88px] w-full flex-col items-center justify-between gap-6 rounded-[20px] border border-white/16 bg-white/[0.08] px-[32px] py-[24px] backdrop-blur-[15px] sm:flex-row sm:px-[40px]">
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

        {/* Stage: Floating Interactive Service Pills above Big Wordmark.
            The stage is full-bleed and tall enough that the wordmark's ink
            is not clipped by the footer's overflow. */}
        <div
          className="relative mt-2 w-[calc(100%+48px)] -mx-6 overflow-hidden sm:w-[calc(100%+96px)] sm:-mx-12 lg:w-[calc(100%+280px)] lg:-mx-[140px] 2xl:w-[calc(100%+590px)] 2xl:-mx-[295px]"
          style={{ height: "calc(378px + 0.32 * clamp(72px, 13.5vw, 242px))" }}
        >
          {/* Big SOFTVENCE Wordmark with Green 'T' and Figma gradient */}
          <div
            className="pointer-events-none absolute left-1/2 w-full -translate-x-1/2 text-center text-[clamp(72px,13.5vw,242px)] select-none"
            style={{ bottom: "0.28em" }}
          >
            <span
              className="inline-block font-manrope leading-[0.92] font-bold tracking-[-0.01em] whitespace-nowrap uppercase"
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
          <div className="pointer-events-auto relative z-10 flex w-full flex-nowrap items-center justify-center gap-x-[clamp(8px,1vw,18px)] pt-[60px] sm:pt-[72px]">
            {PILLS.map((pill, i) => (
              <span
                key={`${pill.label}-${i}`}
                className="chip-bob inline-flex shrink-0"
                style={{ animationDelay: `${i * 0.35}s` }}
              >
                <a
                  href={pill.href}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-[60px] border border-white/16 bg-white/[0.08] px-[clamp(16px,1.7vw,32px)] py-[clamp(14px,1.2vw,22px)] text-[clamp(14px,1.15vw,22px)] font-medium leading-none text-white shadow-lg backdrop-blur-[15px] transition-all duration-300 hover:scale-105 hover:border-[#3FD14B] hover:bg-[#00AB0C]/20 hover:text-[#3FD14B] ${pill.rotation}`}
                >
                  {pill.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
