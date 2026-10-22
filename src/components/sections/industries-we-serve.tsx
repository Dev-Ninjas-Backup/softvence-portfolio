import type { ComponentType } from "react";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";

/* ------------------------------------------------------------------ */
/*  Industry icons — stroke-based, #4A5568, matching Figma vectors     */
/* ------------------------------------------------------------------ */

function IconFinTech({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <rect x="3" y="8" width="24" height="17" rx="2.5" stroke="currentColor" strokeWidth="2.145" />
      <path d="M8 3h13a1 1 0 0 1 1 1v4H7V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="2.145" strokeLinejoin="round" />
      <path d="M12 15h5" stroke="currentColor" strokeWidth="2.145" strokeLinecap="round" />
    </svg>
  );
}

function IconHealthcare({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <rect x="4" y="4" width="21" height="21" rx="4" stroke="currentColor" strokeWidth="2.145" />
      <path d="M14 9v11M8.5 14.5h11" stroke="currentColor" strokeWidth="2.145" strokeLinecap="round" />
    </svg>
  );
}

function IconECommerce({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <path d="M4 4h19l-2.5 12.5a2 2 0 0 1-2 1.5H9.5a2 2 0 0 1-2-1.6L4 4Z" stroke="currentColor" strokeWidth="2.145" strokeLinejoin="round" />
      <circle cx="10.5" cy="24" r="2" stroke="currentColor" strokeWidth="2.145" />
      <circle cx="20.5" cy="24" r="2" stroke="currentColor" strokeWidth="2.145" />
    </svg>
  );
}

function IconAutomotive({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <path d="M7 10l1.5-5A1.5 1.5 0 0 1 10 4h9a1.5 1.5 0 0 1 1.5 1L22 10" stroke="currentColor" strokeWidth="2.145" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="10" width="21" height="9" rx="2" stroke="currentColor" strokeWidth="2.145" />
      <path d="M4 15.5h21" stroke="currentColor" strokeWidth="2.145" />
      <circle cx="9" cy="24" r="2" stroke="currentColor" strokeWidth="2.145" />
      <circle cx="20" cy="24" r="2" stroke="currentColor" strokeWidth="2.145" />
    </svg>
  );
}

function IconEducation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <path d="M14.5 4L2 9.5 14.5 15l12.5-5.5L14.5 4Z" stroke="currentColor" strokeWidth="2.145" strokeLinejoin="round" />
      <path d="M7 12v5.5c0 1.5 3.4 3 7.5 3s7.5-1.5 7.5-3V12" stroke="currentColor" strokeWidth="2.145" strokeLinecap="round" />
      <path d="M26 10v6" stroke="currentColor" strokeWidth="2.145" strokeLinecap="round" />
    </svg>
  );
}

function IconRealEstate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <path d="M4 13.5L14.5 4 25 13.5" stroke="currentColor" strokeWidth="2.145" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 12v12.5h16V12" stroke="currentColor" strokeWidth="2.145" strokeLinejoin="round" />
      <rect x="12" y="17" width="5" height="7.5" stroke="currentColor" strokeWidth="2.145" />
    </svg>
  );
}

function IconHospitality({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <path d="M5 25V6a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v19" stroke="currentColor" strokeWidth="2.145" strokeLinecap="round" />
      <path d="M5 12h19" stroke="currentColor" strokeWidth="2.145" />
      <rect x="9" y="6" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="2.145" />
      <rect x="17" y="6" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="2.145" />
      <rect x="9" y="16" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="2.145" />
      <rect x="17" y="16" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="2.145" />
    </svg>
  );
}

function IconRMG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <path d="M9 4L4 8l3 3 2-1.5V25h10V9.5L21 11l3-3-5-4a3 3 0 0 1-5 0Z" stroke="currentColor" strokeWidth="2.145" strokeLinejoin="round" />
      <path d="M14 4v2" stroke="currentColor" strokeWidth="2.145" strokeLinecap="round" />
    </svg>
  );
}

function IconPharmacy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <rect x="8" y="5" width="13" height="19" rx="2.5" stroke="currentColor" strokeWidth="2.145" />
      <path d="M14.5 10v9M10 14.5h9" stroke="currentColor" strokeWidth="2.145" strokeLinecap="round" />
    </svg>
  );
}

function IconAviation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <path d="M3 16.5L14 4l1.5 1.5L8 15l1.5 1.5L26 9.5 23 18l-8.5-1.5L13 25l-1.5-1.5L13 18l-10-1.5Z" stroke="currentColor" strokeWidth="2.145" strokeLinejoin="round" />
    </svg>
  );
}

function IconTechnology({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <rect x="4" y="4" width="21" height="21" rx="3" stroke="currentColor" strokeWidth="2.145" />
      <path d="M10 10l-3.5 4.5L10 19M19 10l3.5 4.5L19 19" stroke="currentColor" strokeWidth="2.145" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14.5" cy="14.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconMore({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden>
      <circle cx="14.5" cy="14.5" r="10.5" stroke="currentColor" strokeWidth="2.145" />
      <path d="M14.5 9.5v10M9.5 14.5h10" stroke="currentColor" strokeWidth="2.145" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Industry = {
  title: string;
  desc: string;
  Icon: ComponentType<{ className?: string }>;
};

const INDUSTRIES: Industry[] = [
  { title: "FinTech", desc: "Secure and scalable financial experiences", Icon: IconFinTech },
  { title: "Healthcare", desc: "Connected digital healthcare solutions", Icon: IconHealthcare },
  { title: "E-Commerce", desc: "High-converting commerce platforms", Icon: IconECommerce },
  { title: "Automotive", desc: "Smart digital mobility experiences", Icon: IconAutomotive },
  { title: "Education", desc: "Digital solutions for modern learning", Icon: IconEducation },
  { title: "Real Estate", desc: "Seamless property technology solutions", Icon: IconRealEstate },
  { title: "Hospitality", desc: "Digital solutions for hospitality businesses", Icon: IconHospitality },
  { title: "RMG", desc: "Smart systems for apparel and manufacturing", Icon: IconRMG },
  { title: "Pharmacy", desc: "Reliable digital pharmacy solutions", Icon: IconPharmacy },
  { title: "Aviation", desc: "Connected aviation technology solutions", Icon: IconAviation },
  { title: "Technology", desc: "Scalable solutions for modern businesses", Icon: IconTechnology },
  { title: "More Industries", desc: "Custom solutions for emerging industries", Icon: IconMore },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function IndustryCard({ industry }: { industry: Industry }) {
  const { Icon, title, desc } = industry;

  return (
    <article className="group flex h-[232px] w-full flex-col rounded-[24px] border border-line bg-white p-[32px] shadow-[0_1px_2px_rgba(15,26,15,0.04),0_16px_40px_-8px_rgba(15,26,15,0.06)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(15,26,15,0.04),0_20px_48px_-8px_rgba(15,26,15,0.1)]">
      <div className="flex size-[59px] items-center justify-center rounded-[16px] bg-[#F1F3F7] transition-colors duration-300 group-hover:bg-[#E8F5E9]">
        <Icon className="size-[29px] text-[#4A5568] transition-colors duration-300 group-hover:text-brand" />
      </div>
      <div className="mt-auto flex flex-col">
        <h3 className="text-[20px] leading-[26px] font-semibold text-ink-2">
          {title}
        </h3>
        <p className="mt-[8px] text-[17px] leading-[26px] text-slate-600">
          {desc}
        </p>
      </div>
    </article>
  );
}

export function IndustriesWeServe() {
  return (
    <section id="industries" className="bg-white py-[140px]">
      <div className="page-container">
        <div className="content-1480 flex flex-col gap-[64px]">
          {/* Header */}
          <div className="flex flex-col gap-[20px]">
            <Reveal y={16}>
              <span className="text-[14px] leading-[20px] font-semibold tracking-[1.12px] text-[#171717] uppercase">
                <span className="text-brand">{"//"}</span>{" "}Industries We Serve
              </span>
            </Reveal>
            <Reveal y={26} delay={100}>
              <h2 className="max-w-[1000px] text-[56px] leading-[64px] font-bold tracking-[-1.12px] text-ink-2 uppercase">
                Built for the World&apos;s{" "}
                <span className="text-[#A4A7AE]">Most Demanding Industries</span>
              </h2>
            </Reveal>
          </div>

          {/* Card grid — 3 rows x 4 columns */}
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((industry, index) => (
              <Reveal key={industry.title} y={32} delay={400 + index * 90}>
                <IndustryCard industry={industry} />
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA banner */}
          <Reveal y={30} delay={1200}>
          <div className="flex h-auto w-full flex-col items-start justify-between gap-[24px] rounded-[24px] border border-line bg-white px-[32px] py-[32px] shadow-[0_1px_2px_rgba(15,26,15,0.04),0_16px_40px_-8px_rgba(15,26,15,0.06)] sm:h-[178px] sm:flex-row sm:items-center sm:px-[29px]">
            <div className="flex flex-col">
              <h3 className="text-[40px] leading-[60px] font-medium tracking-[-0.01em] text-ink-2 uppercase">
                Have a unique industry requirement?
              </h3>
              <p className="mt-[12px] text-[21.6px] leading-[34.6px] text-[#6B7A90]">
                Let&apos;s build the right solution for your business.
              </p>
            </div>
            <CtaButton href="#contact">Talk to Our Experts</CtaButton>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
