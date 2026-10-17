import Image from "next/image";

/** Nine project cards, in the order Figma renders them. */
const CARD_IMAGES = [
  "/figma/765-6254.png",
  "/figma/765-6268.png",
  "/figma/765-6282.png",
  "/figma/765-6296.png",
  "/figma/765-6310.png",
  "/figma/765-6324.png",
  "/figma/765-6338.png",
  "/figma/765-6352.png",
  "/figma/765-6366.png",
];

const SPECS = [
  { label: "Price range", value: "$600-$800", width: "w-auto" },
  { label: "Project duration", value: "7-30 days", width: "w-auto" },
  {
    label: "Industry",
    value: "Financial & Business Services",
    width: "w-[221px]",
  },
];

function ProjectCard({ src }: { src: string }) {
  return (
    <article className="flex h-[610px] w-[581px] shrink-0 flex-col gap-[20px] rounded-[36px] bg-white p-[12px]">
      <div className="relative h-[370px] w-[557px] overflow-hidden rounded-[32px]">
        <Image src={src} alt="" fill sizes="557px" className="object-cover" />
      </div>
      <div className="flex flex-col items-center justify-center gap-[12px] px-[20px] py-[12px]">
        <p className="w-[517px] text-[22px] leading-[30px] font-semibold text-ink">
          Garage Door Repair Platform
        </p>
        <div className="flex gap-[32px]">
          {SPECS.map((spec) => (
            <div key={spec.label} className={`flex flex-col gap-[8px] ${spec.width}`}>
              <p className="text-[12px] leading-[16.4px] font-medium tracking-[0.06em] text-muted-2 uppercase">
                {spec.label}
              </p>
              <p className="text-[16px] leading-[21.9px] font-semibold text-ink">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function Showreel() {
  return (
    <section id="projects" className="bg-surface py-[140px]">
      <div className="flex flex-col items-center gap-[88px]">
        {/* Showreel title */}
        <div className="flex items-center gap-[40px]">
          <span className="text-[96px] leading-[104px] font-semibold tracking-[-0.03em] text-ink-2 uppercase">
            2026
          </span>
          <span className="relative block h-[118px] w-[421px] overflow-hidden rounded-[20px]">
            <Image
              src="/figma/765-6248.png"
              alt=""
              width={421}
              height={421}
              className="absolute -top-[152px] left-0"
            />
          </span>
          <span className="text-[96px] leading-[104px] font-semibold tracking-[-0.03em] text-ink-2 uppercase">
            Showreels
          </span>
        </div>

        {/* Project cards strip */}
        <div className="relative w-full overflow-hidden">
          <div className="page-container">
            <div className="flex w-max gap-[32px]">
              {CARD_IMAGES.map((src) => (
                <ProjectCard key={src} src={src} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
