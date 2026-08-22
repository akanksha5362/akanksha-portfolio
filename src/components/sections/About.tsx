"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { Sparkles, Code2, GraduationCap } from "lucide-react";

const facts = [
  {
    icon: Code2,
    title: "What I build",
    body: "Cross-platform mobile apps in Flutter, backed by Firebase — and increasingly, apps that lean on AI to do part of the work for the user.",
  },
  {
    icon: Sparkles,
    title: "What pulls me in",
    body: "The point where mobile development meets AI — using models to remove friction from tasks, not just to add a chat window.",
  },
  {
    icon: GraduationCap,
    title: "Where I'm headed",
    body: "Deepening system design and DSA fundamentals while shipping real projects, on the way to an internship where I can learn from a real engineering team.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="About(context: this)"
          title="A student who'd rather ship than wait."
          description="I'm a Computer Science Engineering student at MITS Gwalior, building mobile applications with Flutter and exploring AI-powered software solutions. I like solving real problems through code, and I'm currently looking for internships and hackathons to learn faster."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="p-6 h-full hover:border-emerald/30 border border-transparent transition-colors">
                <fact.icon className="text-emerald mb-4" size={22} />
                <h3 className="font-display text-lg text-ink mb-2">{fact.title}</h3>
                <p className="text-ink-dim text-sm leading-relaxed">{fact.body}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
