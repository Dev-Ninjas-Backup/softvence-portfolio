"use client";

import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { useCtaModal } from "@/components/ui/cta-modal";

type CtaButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  /** Solid green button instead of the outlined default. */
  variant?: "outline" | "solid";
  /** Open the CTA modal overlay instead of navigating. */
  overlay?: boolean;
  /** Gentle arrow tilt from the About hero motion (Figma 792:2324). */
  arrowMotion?: boolean;
};

/**
 * `CTA Button Component` from the design: an outlined green pill with a
 * circular green arrow badge sitting 2px to its right.
 */
export function CtaButton({
  children,
  href = "#",
  className = "",
  variant = "outline",
  overlay = false,
  arrowMotion = false,
}: CtaButtonProps) {
  const { open } = useCtaModal();
  const solid = variant === "solid";
  const classes = `group inline-flex shrink-0 cursor-pointer items-center gap-[2px] ${className}`;

  const body = (
    <>
      <span
        className={`flex h-14 items-center justify-center rounded-full border-[1.5px] px-8 text-[16px] leading-6 font-bold transition-colors duration-300 ${
          solid
            ? "border-brand bg-brand text-white group-hover:bg-brand-deep"
            : "border-brand text-brand group-hover:bg-brand group-hover:text-white"
        }`}
      >
        {children}
      </span>
      <span className="flex size-14 items-center justify-center rounded-full bg-brand text-white transition-colors duration-300 group-hover:bg-brand-deep">
        <span className={arrowMotion ? "about-cta-arrow inline-flex" : "inline-flex"}>
          <ArrowUpRight className="size-[15px] transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
        </span>
      </span>
    </>
  );

  if (overlay) {
    return (
      <button type="button" onClick={open} className={`border-0 bg-transparent p-0 font-inherit ${classes}`}>
        {body}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
    >
      {body}
    </Link>
  );
}
