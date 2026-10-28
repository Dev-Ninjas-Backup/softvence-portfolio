import Image from "next/image";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";

export function AboutHero() {
  return (
    <section className="relative overflow-x-clip bg-white">
      {/* Background ambient container matching Figma #792:2298 (designedHeight: 1116px) */}
      <div
        className="relative mx-auto flex w-full max-w-[1920px] flex-col items-center pt-[100px] lg:pt-[110px]"
        style={{
          background:
            "radial-gradient(ellipse 1856px 1704.5px at calc(100% - 287.7px) 301.32px, rgba(43, 230, 93, 0.1) 0%, rgba(43, 230, 93, 0) 25.79%), #FFFFFF",
        }}
      >
        <div className="page-container w-full">
          <div className="content-1480">
            {/* Section grid matching Figma #792:2300: 2 cols of 702.63px, gap 79.17px, pt 86.59px */}
            <div className="grid items-start gap-[40px] pt-[60px] lg:grid-cols-[minmax(0,702.63px)_minmax(0,702.63px)] lg:gap-[79.17px] lg:pt-[86.59px]">
              {/* Left Column: #792:2301 */}
              <div className="relative min-w-0">
                {/* Triple dots #792:2325 at x=-34.95, y=14.84 */}
                <span
                  aria-hidden
                  className="absolute top-[14.84px] -left-[28px] size-[9.9px] rounded-[4.95px] bg-[#00a81c] shadow-[0_24.74px_0_0_rgba(0,168,28,0.45),0_49.48px_0_0_rgba(0,168,28,0.14)] lg:-left-[34.95px]"
                />

                {/* Rating Badge #792:2302 */}
                <Reveal>
                  <div
                    className="inline-flex min-h-[56px] items-center gap-[13.6px] rounded-full border border-[rgba(15,26,20,0.05)] bg-white/78 py-[9.9px] pr-[21px] pl-[12.4px] shadow-[0_12.37px_37.11px_rgba(15,26,20,0.05)] backdrop-blur-[14.84px]"
                  >
                    <div
                      className="flex items-center gap-[2.47px] rounded-full bg-[#e9f8ed] px-[9.9px] py-[8.66px]"
                      aria-label="5 out of 5 stars"
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <img
                          key={index}
                          src="/figma/about-page-img/hero-star.svg"
                          alt=""
                          width={16.08}
                          height={16.08}
                        />
                      ))}
                    </div>
                    <span className="text-[17.32px] leading-[26px] font-medium whitespace-nowrap text-[#4b5563]">
                      5 Star - Rated by Owners
                    </span>
                  </div>
                </Reveal>

                {/* Heading #792:2316 */}
                <Reveal delay={80}>
                  <h1 className="mt-[39.58px] max-w-[732px] text-[44px] leading-[1.1] font-medium tracking-[-0.025em] text-[#0f1a14] sm:text-[58px] lg:text-[76px] lg:leading-[84px] lg:tracking-[-2.5px]">
                    Your Partner in
                    <br />
                    Building <span className="text-brand">Stronger</span>
                    <br />
                    <span className="text-brand">Businesses</span>
                  </h1>
                </Reveal>

                {/* Paragraph #792:2321 */}
                <Reveal delay={160}>
                  <p className="mt-[42.06px] max-w-[593.77px] text-[18px] leading-[30px] font-normal text-[#4b5563] sm:text-[22.27px] sm:leading-[34.64px]">
                    A modern business formation and advisory partner helping founders
                    launch, structure, and scale their companies with clarity and
                    confidence.
                  </p>
                </Reveal>

                {/* CTA Button #792:2323 */}
                <Reveal delay={240}>
                  <div className="mt-[47px]">
                    <CtaButton overlay arrowMotion>
                      Become a Client
                    </CtaButton>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: HeroVisual Bento #792:2326 */}
              <Reveal delay={120} className="w-full min-w-0">
                <HeroVisual />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[702.63px]">
      {/*
        Figma Node #792:2326 ("Softvence team highlights")
        The green circle (792:2327) is a child of this frame, above the glass
        fill and behind the photos, so it can peek past the bottom-right corner.
      */}
      <div
        className="relative h-[539.34px] w-full overflow-visible rounded-[47px] border-[1.237px] border-[rgba(15,26,20,0.05)] pt-[12.37px] pr-[15.16px] pb-[14.85px] pl-[12.05px]"
        style={{
          boxShadow:
            "0px 37.11px 98.96px 0px rgba(19, 63, 31, 0.1), inset 0px 1.24px 0px 0px rgba(255, 255, 255, 0.95)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[47px] bg-white/55 backdrop-blur-[24.74px]"
        />
        <img
          src="/figma/about-page-img/hero-glow.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute z-[1] size-[557px] max-w-none"
          style={{ left: "378.05px", top: "202.71px" }}
        />
        {/* Bento Grid: 2 columns matching Figma dimensions */}
        <div className="relative z-10 grid h-full grid-cols-2 gap-x-[17.32px] gap-y-[17.32px]">
          {/* Left Column Bento (Tiles #792:2328 & #792:2331) - Width 329.05px */}
          <div className="flex flex-col gap-[17.31px]">
            {/* Tile 1 #792:2328 (329.05px x 247.41px) */}
            <div className="relative h-[247.41px] w-full overflow-hidden rounded-[35.87px] bg-[#e8f5ec]">
              <Image
                src="/figma/about-page-img/about-hero-small-img.png"
                alt="Team collaborating in a modern office"
                fill
                sizes="330px"
                className="object-cover [transform:translateZ(0)]"
                priority
              />
              {/* Linear gradient overlay fill_435fc7a7 */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(152.234deg, rgba(11, 72, 27, 0.02) 6.1733%, rgba(3, 146, 28, 0.065) 28.087%, rgba(1, 159, 28, 0.11) 50%, rgba(0, 168, 28, 0.2) 93.827%), linear-gradient(90deg, rgba(17, 117, 42, 0.09), rgba(17, 117, 42, 0.09))",
                }}
              />
            </div>

            {/* Tile 2 #792:2331 (329.05px x 247.41px) Softvence Mark Tile */}
            <div
              className="relative flex h-[247.41px] w-full items-center justify-center overflow-hidden rounded-[35.87px] border border-[rgba(0,168,28,0.08)]"
              style={{
                background:
                  "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 38%), linear-gradient(152.234deg, rgb(239, 250, 242) 6.1733%, rgb(218, 242, 224) 93.827%)",
              }}
            >
              <div className="relative z-10 flex flex-col items-center">
                <img
                  src="/figma/about-page-img/softvence-mark.svg"
                  alt=""
                  width={56.9}
                  height={56.9}
                />
                <p className="text-[28.45px] leading-[42.68px] font-bold tracking-[-1.42px] text-[#00a81c]">
                  Softvence
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Bento (Tile #792:2337) - Width 329.05px x Height 512.13px */}
          <div className="relative h-[512.13px] w-full overflow-hidden rounded-[35.87px] bg-[#e8f5ec]">
            <Image
              src="/figma/about-page-img/hero-founder.png"
              alt="Founder working on a laptop"
              fill
              sizes="330px"
              className="object-cover [transform:translateZ(0)]"
              priority
            />
            {/* Linear gradient overlay fill_435fc7a7 */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                  background:
                  "linear-gradient(132.54deg, rgba(11, 72, 27, 0.02) 6.1733%, rgba(3, 146, 28, 0.065) 28.087%, rgba(1, 159, 28, 0.11) 50%, rgba(0, 168, 28, 0.2) 93.827%), linear-gradient(90deg, rgba(17, 117, 42, 0.09), rgba(17, 117, 42, 0.09))",
              }}
            />
          </div>
        </div>

        {/*
          Figma Node #792:2340 ("Container" - 10+ Years of Trust badge)
          Position: absolute, locationRelativeToParent: x=412, y=430, width: 235.04px
          Padding: 14.84px 18.56px, gap: 11.13px, radius: 21.03px, border: 1.24px rgba(255, 255, 255, 0.9)
          Fills: rgba(255, 255, 255, 0.74), BackdropBlur: 24.74px
          Shadow: 0px 19.79px 47.01px 0px rgba(18, 58, 29, 0.16), inset 0px 1.24px 0px 0px rgba(255, 255, 255, 0.95)
        */}
        <div
          className="about-trust-float absolute z-20 w-[235.04px]"
          style={{
            left: "410.76px",
            top: "428.76px",
          }}
        >
          <div
            className="flex items-center gap-[11.13px] rounded-[21.03px] border border-white/90 px-[18.56px] py-[14.84px]"
            style={{
              background: "rgba(255, 255, 255, 0.74)",
              backdropFilter: "blur(24.74px)",
              WebkitBackdropFilter: "blur(24.74px)",
              boxShadow:
                "0px 19.79px 47.01px 0px rgba(18, 58, 29, 0.16), inset 0px 1.24px 0px 0px rgba(255, 255, 255, 0.95)",
            }}
          >
            <span className="flex size-[51.96px] shrink-0 items-center justify-center rounded-[14.84px] bg-[#00a81c] text-[21.03px] leading-[31.54px] font-bold text-white">
              10+
            </span>
            <span className="text-[16.08px] leading-[24.12px] font-bold whitespace-nowrap text-[#24352a]">
              Years of Trust
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

