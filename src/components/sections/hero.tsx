"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { StarIcon } from "@/components/icons/star";

/** Letters of the SOFTVENCE wordmark, with the exact advance width from Figma. */
const WORDMARK = [
  { char: "S", width: 182 },
  { char: "O", width: 209 },
  { char: "F", width: 168 },
  { char: "T", width: 168 },
  { char: "V", width: 182 },
  { char: "N", width: 195 },
  { char: "C", width: 195 },
  { char: "E", width: 182 },
];

const WORDMARK_WIDTH = WORDMARK.reduce((total, letter) => total + letter.width, 0);

type HeroCardItem = {
  id: string;
  src: string;
  title: string;
  tags: string[];
  fit?: "object-cover" | "object-fill";
};

const HERO_DECK_ITEMS: HeroCardItem[] = [
  {
    id: "quantumix",
    src: "/figma/img/765-4899.jpg",
    title: "Quantumix",
    tags: ["Branding Identity", "Product Design"],
    fit: "object-cover",
  },
  {
    id: "card-right-1",
    src: "/figma/img/765-4897.jpg",
    title: "NeuraCore",
    tags: ["Visual Identity", "UI System"],
    fit: "object-fill",
  },
  {
    id: "card-right-2",
    src: "/figma/img/765-4895.jpg",
    title: "Orbitek Studio",
    tags: ["Landing Page", "Motion Art"],
    fit: "object-fill",
  },
  {
    id: "card-left-2",
    src: "/figma/img/765-4896.jpg",
    title: "Noventra Tech",
    tags: ["Product Design", "App Dev"],
    fit: "object-cover",
  },
  {
    id: "card-left-1",
    src: "/figma/img/765-4898.png",
    title: "CyberPulse",
    tags: ["Fintech Platform", "Web Experience"],
    fit: "object-fill",
  },
];

const OFFSETS = [-3, -2, -1, 0, 1, 2, 3];

/** One-shot entrance. Center lands first; side cards then leave from behind it. */
const INTRO_CLASS: Record<number, string> = {
  0: "hero-deck-in hero-deck-in-center",
  [-1]: "hero-deck-in hero-deck-in-l1",
  1: "hero-deck-in hero-deck-in-r1",
  [-2]: "hero-deck-in hero-deck-in-l2",
  2: "hero-deck-in hero-deck-in-r2",
};

const SLOT_STEP = 196;

type DeckSlot = {
  x: number;
  scale: number;
  opacity: number;
  brightness: number;
  z: number;
};

const SLOT_STOPS = [
  { d: 0, x: 0, scale: 1, opacity: 1, brightness: 1, z: 30 },
  { d: 1, x: 196, scale: 0.89, opacity: 1, brightness: 1, z: 20 },
  { d: 2, x: 298, scale: 0.83, opacity: 0.5, brightness: 1, z: 10 },
  { d: 3, x: 430, scale: 0.7, opacity: 0, brightness: 1, z: 0 },
];

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

/** Coverflow pose for a continuous slot. 0 is center; sign picks a side. */
function slotAt(offset: number): DeckSlot {
  const sign = offset < 0 ? -1 : 1;
  const distance = Math.min(Math.abs(offset), 3);
  let index = 0;
  while (index < SLOT_STOPS.length - 1 && distance > SLOT_STOPS[index + 1].d) index += 1;
  const start = SLOT_STOPS[index];
  const end = SLOT_STOPS[Math.min(index + 1, SLOT_STOPS.length - 1)];
  const span = end.d - start.d || 1;
  const t = (distance - start.d) / span;
  return {
    x: sign * lerp(start.x, end.x, t),
    scale: lerp(start.scale, end.scale, t),
    opacity: lerp(start.opacity, end.opacity, t),
    brightness: lerp(start.brightness, end.brightness, t),
    z: Math.round(lerp(start.z, end.z, t)),
  };
}

const avatars = [
  "/figma/img/765-4905.png",
  "/figma/img/765-4906.png",
  "/figma/img/765-4907.png",
];

/** Frame 1 on the landing page: a 28px column, 14px apart, left at x=100. */
const HERO_SOCIAL = [
  { label: "Facebook", href: "https://facebook.com", src: "/figma/890-6689.svg" },
  { label: "LinkedIn", href: "https://linkedin.com", src: "/figma/890-6692.svg" },
  { label: "Dribbble", href: "https://dribbble.com", src: "/figma/890-6697.svg" },
  { label: "Behance", href: "https://www.behance.net", src: "/figma/890-6700.svg" },
  { label: "Website", href: "/", src: "/figma/890-6706.svg" },
];

export function Hero() {
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPx, setDragPx] = useState(0);
  const [playIntro, setPlayIntro] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, moved: false });

  const total = HERO_DECK_ITEMS.length;

  const getActiveItem = useCallback(
    (vIndex: number) => {
      return HERO_DECK_ITEMS[((vIndex % total) + total) % total] || HERO_DECK_ITEMS[0];
    },
    [total]
  );

  const handleNext = useCallback(() => {
    setVirtualIndex((v) => v + 1);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPlayIntro(false);
      return;
    }
    const timer = window.setTimeout(() => setPlayIntro(false), 2800);
    return () => window.clearTimeout(timer);
  }, []);

  // Autoplay pauses while the pointer is over the deck or a drag is in progress.
  useEffect(() => {
    if (isHovered || isDragging || playIntro) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3600);
    return () => clearInterval(interval);
  }, [isHovered, isDragging, playIntro, handleNext]);

  const stageScale = () => {
    const stage = stageRef.current;
    if (!stage) return 1;
    const width = stage.getBoundingClientRect().width;
    return width > 0 ? width / stage.offsetWidth : 1;
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragState.current = { active: true, startX: event.clientX, moved: false };
    setIsHovered(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const dx = event.clientX - dragState.current.startX;
    if (Math.abs(dx) < 14) return;
    dragState.current.moved = true;
    setIsDragging(true);
    setDragPx(dx / stageScale());
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const moved = dragState.current.moved;
    dragState.current.active = false;
    const bounds = event.currentTarget.getBoundingClientRect();
    const inside =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;
    setIsHovered(inside);
    if (!moved) {
      setIsDragging(false);
      setDragPx(0);
      return;
    }
    const steps = Math.max(-3, Math.min(3, Math.round(-dragPx / SLOT_STEP)));
    const settled = dragPx + steps * SLOT_STEP;
    setVirtualIndex((value) => value + steps);
    setDragPx(settled);
    requestAnimationFrame(() => {
      setIsDragging(false);
      setDragPx(0);
    });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pt-[72px] pb-[72px] lg:pt-[110px] lg:pb-[110px] xl:pt-[150px] xl:pb-[150px]"
    >
      <div className="page-container">
        <div className="content-1480 flex flex-col gap-[28px] xl:gap-[45px]">
          {/* `pr-[0.03em]` cancels the trailing letter-space CSS adds after the
              last glyph; without it the centred line is 2.25px right of Figma. */}
          <h1 className="pr-[0.03em] text-center text-[clamp(56px,7.8125vw,150px)] leading-[1] font-normal tracking-[-0.03em] text-ink-2 uppercase">
            <span className="anim-word" style={{ animationDelay: "200ms" }}>
              We
            </span>{" "}
            <span className="anim-word text-brand" style={{ animationDelay: "491ms" }}>
              build
            </span>{" "}
            <span className="anim-word" style={{ animationDelay: "782ms" }}>
              the
            </span>{" "}
            <span className="anim-word text-brand" style={{ animationDelay: "1073ms" }}>
              next
            </span>
          </h1>

          {/* Media row: wordmark behind, 3D Coverflow Stacked Deck Carousel in front */}
          <div className="relative h-[220px] sm:h-[280px] md:h-[350px] lg:h-[420px] xl:h-[470px]">
            <div
              ref={stageRef}
              className="absolute top-0 left-1/2 w-[1920px] -translate-x-1/2 origin-top scale-[0.42] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.86] xl:scale-100"
            >
              <div className="relative h-[470px] w-[1920px]">
                {/* Wordmark behind */}
                <div className="absolute top-[101px] left-[220px] flex h-[245px] w-[1481px] pointer-events-none select-none">
                  {WORDMARK.map((letter, index) => (
                    <span
                      key={`${letter.char}-${index}`}
                      style={{
                        width: `${(letter.width / WORDMARK_WIDTH) * 100}%`,
                        animationDelay: `${500 + index * 90}ms`,
                      }}
                      className="anim-letter flex h-full items-center justify-center text-[242.04px] leading-[224.05px] font-bold text-[#f1f1f1] uppercase"
                    >
                      {letter.char}
                    </span>
                  ))}
                </div>

                {/* 3D Coverflow Stacked Deck Container */}
                <div
                  className={`absolute inset-0 touch-none select-none ${isDragging ? "cursor-grabbing" : ""}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => {
                    if (!dragState.current.active) setIsHovered(false);
                  }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={finishDrag}
                  onPointerCancel={finishDrag}
                  onDragStart={(event) => event.preventDefault()}
                >
                  {OFFSETS.map((k) => {
                    const vIndex = virtualIndex + k;
                    const item = getActiveItem(vIndex);

                    const pose = slotAt(k + dragPx / SLOT_STEP);
                    const focused = Math.abs(k + dragPx / SLOT_STEP) < 0.5;
                    const introClass =
                      playIntro && virtualIndex === 0 ? INTRO_CLASS[k] : undefined;

                    return (
                      <div
                        key={vIndex}
                        onClick={() => {
                          if (dragState.current.moved || k === 0) return;
                          setVirtualIndex((value) => value + k);
                        }}
                        style={{
                          width: "476px",
                          height: "456px",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) translateX(${pose.x}px) scale(${pose.scale}) translateZ(0)`,
                          zIndex: pose.z,
                          opacity: pose.opacity,
                          filter: `brightness(${pose.brightness})`,
                          pointerEvents: pose.opacity < 0.2 ? "none" : "auto",
                          transition: isDragging
                            ? "none"
                            : "transform 500ms cubic-bezier(0.25, 1, 0.5, 1), opacity 500ms cubic-bezier(0.25, 1, 0.5, 1), filter 500ms cubic-bezier(0.25, 1, 0.5, 1)",
                        }}
                        className="origin-center cursor-pointer will-change-transform"
                      >
                        <div className={`h-full w-full ${introClass ?? ""}`}>
                          <div className="group relative h-full w-full overflow-hidden rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                            <Image
                              src={item.src}
                              alt={item.title}
                              fill
                              sizes="476px"
                              priority={Math.abs(k) <= 2}
                              draggable={false}
                              className={item.fit ?? "object-cover"}
                            />

                            {/* Hover tint overlays on center card */}
                            <div
                              className={`pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-300 ${focused ? "opacity-0 group-hover:opacity-100" : "opacity-0"
                                }`}
                            />
                            <div
                              className={`pointer-events-none absolute inset-0 bg-brand/10 backdrop-blur-[2px] transition-opacity duration-300 ${focused ? "opacity-0 group-hover:opacity-100" : "opacity-0"
                                }`}
                            />

                            {/* Conditional Center Card Content: Title & Tags */}
                            <div
                              className={`absolute top-[366px] left-[23px] flex w-[268px] flex-col gap-[5px] transition-all duration-300 ${focused
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 translate-y-3 pointer-events-none"
                                }`}
                            >
                              <p className="text-[24.67px] leading-[29.6px] font-bold tracking-[-0.04em] text-white drop-shadow-md">
                                {item.title}
                              </p>
                              <div className="flex gap-[8px] text-[17.27px] leading-[25.9px] tracking-[-0.01em] text-white/90 drop-shadow-sm">
                                {item.tags.map((tag, tagIdx) => (
                                  <span key={tagIdx}>{tag}</span>
                                ))}
                              </div>
                            </div>

                            {/* Top-Right Arrow badge for center card */}
                            {focused && (
                              <span className="absolute top-[-61px] right-[27px] flex size-14 items-center justify-center rounded-full bg-white text-brand shadow-sm transition-all duration-300 ease-out group-hover:top-[27px]">
                                <ArrowUpRight className="size-[15px]" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Frame 1. The stack's bottom edge sits on the card center.
                On the 1920 frame its left edge is 100px; below that it stays
                16px inside the viewport. */}
            <nav
              aria-label="Social"
              className="absolute bottom-1/2 left-[max(calc(50%-50vw+16px),calc(50%-860px))] z-40 hidden w-7 flex-col gap-[14px] xl:flex"
            >
              {HERO_SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={item.label}
                  className="block h-7 w-7 transition-opacity duration-200 hover:opacity-60"
                >
                  <img src={item.src} alt="" width={28} height={28} className="h-7 w-7" />
                </a>
              ))}
            </nav>
          </div>

          {/* Tagline + social proof */}
          <div className="relative h-[133px]">
            <p className="relative -top-px mx-auto w-[560px] max-w-full text-center text-[24px] leading-[33.6px] font-medium text-ink-2">
              <span className="anim-line" style={{ animationDelay: "1700ms" }}>
                The Softvence Creative Agency developing
              </span>
              <span className="anim-line" style={{ animationDelay: "2010ms" }}>
                the future of commerce
              </span>
            </p>

            <div className="relative mx-auto mt-[24px] h-[42px] w-[336px]">
              <div className="absolute top-[3px] left-0 h-9 w-[92px]">
                {avatars.map((src, index) => (
                  <span
                    key={src}
                    style={{
                      left: index * 28,
                      zIndex: index + 1,
                      animationDelay: `${2200 + index * 100}ms`,
                    }}
                    className="anim-pop absolute top-0 size-9 overflow-hidden"
                  >
                    <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                  </span>
                ))}
              </div>

              <p
                className="anim-line anim-line-short absolute top-0 left-[104px] w-[97px] text-[14px] leading-[21px] text-ink-2"
                style={{ animationDelay: "2300ms" }}
              >
                Loved by 500+
                <br />
                Founders
              </p>

              <span className="anim-pop absolute top-[8px] left-[232px]" style={{ animationDelay: "2400ms" }}>
                <Image src="/figma/img/765-4909.png" alt="Clutch" width={24} height={27} />
              </span>

              <p
                className="anim-line anim-line-short absolute top-[3px] left-[268px] text-[13px] leading-[21px] text-ink-2"
                style={{ animationDelay: "2450ms" }}
              >
                13 Reviews
              </p>

              <div className="absolute top-[26px] left-[268px] flex gap-[2px] text-brand">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className="anim-star"
                    style={{ animationDelay: `${2700 + index * 90}ms` }}
                  >
                    <StarIcon className="size-3" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
