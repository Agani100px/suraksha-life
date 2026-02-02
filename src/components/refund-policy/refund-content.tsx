"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface RefundContentProps {
    title: string;
    content: string;
    lastUpdated?: string;
}

const RefundContent = ({ title, content, lastUpdated }: RefundContentProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (titleRef.current) {
            tl.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }
            );
        }

        if (contentRef.current) {
            tl.fromTo(contentRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.5"
            );
        }

    }, []);

    return (
        <div ref={containerRef} className="container mx-auto px-4 md:px-6 lg:px-8 py-24 md:py-32 max-w-4xl min-h-[60vh]">
            <div className="relative mb-12 text-center">
                <h1 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#05668D] mb-4 uppercase tracking-wider">
                    {title}
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-[#05668D] to-[#00A896] mx-auto rounded-full"></div>
            </div>

            {lastUpdated && (
                <p className="text-center text-slate-500 mb-10 italic">
                    Last Updated: {new Date(lastUpdated).toLocaleDateString()}
                </p>
            )}

            <div
                ref={contentRef}
                className="prose prose-lg prose-slate max-w-none 
        prose-headings:text-[#05668D] prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide
        prose-a:text-[#00A896] prose-a:no-underline hover:prose-a:text-[#05668D] hover:prose-a:underline
        prose-strong:text-slate-800 prose-strong:font-bold
        prose-li:marker:text-[#00A896]
        bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-100"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default RefundContent;
