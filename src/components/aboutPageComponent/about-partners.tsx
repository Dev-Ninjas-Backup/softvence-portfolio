import { Reveal } from "@/components/ui/reveal";

const PARTNERS = [
  {
    name: "arcwise",
    className: "text-[25px] lowercase tracking-[-0.62px]",
    mark: (
      <span
        aria-hidden
        className="size-[22px] rotate-35 rounded-[11px] border-[6px] border-[#59615d]"
      />
    ),
  },
  {
    name: "NORTHSTAR",
    className: "text-[17px] tracking-[2.25px]",
  },
  {
    name: "PIVOT",
    className: "text-[21px] tracking-[-0.53px]",
    mark: (
      <span
        aria-hidden
        className="size-[24px] rotate-30 border-[2.5px] border-[#59615d]"
      />
    ),
  },
  {
    name: "ORBITAL",
    className: "text-[21px] tracking-[-0.53px]",
    mark: (
      <span
        aria-hidden
        className="h-[16px] w-[26px] -rotate-25 rounded-[10px] border-[2.5px] border-[#59615d]"
      />
    ),
  },
  {
    name: "VERTEX",
    className: "text-[21px] tracking-[1.68px]",
    plus: true,
  },
] as const;

function PartnerItem({
  partner,
}: {
  partner: (typeof PARTNERS)[number];
}) {
  return (
    <div className="flex h-[139px] w-[297px] shrink-0 items-center justify-center gap-[10px] opacity-60">
      {"mark" in partner ? partner.mark : null}
      <span className={`font-bold text-[#59615d] ${partner.className}`}>
        {partner.name}
      </span>
      {"plus" in partner ? (
        <span className="text-[27px] leading-[41px] font-bold tracking-[1.68px] text-[#00a81c]">
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
            <div className="pt-[90px] pb-[60px] lg:pt-[119px] lg:pb-[59px]">
              <div className="mb-[22px] flex items-center gap-[15px]">
                <span className="h-[1.2px] w-[30px] bg-[#00a81c]" />
                <p className="text-[15px] leading-[22px] font-bold tracking-[1.19px] text-[#6b7280] uppercase">
                  Our business partners
                </p>
              </div>

              <div className="relative overflow-hidden border-y border-[#e5e7eb] bg-white/60">
                <div
                  className="animate-marquee flex w-max hover:[animation-play-state:paused]"
                  style={{ animationDuration: "22s" }}
                >
                  <div className="flex">
                    {PARTNERS.map((partner) => (
                      <PartnerItem key={partner.name} partner={partner} />
                    ))}
                  </div>
                  <div className="flex" aria-hidden="true">
                    {PARTNERS.map((partner) => (
                      <PartnerItem key={`${partner.name}-copy`} partner={partner} />
                    ))}
                  </div>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[111px] bg-gradient-to-r from-white to-white/0"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 w-[111px] bg-gradient-to-l from-white to-white/0"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
