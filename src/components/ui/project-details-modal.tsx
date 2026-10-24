"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SCOPE = [
  "Website design and development",
  "UX/UI optimization",
  "E-commerce integration",
  "Content creation and branding",
] as const;

export function ProjectDetailsModal({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[80] overflow-y-auto">
      <div className="relative flex min-h-full items-start justify-center px-3 py-4 sm:px-6 sm:py-8">
        <button
          type="button"
          aria-label="Close project details"
          className="absolute inset-0 bg-[#101513]/72"
          onClick={onClose}
        />
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="relative z-10 w-full max-w-[1503px] rounded-t-[20px] bg-white shadow-[0_24px_80px_rgba(16,21,19,0.28)] outline-none"
        >
          <div className="sticky top-0 z-20 flex items-center justify-between rounded-t-[20px] bg-[#f5f5f5] px-[29px] py-4">
            <div className="flex w-[53px] items-center gap-1" aria-hidden="true">
              <span className="size-[15px] rounded-full bg-[#ee6a5e]" />
              <span className="size-[15px] rounded-full bg-[#f4be4e]" />
              <span className="size-[15px] rounded-full bg-[#5fc453]" />
            </div>
            <div className="rounded-[6px] bg-white px-2.5 py-2.5 text-[12px] leading-[30px] font-medium tracking-normal text-[#3a3a3a] uppercase">
              Project Details
            </div>
            <button type="button" aria-label="Close" onClick={onClose} className="size-6 cursor-pointer">
              <img src="/figma/project-details/close.svg" alt="" width={24} height={24} />
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-[1401px] flex-col gap-10 px-5 pt-6 pb-12 sm:px-8 lg:gap-[59px] lg:px-0 lg:pt-[30px] lg:pb-[83px]">
            <div className="flex flex-col gap-8 lg:gap-10">
              <h2
                id={titleId}
                className="text-[32px] leading-[1.2] font-medium text-black capitalize sm:text-[40px] lg:text-[48px] lg:leading-[60px]"
              >
                E-Commencers website and Development
              </h2>
              <div className="relative h-[240px] overflow-hidden rounded-[28px] sm:h-[460px] lg:h-[777px] lg:rounded-[40px]">
                <Image
                  src="/figma/project-details/banner.png"
                  alt="E-Commencers website shown on a laptop"
                  fill
                  sizes="(max-width: 1503px) 100vw, 1401px"
                  className="object-cover object-[center_42%]"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col gap-[23px]">
              <h3 className="text-[32px] leading-[1.2] font-medium text-[#0c0407] sm:text-[40px] lg:text-[49px] lg:leading-[61px]">
                Project Overview
              </h3>
              <p className="text-left text-[17px] leading-[1.5] text-[#4c4c4c] sm:text-[20px] sm:leading-[30px] lg:text-justify">
                Discharge of stitching even the fully which be to not rome; Alone, the of go. Of years, mental as shown
                down stiff copy of he countries are emphasis called attribute head because of understand sight as it
                long labour, would anyone paint, approach thoroughly, to example
              </p>
              <p className="text-left text-[17px] leading-[1.5] text-[#4c4c4c] sm:text-[20px] sm:leading-[30px] lg:text-justify">
                Period, to his millions she to the vices the of you bread at he satisfaction dressing irregular harmonic
                years human my lie looked from aged was by which plot however up that while person, week the star
                different fur I to for it whose aside, right his honour; Have arduous would films so at power
                decisions, a and each dense, the it secure dissolute you a elucidates gradually and the then, and
                employed hand. Was a seemed for far only an links by checks, writer of, even that a peacefully
                absolutely was abandon gradually it his into to be that.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-[15px] lg:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] sm:aspect-[693/798]">
                <Image
                  src="/figma/project-details/gallery-left.png"
                  alt="Home rental website on a laptop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 693px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] sm:aspect-[693/798]">
                <Image
                  src="/figma/project-details/gallery-right.png"
                  alt="Phone device mockup"
                  fill
                  sizes="(max-width: 1024px) 100vw, 693px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[30px] lg:col-span-2 lg:aspect-[1401/798]">
                <Image
                  src="/figma/project-details/gallery-wide.png"
                  alt="Project interface detail"
                  fill
                  sizes="(max-width: 1503px) 100vw, 1401px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-7">
              <div className="flex max-w-[978px] flex-col gap-5">
                <h3 className="text-[32px] leading-[1.2] font-medium text-[#0c0407] sm:text-[40px] lg:text-[49px] lg:leading-[61px]">
                  Scope of Work
                </h3>
                <p className="text-[17px] leading-[1.5] text-[#4c4c4c] sm:text-[20px] sm:leading-[30px]">
                  Outline the services provided, such as strategy, design, development, branding, or marketing.
                  Example:
                </p>
                <ul className="list-disc space-y-[15px] pl-8 text-[18px] leading-[38px] font-bold text-[#313131] sm:text-[20px]">
                  {SCOPE.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="text-[32px] leading-[1.2] font-medium text-[#0c0407] sm:text-[40px] lg:text-[49px] lg:leading-[61px]">
                  Final Outcome
                </h3>
                <p className="text-left text-[17px] leading-[1.7] text-[#4c4c4c] sm:text-[21px] sm:leading-[41px] lg:text-justify">
                  The result was a dynamic, high-performing [website, brand identity, or product] that aligned
                  perfectly with the client’s goals. Post-launch data showed significant improvements in [metrics such
                  as bounce rate, engagement, or conversions], validating the success of our approach. The to a
                  discipline&apos;s continues posterity people with declined, would are rolled proportion logging back
                  is value queen&apos;s for needed lower accuse that at a shall bit are to any it incurred appearance,
                  before actually derided the study the of by makes of before by which we the our have shine.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-[19px]">
                <p className="text-[16px] leading-5 font-medium text-[#00ab0c]">{`/// Portfolio ///`}</p>
                <h3 className="text-[36px] leading-[1.2] font-medium text-[#0c0407] sm:text-[46px] sm:leading-[57px]">
                  Related Work
                </h3>
              </div>
              <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
                <article className="min-w-0 lg:w-[54.5%]">
                  <div className="relative aspect-[764/512] overflow-hidden rounded-[23px]">
                    <Image
                      src="/figma/project-details/related-technium.png"
                      alt="Technium"
                      fill
                      sizes="(max-width: 1024px) 100vw, 764px"
                      className="object-cover object-[center_24%]"
                    />
                  </div>
                  <div className="relative mt-[14px]">
                    <h4 className="text-[23px] leading-7 font-bold text-black">Technium</h4>
                    <p className="mt-1 flex items-center text-[16px] leading-6 tracking-[-0.01em] text-black">
                      <span>Product Design</span>
                      <span className="mx-3 inline-block h-[2px] w-[2px] rounded-full bg-black" />
                      <span>Social Media Marketing</span>
                    </p>
                    <span className="absolute top-0 right-0 text-[16px] leading-6 font-medium tracking-[-0.01em] text-black">
                      2025
                    </span>
                  </div>
                </article>
                <article className="min-w-0 lg:w-[41.5%]">
                  <div className="relative aspect-[582/512] overflow-hidden rounded-[23px]">
                    <Image
                      src="/figma/project-details/related-stratosys.png"
                      alt="Stratosys"
                      fill
                      sizes="(max-width: 1024px) 100vw, 582px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative mt-[14px]">
                    <h4 className="text-[23px] leading-7 font-bold text-black">Stratosys</h4>
                    <p className="mt-1 flex items-center text-[16px] leading-6 tracking-[-0.01em] text-black">
                      <span>Marketing Strategy</span>
                      <span className="mx-3 inline-block h-[2px] w-[2px] rounded-full bg-black" />
                      <span>SEO &amp; Optimisation</span>
                    </p>
                    <span className="absolute top-0 right-0 text-[16px] leading-6 font-medium tracking-[-0.01em] text-black">
                      2025
                    </span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
