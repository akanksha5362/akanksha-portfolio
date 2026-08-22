"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github, Smartphone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { projects } from "@/data/projects";

const filters = ["All", "Flutter", "AI", "Firebase"] as const;
type Filter = (typeof filters)[number];

function matchesFilter(tech: string[], filter: Filter) {
  if (filter === "All") return true;
  if (filter === "AI") return tech.some((t) => /ai|gemini/i.test(t));
  return tech.some((t) => t.toLowerCase().includes(filter.toLowerCase()));
}

const colorMap = {
  emerald: "from-emerald/20 to-transparent border-emerald/20",
  cyan: "from-cyan/20 to-transparent border-cyan/20",
  deepblue: "from-deepblue/40 to-transparent border-deepblue/40",
};

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      if (!gridRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          gridRef.current!.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            },
          }
        );
      }, gridRef);
    })();
    return () => ctx?.revert();
  }, [filter]);

  const visible = projects.filter((p) => matchesFilter(p.tech, filter));

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            eyebrow="Widget(name: 'FeaturedProjects')"
            title="Things I've actually shipped."
            description="No professional experience yet — so these projects carry the weight. Each one opens into a full case study: the problem, the approach, and what I'd do differently."
          />

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono border transition-colors ${
                  filter === f
                    ? "bg-emerald text-bg border-emerald"
                    : "text-ink-dim border-white/10 hover:border-emerald/40 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid lg:grid-cols-1 gap-6 mt-14">
          {visible.map((project) => (
            <GlassCard
              key={project.slug}
              className={`p-0 overflow-hidden border bg-gradient-to-br ${colorMap[project.color]} hover:shadow-glow transition-shadow`}
            >
              <div className="grid md:grid-cols-[1.1fr_1fr]">
                <div className="p-7 sm:p-9 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      {project.featured && (
                        <Badge variant="cyan">Featured</Badge>
                      )}
                      <span className="font-mono text-xs text-ink-faint">
                        {project.year} · {project.status}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-ink mb-2">
                      {project.name}
                    </h3>
                    <p className="text-emerald-soft text-sm font-medium mb-3">
                      {project.tagline}
                    </p>
                    <p className="text-ink-dim text-sm leading-relaxed mb-5 max-w-md">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-emerald transition-colors"
                    >
                      View case study <ArrowUpRight size={15} />
                    </Link>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-ink-dim hover:text-ink transition-colors"
                    >
                      <Github size={15} /> Code
                    </a>
                  </div>
                </div>

                <div className="relative min-h-[220px] md:min-h-0 bg-black/20 flex items-center justify-center border-t md:border-t-0 md:border-l border-white/5">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-2 text-ink-faint"
                  >
                    <Smartphone size={40} strokeWidth={1.2} />
                    <span className="font-mono text-[11px]">
                      {project.screenshots.length} screens · placeholder
                    </span>
                  </motion.div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
