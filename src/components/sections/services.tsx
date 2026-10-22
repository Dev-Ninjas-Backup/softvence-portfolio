import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { RiseText } from "@/components/ui/rise-text";

type Service = {
  num: string;
  /** Figma uses a larger, hairline numeral on the first three cards. */
  numClass: string;
  desc: string;
  justify: boolean;
  title: string;
  subtitle: string;
  image: string;
  img: { left: number; top: number; w: number; h: number; r: number };
  contentTop: number;
  alt: string;
};

const SERVICES: Service[] = [
  {
    num: "01",
    numClass: "text-[60px] leading-[72px] font-extralight",
    desc: "Build scalable, high-performance digital products with our Full-Stack Development services. From intuitive front-end experiences to robust back-end systems and seamless integrations, our experts deliver secure, end-to-end applications tailored to your goals. Partner with us to turn complex ideas into reliable solutions that grow with your business.",
    justify: true,
    title: "Full-Stack Development",
    subtitle: "End-to-end applications",
    image: "/figma/765-6384.png",
    img: { left: 859, top: 36, w: 605, h: 464.2, r: 11.42 },
    contentTop: 44,
    alt: "Full-stack development",
  },
  {
    num: "02",
    numClass: "text-[60px] leading-[72px] font-extralight",
    desc: "Bring your ideas to life with high-performance mobile applications designed around your users and business goals. From strategy and intuitive UX to development and launch, we create scalable iOS and Android experiences that engage customers and drive lasting growth.",
    justify: true,
    title: "Mobile App Development",
    subtitle: "Mobile applications",
    image: "/figma/765-6404.png",
    img: { left: 876, top: 19, w: 636, h: 426.9, r: 0 },
    contentTop: 44,
    alt: "Mobile app development",
  },
  {
    num: "03",
    numClass: "text-[60px] leading-[72px] font-extralight",
    desc: "Turn ideas into intelligent products with our AI development services. From custom machine learning solutions and smart automation to seamless integrations, we build secure, scalable AI tailored to your goals. Partner with our experts to accelerate innovation, improve efficiency, and create measurable business impact.",
    justify: true,
    title: "AI Development",
    subtitle: "AI products & integrations",
    image: "/figma/765-6424.png",
    img: { left: 948, top: 44, w: 488, h: 488, r: 12 },
    contentTop: 44,
    alt: "AI development",
  },
  {
    num: "04",
    numClass: "text-[34px] leading-[40.8px] font-normal",
    desc: "Create a memorable and consistent brand identity that reflects who you are and connects with your audience. From strategic foundations to a complete brand style guideline, we define the visual language, principles, and tools your team needs to show up with clarity across every touchpoint.",
    justify: true,
    title: "Brand Identity",
    subtitle: "Brand style guideline",
    image: "/figma/765-6444.png",
    img: { left: 948, top: 44, w: 488, h: 488, r: 12 },
    contentTop: 58,
    alt: "Brand identity",
  },
  {
    num: "05",
    numClass: "text-[34px] leading-[40.8px] font-normal",
    desc: "Build fast, scalable websites with our Webflow Development services. From custom templates and responsive layouts to CMS architecture and seamless interactions, we create polished digital experiences that are easy to manage and built to perform. Partner with us to launch a flexible, high-impact website tailored to your brand.",
    justify: false,
    title: "Webflow Development",
    subtitle: "Webflow & custom templates",
    image: "/figma/765-6464.png",
    img: { left: 948, top: 44, w: 488, h: 488, r: 12 },
    contentTop: 44,
    alt: "Webflow development",
  },
  {
    num: "06",
    numClass: "text-[34px] leading-[40.8px] font-normal",
    desc: "Build a faster, smarter commerce experience with our Shopify Development expertise. From custom themes and seamless integrations to powerful Shopify apps tailored to your workflows, we create scalable solutions that improve performance, simplify operations, and help your store grow.",
    justify: false,
    title: "Shopify Development",
    subtitle: "Custom Shopify apps",
    image: "/figma/765-6484.png",
    img: { left: 948, top: 44, w: 488, h: 488, r: 12 },
    contentTop: 44,
    alt: "Shopify development",
  },
  {
    num: "07",
    numClass: "text-[34px] leading-[40.8px] font-normal",
    desc: "Build a fast, flexible online presence with our Wix Development services. From custom Wix templates and responsive layouts to seamless integrations and performance optimization, we create polished websites that are easy to manage and designed to help your business grow.",
    justify: false,
    title: "Wix Development",
    subtitle: "Wix templates",
    image: "/figma/765-6504.png",
    img: { left: 948, top: 44, w: 488, h: 488, r: 12 },
    contentTop: 60,
    alt: "Wix development",
  },
  {
    num: "08",
    numClass: "text-[36px] leading-[43.2px] font-normal",
    desc: "Build a flexible, scalable content platform with our CMS development services. From custom themes and integrations to seamless migrations and performance optimization, we tailor every solution to your workflows, brand, and growth goals. Empower your team to manage content effortlessly and deliver exceptional digital experiences across every channel.",
    justify: false,
    title: "CMS Development",
    subtitle: "CMS customization & development",
    image: "/figma/765-6524.png",
    img: { left: 948, top: 44, w: 488, h: 488, r: 12 },
    contentTop: 44,
    alt: "CMS development",
  },
];

/**
 * Figma gives the card titles per-character fills: the leading words use the
 * brand green (#00ab0c) and the final word is tinted #292929.
 */
function ServiceTitle({ title }: { title: string }) {
  const cut = title.lastIndexOf(" ");
  if (cut < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, cut + 1)}
      <span className="text-[#292929]">{title.slice(cut + 1)}</span>
    </>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { img } = service;

  return (
    <div className="page-container">
      <article
        className="group relative h-[576px] w-full overflow-hidden rounded-[32px] shadow-[inset_0_0_0_1px_#E3E8E3,0_1px_2px_rgba(15,26,15,0.04),0_16px_40px_-8px_rgba(15,26,15,0.06)]"
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #f4f4f4 100%)" }}
      >
        {/* Subtle ambient glow on top-right matching Figma EL-4bc59535 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[80px] -right-[80px] size-[360px] rounded-full blur-[40px] opacity-60"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 248, 248, 0.5) 0%, rgba(207, 255, 226, 0.5) 100%)",
          }}
        />

        <div
          className="absolute left-[44px] flex w-[789px] flex-col gap-[107px]"
          style={{ top: service.contentTop }}
        >
          <div className="flex w-[710px] flex-col gap-[12px]">
            <p className={`text-ink-3 ${service.numClass}`}>{service.num}</p>
            <p
              className={`text-[18px] leading-[30px] text-body ${
                service.justify ? "text-justify" : ""
              }`}
            >
              {service.desc}
            </p>
          </div>

          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[4px]">
              <p className="text-[40px] leading-[48px] font-semibold tracking-[-0.015em] text-brand">
                <ServiceTitle title={service.title} />
              </p>
              <p className="text-[16px] leading-[19.2px] text-ink-3">{service.subtitle}</p>
            </div>

            <div className="flex flex-col gap-[24px]">
              <div
                className="-mt-px h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, #00ab0c 0%, rgba(204, 204, 204, 0.28) 100%)",
                }}
              />
              <a
                href="#contact"
                className="flex cursor-pointer items-center justify-between text-ink-3 transition-colors duration-200 hover:text-brand"
              >
                <span className="text-[18px] leading-[32.43px] font-medium">
                  Talk to Our Experts
                </span>
                <span className="flex size-[34px] items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight className="size-[15px]" />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div
          className="absolute overflow-hidden"
          style={{
            left: img.left,
            top: img.top,
            width: img.w,
            height: img.h,
            borderRadius: img.r > 0 ? `${img.r}px` : undefined,
          }}
        >
          <Image
            src={service.image}
            alt={service.alt}
            fill
            sizes={`${Math.round(img.w)}px`}
            className="object-cover"
          />
        </div>
      </article>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-white py-[140px]">
      <div className="flex flex-col gap-[40px]">
        <header className="page-container flex flex-col gap-[30px] pb-[24px]">
          {/* Per-character fills: "//" #00ab0c, "  Services" #171717 */}
          <p className="text-[14px] leading-[20px] font-semibold tracking-[0.08em] text-[#171717] uppercase">
            <span className="text-brand">{"//"}</span>{"  Services"}
          </p>
          {/* Second line is tinted #a4a7ae via a per-character fill override. */}
          <RiseText
            className="max-w-[1040px] text-[56px] leading-[64px] font-bold tracking-[-0.02em] text-gray-900 uppercase"
            parts={[
              { text: "Transforming bold ideas into " },
              { text: "exceptional digital products", className: "text-[#a4a7ae]" },
            ]}
          />
        </header>

        {SERVICES.map((service) => (
          <ServiceCard key={service.num} service={service} />
        ))}
      </div>
    </section>
  );
}
