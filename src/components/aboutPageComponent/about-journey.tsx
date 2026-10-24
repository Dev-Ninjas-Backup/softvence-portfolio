import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const MILESTONES = [
  { year: "2024", pin: "/figma/about-page-img/year-pin.svg", pinWidth: 132.02, stacked: true, rotate: "-2.89deg" },
  { year: "2025", pin: "/figma/about-page-img/year-pin-alt.svg", pinWidth: 131.33, stacked: false, rotate: "4.68deg" },
  { year: "2024", pin: "/figma/about-page-img/year-pin.svg", pinWidth: 132.02, stacked: true, rotate: "-4.69deg" },
  { year: "2025", pin: "/figma/about-page-img/year-pin-alt.svg", pinWidth: 131.33, stacked: false, rotate: "3.2deg" },
  { year: "2024", pin: "/figma/about-page-img/year-pin.svg", pinWidth: 132.02, stacked: true, rotate: "-3.4deg" },
  { year: "2025", pin: "/figma/about-page-img/year-pin-alt.svg", pinWidth: 131.33, stacked: false, rotate: "2.4deg" },
] as const;

export function AboutJourney() {
  return (
    <section className="bg-white py-[90px] lg:py-[140px]">
      <div className="page-container">
        <div className="content-1480">
          <Reveal className="mb-[64px] flex max-w-[780px] flex-col gap-[20px]">
            <p className="text-[14px] leading-[20px] font-semibold tracking-[1.12px] text-brand uppercase">
              //Our Journey
            </p>
            <h2 className="text-[36px] leading-[44px] font-bold tracking-[-1.12px] text-[#081122] uppercase sm:text-[56px] sm:leading-[64px]">
              Milestones of innovation and success
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="page-container">
        <div className="content-1480 overflow-x-auto pb-4">
          <div className="flex min-w-max">
            {MILESTONES.map((milestone, index) => (
              <Reveal key={`${milestone.year}-${index}`} delay={index * 90}>
                <article className="relative h-[705px] w-[min(86vw,493px)] shrink-0 overflow-hidden border-l border-[rgba(107,112,122,0.4)]">
                  <img
                    src="/figma/about-page-img/journey-lines.svg"
                    alt=""
                    width={432}
                    height={500}
                    className="pointer-events-none absolute top-1/2 left-[71px] -translate-y-1/2"
                  />

                  <div className="absolute top-0 left-1/2 -translate-x-1/2">
                    <div className="relative h-[62px] w-[132px]">
                      <img
                        src={milestone.pin}
                        alt=""
                        width={milestone.pinWidth}
                        height={61.59}
                        className="absolute top-0 left-1/2 -translate-x-1/2"
                      />
                      <div className="relative z-10 flex justify-center pt-[6px]">
                        <p className="rounded-[4px] bg-white px-[16px] pt-[6px] text-[24px] leading-[34px] font-medium tracking-[-0.48px] text-[#081122]">
                          {milestone.year}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute top-[190px] left-[98px] w-[296px] origin-center"
                    style={{ transform: `rotate(${milestone.rotate})` }}
                  >
                    <p className="mb-[10px] text-[18px] leading-[30px] font-medium tracking-[-0.2px] text-[#081122]">
                      Scaling New Heights
                    </p>
                    <div className="relative overflow-hidden rounded-[8px]">
                      <Image
                        src="/figma/about-page-img/journey-client.png"
                        alt="Team collaborating around a laptop"
                        width={296}
                        height={milestone.stacked ? 286 : 321}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                    {milestone.stacked ? (
                      <div className="absolute -right-[9px] -bottom-[112px] w-[182px] rotate-4">
                        <div className="overflow-hidden rounded-[8px]">
                          <Image
                            src="/figma/about-page-img/journey-team.png"
                            alt="Team working together"
                            width={180}
                            height={220}
                            className="h-[220px] w-[180px] object-cover"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
