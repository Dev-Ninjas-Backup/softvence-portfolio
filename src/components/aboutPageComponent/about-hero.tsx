import Image from "next/image";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-[100px]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[80px] right-[8%] h-[520px] w-[560px] rounded-full bg-[rgba(43,230,93,0.1)] blur-[110px]"
      />

      <div className="page-container">
        <div className="content-1480">
          <div className="grid items-start gap-[50px] pt-[70px] lg:grid-cols-2 lg:gap-x-[80px] lg:pt-[87px]">
            <div className="relative min-w-0 pl-[35px] lg:pl-0">
              <span
                aria-hidden
                className="absolute top-[15px] left-0 size-[10px] rounded-[5px] bg-[#00a81c] shadow-[0_25px_0_0_rgba(0,168,28,0.45),0_49px_0_0_rgba(0,168,28,0.14)] lg:-left-[35px]"
              />

              <Reveal>
                <div className="inline-flex min-h-[56px] items-center gap-[14px] rounded-full border border-[rgba(15,26,20,0.05)] bg-white/78 py-[10px] pr-[21px] pl-[12px] shadow-[0_12px_37px_rgba(15,26,20,0.05)] backdrop-blur-[15px]">
                  <div
                    className="flex items-center gap-[2.5px] rounded-full bg-[#e9f8ed] px-[10px] py-[9px]"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <img
                        key={index}
                        src="/figma/about-page-img/hero-star.svg"
                        alt=""
                        width={16.0814}
                        height={16.0814}
                      />
                    ))}
                  </div>
                  <span className="text-[17px] leading-[26px] font-medium whitespace-nowrap text-[#4b5563]">
                    5 Star - Rated by Owners
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-[40px] max-w-[732px] text-[44px] leading-[1.1] font-medium tracking-[-0.025em] text-[#0f1a14] sm:text-[58px] lg:text-[76px] lg:leading-[84px]">
                  Your Partner in
                  <br />
                  Building <span className="text-brand">Stronger</span>
                  <br />
                  <span className="text-brand">Businesses</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-[42px] max-w-[594px] text-[18px] leading-[30px] text-[#4b5563] sm:text-[22px] sm:leading-[35px]">
                  A modern business formation and advisory partner helping founders
                  launch, structure, and scale their companies with clarity and
                  confidence.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-[47px]">
                  <CtaButton overlay>Become a Client</CtaButton>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120} className="w-full min-w-0">
              <HeroVisual />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[703px] lg:max-w-none">
      <div
        aria-hidden
        className="about-hero-orb pointer-events-none absolute top-[339px] left-[514px] size-[285px] rounded-full bg-[rgba(70,219,104,0.22)] blur-[68px]"
      />

      <div
        className="relative rounded-[47px] p-[14px]"
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(24.74px)",
          WebkitBackdropFilter: "blur(24.74px)",
          boxShadow:
            "0 37px 99px rgba(19,63,31,0.1), inset 0 1px 0 rgba(255,255,255,0.95)",
        }}
      >
        <div className="grid aspect-[675/512] grid-cols-2 grid-rows-2 gap-[17px]  ">
          <div className="relative min-h-0 overflow-hidden rounded-[36px] bg-[#e8f5ec]">
            <Image
              src="/figma/about-page-img/about-hero-small-img.png"
              alt="Team collaborating in a modern office"
              fill
              sizes="329px"
              className="object-cover [transform:translateZ(0)]"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(152deg, rgba(11,72,27,0.02) 6%, rgba(3,146,28,0.065) 28%, rgba(1,159,28,0.11) 50%, rgba(0,168,28,0.2) 94%), rgba(17,117,42,0.09)",
              }}
            />
          </div>

          <div className="relative row-span-2 min-h-0 overflow-hidden rounded-[36px] bg-[#e8f5ec]">
            <Image
              src="/figma/about-page-img/hero-founder.png"
              alt="Founder working on a laptop"
              fill
              sizes="329px"
              className="object-cover [transform:translateZ(0)]"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(133deg, rgba(11,72,27,0.02) 6%, rgba(3,146,28,0.065) 28%, rgba(1,159,28,0.11) 50%, rgba(0,168,28,0.2) 94%), rgba(17,117,42,0.09)",
              }}
            />
          </div>

          <div
            className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-[36px]"
            style={{
              background:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.85), rgba(255,255,255,0) 38%), linear-gradient(152deg, #effaf2 6%, #daf2e0 94%)",
            }}
          >
            <div className="flex flex-col items-center">
              <img
                src="/figma/about-page-img/softvence-mark.svg"
                alt=""
                width={56.9034}
                height={56.9034}
              />
              <p className="text-[28px] leading-[43px] font-bold tracking-[-1.42px] text-[#00a81c]">
                Softvence
              </p>
            </div>
          </div>
        </div>

        <div className="about-trust-float absolute right-[56px] bottom-[25px] w-[235px] max-w-[calc(50%-28px)]">
          <div
            className="flex items-center gap-[11px] rounded-[21px] border border-white/90 px-[19px] py-[15px] shadow-[0_20px_47px_rgba(18,58,29,0.16),inset_0_1px_0_rgba(255,255,255,0.95)]"
            style={{
              background: "rgba(255,255,255,0.74)",
              backdropFilter: "blur(24.74px)",
              WebkitBackdropFilter: "blur(24.74px)",
            }}
          >
            <span className="flex size-[52px] items-center justify-center rounded-[15px] bg-[#00a81c] text-[21px] leading-[32px] font-bold text-white">
              10+
            </span>
            <span className="text-[16px] leading-[24px] font-bold whitespace-nowrap text-[#24352a]">
              Years of Trust
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
