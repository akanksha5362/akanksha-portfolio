"use client";

import { motion } from "framer-motion";
import { Trophy, Award, GitBranch } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { achievements } from "@/data/achievements";

const icons = {
  Hackathons: Trophy,
  Certifications: Award,
  "Open Source": GitBranch,
} as const;

export default function Achievements() {
  const categories = ["Hackathons", "Certifications", "Open Source"] as const;

  return (
    <section id="achievements" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Achievements(placeholders: true)"
          title="Building this list, one entry at a time."
          description="I'm early in the process of entering hackathons and open-source work — this section is scaffolded so it's easy to keep current as things land."
        />

        <div className="grid sm:grid-cols-3 gap-5 mt-14">
          {categories.map((category, i) => {
            const Icon = icons[category];
            const items = achievements.filter((a) => a.category === category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="p-6 h-full border border-dashed border-white/10">
                  <Icon className="text-emerald mb-4" size={22} />
                  <h3 className="font-display text-base text-ink mb-4">{category}</h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="text-xs text-ink-faint font-mono leading-relaxed border-l-2 border-white/10 pl-3"
                      >
                        {item.detail}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
