import React from "react";
import { getPageData, getAboutPageNewData } from "@/lib/api";
import AboutHero from "@/components/about/about-hero";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AboutContent from "@/components/about/about-content"; // Import the client component

export const metadata = {
    title: "About Us | Suraksha Life",
    description: "Learn more about Suraksha Life and our commitment to healthcare.",
};

export default async function AboutPage() {
    const [homeData, aboutData] = await Promise.all([
        getPageData(),
        getAboutPageNewData()
    ]);

    if (!homeData || !aboutData) return null;

    return (
        <main className="min-h-screen bg-white">
            <Header data={homeData} />

            <AboutHero />

            <AboutContent data={aboutData} />

            <Footer data={homeData} />
        </main>
    );
}
