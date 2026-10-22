"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RisePart = {
  text: string;
  className?: string;
};

/** Character cascade from the services heading prototype: up from below, staggered left to right. */
export function RiseText({
  parts,
  className,
}: {
  parts: RisePart[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [play, setPlay] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    if (!node) return;

    setArmed(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  let index = 0;

  return (
    <h2 ref={ref} className={className}>
      {parts.map((part, partIndex) =>
        Array.from(part.text).map((char, charIndex) => {
          const delay = index * 12;
          index += 1;
          return (
            <span
              key={`${partIndex}-${charIndex}`}
              className={cn("rise-char", armed && "is-armed", part.className)}
              style={
                armed
                  ? {
                      animationDelay: `${delay}ms`,
                      animationPlayState: play ? "running" : "paused",
                    }
                  : undefined
              }
            >
              {char}
            </span>
          );
        }),
      )}
    </h2>
  );
}
