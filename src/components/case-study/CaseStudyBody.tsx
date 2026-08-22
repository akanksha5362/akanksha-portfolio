"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import DeviceFrame from "./DeviceFrame";
import type { Project } from "@/data/projects";

const accentMap = {
  emerald: "#10B981",
  cyan: "#22D3EE",
  deepblue: "#1E3A5F",
};

export default function CaseStudyBody({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);
  const accent = accentMap[project.color];

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      if (!stepsRef.current) return;

      ctx = gsap.context(() => {
        const steps = stepsRef.current!.querySelectorAll<HTMLElement>(
          "[data-step-index]"
        );
        steps.forEach((step) => {
          const idx = Number(step.dataset.stepIndex);
          ScrollTrigger.create({
            trigger: step,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => setActiveIndex(idx),
            onEnterBack: () => setActiveIndex(idx),
          });
        });
      }, stepsRef);
    })();

    return () => ctx?.revert();
  }, []);

  const screenshots =
    project.screenshots.length > 0
      ? project.screenshots
      : [{ label: "Screenshot placeholder" }];

  return (
    <div className="grid md:grid-cols-[240px_1fr] gap-12 lg:gap-20">
      <div className="hidden md:block">
        <DeviceFrame
          label={screenshots[Math.min(activeIndex, screenshots.length - 1)].label}
          index={Math.min(activeIndex, screenshots.length - 1)}
          total={screenshots.length}
          accent={accent}
        />
      </div>

      <div ref={stepsRef} className="space-y-16 max-w-2xl">
        <motion.div
          data-step-index={0}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow mb-3">Overview</p>
          <p className="text-ink-dim leading-relaxed">{project.overview}</p>
        </motion.div>

        <motion.div
          data-step-index={1}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow mb-3">The problem</p>
          <p className="text-ink-dim leading-relaxed">{project.problem}</p>
        </motion.div>

        {project.approach.map((section, i) => (
          <motion.div
            key={section.heading}
            data-step-index={2 + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow mb-3">
              Approach — {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display text-xl text-ink mb-3">
              {section.heading}
            </h3>
            <p className="text-ink-dim leading-relaxed">{section.body}</p>
          </motion.div>
        ))}

        <motion.div
          data-step-index={2 + project.approach.length}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="pt-4 border-t border-white/10"
        >
          <p className="eyebrow mb-3">Outcome</p>
          <p className="text-ink-dim leading-relaxed">{project.outcome}</p>
        </motion.div>
      </div>
    </div>
  );
}
