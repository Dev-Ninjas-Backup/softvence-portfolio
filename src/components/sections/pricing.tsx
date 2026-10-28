"use client";

import { useState, type ComponentType } from "react";
import Image from "next/image";
import { useCtaModal } from "@/components/ui/cta-modal";

/* ------------------------------------------------------------------ */
/*  Tab icons (exact Figma vectors)                                   */
/* ------------------------------------------------------------------ */

function IconStarter({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      className={className ?? "size-[21.5px]"}
      aria-hidden
    >
      <path
        d="M21.9528 18.2771L19.6001 14.2021C19.5619 14.1359 19.5027 14.0843 19.432 14.0555C19.3611 14.0267 19.2827 14.0224 19.2091 14.0431L10.8556 16.4037L2.68223 14.094C2.60867 14.0732 2.53025 14.0775 2.45942 14.1063C2.3886 14.1351 2.32941 14.1867 2.29123 14.2529L0.0460876 18.1415C0.01991 18.1868 0.00442659 18.2375 0.000818066 18.2896C-0.00279046 18.3419 0.00557117 18.3942 0.0252653 18.4427C0.0449595 18.4913 0.0754662 18.5346 0.114459 18.5695C0.153452 18.6043 0.199902 18.63 0.250266 18.6441L10.8692 21.6448C10.9288 21.6616 10.9918 21.6621 11.0516 21.646L21.7441 18.7811C21.795 18.7675 21.8422 18.7424 21.8818 18.7075C21.9215 18.6727 21.9526 18.6294 21.9727 18.5807C21.993 18.532 22.0017 18.4793 21.9981 18.4266C21.9947 18.374 21.9792 18.3227 21.9528 18.2771ZM2.75266 14.8282L10.6188 17.051V20.8596L0.862157 18.1027L2.75266 14.8282ZM11.3063 20.866V16.9905L19.1385 14.7775L21.1335 18.2329L11.3063 20.866ZM3.28643 13.3852L10.7622 15.4975C10.8233 15.5148 10.888 15.5148 10.9491 15.4975L18.6047 13.3344C18.6551 13.3201 18.7016 13.2945 18.7405 13.2597C18.7796 13.2247 18.81 13.1813 18.8297 13.1328C18.8494 13.0844 18.8578 13.0321 18.8542 12.9798C18.8506 12.9276 18.8351 12.8769 18.8089 12.8316L16.296 8.47906C16.2578 8.41285 16.1987 8.36128 16.1278 8.33249C16.057 8.30369 15.9786 8.29933 15.9051 8.32008L11.0602 9.68935L6.04366 8.27178C5.97008 8.25098 5.89168 8.25532 5.82085 8.28411C5.75003 8.31291 5.69084 8.36452 5.65266 8.43076L3.08238 12.8826C3.0562 12.9279 3.04073 12.9785 3.03711 13.0308C3.0335 13.083 3.04187 13.1354 3.06156 13.1839C3.08126 13.2323 3.11176 13.2757 3.15075 13.3106C3.18975 13.3455 3.23607 13.371 3.28643 13.3852ZM17.9927 12.7928L11.3063 14.6821V10.3339L15.8345 9.05469L17.9927 12.7928ZM6.11403 9.00618L10.6187 10.279V14.7426L3.89837 12.8434L6.11403 9.00618ZM6.64782 7.563L10.9667 8.78326C11.0278 8.80056 11.0926 8.80056 11.1536 8.78326L15.3005 7.61147C15.3509 7.59724 15.3973 7.5717 15.4364 7.53679C15.4753 7.50187 15.5059 7.45852 15.5256 7.41004C15.5453 7.36154 15.5536 7.30919 15.55 7.25698C15.5464 7.20478 15.5309 7.15408 15.5047 7.10876L11.9168 0.894032C11.8199 0.726126 11.6804 0.586697 11.5125 0.489757C11.3446 0.392817 11.1542 0.341783 10.9603 0.341783C10.7664 0.341783 10.5759 0.392817 10.408 0.489757C10.2401 0.586697 10.1007 0.726126 10.0037 0.894032L6.44372 7.06029C6.41754 7.1056 6.40206 7.15631 6.39845 7.20852C6.39484 7.26073 6.4032 7.31308 6.4229 7.36156C6.44259 7.41006 6.4731 7.45341 6.5121 7.48832C6.55109 7.52322 6.59746 7.54877 6.64782 7.563ZM14.6885 7.07013L11.3216 8.02154L11.2912 1.19175C11.3022 1.20649 11.3123 1.22186 11.3216 1.23776L14.6885 7.07013ZM10.5991 1.23776C10.6005 1.23523 10.6023 1.23316 10.6038 1.23068L10.6338 7.97475L7.26001 7.02136L10.5991 1.23776Z"
        fill={active ? "#FFFFFF" : "#242424"}
      />
    </svg>
  );
}

function IconGrowth({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      className={className ?? "size-[21.5px]"}
      aria-hidden
    >
      <path
        d="M17.3912 8.01048C18.2098 9.42285 18.6425 11.0368 18.6425 12.6777C18.6425 15.1674 17.6729 17.5083 15.9123 19.2688C14.1519 21.0293 11.8111 21.9989 9.32127 21.9989C6.83147 21.9989 4.49068 21.0293 2.73016 19.2688C0.969589 17.5083 0 15.1674 0 12.6777C0 10.1879 0.969589 7.84709 2.73016 6.08656C4.49073 4.32604 6.83147 3.3564 9.32127 3.3564C10.9623 3.3564 12.5762 3.78912 13.9885 4.60777C14.0671 4.65364 14.1243 4.72879 14.1475 4.81673C14.1707 4.90467 14.1581 4.99826 14.1126 5.07696C14.0669 5.15566 13.9919 5.21308 13.9042 5.23661C13.8163 5.26016 13.7227 5.24791 13.6438 5.20256C12.3361 4.44454 10.8414 4.04392 9.32132 4.04392C4.56059 4.04387 0.68747 7.91699 0.68747 12.6777C0.68747 17.4384 4.56058 21.3114 9.32127 21.3114C14.0819 21.3114 17.9551 17.4384 17.9551 12.6777C17.9551 11.1577 17.5545 9.66304 16.7964 8.35525C16.7507 8.27637 16.7382 8.18258 16.7616 8.09447C16.785 8.00638 16.8426 7.93121 16.9214 7.8855C17.0003 7.83978 17.0941 7.82726 17.1822 7.8507C17.2702 7.87414 17.3455 7.93162 17.3912 8.01048ZM21.8984 4.38477L18.9815 7.30162C18.9389 7.34429 18.8857 7.37497 18.8274 7.39059C18.7691 7.40621 18.7077 7.40621 18.6495 7.3906L15.8458 6.63933L9.56433 12.9207C9.49722 12.9879 9.40927 13.0214 9.32127 13.0214C9.23328 13.0214 9.14532 12.9879 9.0782 12.9207C9.01375 12.8562 8.97755 12.7689 8.97755 12.6777C8.97755 12.5865 9.01375 12.4991 9.0782 12.4346L15.3596 6.1532L14.6083 3.34948C14.5927 3.2912 14.5927 3.22983 14.6083 3.17154C14.624 3.11326 14.6546 3.06011 14.6973 3.01744L17.6142 0.100592C17.6569 0.0579544 17.71 0.0272963 17.7683 0.0116958C17.8266 -0.00390476 17.888 -0.00389848 17.9463 0.0117139C18.0044 0.0273264 18.0576 0.0579955 18.1002 0.100641C18.1429 0.143287 18.1736 0.196408 18.1892 0.254671L18.9405 3.05838L21.7443 3.80961C21.8026 3.82523 21.8557 3.85591 21.8984 3.89859C21.9411 3.94126 21.9717 3.99441 21.9874 4.0527C22.003 4.111 22.003 4.17238 21.9874 4.23067C21.9717 4.28896 21.9411 4.34211 21.8984 4.38477ZM20.9912 4.31964L18.5709 3.6711C18.5126 3.65548 18.4595 3.62479 18.4168 3.58212C18.3741 3.53946 18.3434 3.48632 18.3278 3.42803L17.6793 1.00771L15.3237 3.36323L16.0236 5.97528L18.6357 6.67516L20.9912 4.31964ZM9.32127 7.86286C10.037 7.86286 10.7259 8.01633 11.3689 8.31899C11.4514 8.35779 11.5459 8.36225 11.6317 8.33137C11.7174 8.30051 11.7874 8.23684 11.8262 8.15438C11.8455 8.11355 11.8565 8.06932 11.8587 8.02422C11.8608 7.97913 11.854 7.93407 11.8387 7.8916C11.8235 7.84912 11.7999 7.81008 11.7696 7.77669C11.7391 7.7433 11.7025 7.71622 11.6617 7.697C10.9265 7.35091 10.139 7.17539 9.32127 7.17539C6.2873 7.17539 3.81898 9.6437 3.81898 12.6777C3.81898 15.7117 6.2873 18.18 9.32127 18.18C12.3552 18.18 14.8236 15.7117 14.8236 12.6777C14.8236 11.86 14.648 11.0727 14.3019 10.3373C14.2632 10.2548 14.1931 10.1911 14.1073 10.1602C14.0216 10.1293 13.927 10.1338 13.8445 10.1726C13.762 10.2114 13.6984 10.2814 13.6676 10.3672C13.6366 10.453 13.641 10.5475 13.6799 10.63C13.9826 11.2731 14.136 11.962 14.136 12.6776C14.136 15.3325 11.9762 17.4924 9.32123 17.4924C6.66631 17.4924 4.5064 15.3325 4.5064 12.6776C4.5064 10.0227 6.66635 7.86286 9.32127 7.86286Z"
        fill={active ? "#FFFFFF" : "#242424"}
      />
    </svg>
  );
}

function IconScale({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      className={className ?? "size-[21.5px]"}
      aria-hidden
    >
      <path
        d="M11.384 0.586563C11.3115 0.564475 11.2337 0.566959 11.1628 0.593627C11.0918 0.620294 11.0317 0.669654 10.9917 0.734026L3.42168 12.9366C3.3893 12.9886 3.37145 13.0485 3.36996 13.1097C3.36847 13.171 3.3834 13.2316 3.41321 13.2852C3.44302 13.3387 3.48661 13.3834 3.53947 13.4144C3.59233 13.4456 3.65255 13.4618 3.71386 13.4618H9.82855L9.02146 21.047C9.01646 21.0949 9.02156 21.1433 9.03644 21.1892C9.05133 21.235 9.07566 21.2772 9.10785 21.313C9.14006 21.3488 9.17941 21.3775 9.22338 21.3972C9.26736 21.4169 9.31496 21.4271 9.36313 21.4272C9.41771 21.4272 9.47151 21.4143 9.52006 21.3894C9.5686 21.3644 9.6105 21.3282 9.64224 21.2839L18.568 8.85545C18.6048 8.80409 18.6268 8.74357 18.6316 8.68054C18.6362 8.6175 18.6234 8.5544 18.5946 8.49816C18.5657 8.44193 18.5219 8.39473 18.468 8.36177C18.4141 8.3288 18.3521 8.31134 18.2889 8.31131H11.3578L11.6273 0.928235C11.6301 0.852468 11.6077 0.777913 11.5637 0.716179C11.5196 0.654446 11.4565 0.608652 11.384 0.586563ZM17.619 8.99844L9.8423 19.8265L10.5521 13.1542C10.5572 13.1062 10.5522 13.0577 10.5373 13.0118C10.5225 12.966 10.4981 12.9237 10.4659 12.8879C10.4336 12.852 10.3942 12.8233 10.3501 12.8037C10.306 12.7842 10.2583 12.774 10.2101 12.774H4.33154L10.8931 2.19731L10.6576 8.64233C10.6559 8.68848 10.6636 8.7345 10.6801 8.77762C10.6967 8.82074 10.7218 8.86008 10.7539 8.89325C10.7859 8.92657 10.8243 8.95306 10.8669 8.97114C10.9094 8.98921 10.9552 8.9985 11.0013 8.99844H17.619Z"
        fill={active ? "#FFFFFF" : "#242424"}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data Types & Plans                                                 */
/* ------------------------------------------------------------------ */

type Feature = {
  icon: string;
  title: string;
  desc: string;
};

type PlanData = {
  id: string;
  label: string;
  Icon: ComponentType<{ className?: string; active?: boolean }>;
  idealFor: string;
  price: string;
  period: string;
  commitment: string;
  ctaText: string;
  features: Feature[];
  altTitle: string;
  altImage: string;
  altNote: string;
};

const PLANS: PlanData[] = [
  {
    id: "starter",
    label: "Starter Plan",
    Icon: IconStarter,
    idealFor: "Ideal for landing pages, quick design tasks, and early ideas.",
    price: "$1,499",
    period: "/Monthly",
    commitment: "*Minimum commitment — 1 month",
    ctaText: "SELECT PLAN",
    features: [
      {
        icon: "/figma/765-6589.svg",
        title: "First Mockup in 96hrs",
        desc: "Initial design concepts delivered within four days with quality-focused execution.",
      },
      {
        icon: "/figma/765-6599.svg",
        title: "Single Project Queue",
        desc: "Dedicated project queue ensuring focused attention on active requirements.",
      },
      {
        icon: "/figma/765-6609.svg",
        title: "Basic Design Iterations",
        desc: "Two rounds of design refinements to achieve your desired outcomes clearly.",
      },
      {
        icon: "/figma/765-6619.svg",
        title: "Assigned Designer",
        desc: "Skilled designer assigned to handle your project requirements effectively.",
      },
    ],
    altTitle: "Starter Plan",
    altImage: "/figma/765-6641.png",
    altNote: "Pause or cancel whenever you wish.",
  },
  {
    id: "growth",
    label: "Growth Plan",
    Icon: IconGrowth,
    idealFor: "Ideal for scaling businesses, product sprints, and continuous design needs.",
    price: "$2,999",
    period: "/Monthly",
    commitment: "*Minimum commitment — 1 month",
    ctaText: "SELECT PLAN",
    features: [
      {
        icon: "/figma/765-6589.svg",
        title: "First Mockup in 48hrs",
        desc: "Fast-turnaround high fidelity concepts delivered with accelerated priority.",
      },
      {
        icon: "/figma/765-6599.svg",
        title: "Dual Project Queue",
        desc: "Simultaneous project execution with parallel sprint deliverables.",
      },
      {
        icon: "/figma/765-6609.svg",
        title: "Unlimited Iterations",
        desc: "Ongoing refinements until your vision and metrics are fully achieved.",
      },
      {
        icon: "/figma/765-6619.svg",
        title: "Senior Product Designer",
        desc: "Dedicated senior product specialist leading your product lifecycle.",
      },
    ],
    altTitle: "Growth Plan",
    altImage: "/figma/765-6641.png",
    altNote: "Pause or cancel whenever you wish.",
  },
  {
    id: "scale",
    label: "Scale Plan",
    Icon: IconScale,
    idealFor: "Ideal for full-scale digital acceleration, multi-brand design systems, and rapid growth.",
    price: "$4,999",
    period: "/Monthly",
    commitment: "*Minimum commitment — 3 months",
    ctaText: "SELECT PLAN",
    features: [
      {
        icon: "/figma/765-6589.svg",
        title: "First Mockup in 24hrs",
        desc: "Next-day turnarounds with dedicated senior design director oversight.",
      },
      {
        icon: "/figma/765-6599.svg",
        title: "Unlimited Active Queue",
        desc: "Multiple cross-functional requests managed across dedicated squads.",
      },
      {
        icon: "/figma/765-6609.svg",
        title: "Unlimited Revisions + Dev Support",
        desc: "Complete design and front-end engineering iteration cycles.",
      },
      {
        icon: "/figma/765-6619.svg",
        title: "Full Dedicated Squad",
        desc: "Senior designer, motion expert, and lead front-end engineer.",
      },
    ],
    altTitle: "Scale Plan",
    altImage: "/figma/765-6641.png",
    altNote: "Pause or cancel whenever you wish.",
  },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function TabSwitcher({
  activeIdx,
  onSelect,
}: {
  activeIdx: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-[30px]">
      {PLANS.map((plan, i) => {
        const active = i === activeIdx;
        const { Icon } = plan;
        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onSelect(i)}
            className={`flex cursor-pointer items-center gap-[7.5px] rounded-[16px] transition-all duration-300 ${
              active
                ? "bg-brand px-[31px] py-[17.2px] text-white shadow-[0_4px_16px_rgba(0,171,12,0.25)]"
                : "border border-line bg-white px-[30px] py-[17.2px] text-ink-2 hover:border-brand/40"
            }`}
          >
            <Icon active={active} className="size-[21.5px]" />
            <span className="text-[17.2px] font-medium leading-[25.8px] tracking-[-0.02em]">
              {plan.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PricingCard({ plan }: { plan: PlanData }) {
  const { open } = useCtaModal();
  return (
    <article
      className="relative shrink-0 overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_1px_2px_rgba(15,26,15,0.04),0_16px_40px_-8px_rgba(15,26,15,0.06)]"
      style={{ width: 974.5, height: 568.2 }}
    >
      {/* Left side — features stack so a wrapping title cannot cover its description */}
      <div className="absolute top-[44px] left-[44px] flex w-[390px] flex-col">
        {plan.features.map((feature, i) => (
          <div key={feature.title}>
            {i > 0 && <div className="my-[18px] h-[1.07px] w-[374px] bg-line" />}
            <div className="flex items-start gap-[10px]">
              <span className="mt-[4px] block size-[20px] shrink-0">
                <img src={feature.icon} alt="" className="size-full object-contain" />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="text-[22px] leading-[28px] font-semibold text-ink-2">{feature.title}</h4>
                <p className="mt-[8px] text-[16px] leading-[26px] text-[#5C635E]">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vertical divider at x=461.11, width 1.07px, height 480px */}
      <div
        className="absolute bg-line"
        style={{ left: 461, top: 44, width: 1.07, height: 480 }}
      />

      {/* Right side — Pricing, Ideal for, and CTA button */}
      <div
        className="absolute flex flex-col"
        style={{ left: 461, right: 0, top: 0, height: 568 }}
      >
        {/* Description: Ideal for... (at x=56.5 from divider, y=45.14, w=372) */}
        <p
          className="absolute text-center text-[16px] leading-[26px] text-[#5C635E]"
          style={{ left: 56.5, top: 45, width: 372 }}
        >
          {plan.idealFor}
        </p>

        {/* Horizontal divider at y=158.87, width 425.28px */}
        <div
          className="absolute bg-line"
          style={{ left: 44, top: 159, width: 425.3, height: 1.07 }}
        />

        {/* Price display at y=217.77 */}
        <div
          className="absolute flex items-baseline justify-center"
          style={{ left: 44, top: 218, width: 425.3 }}
        >
          <span className="text-[55.9px] font-bold leading-[67.1px] tracking-[-0.0192em] text-brand">
            {plan.price}
          </span>
          <span className="ml-[6px] text-[17.2px] font-normal leading-[67.1px] tracking-[-0.0625em] text-ink-2">
            {plan.period}
          </span>
        </div>

        {/* Minimum commitment note at y=298.81 */}
        <span
          className="absolute text-center text-[17.2px] font-normal leading-[25.8px] tracking-[-0.02em] text-[#697589]"
          style={{ left: 44, top: 299, width: 425.3 }}
        >
          {plan.commitment}
        </span>

        {/* CTA button at y=383.51, height 55.89px, width 425.28px */}
        <button
          type="button"
          onClick={open}
          className="group absolute flex cursor-pointer items-center justify-center rounded-[16px] border-0 bg-brand font-inherit transition-all duration-300 hover:bg-brand-deep hover:shadow-[0_8px_24px_rgba(0,171,12,0.3)]"
          style={{ left: 44, top: 383.5, width: 425.3, height: 55.9 }}
        >
          <span className="text-[19.35px] font-bold leading-[25.15px] tracking-[-0.0178em] text-white uppercase">
            {plan.ctaText}
          </span>
          {/* Circular badge with arrow icon (34.4px x 34.4px) */}
          <span className="absolute right-[100px] flex size-[34.4px] items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105">
            <span className="block size-[11px] shrink-0 transition-transform duration-300 group-hover:translate-x-[1.5px]">
              <img src="/figma/765-6639.svg" alt="" className="size-full" />
            </span>
          </span>
        </button>
      </div>
    </article>
  );
}

function PricingCardAlt({ plan }: { plan: PlanData }) {
  return (
    <article
      className="relative shrink-0 overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_1px_2px_rgba(15,26,15,0.04),0_16px_40px_-8px_rgba(15,26,15,0.06)] transition-transform duration-300 hover:shadow-[0_1px_2px_rgba(15,26,15,0.04),0_20px_48px_-8px_rgba(15,26,15,0.1)]"
      style={{ width: 487.3, height: 568.2 }}
    >
      <Image
        src="/figma/765-6641-rendered.png"
        alt={`${plan.altTitle} preview`}
        fill
        sizes="487px"
        className="object-cover"
        priority
      />
    </article>
  );
}

export function Pricing() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePlan = PLANS[activeIdx];

  return (
    <section id="pricing" className="overflow-hidden bg-surface py-[80px] lg:py-[112px]">
      <div className="page-container">
        <div className="content-1480 flex flex-col items-center">
          {/* Header */}
          <div className="flex flex-col items-center text-center" style={{ gap: 17 }}>
            <span className="text-[17.2px] font-bold leading-[25.8px] tracking-[0.0625em] text-[#171717] uppercase">
              <span className="text-brand">{"//"}</span> Pricing
            </span>
            <h2 className="max-w-[1093px] text-center text-[56px] font-bold leading-[64px] tracking-[-0.02em] text-ink-2 uppercase">
              Flexible Plans for Every Business
            </h2>
            <p
              className="text-center text-[18px] leading-[30px] text-body"
              style={{ maxWidth: 795 }}
            >
              Whether you&apos;re launching a new product or scaling an existing one,
              our flexible engagement models are designed around your goals,
              scope, and growth.
            </p>
          </div>

          {/* Interactive Tab Switcher at mt=[40px] */}
          <div className="mt-[40px] flex justify-center">
            <TabSwitcher activeIdx={activeIdx} onSelect={setActiveIdx} />
          </div>

          {/* Pricing cards at mt-[40px] with exact Figma 17.2px gap, scaled to fit viewport seamlessly without wrapping */}
          <div className="mt-[40px] flex w-full justify-center overflow-visible">
            <div
              className="flex shrink-0 origin-top items-center justify-center transition-transform duration-300 max-lg:flex-col max-lg:items-center max-lg:gap-8"
              style={{
                width: 1479,
                gap: 17.2,
                transform: "scale(min(1, calc((100vw - 80px) / 1480)))",
              }}
            >
              <PricingCard plan={activePlan} />
              <PricingCardAlt plan={activePlan} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}