import Image from "next/image";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";

const STACK_LOGOS = [
  { src: "/figma/about-page-img/why-logo-1.svg", width: 52.6034, height: 52.6034, rotate: true },
  { src: "/figma/about-page-img/why-logo-2.svg", width: 46.59, height: 46.59, rotate: false },
  { src: "/figma/about-page-img/why-logo-3.svg", width: 50.5854, height: 50.5854, rotate: false },
  { src: "/figma/about-page-img/why-logo-4.svg", width: 46.59, height: 46.59, rotate: false },
] as const;

export function WhyChooseUs() {
  return (
    <section className="bg-white pb-[90px] lg:pb-[140px]">
      <div className="page-container">
        <div className="content-1480">
          <div className="mb-[48px] flex flex-col gap-8 lg:mb-[80px] lg:flex-row lg:items-end lg:justify-between">
            <Reveal className="max-w-[886px]">
              <p className="mb-[15px] text-[14px] leading-[20px] font-semibold tracking-[1.12px] uppercase">
                <span className="text-brand">// </span>
                <span className="text-[#5d5d5d]">Why choose us</span>
              </p>
              <h2 className="text-[36px] leading-[44px] font-bold tracking-[-1.12px] text-[#1b1b1b] uppercase sm:text-[56px] sm:leading-[64px]">
                Built on <span className="text-brand">Precision</span>
                <br />
                and Enduring Excellence
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <CtaButton overlay>Talk to Our Experts</CtaButton>
            </Reveal>
          </div>

          <div className="flex flex-col gap-[24px] xl:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-[24px]">
              <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2">
                <Reveal>
                  <article className="flex h-full flex-col items-center gap-[40px] rounded-[24px] bg-[#f5f5f5] px-[24px] pt-[24px] pb-[32px]">
                    <div className="relative w-full overflow-hidden rounded-[16px] border border-[#d5d7da] p-[16px]">
                      <div className="relative flex h-[266px] items-center justify-between overflow-hidden">
                        <Image
                          src="/figma/about-page-img/why-tablet.png"
                          alt="Creatify tablet screens"
                          width={203}
                          height={266}
                          className="h-[266px] w-[203px] object-cover"
                        />
                        <div className="relative h-[249px] w-[130px] overflow-hidden">
                          <Image
                            src="/figma/about-page-img/why-phone-ui.png"
                            alt="Creatify mobile screens"
                            fill
                            sizes="130px"
                            className="object-cover object-left"
                          />
                        </div>
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-y-0 left-0 w-[80px] bg-gradient-to-r from-[#f5f5f5] to-transparent"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-y-0 right-0 w-[80px] bg-gradient-to-l from-[#f5f5f5] to-transparent"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="mb-[12px] text-[24px] font-extrabold text-[#1b1b1b] uppercase">
                        Complete Journey
                      </h3>
                      <p className="text-[16px] leading-[26px] text-body">
                        From wireframes to Webflow deployment, every step is designed
                        in-house.
                      </p>
                    </div>
                  </article>
                </Reveal>

                <Reveal delay={80}>
                  <article className="relative flex min-h-[420px] flex-col items-center justify-between overflow-hidden rounded-[24px] px-[24px] pt-[24px] pb-[32px]">
                    <Image
                      src="/figma/about-page-img/why-live-bg.png"
                      alt=""
                      fill
                      sizes="478px"
                      className="object-cover object-bottom"
                    />
                    <div className="relative z-10 text-center">
                      <h3 className="mb-[12px] text-[24px] font-extrabold text-[#fdfdfd] uppercase">
                        Live Tracking
                      </h3>
                      <p className="mx-auto max-w-[300px] text-[16px] leading-[26px] text-[#f5f5f5]">
                        Track tasks, timelines, and delivery stages with real-time
                        visibility.
                      </p>
                    </div>
                    <div className="relative z-10 mt-6 aspect-[650/464] w-full">
                      <Image
                        src="/figma/about-page-img/why-laptop.png"
                        alt="Creatify dashboard on a laptop"
                        fill
                        sizes="430px"
                        className="object-contain object-bottom"
                      />
                    </div>
                  </article>
                </Reveal>
              </div>

              <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2">
                <Reveal delay={120}>
                  <article className="relative flex min-h-[337px] items-center gap-[16px] overflow-hidden rounded-[24px] py-[16px] pr-[16px] pl-[24px]">
                    <Image
                      src="/figma/about-page-img/why-sat-bg.png"
                      alt=""
                      fill
                      sizes="478px"
                      className="object-cover"
                    />
                    <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-[12px]">
                      <div className="flex items-center gap-[4px]" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <img
                            key={index}
                            src="/figma/about-page-img/why-star.svg"
                            alt=""
                            width={24}
                            height={24}
                          />
                        ))}
                      </div>
                      <h3 className="text-[24px] font-extrabold text-[#1b1b1b] uppercase">
                        Client Satisfaction
                      </h3>
                      <p className="text-[16px] leading-[24px] text-[#414651]">
                        High satisfaction, driven by thoughtful design and quality.
                      </p>
                    </div>
                    <div className="relative z-10 h-[305px] w-[174px] shrink-0 overflow-hidden rounded-[20px]">
                      <Image
                        src="/figma/about-page-img/why-portrait.png"
                        alt="Client portrait"
                        fill
                        sizes="174px"
                        className="object-cover"
                      />
                    </div>
                  </article>
                </Reveal>

                <Reveal delay={160}>
                  <article className="relative flex min-h-[337px] flex-col items-center justify-between overflow-hidden rounded-[24px] bg-[#f5f5f5] p-[24px]">
                    <h3 className="text-center text-[24px] font-extrabold text-[#1b1b1b] uppercase">
                      Team Trust
                    </h3>
                    <div className="relative h-[162px] w-[237px]">
                      <Image
                        src="/figma/about-page-img/why-hands.png"
                        alt="Team stacking hands together"
                        fill
                        sizes="237px"
                        className="object-contain"
                      />
                    </div>
                    <p className="text-center text-[16px] leading-[24px] text-[#414651]">
                      Trusted by over forty companies worldwide.
                    </p>
                  </article>
                </Reveal>
              </div>
            </div>

            <div className="flex w-full flex-col gap-[24px] xl:w-[477px]">
              <Reveal delay={100}>
                <article className="flex flex-col gap-[40px] overflow-hidden rounded-[24px] bg-[#f5f5f5] px-[24px] pt-[24px] pb-[32px]">
                  <div className="text-center">
                    <h3 className="mb-[12px] text-[24px] font-extrabold text-[#1b1b1b]">
                      Modern Stack
                    </h3>
                    <p className="text-[16px] leading-[26px] text-body">
                      We use modern tools and platforms to build fast, future-ready
                      websites.
                    </p>
                  </div>
                  <div className="relative flex items-center justify-between overflow-hidden">
                    {STACK_LOGOS.map((logo) => (
                      <img
                        key={logo.src}
                        src={logo.src}
                        alt=""
                        width={logo.width}
                        height={logo.height}
                        className={logo.rotate ? "rotate-90" : undefined}
                      />
                    ))}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-[66px] bg-gradient-to-r from-[#f5f5f5] to-transparent"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 right-0 w-[69px] bg-gradient-to-l from-[#f5f5f5] to-transparent"
                    />
                  </div>
                </article>
              </Reveal>

              <Reveal delay={180} className="flex-1">
                <article className="relative flex h-full min-h-[480px] flex-col items-center overflow-hidden rounded-[24px] bg-[#f5f5f5] px-[24px] pt-[32px]">
                  <div className="text-center">
                    <h3 className="mb-[2px] text-[24px] font-extrabold text-[#1b1b1b] uppercase">
                      Scalable Design
                    </h3>
                    <p className="text-[16px] leading-[26px] text-body">
                      Our design system scales smoothly as your product, content, and
                      business evolve.
                    </p>
                  </div>
                  <div className="relative mt-[24px] h-[372px] w-[344px]">
                    <Image
                      src="/figma/about-page-img/why-scalable-phone.png"
                      alt="Creatify mobile design system"
                      fill
                      sizes="344px"
                      className="object-contain object-top"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-[#f5f5f5] to-transparent"
                    />
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
