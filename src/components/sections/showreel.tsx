"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Nine project cards, in the order Figma renders them. */
const CARD_IMAGES = [
  "/figma/765-6254.png",
  "/figma/765-6268.png",
  "/figma/765-6282.png",
  "/figma/765-6296.png",
  "/figma/765-6310.png",
  "/figma/765-6324.png",
  "/figma/765-6338.png",
  "/figma/765-6352.png",
  "/figma/765-6366.png",
];

const SPECS = [
  { label: "Price range", value: "$600-$800", width: "w-auto" },
  { label: "Project duration", value: "7-30 days", width: "w-auto" },
  {
    label: "Industry",
    value: "Financial & Business Services",
    width: "w-[221px]",
  },
];

function ProjectCard({ src }: { src: string }) {
  return (
    <article className="flex h-[610px] w-[581px] shrink-0 flex-col gap-[20px] rounded-[36px] bg-white p-[12px]">
      <div className="relative h-[370px] w-[557px] overflow-hidden rounded-[32px]">
        <Image src={src} alt="" fill sizes="557px" className="object-cover" />
      </div>
      <div className="flex flex-col items-center justify-center gap-[12px] px-[20px] py-[12px]">
        <p className="w-[517px] text-[22px] leading-[30px] font-semibold text-ink">
          Garage Door Repair Platform
        </p>
        <div className="flex gap-[32px]">
          {SPECS.map((spec) => (
            <div key={spec.label} className={`flex flex-col gap-[8px] ${spec.width}`}>
              <p className="text-[12px] leading-[16.4px] font-medium tracking-[0.06em] text-muted-2 uppercase">
                {spec.label}
              </p>
              <p className="text-[16px] leading-[21.9px] font-semibold text-ink">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

const CLOSED = { w: 421, h: 118 };
const CLOSED_COMPACT = { w: 168, h: 64 };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value: number) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function showreelFrame(viewportWidth: number, viewportHeight: number, progress: number) {
  const compact = viewportWidth < 1024;
  const closed = compact ? CLOSED_COMPACT : CLOSED;
  const openWidth = viewportWidth;
  let openHeight = openWidth * (1080 / 1920);
  const maxHeight = viewportHeight * 0.86;
  if (openHeight > maxHeight) openHeight = maxHeight;
  const t = smoothstep(progress);
  const height = closed.h + (openHeight - closed.h) * t;
  const centered = (viewportHeight - height) / 2;
  // Closed title stays centered. As the frame opens it settles down so a
  // medium gap, owned by the card row, is all that remains underneath.
  const pad = centered + (viewportHeight - height - centered) * t;
  return {
    width: closed.w + (openWidth - closed.w) * t,
    height,
    pad,
    wordOpacity: 1 - smoothstep(clamp((t - 0.32) / 0.38, 0, 1)),
  };
}

function pageGutter(viewportWidth: number) {
  if (viewportWidth >= 1920) return (viewportWidth - 1920) / 2 + 220;
  if (viewportWidth >= 1024) return 40;
  return 20;
}

const CARD_HEIGHT = 610;

/** Split the free viewport around the cards: a bit more above, medium below. */
function cardInsets(viewportHeight: number) {
  const free = Math.max(0, viewportHeight - CARD_HEIGHT);
  const below = Math.round(Math.min(128, Math.max(80, free * 0.4)));
  const above = Math.max(0, free - below);
  return { above, below };
}

function ProjectStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [motionless, setMotionless] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const row = rowRef.current;
    if (!track || !stage || !row) return;

    const place = () => {
      const { above, below } = cardInsets(window.innerHeight);
      stage.style.paddingTop = `${above}px`;
      stage.style.paddingBottom = `${below}px`;
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const gutter = `${pageGutter(document.documentElement.clientWidth)}px`;
      row.style.paddingLeft = gutter;
      row.style.paddingRight = gutter;
      place();
      setMotionless(true);
      return;
    }

    let raf = 0;
    let lastSpan = -1;

    const update = () => {
      const viewWidth = document.documentElement.clientWidth;
      const gutter = `${pageGutter(viewWidth)}px`;
      if (row.style.paddingLeft !== gutter) {
        row.style.paddingLeft = gutter;
        row.style.paddingRight = gutter;
      }
      const maxShift = Math.max(0, row.scrollWidth - viewWidth);
      const span = window.innerHeight + maxShift;
      if (span !== lastSpan) {
        track.style.height = `${span}px`;
        lastSpan = span;
      }
      const progress = maxShift === 0 ? 0 : clamp(-track.getBoundingClientRect().top / maxShift, 0, 1);
      row.style.transform = `translate3d(${-maxShift * progress}px,0,0)`;
      place();
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={trackRef} className="relative">
      <div
        ref={stageRef}
        className={
          motionless
            ? "overflow-x-auto"
            : "sticky top-0 flex h-[100svh] items-start overflow-x-clip"
        }
      >
        <div ref={rowRef} className="flex w-max gap-[32px] will-change-transform">
          {CARD_IMAGES.map((src) => (
            <ProjectCard key={src} src={src} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ShowreelTitle() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frame, setFrame] = useState<{
    width: number;
    height: number;
    pad: number;
    wordOpacity: number;
  } | null>(null);
  const [motionless, setMotionless] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const apply = (progress: number) => {
      setFrame(
        showreelFrame(document.documentElement.clientWidth, window.innerHeight, progress),
      );
      if (reduce) return;
      if (progress > 0.02) {
        if (video.paused) void video.play().catch(() => undefined);
      } else if (!video.paused) {
        video.pause();
      }
    };

    if (reduce) {
      setMotionless(true);
      apply(1);
      return;
    }

    const update = () => {
      const rect = track.getBoundingClientRect();
      const travel = track.offsetHeight - window.innerHeight;
      const lead = window.innerHeight * 0.35;
      const progress = travel <= 0 ? 1 : clamp((-rect.top + lead) / (travel + lead), 0, 1);
      apply(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const wordStyle = frame ? { opacity: frame.wordOpacity } : undefined;
  const mediaStyle = frame
    ? { width: frame.width, height: frame.height }
    : undefined;

  return (
    <div
      ref={trackRef}
      className={motionless ? "relative w-full" : "relative h-[165vh] w-full lg:h-[190vh]"}
    >
      <div
        className={
          motionless
            ? "flex w-full items-center overflow-x-clip pt-16 pb-4"
            : `sticky top-0 flex h-[100svh] w-full overflow-x-clip ${frame ? "items-start" : "items-center"}`
        }
        style={frame && !motionless ? { paddingTop: frame.pad } : undefined}
      >
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
          <span
            style={wordStyle}
            className="justify-self-end pr-4 text-[32px] leading-none font-medium whitespace-nowrap text-black uppercase sm:text-[56px] lg:pr-10 lg:text-[80px] lg:leading-[109px]"
          >
            2026
          </span>
          <div
            style={mediaStyle}
            className="relative z-10 h-[64px] w-[168px] overflow-hidden rounded-[20px] lg:h-[118px] lg:w-[421px]"
          >
            <video
              ref={videoRef}
              src="/figma/showreel.mp4"
              poster="/figma/showreel-welcome.png"
              muted
              playsInline
              loop
              preload="metadata"
              aria-label="Softvence showreel"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          <span
            style={wordStyle}
            className="justify-self-start pl-4 text-[32px] leading-none font-medium whitespace-nowrap text-black uppercase sm:text-[56px] lg:pl-10 lg:text-[80px] lg:leading-[109px]"
          >
            Showreels
          </span>
        </div>
      </div>
    </div>
  );
}

export function Showreel() {
  return (
    <section id="projects" className="bg-surface pb-16">
      <div className="flex flex-col">
        <ShowreelTitle />
        <ProjectStrip />
      </div>
    </section>
  );
}
