import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ServiceHero } from "@/components/servicePageComponent/service-hero";
import { Services } from "@/components/sections/services";
import { IndustriesWeServe } from "@/components/sections/industries-we-serve";
import { ServiceWorldwide } from "@/components/servicePageComponent/service-worldwide";
import { Pricing } from "@/components/sections/pricing";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Services — Softvence Creative Agency",
  description:
    "Full-stack, mobile, AI, brand, and commerce services from Softvence. Built in Bangladesh and trusted worldwide.",
};

export default function ServicePage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <ServiceHero />
        <Services />
        <IndustriesWeServe />
        <ServiceWorldwide />
        <Pricing />
        <Footer />
      </main>
    </>
  );
}
