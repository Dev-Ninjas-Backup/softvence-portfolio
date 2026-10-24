"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Review = {
  name: string;
  role: string;
  title: string;
  body: string;
  photo: string;
  company: string;
  mark: "circle" | "diamond" | "bars" | "triangle" | "square";
};

function CompanyMark({ company, mark }: { company: string; mark: Review["mark"] }) {
  const icon =
    mark === "circle" ? (
      <circle cx="12" cy="16" r="7" />
    ) : mark === "diamond" ? (
      <path d="M12 7.5 19 16 12 24.5 5 16Z" />
    ) : mark === "bars" ? (
      <path d="M5 10h8M5 16h14M5 22h11" stroke="currentColor" strokeWidth="2" fill="none" />
    ) : mark === "triangle" ? (
      <path d="M12 7.5 19.5 23H4.5Z" />
    ) : (
      <rect x="5" y="9" width="14" height="14" rx="3" />
    );

  return (
    <svg viewBox="0 0 132 32" className="h-7 w-[132px] text-[#171717]" role="img" aria-label={company}>
      <g fill="currentColor">{icon}</g>
      <text
        x="28"
        y="21"
        fill="currentColor"
        fontFamily="Manrope, sans-serif"
        fontSize="15"
        fontWeight="700"
        letterSpacing="-0.3"
      >
        {company}
      </text>
    </svg>
  );
}

const REVIEWS: Review[] = [
  {
    name: "Ronald Richards",
    role: "Laravel developer",
    title: "Your Gateway to Digital Success.",
    body: "We believe in the power of digital transformation. Dedicated team of experts is committed to propelling your brand to new heights through cutting-edge strategies & unparalleled creativity. Whether you're looking for a captivating website design.",
    photo: "/testimonials/client-ronald.jpg",
    company: "Northline",
    mark: "circle",
  },
  {
    name: "Sofia Alvarez",
    role: "Product Manager",
    title: "They shipped what we actually needed.",
    body: "Softvence turned a messy brief into a product our customers finish. The weekly builds stayed on scope, and the handoff to our engineers was clean enough to ship the same week.",
    photo: "/testimonials/client-sofia.jpg",
    company: "Brightpath",
    mark: "diamond",
  },
  {
    name: "Gregory Hale",
    role: "Chief Technology Officer",
    title: "A partner who thinks past the launch.",
    body: "We needed a team that could respect a legacy codebase and still move the interface forward. They did both, and staging stopped being a trail of surprises.",
    photo: "/testimonials/client-gregory.jpg",
    company: "Halden",
    mark: "bars",
  },
  {
    name: "Lena Cho",
    role: "Design Director",
    title: "The product finally feels like our brand.",
    body: "The design system they left us is the first one marketing can use without asking for help. It looks like us, and it holds up on every new page we add.",
    photo: "/testimonials/client-lena.jpg",
    company: "Kite",
    mark: "triangle",
  },
  {
    name: "Malik Mensah",
    role: "Creative Director",
    title: "Clear process, calm delivery.",
    body: "From the first workshop to launch, I always knew what was happening and why. The site went live on the day we had promised our investors.",
    photo: "/testimonials/client-malik.jpg",
    company: "Orchard",
    mark: "square",
  },
];

const DWELL_MS = 3000;

export function Testimonial() {
  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const elapsedRef = useRef(0);
  const inViewRef = useRef(false);

  const select = (index: number) => {
    activeRef.current = index;
    elapsedRef.current = 0;
    setActive(index);
    if (barRef.current) barRef.current.style.transform = "scaleX(0)";
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMotion(!reduced);

    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    if (section) observer.observe(section);

    if (reduced) return () => observer.disconnect();

    let frame = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const playing = inViewRef.current && !document.hidden;
      if (playing) {
        elapsedRef.current += now - last;
        if (elapsedRef.current >= DWELL_MS) {
          elapsedRef.current = 0;
          const next = (activeRef.current + 1) % REVIEWS.length;
          activeRef.current = next;
          setActive(next);
        }
      }
      last = now;
      if (barRef.current) {
        const scale = Math.min(1, elapsedRef.current / DWELL_MS);
        barRef.current.style.transform = `scaleX(${scale})`;
      }
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const review = REVIEWS[active];

  return (
    <section
      ref={sectionRef}
      id="testimonial"
      className="flex items-center justify-center overflow-hidden bg-[#F6F8F6] px-10"
      style={{ height: "927px" }}
    >
      <div className="flex w-[1480px] shrink-0 flex-row items-center justify-between gap-[60px]">
        <div className="flex w-[924px] flex-row items-start gap-24">
          <div className="flex w-[440px] flex-col gap-[22px]">
            <div className="flex w-[440px] flex-col gap-6">
              <span className="w-[440px] text-[14px] font-semibold leading-5 tracking-[1.12px] text-[#171717] uppercase">
                <span className="text-brand">{"//"}</span>
                {" My Testimonial"}
              </span>
              <h2 className="w-[440px] text-[56px] font-bold leading-16 tracking-[-1.12px] text-[#242424] uppercase">
                Clients words
              </h2>
            </div>
            <p className="w-[440px] text-[16px] leading-[26px] text-[#5C635E]">
              Throughout creative journey, I’ve been honored
              <br />
              to receive recognition from respected
            </p>
          </div>

          <div className="flex w-[388px] flex-col gap-8">
            <div className="relative h-[480px] w-[388px] overflow-hidden rounded-[20px] bg-[#E7EAE6]">
              {REVIEWS.map((item, index) => (
                <Image
                  key={item.photo}
                  src={item.photo}
                  alt={index === active ? item.name : ""}
                  fill
                  sizes="388px"
                  priority={index === 0}
                  className={`object-cover object-[center_20%] transition-opacity duration-500 ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            <div className="flex w-[388px] flex-row gap-3" role="tablist" aria-label="Client reviews">
              {REVIEWS.map((item, index) => {
                const selected = index === active;
                return (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-label={`${item.name}, ${item.role}`}
                    onClick={() => select(index)}
                    className={`relative size-[68px] shrink-0 overflow-hidden transition-[border-radius,box-shadow] duration-300 ${
                      selected ? "shadow-[0_0_0_2px_#00AB0C]" : ""
                    }`}
                    style={{ borderRadius: selected ? 78 : 12 }}
                  >
                    <Image src={item.photo} alt="" fill sizes="68px" className="object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex h-[471px] w-[480px] shrink-0 flex-col gap-7">
          <div className="flex w-[480px] flex-col gap-8">
            <div className="flex w-[480px] flex-col gap-4">
              <div className="flex w-[480px] flex-row items-center gap-4">
                <div key={review.company} className="testimonial-swap shrink-0">
                  <CompanyMark company={review.company} mark={review.mark} />
                </div>
                <div className="h-px min-w-8 flex-1 bg-[#171717]/8" />
                <div className="relative h-5 w-[116px] shrink-0">
                  <Image src="/figma/765-5012.png" alt="5 star rating" fill sizes="116px" className="object-contain" />
                </div>
              </div>
              {motion ? (
                <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#171717]/8">
                  <div ref={barRef} className="h-full w-full origin-left bg-[#00AB0C]" style={{ transform: "scaleX(0)" }} />
                </div>
              ) : null}
            </div>
            <div key={review.name} className="testimonial-swap flex w-[480px] flex-col gap-4" aria-live="polite">
              <h5 className="text-[22px] leading-8 font-semibold text-[#242424]">“{review.title}”</h5>
              <p className="text-[16px] leading-[26px] text-[#5C635E]">{review.body}</p>
            </div>
          </div>
          <div key={`${review.name}-by`} className="testimonial-swap flex w-[480px] flex-col gap-0.5">
            <h5 className="text-[22px] leading-8 font-semibold text-[#00AB0C]">{review.name}</h5>
            <p className="text-[16px] leading-6 font-medium text-[#242424]">{review.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
