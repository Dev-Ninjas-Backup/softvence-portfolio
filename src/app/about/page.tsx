import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { AboutHero } from "@/components/aboutPageComponent/about-hero";
import { AboutPartners } from "@/components/aboutPageComponent/about-partners";
import { AboutStory } from "@/components/aboutPageComponent/about-story";
import { Showreel } from "@/components/sections/showreel";
import { AboutJourney } from "@/components/aboutPageComponent/about-journey";
import { WhyChooseUs } from "@/components/aboutPageComponent/why-choose-us";
import { OurProcess } from "@/components/sections/our-process";
import { IndustriesWeServe } from "@/components/sections/industries-we-serve";
import { LetsWorkTogether } from "@/components/sections/lets-work-together";
import { AboutFaq } from "@/components/aboutPageComponent/about-faq";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "About Us — Softvence Creative Agency",
  description:
    "Learn about Softvence, our vision, mission, and the creative team behind next-generation digital products and experiences.",
};

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <AboutHero />
        <AboutPartners />
        <AboutStory />
        <Showreel />
        <AboutJourney />
        <WhyChooseUs />
        <OurProcess />
        <IndustriesWeServe />
        <LetsWorkTogether />
        <AboutFaq />
        <Footer />
      </main>
    </>
  );
}
