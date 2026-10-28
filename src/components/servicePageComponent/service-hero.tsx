import { CtaButton } from "@/components/ui/cta-button";

const CAPABILITIES = [
  { label: "Design Consulting", icon: "/figma/service-page/design-consulting.png" },
  { label: "Software Engineering", icon: "/figma/service-page/software-engineering.png" },
  { label: "Managed Services", icon: "/figma/service-page/managed-services.png" },
  { label: "Process Outsourcing", icon: "/figma/service-page/process-outsourcing.png" },
  { label: "Research Services", icon: "/figma/service-page/research-services.png" },
] as const;

export function ServiceHero() {
  return (
    <section className="relative overflow-x-clip bg-white">
      <div
        className="relative mx-auto flex w-full max-w-[1920px] flex-col items-center gap-[48px] px-5 pt-[160px] pb-[72px] sm:gap-[72px] sm:pt-[190px] sm:pb-[100px] lg:px-10"
        style={{
          background: "linear-gradient(180deg, #eef9ef 0%, #ffffff 100%)",
        }}
      >
        <div className="flex w-full max-w-[1233px] flex-col items-center gap-[32px] text-center sm:gap-[40px]">
          <div className="flex flex-col items-center gap-[24px]">
            <h1 className="text-[44px] leading-[52px] font-medium tracking-[-1.4px] text-[#171717] uppercase sm:text-[72px] sm:leading-[80px] sm:tracking-[-2.2px] lg:text-[96px] lg:leading-[104px] lg:tracking-[-2.88px]">
              Services <span className="text-[#00ab0c]">That Scale</span>
              <br />
              <span className="text-[#00ab0c]">Businesses</span>
            </h1>
            <p className="max-w-[883px] text-[16px] leading-[1.6] text-[#242424] sm:text-[20px]">
              Accelerate growth with Softvence Agency global IT services, designed to help
              businesses build smarter solutions, improve operations, and achieve measurable
              results.
            </p>
          </div>
          <CtaButton overlay>Discuss Your Project</CtaButton>
        </div>

        <ul className="grid w-full max-w-[1480px] grid-cols-2 gap-[12px] sm:grid-cols-3 sm:gap-[20px] lg:grid-cols-5">
          {CAPABILITIES.map((item) => (
            <li
              key={item.label}
              className="flex h-[148px] flex-col items-center justify-center gap-[16px] rounded-[24px] border border-[#e3e8e3] bg-white p-[16px] shadow-[0px_16px_20px_rgba(15,26,15,0.07),0px_1px_1px_rgba(15,26,15,0.04)] sm:h-[164px] sm:gap-[20px] sm:p-[20px]"
            >
              <img src={item.icon} alt="" width={50} height={50} className="size-[50px]" />
              <p className="text-center text-[14px] leading-[20px] font-semibold text-[#171717] sm:text-[16px] sm:leading-[24px]">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
