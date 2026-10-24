import Image from "next/image";
import { CtaButton } from "@/components/ui/cta-button";
import { CtaModalTrigger } from "@/components/ui/cta-modal";
import { Globe } from "@/components/ui/globe";

const AVATARS = [
  { src: "/figma/765-4933.png", left: 23 },
  { src: "/figma/765-4934.png", left: 72 },
  { src: "/figma/765-4935.png", left: 120 },
];

/** Shared border treatment for the bento cards (Figma: 1.1px, 10% black). */
const CARD_BORDER = "rounded-[17.62px] border-[1.1px] border-black/10";

function Stat({ value, unit, className }: { value: string; unit: string; className?: string }) {
  return (
    <div
      className={`text-[57.26px] leading-[68.7px] font-medium tracking-[-0.0415em] text-ink-2 ${className ?? ""}`}
    >
      {value}
      <span className="font-normal text-brand">{unit}</span>
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" className="overflow-hidden bg-white py-[80px] lg:py-[112px]">
      <div className="page-container">
        <div className="content-1480 flex flex-col gap-[56px]">
          {/* Header */}
          <div className="flex w-[1427px] max-w-full items-center justify-between">
            <div className="flex flex-col gap-[28px]">
              <div className="flex flex-col gap-[35px]">
                {/* Per-character fills: "//" #00ab0c, rest #171717 */}
                <p className="text-[14px] leading-[20px] font-semibold tracking-[0.08em] text-[#171717] uppercase">
                  <span className="text-brand">{"//"}</span> Featured Work
                </p>
                <h2 className="text-[56px] leading-[64px] font-bold tracking-[-0.02em] text-ink-2 uppercase">
                  Turning Ideas Into Digital Impact.
                </h2>
              </div>
              <p className="w-[712px] max-w-full text-[18px] leading-[30px] text-body">
                End-to-end digital solutions designed around your business goals,
                powered by strategy, technology, and creative thinking.
              </p>
            </div>
            <CtaButton overlay>Become a Client</CtaButton>
          </div>

          {/* Bento grid */}
          <div className="flex items-start gap-[13px]">
            {/* Column 1 */}
            <div className="flex w-[467px] shrink-0 flex-col gap-[13px]">
              <div className={`relative h-[104px] w-[467px] ${CARD_BORDER}`}>
                {AVATARS.map((avatar) => (
                  <span
                    key={avatar.src}
                    style={{ left: avatar.left }}
                    className="absolute top-[19px] size-[66px] overflow-hidden rounded-full"
                  >
                    <Image src={avatar.src} alt="" width={66} height={66} className="size-full object-cover" />
                  </span>
                ))}
                <div className="absolute top-[15px] left-[266px] flex w-[187px] flex-col gap-[4px]">
                  <p className="text-[16px] leading-[23.1px] font-bold text-ink-2">200+ Digital Solutions</p>
                  <p className="text-[12px] leading-[23.1px] font-medium text-ink-2">
                    Delivered across diverse industries
                  </p>
                </div>
              </div>

              <div className={`relative h-[528px] w-[467px] ${CARD_BORDER}`}>
                <Image
                  src="/figma/765-4940.svg"
                  alt=""
                  width={35}
                  height={35}
                  className="absolute top-[26px] left-[27px]"
                />
                <p className="absolute top-[47px] left-[28px] w-[401px] text-[22px] leading-[32px] font-medium tracking-[-0.005em] text-ink">
                  Our platform feels faster, smoother,
                  <br />
                  and
                  <br />
                  just works better and intuitively. The
                  <br />
                  engagement metrics don&rsquo;t lie.
                </p>
                <p className="absolute top-[474px] left-[28px] text-[17.18px] leading-[26.4px] font-semibold text-muted">
                  Client Satisfaction
                </p>
                <Stat value="95" unit="%" className="absolute top-[398px] left-[28px]" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex w-[467px] shrink-0 flex-col gap-[13px]">
              <div
                className={`relative h-[509px] w-[467px] overflow-hidden bg-[#f7f7f7] ${CARD_BORDER}`}
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(23,23,23,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,23,23,0.06) 1px, transparent 1px)",
                  backgroundSize: "46px 46px",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    maskImage:
                      "linear-gradient(90deg, #000 0%, #000 64%, rgba(0,0,0,0.72) 84%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(90deg, #000 0%, #000 64%, rgba(0,0,0,0.72) 84%, transparent 100%)",
                  }}
                >
                  <Globe
                    className="h-full min-h-0"
                    phi={4.4}
                    theta={0.2}
                    dark={0}
                    scale={1.02}
                    diffuse={0.9}
                    mapSamples={22000}
                    mapBrightness={11}
                    baseColor="#d5d5d5"
                    markerColor="#bdbdbd"
                    glowColor="#ececec"
                    opacity={0.55}
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.003}
                  />
                </div>
              </div>

              <div className={`relative h-[122px] w-[467px] bg-brand ${CARD_BORDER}`}>
                <div className="absolute top-[21px] left-[23px] flex gap-[4px] text-[39.64px] leading-[47.6px] font-semibold text-white">
                  <span className="w-[23px]">2</span>
                  <span className="w-[23px]">0</span>
                  <span className="w-[23px]">+</span>
                </div>
                <p className="absolute top-[78px] left-[23px] text-[14.65px] leading-[23.1px] text-white">
                  Global Awards &amp; Features
                </p>
                <span className="absolute top-[35px] left-[391px] flex size-[53px] items-center justify-center rounded-full bg-white">
                  <Image src="/figma/765-4963.svg" alt="" width={26} height={26} />
                </span>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex w-[467px] shrink-0 flex-col gap-[13px]">
              <div className={`relative h-[533px] w-[467px] ${CARD_BORDER}`}>
                <p className="absolute top-[31px] left-[27px] w-[424px] text-[22px] leading-[32px] font-medium tracking-[-0.005em] text-ink">
                  They understood our vision, transformed complex requirements into
                  a clear digital product, and delivered an experience built for
                  growth.
                </p>
                <p className="absolute top-[441px] left-[28px] text-[16.96px] leading-[26.4px] font-semibold text-muted">
                  Users &amp; Digital Experiences
                </p>
                <Stat value="5K" unit="+" className="absolute top-[364px] left-[28px]" />
              </div>

              <CtaModalTrigger className={`relative h-[99px] w-[467px] border-0 bg-transparent p-0 font-inherit ${CARD_BORDER}`}>
                <Image
                  src="/figma/765-4976.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="absolute top-[34px] left-[23px]"
                />
                <p className="absolute top-[37px] left-[64px] text-[14.65px] leading-[23.1px] font-bold text-[#3c3c3c]">
                  Available For Work
                </p>
                <span className="absolute top-[28px] left-[400px] flex size-[44px] items-center justify-center rounded-full border-[1.1px] border-black/10">
                  <Image src="/figma/765-4981.svg" alt="" width={22} height={22} />
                </span>
              </CtaModalTrigger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
