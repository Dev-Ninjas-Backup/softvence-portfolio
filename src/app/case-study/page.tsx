import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CaseStudies } from "@/components/caseStudyPageComponent/case-studies";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Case Studies — Softvence Creative Agency",
  description:
    "Featured Softvence case studies across SaaS, fintech, and other industries.",
};

export default function CaseStudyPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <CaseStudies />
        <Footer />
      </main>
    </>
  );
}
