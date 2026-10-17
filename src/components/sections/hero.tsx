import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { StarIcon } from "@/components/icons/star";

/** Letters of the SOFTVENCE wordmark, with the exact advance width from Figma. */
const WORDMARK = [
  { char: "S", width: 182 },
  { char: "O", width: 209 },
  { char: "F", width: 168 },
  { char: "T", width: 168 },
  { char: "V", width: 182 },
  { char: "N", width: 195 },
  { char: "C", width: 195 },
  { char: "E", width: 182 },
];

const WORDMARK_WIDTH = WORDMARK.reduce((total, letter) => total + letter.width, 0);

/** Peeking hero cards, painted from the back forwards. Positions are
 * relative to the full-bleed 1920px image stage (page coordinates).
 * `fit` mirrors the Figma image scale mode: STRETCH→fill, FILL→cover. */
const CARDS = [
  { src: "/figma/img/765-4895.jpg", left: 1114, top: 39, width: 287, height: 379, opacity: 0.4, fit: "object-fill" },
  { src: "/figma/img/765-4896.jpg", left: 518, top: 38, width: 292, height: 380, opacity: 0.4, fit: "object-cover" },
  { src: "/figma/img/765-4897.jpg", left: 1009, top: 25, width: 305, height: 407, fit: "object-fill" },
  { src: "/figma/img/765-4898.png", left: 610, top: 24, width: 313, height: 408, fit: "object-fill" },
];

const avatars = [
  "/figma/img/765-4905.png",
  "/figma/img/765-4906.png",
  "/figma/img/765-4907.png",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pt-[72px] pb-[72px] lg:pt-[110px] lg:pb-[110px] xl:pt-[150px] xl:pb-[150px]"
    >
      <div className="page-container">
        <div className="content-1480 flex flex-col gap-[28px] xl:gap-[45px]">
          {/* `pr-[0.03em]` cancels the trailing letter-space CSS adds after the
              last glyph; without it the centred line is 2.25px right of Figma. */}
          <h1 className="text-center text-[clamp(56px,7.8125vw,150px)] leading-[1] font-normal tracking-[-0.03em] text-ink-2 uppercase pr-[0.03em]">
            We <span className="text-brand">build</span> the{" "}
            <span className="text-brand">next</span>
          </h1>

          {/* Media row: wordmark behind, hero cards in front */}
          <div className="relative h-[190px] sm:h-[250px] md:h-[320px] lg:h-[400px] xl:h-[456px]">
            <div className="absolute top-0 left-1/2 w-[1920px] -translate-x-1/2 origin-top scale-[0.4] sm:scale-[0.53] md:scale-[0.68] lg:scale-[0.85] xl:scale-100">
              <div className="relative h-[456px] w-[1920px]">
                {/* Wordmark */}
                <div className="absolute top-[101px] left-[220px] flex h-[245px] w-[1481px]">
                  {WORDMARK.map((letter, index) => (
                    <span
                      key={`${letter.char}-${index}`}
                      style={{ width: `${(letter.width / WORDMARK_WIDTH) * 100}%` }}
                      className="flex h-full items-center justify-center text-[242.04px] leading-[224.05px] font-bold text-[#f1f1f1] uppercase"
                    >
                      {letter.char}
                    </span>
                  ))}
                </div>

                {/* Cards */}
                <div className="absolute top-0 left-0 h-[456px] w-[1920px]">
                  {CARDS.map((card) => (
                    <div
                      key={card.src}
                      style={{
                        left: card.left,
                        top: card.top,
                        width: card.width,
                        height: card.height,
                        opacity: card.opacity,
                      }}
                      className="absolute overflow-hidden rounded-[30px]"
                    >
                      <Image
                        src={card.src}
                        alt=""
                        fill
                        sizes="313px"
                        className={card.fit}
                      />
                    </div>
                  ))}

                  {/* Featured card */}
                  <div className="absolute top-0 left-[710px] h-[456px] w-[476px]">
                    <div className="group relative h-full w-full cursor-pointer overflow-hidden rounded-[30px]">
                      <Image
                        src="/figma/img/765-4899.jpg"
                        alt="Quantumix — branding identity and product design case study"
                        fill
                        sizes="476px"
                        priority
                        className="object-cover"
                      />

                      {/* Figma Variant2 hover tint overlays: 20% black + 10% brand green with 2px backdrop blur */}
                      <div className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-0 bg-brand/10 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="absolute top-[366px] left-[23px] flex w-[268px] flex-col gap-[5px]">
                        <p className="text-[24.67px] leading-[29.6px] font-bold tracking-[-0.04em] text-white">
                          Quantumix
                        </p>
                        <div className="flex gap-[8px] text-[17.27px] leading-[25.9px] tracking-[-0.01em] text-white">
                          <span>Branding Identity</span>
                          <span>Product Design</span>
                        </div>
                      </div>

                      {/* Arrow badge: hidden above (-61px) and slides down to 27px on hover */}
                      <span className="absolute top-[-61px] right-[27px] flex size-14 items-center justify-center rounded-full bg-white text-brand shadow-sm transition-all duration-300 ease-out group-hover:top-[27px]">
                        <ArrowUpRight className="size-[15px]" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline + social proof */}
          <div className="relative h-[133px]">
            <p className="relative -top-px mx-auto w-[560px] max-w-full text-center text-[24px] leading-[33.6px] font-medium text-ink-2">
              The Softvence Creative Agency developing
              <br />
              the future of commerce
            </p>

            <div className="relative mx-auto mt-[24px] h-[42px] w-[336px]">
              <div className="absolute top-[3px] left-0 h-9 w-[92px]">
                {avatars.map((src, index) => (
                  <span
                    key={src}
                    style={{ left: index * 28, zIndex: index + 1 }}
                    className="absolute top-0 size-9 overflow-hidden"
                  >
                    <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                  </span>
                ))}
              </div>

              <p className="absolute top-0 left-[104px] w-[97px] text-[14px] leading-[21px] text-ink-2">
                Loved by 500+
                <br />
                Founders
              </p>

              <Image
                src="/figma/img/765-4909.png"
                alt="Clutch"
                width={24}
                height={27}
                className="absolute top-[8px] left-[232px]"
              />

              <p className="absolute top-[3px] left-[268px] text-[13px] leading-[21px] text-ink-2">
                13 Reviews
              </p>

              <div className="absolute top-[26px] left-[268px] flex gap-[2px] text-brand">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} className="size-3" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
