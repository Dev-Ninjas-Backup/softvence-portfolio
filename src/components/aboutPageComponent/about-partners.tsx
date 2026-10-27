import { Reveal } from "@/components/ui/reveal";

const PARTNERS = [
  {
    name: "Arcwise",
    className: "text-[24.74px] leading-[37.11px] font-bold lowercase tracking-[-0.025em]",
    mark: (
      <span
        aria-hidden
        className="relative block size-[22.27px] shrink-0"
      >
        <span className="absolute -top-[4.37px] -left-[4.69px] flex size-[31.01px] items-center justify-center">
          <span className="block size-[22.27px] rotate-[35deg] rounded-[11.13px] border-[6.185px] border-[#59615d]" />
        </span>
      </span>
    ),
  },
  {
    name: "NORTHSTAR",
    className: "text-[17.32px] leading-[25.98px] font-bold uppercase tracking-[0.13em]",
  },
  {
    name: "PIVOT",
    className: "text-[21.03px] leading-[31.54px] font-bold uppercase tracking-[-0.025em]",
    mark: (
      <span
        aria-hidden
        className="relative block size-[23.5px] shrink-0"
      >
        <span className="absolute -top-[4.3px] -left-[4.62px] flex size-[32.11px] items-center justify-center">
          <span className="block size-[23.5px] rotate-[30deg] border-[2.474px] border-[#59615d]" />
        </span>
      </span>
    ),
  },
  {
    name: "ORBITAL",
    className: "text-[21.03px] leading-[31.54px] font-bold uppercase tracking-[-0.025em]",
    mark: (
      <span
        aria-hidden
        className="relative block h-[16.08px] w-[25.98px] shrink-0"
      >
        <span className="absolute -top-[4.73px] -left-[2.5px] flex h-[25.55px] w-[30.34px] items-center justify-center">
          <span className="block h-[16.08px] w-[25.98px] -rotate-[25deg] rounded-[10.22px] border-[2.474px] border-[#59615d]" />
        </span>
      </span>
    ),
  },
  {
    name: "VERTEX",
    className: "text-[21.03px] leading-[31.54px] font-bold uppercase tracking-[0.08em]",
    plus: true,
  },
] as const;

function PartnerItem({
  partner,
}: {
  partner: (typeof PARTNERS)[number];
}) {
  return (
    <div className="flex items-center justify-center gap-[9.9px] opacity-60">
      {"mark" in partner ? partner.mark : null}
      <span className={`text-[#59615d] ${partner.className}`}>
        {partner.name}
      </span>
      {"plus" in partner ? (
        <span className="text-[27.21px] leading-[40.82px] font-bold tracking-[0.0618em] text-[#00a81c]">
          +
        </span>
      ) : null}
    </div>
  );
}

export function AboutPartners() {
  return (
    <section className="bg-white">
      <div className="page-container">
        <div className="content-1480">
          <Reveal>
            {/* Figma Node #792:2345: padding: 118.75px 0px 59.38px */}
            <div className="pt-[60px] pb-[40px] lg:pt-[118.75px] lg:pb-[59.38px]">
              {/* Figma Node #792:2346: gap 14.84px, height 22.27px */}
              <div className="flex items-center gap-[14.84px]">
                {/* Node #792:2347: width 29.69px, height 1.24px */}
                <span className="h-[1.24px] w-[29.69px] bg-[#00a81c]" />
                {/* Node #792:2348: font 14.84px, leading 22.27px, tracking 0.08em */}
                <p className="text-[14.84px] leading-[22.27px] font-bold tracking-[0.08em] text-[#6b7280] uppercase">
                  Our business partners
                </p>
              </div>

              {/* Figma Node #792:2349 & #792:2350: margin-top 22.27px, height 136.07px */}
              <div className="relative mt-[22.27px] overflow-hidden border-y border-[#e5e7eb] bg-white/60">
                <div className="grid min-h-[138.55px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                  {PARTNERS.map((partner) => (
                    <div
                      key={partner.name}
                      className="flex h-[136.07px] items-center justify-center"
                    >
                      <PartnerItem partner={partner} />
                    </div>
                  ))}
                </div>
                {/* Figma #792:2369: width 111.33px, height 138.55px */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[111.33px] bg-gradient-to-r from-white to-white/0"
                />
                {/* Figma #792:2370: width 111.33px, height 138.55px */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 w-[111.33px] bg-gradient-to-l from-white to-white/0"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

