import { Reveal } from "@/components/ui/reveal";

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "UAE",
  "Saudi Arabia",
  "Singapore",
  "South Korea",
  "Japan",
  "Australia",
] as const;

/** Positions are the Figma slots inside the 1480×594 map (node 886:1998). */
const MAP_LAYERS = [
  { src: "/figma/service-page/land-dots.svg", left: 0, top: 0 },
  { src: "/figma/service-page/arc-us.svg", left: 304.51, top: 95.55 },
  { src: "/figma/service-page/arc-canada.svg", left: 296, top: 46 },
  { src: "/figma/service-page/arc-uk.svg", left: 664, top: 100.38 },
  { src: "/figma/service-page/arc-germany.svg", left: 761.09, top: 117.3 },
  { src: "/figma/service-page/arc-uae.svg", left: 947.2, top: 219.75 },
  { src: "/figma/service-page/arc-singapore.svg", left: 1101.12, top: 242.37 },
  { src: "/figma/service-page/arc-korea.svg", left: 1101.12, top: 182.97 },
  { src: "/figma/service-page/arc-australia.svg", left: 1101.12, top: 242.37 },
  { src: "/figma/service-page/flag-canada.svg", left: 269, top: 78.38 },
  { src: "/figma/service-page/pin-canada.svg", left: 291.06, top: 98.29 },
  { src: "/figma/service-page/flag-us.svg", left: 275, top: 160.38 },
  { src: "/figma/service-page/pin-us.svg", left: 299.52, top: 175.77 },
  { src: "/figma/service-page/flag-uk.svg", left: 639, top: 95.38 },
  { src: "/figma/service-page/pin-uk.svg", left: 660, top: 107.38 },
  { src: "/figma/service-page/flag-germany.svg", left: 740, top: 107.38 },
  { src: "/figma/service-page/pin-germany.svg", left: 756.21, top: 121.96 },
  { src: "/figma/service-page/pin-uae.svg", left: 942.27, top: 236.04 },
  { src: "/figma/service-page/flag-saudi.svg", left: 920, top: 215.37 },
  { src: "/figma/service-page/flag-saudi-overlay.svg", left: 920, top: 215.37 },
  { src: "/figma/service-page/flag-korea.svg", left: 1239, top: 167.38 },
  { src: "/figma/service-page/pin-korea.svg", left: 1254.34, top: 182.23 },
  { src: "/figma/service-page/flag-singapore.svg", left: 1137, top: 322.38 },
  { src: "/figma/service-page/pin-singapore.svg", left: 1152.84, top: 333.76 },
  { src: "/figma/service-page/flag-australia.svg", left: 1272, top: 427.38 },
  { src: "/figma/service-page/flag-australia-overlay.svg", left: 1272, top: 427.38 },
  { src: "/figma/service-page/pin-australia.svg", left: 1280.55, top: 446.97 },
  { src: "/figma/service-page/pin-bangladesh-mark.svg", left: 1083.7, top: 180.88 },
] as const;

export function ServiceWorldwide() {
  return (
    <section className="relative overflow-hidden bg-[#07140c] py-[96px] lg:py-[129px]">
      <img
        src="/figma/service-page/worldwide-bg.png"
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[rgba(94,94,94,0.12)] backdrop-blur-[5px]" />

      <img
        src="/figma/service-page/glow-a.svg"
        alt=""
        className="service-glow-a pointer-events-none absolute top-[-562px] left-[-603px] max-w-none"
      />
      <img
        src="/figma/service-page/glow-b.svg"
        alt=""
        className="service-glow-b pointer-events-none absolute top-[630px] -right-[636px] max-w-none"
      />

      <div className="page-container relative z-10">
        <div className="content-1480 flex flex-col items-center">
          <Reveal className="flex max-w-[827px] flex-col items-center gap-[20px] text-center lg:gap-[27px]">
            <p className="flex items-center gap-[11px] text-[18px] font-semibold text-white lg:text-[22px]">
              <img src="/figma/service-page/origin-dot.svg" alt="" className="size-[14px]" />
              Dhaka, Bangladesh
            </p>
            <h2 className="text-[36px] leading-[44px] font-bold tracking-[-0.8px] text-white uppercase sm:text-[48px] sm:leading-[56px] lg:text-[56px] lg:leading-[64px] lg:tracking-[-1.12px]">
              Built in Bangladesh.
              <br />
              Trusted Worldwide.
            </h2>
            <p className="max-w-[827px] text-[16px] leading-[1.5] text-[#dbdbdb] sm:text-[20px] lg:text-[24px]">
              From Dhaka to the world, we partner with businesses across continents to design
              and deliver impactful digital solutions.
            </p>
          </Reveal>

          <div
            className="relative mt-[48px] w-full max-w-[1480px] lg:mt-[56px]"
            style={{ containerType: "inline-size" }}
          >
            <div className="relative w-full" style={{ height: "calc(100cqi * 594.053 / 1480)" }}>
              <div
                className="absolute top-0 left-0"
                style={{
                  width: 1480,
                  height: 594.053,
                  transform: "scale(calc(100cqi / 1480px))",
                  transformOrigin: "top left",
                }}
              >
                {MAP_LAYERS.map((layer) => (
                  <img
                    key={`${layer.src}-${layer.left}-${layer.top}`}
                    src={layer.src}
                    alt=""
                    className="pointer-events-none absolute max-w-none"
                    style={{ left: layer.left, top: layer.top }}
                  />
                ))}
                <img
                  src="/figma/service-page/pulse.svg"
                  alt=""
                  className="service-pin-pulse pointer-events-none absolute max-w-none"
                  style={{ left: 1073.98, top: 214.71 }}
                />
                <img
                  src="/figma/service-page/pulse-inner.svg"
                  alt=""
                  className="service-pin-pulse service-pin-pulse-late pointer-events-none absolute max-w-none"
                  style={{ left: 1085.09, top: 226.02 }}
                />
                <img
                  src="/figma/service-page/pin-bangladesh.svg"
                  alt=""
                  className="pointer-events-none absolute max-w-none"
                  style={{ left: 1093.72, top: 234.82 }}
                />
              </div>
            </div>
          </div>

          <Reveal className="mt-[40px] flex max-w-[1153px] flex-wrap justify-center gap-x-[13px] gap-y-[13px] lg:mt-[64px]">
            {COUNTRIES.map((country) => (
              <span
                key={country}
                className="rounded-full bg-[rgba(0,171,12,0.1)] px-[18px] py-[10px] text-[16px] font-semibold text-white backdrop-blur-[0.75px] sm:px-[22px] sm:py-[12px] sm:text-[20px]"
              >
                {country}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
