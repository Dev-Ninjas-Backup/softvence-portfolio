import Image from "next/image";

const THUMBS = [
  { src: "/figma/765-4998.png", radius: 78 },
  { src: "/figma/765-5000.png", radius: 12 },
  { src: "/figma/765-5002.png", radius: 12 },
  { src: "/figma/765-5004.png", radius: 12 },
  { src: "/figma/765-5006.png", radius: 12 },
];

export function Testimonial() {
  return (
    <section
      id="testimonial"
      className="flex items-center justify-center overflow-hidden bg-[#F6F8F6] px-10"
      style={{ height: "927px" }}
    >
      <div className="flex w-[1480px] shrink-0 flex-row items-center justify-between gap-[60px]">
        <div className="flex w-[924px] flex-row items-start gap-24">
          <div className="flex w-[440px] flex-col gap-[22px]">
            <div className="flex w-[440px] flex-col gap-6">
              <span className="w-[440px] text-[14px] font-semibold leading-5 tracking-[1.12px] text-[#171717] uppercase">
                <span className="text-brand">{"//"}</span>
                {" My Testimonial"}
              </span>
              <h2 className="w-[440px] text-[56px] font-bold leading-16 tracking-[-1.12px] uppercase text-[#242424]">
                Clients words
              </h2>
            </div>
            <p className="w-[440px] text-[16px] leading-[26px] text-[#5C635E]">
              Throughout creative journey, I’ve been honored
              <br />
              to receive recognition from respected
            </p>
          </div>

          <div className="flex w-[388px] flex-col gap-8">
            <div className="relative h-[480px] w-[388px] overflow-hidden rounded-[20px]">
              <Image src="/figma/765-4995.png" alt="Ronald Richards" fill sizes="388px" className="object-cover" />
            </div>
            <div className="flex w-[388px] flex-row gap-3">
              {THUMBS.map((t, i) => (
                <button
                  key={t.src}
                  type="button"
                  aria-label={`Testimonial ${i + 1}`}
                  className="relative size-[68px] shrink-0 overflow-hidden"
                  style={{ borderRadius: t.radius }}
                >
                  <Image src={t.src} alt="" fill sizes="68px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex h-[471px] w-[480px] shrink-0 flex-col gap-7">
          <div className="flex w-[480px] flex-col gap-8">
            <div className="flex w-[480px] flex-row items-center gap-4">
              <div className="relative h-7 w-[68px] shrink-0">
                <Image src="/figma/765-5010.png" alt="5 star rating" fill sizes="68px" className="object-contain" />
              </div>
              <div className="h-px w-[182px] shrink-0 bg-[#171717]/8" />
              <div className="relative h-5 w-[116px] shrink-0">
                <Image src="/figma/765-5012.png" alt="Verified review" fill sizes="116px" className="object-contain" />
              </div>
            </div>
            <div className="flex w-[480px] flex-col gap-4">
              <h5 className="w-[357px] text-[22px] font-semibold leading-8 text-[#242424]">
                “Your Gateway to Digital Success.”
              </h5>
              <p className="w-[396px] text-[16px] leading-[26px] text-[#5C635E]">
                We believe in the power of digital transformation.
                <br />
                Dedicated team of experts is committed to propelling
                <br />
                your brand to new heights through cutting-edge
                <br />
                strategies &amp; unparalleled creativity. Whether you&apos;re
                <br />
                looking for a captivating website design.
              </p>
            </div>
          </div>
          <div className="flex w-[480px] flex-col gap-0.5">
            <h5 className="w-[170px] text-[22px] font-semibold leading-8 text-[#00AB0C]">Ronald Richards</h5>
            <p className="w-[167px] text-[16px] font-medium leading-6 text-[#242424]">Laravel developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
