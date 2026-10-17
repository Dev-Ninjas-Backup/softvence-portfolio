import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Showreel } from "@/components/sections/showreel";
import { Services } from "@/components/sections/services";
import { Testimonial } from "@/components/sections/testimonial";
import { CreativeWork } from "@/components/sections/creative-work";
import { OurProcess } from "@/components/sections/our-process";
import { IndustriesWeServe } from "@/components/sections/industries-we-serve";
import { Pricing } from "@/components/sections/pricing";
import { LetsWorkTogether } from "@/components/sections/lets-work-together";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <FeaturedWork />
        <Showreel />
        <Services />
        <Testimonial />
        <CreativeWork />
        <OurProcess />
        <IndustriesWeServe />
        <Pricing />
        <LetsWorkTogether />
        <Footer />
      </main>
    </>
  );
}
