"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Montserrat, Poppins } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ACFData } from "@/types/acf";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700", "800"],
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});

interface AboutMeProps {
    data: ACFData;
}

const AboutMe = ({ data }: AboutMeProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Image
            gsap.from(imageContainerRef.current, {
                opacity: 0,
                x: -50,
                duration: 1,
                scrollTrigger: {
                    trigger: imageContainerRef.current,
                    start: "top 80%",
                },
            });

            // Animate Text
            gsap.from(textContainerRef.current, {
                opacity: 0,
                x: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: textContainerRef.current,
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Placeholder until we determine how to handle "dynamic" swap without a second image in data
    // For now, scale effect on hover matches "dynamic" feeling

    // Parse HTML description safely
    const createMarkup = (html: string) => {
        return { __html: html };
    };

    return (
        <section
            ref={sectionRef}
            className="w-full py-20 bg-[#ECF0F3] overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Image with Frame */}
                <div
                    ref={imageContainerRef}
                    className="relative flex justify-center"
                >
                    <div
                        className="relative p-6 bg-[#ECF0F3] rounded-xl transition-transform duration-500 hover:scale-[1.02]"
                        style={{
                            background: "linear-gradient(145deg, #E2E8EC, #E2E8EC)",
                            boxShadow: "5px 5px 15px #D1D9E6, -5px -5px 15px #FFFFFF",
                        }}
                    >
                        <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-lg overflow-hidden">
                            {/* Primary Image */}
                            <Image
                                src={data.doctor_about_image.url}
                                alt={data.doctor_about_image.alt || data.am_doctor_name}
                                fill
                                className="object-cover object-top transition-transform duration-700 hover:scale-110"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Text Content */}
                <div ref={textContainerRef} className="flex flex-col space-y-6 text-left">
                    <div className="space-y-2">
                        <h4
                            className={cn(
                                "text-sm font-bold tracking-[0.2em] text-[#05668D] uppercase",
                                montserrat.className
                            )}
                        >
                            {data.am_title}
                        </h4>
                        <h2
                            className={cn(
                                "text-4xl md:text-5xl font-extrabold text-[#3C3E41]",
                                montserrat.className
                            )}
                        >
                            {/* Doctor Name - assuming format "Dr. Name (MBBS)" */}
                            {data.am_doctor_name.split("(")[0]}
                            <span className="text-2xl font-bold block md:inline md:ml-2 text-[#3C3E41]">
                                {data.am_doctor_name.includes("(") ? `(${data.am_doctor_name.split("(")[1]}` : ""}
                            </span>
                        </h2>
                    </div>

                    <div
                        className={cn(
                            "text-slate-600 text-base leading-relaxed space-y-4 prose max-w-none prose-p:my-2 prose-strong:text-[#05668D]",
                            poppins.className
                        )}
                        dangerouslySetInnerHTML={createMarkup(data.doctor_about_description)}
                    />

                    <div className="pt-4">
                        <Button
                            asChild
                            className="bg-gradient-to-r from-[#05668D] to-[#02C39A] text-white hover:opacity-90 transition-opacity px-8 py-6 rounded-md text-lg font-medium shadow-lg hover:shadow-xl"
                        >
                            <a href={data.button_2_link}>
                                {data.button_2}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
