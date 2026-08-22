"use client";

import { motion } from "framer-motion";
import { Radar } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-emerald/10 border border-emerald/20 flex items-center justify-center shrink-0">
              <Radar className="text-emerald animate-pulse" size={26} />
            </div>
            <div className="flex-1">
              <p className="eyebrow mb-2">Experience(status: actively_seeking)</p>
              <h3 className="font-display text-xl sm:text-2xl text-ink mb-2">
                Currently seeking internship opportunities.
              </h3>
              <p className="text-ink-dim text-sm leading-relaxed max-w-2xl">
                I haven&apos;t had a professional role yet — what I have instead is a
                track record of finishing what I start. I&apos;m looking for an
                internship or hackathon team where I can learn from engineers
                who&apos;ve shipped at scale.
              </p>
            </div>
            <Button href={`mailto:${site.email}`} variant="primary" className="shrink-0">
              Let&apos;s talk
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
