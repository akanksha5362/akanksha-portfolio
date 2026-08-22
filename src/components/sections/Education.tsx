"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { educationTimeline } from "@/data/education";

export default function Education() {
  const lineRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      if (!lineRef.current || !wrapRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );
      }, wrapRef);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="education" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Education(sorted: 'desc')"
          title="Where I'm learning the fundamentals."
        />

        <div ref={wrapRef} className="relative mt-14 pl-10">
          <div className="absolute left-[7px] top-1 bottom-1 w-[2px] bg-white/10" />
          <div
            ref={lineRef}
            className="absolute left-[7px] top-1 bottom-1 w-[2px] bg-gradient-to-b from-emerald to-cyan"
          />

          {educationTimeline.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <span className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-bg border-2 border-emerald flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
              </span>
              <GlassCard className="p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <GraduationCap className="text-cyan shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-mono text-xs text-cyan/80 mb-1">{item.period}</p>
                    <h3 className="font-display text-lg text-ink mb-1">
                      {item.title}
                    </h3>
                    <p className="text-ink-dim text-sm mb-3">{item.institution}</p>
                    <p className="text-ink-faint text-[13px] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
