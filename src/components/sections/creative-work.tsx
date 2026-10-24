import Image from "next/image";
import { CtaButton } from "@/components/ui/cta-button";

type Project = {
  id: string;
  title: string;
  tags: string[];
  year: string;
  image: string;
  /** Tailwind width class for the card (big = 807px, small = 614px). */
  wide: boolean;
};

const ROW_ONE: Project[] = [
  {
    id: "quantumix",
    title: "Quantumix",
    tags: ["Branding Identity", "Product Design"],
    year: "2025",
    image: "/figma/765-5030.png",
    wide: true,
  },
  {
    id: "neuracore",
    title: "NeuraCore",
    tags: ["Logo Design", "Visual Identity"],
    year: "2025",
    image: "/figma/765-5038.png",
    wide: false,
  },
];

const ROW_TWO: Project[] = [
  {
    id: "orbitek",
    title: "Orbitek",
    tags: ["Landing Page", "Copy Writing"],
    year: "2025",
    image: "/figma/765-5047.png",
    wide: false,
  },
  {
    id: "noventra",
    title: "Noventra",
    tags: ["No-code Development", "Wireframing"],
    year: "2025",
    image: "/figma/765-5055.png",
    wide: true,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const width = project.wide
    ? "w-full lg:w-[807px] lg:max-w-[57%]"
    : "w-full lg:w-[614px] lg:max-w-[43%]";
  return (
    <article className={`group flex ${width} flex-1 cursor-pointer flex-col pb-px`}>
      <div className="relative h-[360px] w-full overflow-hidden rounded-[24.67px] sm:h-[450px] lg:h-[539px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 807px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="relative mt-[14px]">
        <h3 className="text-[24.67px] font-bold leading-[29.6px] tracking-[-0.04em] text-ink-2 transition-colors duration-200 group-hover:text-brand">
          {project.title}
        </h3>
        <div className="mt-[4px] flex h-[26px] items-center text-[17.27px] leading-[25.9px] tracking-[-0.01em] text-ink-2">
          <span>{project.tags[0]}</span>
          <span className="mx-[13px] inline-block size-[2.5px] shrink-0 rounded-full bg-ink-2" />
          <span>{project.tags[1]}</span>
        </div>
        <span className="absolute right-0 top-[1px] text-[17.27px] font-medium leading-[25.9px] tracking-[-0.01em] text-ink-2">
          {project.year}
        </span>
      </div>
    </article>
  );
}

export function CreativeWork() {
  return (
    <section id="creative-work" className="overflow-hidden bg-white py-[80px] lg:py-[112px]">
      <div className="page-container">
        <div className="content-1480 flex flex-col gap-14">
          <div className="flex w-full flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="flex max-w-[919px] flex-col gap-[30px]">
              <span className="text-[20px] font-bold leading-[14px] uppercase text-[#171717]">
                <span className="font-medium text-brand">{"//"}</span>
                {" Creative Work"}
              </span>
              <h2 className="text-[40px] font-bold leading-[48px] tracking-[-0.02em] text-ink-2 uppercase sm:text-[56px] sm:leading-[64px]">
                Every Type of Creative Work
              </h2>
            </div>
            <CtaButton href="#work">View More Work</CtaButton>
          </div>

          <div className="flex w-full flex-col gap-[59px]">
            <div className="flex w-full flex-col gap-[59px] lg:flex-row">
              {ROW_ONE.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            <div className="flex w-full flex-col gap-[59px] lg:flex-row">
              {ROW_TWO.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
