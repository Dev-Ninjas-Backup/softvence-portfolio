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
  return {
    width: closed.w + (openWidth - closed.w) * t,
    height: closed.h + (openHeight - closed.h) * t,
    wordOpacity: 1 - smoothstep(clamp((t - 0.32) / 0.38, 0, 1)),
  };
}

function ShowreelTitle() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frame, setFrame] = useState<{
    width: number;
    height: number;
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
            ? "flex w-full items-center overflow-x-clip py-16"
            : "sticky top-0 flex h-[100svh] w-full items-center overflow-x-clip"
        }
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
    <section id="projects" className="bg-surface pb-[140px]">
      <div className="flex flex-col">
        <ShowreelTitle />

        {/* Project cards strip */}
        <div className="relative mt-[88px] w-full overflow-hidden">
          <div className="page-container">
            <div className="flex w-max gap-[32px]">
              {CARD_IMAGES.map((src) => (
                <ProjectCard key={src} src={src} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
