"use client";

import { useState, type ComponentType } from "react";

function IconDiscover({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 27 27" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="12" cy="11" r="2.4" fill="currentColor" />
      <circle cx="21" cy="20" r="2.1" fill="currentColor" />
    </svg>
  );
}

function IconPlan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 27 27" fill="none" className={className} aria-hidden>
      <rect x="3.6" y="3.6" width="19.8" height="20.8" rx="3" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M8.2 9.6h10.6M8.2 13.6h7.8M8.2 17.6h9.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconDesign({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 27 27" fill="none" className={className} aria-hidden>
      <path d="M18 3.4 23.6 9 11 21.6l-6.3.6.6-6.3z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

function IconDevelop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 27 27" fill="none" className={className} aria-hidden>
      <path
        d="M13.7 6v15.3M6.9 10.2 2.6 14.5l4.3 4.3M20.5 10.2l4.3 4.3-4.3 4.3M7.6 21.3h12.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLaunch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 27 27" fill="none" className={className} aria-hidden>
      <path
        d="M13.5 2.6c4.7 5.2 7 8.6 7 11.4s-2.3 6.2-7 11.4c-4.7-5.2-7-8.6-7-11.4s2.3-6.2 7-11.4Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M13.5 8.6v10.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

type Step = {
  n: string;
  title: string;
  desc: string;
  Icon: ComponentType<{ className?: string }>;
  /** [left, top, height] */
  card: [number, number, number];
  /** circle / bubble [left, top] */
  node: [number, number];
  /** vertical connector [left, top] */
  connector: [number, number];
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Discover",
    desc: "We understand your business, goals, users, and project requirements.",
    Icon: IconDiscover,
    card: [16, 400, 230],
    node: [114, 313],
    connector: [142, 372],
  },
  {
    n: "02",
    title: "Plan",
    desc: "We define product strategy, technical approach, features, timeline, and roadmap.",
    Icon: IconPlan,
    card: [314, 239, 230],
    node: [420, 525],
    connector: [440, 493],
  },
  {
    n: "03",
    title: "Design",
    desc: "Our UI/UX team creates intuitive user experiences, wireframes, prototypes, and design systems.",
    Icon: IconDesign,
    card: [613, 384, 254],
    node: [719, 309],
    connector: [739, 352],
  },
  {
    n: "04",
    title: "Develop",
    desc: "Our full-stack engineers build secure, scalable, high-performance web and mobile products.",
    Icon: IconDevelop,
    card: [911, 239, 254],
    node: [1017, 525],
    connector: [1037, 493],
  },
  {
    n: "05",
    title: "Launch & Grow",
    desc: "We deploy, test, optimize, monitor, and provide ongoing support as your product grows.",
    Icon: IconLaunch,
    card: [1209, 384, 254],
    node: [1315, 309],
    connector: [1335, 352],
  },
];

const WAVE_PATH =
  "M0 62C140 62 155 1 295 1s155 61 295 61 155-61 295-61 155 61 295 61 155-61 295-61h5";

const WAVE_STOPS: Array<[number, number]> = [
  [0, 1],
  [5.74, 1],
  [7.43, 0],
  [12.5, 0],
  [14.19, 1],
  [25.68, 1],
  [27.36, 0],
  [32.43, 0],
  [34.12, 1],
  [45.61, 1],
  [47.3, 0],
  [52.36, 0],
  [54.05, 1],
  [65.54, 1],
  [67.23, 0],
  [72.3, 0],
  [73.99, 1],
  [85.47, 1],
  [87.16, 0],
  [92.23, 0],
  [93.92, 1],
  [100, 1],
];

function Wave() {
  return (
    <svg
      viewBox="0 0 1480 63"
      fill="none"
      className="absolute left-0 top-[515px] w-[1480px] overflow-visible"
      style={{ height: 63 }}
      aria-hidden
    >
      <defs>
        <linearGradient id="op-wave-green" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1480" y2="0">
          {WAVE_STOPS.map(([offset, opacity], i) => (
            <stop key={i} offset={`${offset}%`} stopColor="#00AB0C" stopOpacity={opacity} />
          ))}
        </linearGradient>
      </defs>
      <path d={WAVE_PATH} stroke="#DDE2EC" strokeWidth="2.01" />
      <path d={WAVE_PATH} stroke="url(#op-wave-green)" strokeWidth="2.68" />
    </svg>
  );
}

function StepCard({
  step,
  active,
  onSelect,
}: {
  step: Step;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`absolute cursor-pointer rounded-[24px] transition-all duration-300 hover:scale-[1.02] ${
        active
          ? "bg-white shadow-[inset_0_0_0_1.34px_#00AB0C,0_2.68px_10.72px_rgba(0,0,0,0.06),0_10.72px_37.54px_rgba(15,169,104,0.133)]"
          : "bg-[#FAFBFC] shadow-[inset_0_0_0_1px_#E3E8E3,0_1px_2px_rgba(15,26,15,0.04),0_16px_40px_-8px_rgba(15,26,15,0.06)] hover:bg-white"
      }`}
      style={{ left: step.card[0], top: step.card[1], width: 255, height: step.card[2] }}
    >
      <div
        className={`absolute left-1/2 top-[28px] flex size-[53.62px] -translate-x-1/2 items-center justify-center rounded-[16.09px] transition-colors duration-300 ${
          active ? "bg-[#00AB0C]" : "bg-[#F1F3F7]"
        }`}
      >
        <step.Icon className={`size-[27px] transition-colors duration-300 ${active ? "text-white" : "text-[#00AB0C]"}`} />
      </div>
      <h3 className="absolute inset-x-0 top-[98px] text-center text-[17.43px] font-bold leading-[26.14px] tracking-[-0.174px] text-[#242424]">
        {step.title}
      </h3>
      <p className="absolute left-[23px] top-[134px] w-[209px] text-center text-[15.42px] leading-[23.89px] text-[#5B635D]">
        {step.desc}
      </p>
    </div>
  );
}

function StepNode({
  step,
  active,
  onSelect,
}: {
  step: Step;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onSelect}
        aria-label={`Select step ${step.n}: ${step.title}`}
        className={`absolute flex cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:scale-110 ${
          active
            ? "bg-gradient-to-br from-[#00AB0C] to-[rgba(0,171,12,0.733)] shadow-[inset_0_0_0_2.68px_#00AB0C,0_0_0_3.42px_rgba(15,169,104,0.26)]"
            : "bg-white shadow-[inset_0_0_0_2.68px_#D0D7E3] hover:shadow-[inset_0_0_0_2.68px_#00AB0C]"
        }`}
        style={{
          left: step.node[0],
          top: step.node[1],
          width: active ? 59 : 42.9,
          height: active ? 59 : 42.9,
        }}
      >
        <span
          className={`font-bold ${
            active ? "text-[17.43px] leading-[17.43px] text-white" : "text-[14.75px] leading-[14.75px] text-[#9AA5B4]"
          }`}
        >
          {step.n}
        </span>
      </button>
      <div
        className={`absolute w-[2.68px] transition-colors duration-300 ${
          active ? "bg-gradient-to-b from-[rgba(0,171,12,0.133)] to-[rgba(0,171,12,0.533)]" : "bg-[#E4E8F0]"
        }`}
        style={{ left: step.connector[0], top: step.connector[1], height: 32 }}
      />
    </>
  );
}

export function OurProcess() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentStep = STEPS[activeIdx];
  const CurrentIcon = currentStep.Icon;

  return (
    <section id="our-process" className="relative w-full overflow-hidden bg-[#F6F8F6] py-[100px] lg:py-[140px]" style={{ minHeight: 1126 }}>
      <div className="page-container">
        <div className="relative mx-auto h-[846px] w-[1480px] shrink-0">
          <span className="absolute left-0 top-0 text-[14px] font-semibold leading-[20px] tracking-[1.12px] whitespace-pre text-[#171717] uppercase">
            <span className="text-brand">{"//"}</span>
            {" Our Process"}
          </span>

          <h2 className="absolute left-0 top-[51px] w-[760px] text-[56px] font-bold leading-[64px] tracking-[-1.12px] text-[#242424] uppercase">
            How <span className="text-brand">It Works</span>
          </h2>

          <p className="absolute left-[1024px] top-[32px] w-[456px] text-[16px] leading-[26px] text-[#5C635E]">
            From idea to launch, we turn your vision into a scalable digital solution.
          </p>

          <div
            className="absolute left-0 top-[147px] h-[1.34px] w-[1480px]"
            style={{ background: "linear-gradient(90deg, #E4E8F0 0%, rgba(228,232,240,0) 80%)" }}
          />

          <Wave />

          {STEPS.map((step, i) => (
            <StepCard
              key={step.n}
              step={step}
              active={i === activeIdx}
              onSelect={() => setActiveIdx(i)}
            />
          ))}
          {STEPS.map((step, i) => (
            <StepNode
              key={step.n}
              step={step}
              active={i === activeIdx}
              onSelect={() => setActiveIdx(i)}
            />
          ))}

          {/* Dynamic Active Step Banner */}
          <div className="absolute left-0 top-[680px] h-[166px] w-[1480px] rounded-[24px] bg-[#F8F9FB] shadow-[inset_0_0_0_1px_#E3E8E3,0_1px_2px_rgba(15,26,15,0.04),0_16px_40px_-8px_rgba(15,26,15,0.06)] transition-all duration-300">
            <div className="absolute left-[39px] top-[51px] flex size-[64px] items-center justify-center rounded-[16.09px] bg-[#00AB0C] transition-transform duration-300">
              <CurrentIcon className="size-[27px] text-white" />
            </div>
            <span className="absolute left-[130px] top-[34px] text-[14.75px] font-bold leading-[22.12px] tracking-[1.18px] text-[#00AB0C] uppercase">
              Step {currentStep.n}
            </span>
            <div className="absolute left-[206px] top-[44px] h-px w-[32px] bg-[#D0D7E3]" />
            <h3 className="absolute left-[130px] top-[62px] text-[22.79px] font-bold leading-[34.18px] text-[#242424]">
              {currentStep.title}
            </h3>
            <p className="absolute left-[130px] top-[102px] w-[602px] text-[18px] leading-[30px] text-[#5C635E]">
              {currentStep.desc}
            </p>

            {/* Step Indicators / Interactive Tabs */}
            <div className="absolute left-[1334px] top-[78px] flex items-center gap-[8.04px]">
              {STEPS.map((s, i) => (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Jump to Step ${s.n}`}
                  className={`cursor-pointer rounded-[5.36px] transition-all duration-300 ${
                    i === activeIdx
                      ? "h-[11px] w-[32px] bg-[#00AB0C]"
                      : "size-[11px] bg-[#D0D7E3] hover:bg-[#00AB0C]/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
