import { CtaButton } from "@/components/ui/cta-button";

type StatItem = {
  plus: string;
  number: string;
  label: string;
};

const STATS: StatItem[] = [
  {
    plus: "+",
    number: "76",
    label: "Projects Completed",
  },
  {
    plus: "+",
    number: "80",
    label: "Real Clients here",
  },
  {
    plus: "+",
    number: "22",
    label: "Winning Awards",
  },
  {
    plus: "+",
    number: "12",
    label: "Years of experience",
  },
];

export function LetsWorkTogether() {
  return (
    <section id="contact" className="overflow-hidden bg-white py-[100px] lg:py-[140px]">
      <div className="page-container">
        <div className="content-1480 flex flex-col items-center gap-[64px]">
          {/* Header */}
          <div className="flex max-w-[1020px] flex-col items-center text-center">
            {/* Eyebrow */}
            <span className="text-[14px] font-semibold leading-[20px] tracking-[0.08em] text-[#171717] uppercase">
              <span className="text-brand">{"//"}</span>
              {" Let’s Work Together"}
            </span>

            {/* H2 Title */}
            <h2 className="mt-[28px] max-w-[1018px] text-[40px] font-bold leading-[48px] tracking-[-0.02em] text-[#1B1B1B] uppercase sm:text-[56px] sm:leading-[64px]">
              Complete Digital Solutions
              <br />
              From Idea to Launch
            </h2>

            {/* Subtitle / Lead Paragraph */}
            <p className="mt-[15px] max-w-[792px] text-[18px] leading-[30px] text-[#5C635E]">
              From strategy and UI/UX to full-stack development and deployment,
              we deliver end-to-end digital solutions designed to help businesses grow.
            </p>

            {/* CTA Button Component */}
            <div className="mt-[28px]">
              <CtaButton href="#contact" variant="outline">
                Become a Client
              </CtaButton>
            </div>
          </div>

          {/* 4 Stat Cards Row */}
          <div className="grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <article
                key={stat.label}
                className="group relative flex h-[300px] flex-col justify-end rounded-[24px] border-t border-l border-[rgba(23,23,23,0.08)] p-[32px] transition-all duration-300 hover:shadow-[0_16px_40px_-8px_rgba(15,26,15,0.08)]"
                style={{
                  background:
                    "linear-gradient(180deg, #F1FCF3 0%, #F5FDF6 36%, #FAFEFA 58%, #FFFFFF 72%)",
                }}
              >
                {/* Top-Right Badge indicator pill (15.16px x 16px with 3px green border & rounded-[16px]) */}
                <span
                  aria-hidden
                  className="absolute right-[32px] top-[20px] block h-[16px] w-[15.2px] rounded-[16px] border-[3px] border-brand bg-[#F5F5F5] transition-transform duration-300 group-hover:scale-110"
                />

                {/* Number with green + sign */}
                <div className="flex items-center">
                  <span className="text-[64px] font-semibold leading-[72px] tracking-[-0.02em] text-brand">
                    {stat.plus}
                  </span>
                  <span className="text-[64px] font-semibold leading-[72px] tracking-[-0.02em] text-[#171717]">
                    {stat.number}
                  </span>
                </div>

                {/* Stat Label */}
                <p className="mt-[8px] text-[16px] font-medium leading-[24px] text-[#5C635E]">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
