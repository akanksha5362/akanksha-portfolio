"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { skillGroups, currentlyLearning } from "@/data/skills";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        const bars = sectionRef.current!.querySelectorAll<HTMLElement>(
          "[data-skill-bar]"
        );
        bars.forEach((bar) => {
          const level = bar.dataset.skillBar;
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${level}%`,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section id="skills" className="py-28 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Skills(categorized: true)"
          title="The stack I build with."
          description="Grouped the way I actually reach for them — language fundamentals, the mobile stack, backend, and the tools that hold it together."
        />

        <div className="grid md:grid-cols-2 gap-5 mt-14">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-display text-lg text-ink">{group.title}</h3>
                  <span className="font-mono text-[11px] text-ink-faint">
                    0{gi + 1}
                  </span>
                </div>
                <p className="text-ink-faint text-xs mb-5">{group.description}</p>

                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-ink-dim font-mono">
                          {skill.name}
                        </span>
                        <span className="text-xs text-ink-faint font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          data-skill-bar={skill.level}
                          className="h-full rounded-full bg-gradient-to-r from-emerald to-cyan"
                          style={{ width: "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <GlassCard className="p-6">
            <p className="eyebrow mb-3">currentlyLearning: [ ]</p>
            <div className="flex flex-wrap gap-2">
              {currentlyLearning.map((item) => (
                <Badge key={item} variant="cyan">
                  {item}
                </Badge>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
