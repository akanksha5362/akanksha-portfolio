"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import TypingText from "@/components/ui/TypingText";
import Button from "@/components/ui/Button";
import HeroVisual from "@/components/three/HeroVisual";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-5"
          >
            MaterialApp( status: &quot;open to internships&quot; )
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-medium leading-[1.08] tracking-tight text-ink"
          >
            Hi, I&apos;m {site.name.split(" ")[0]} —
            <br />
            <span className="text-emerald">
              <TypingText
                words={["Flutter Developer.", "AI Enthusiast.", "CS Student.", "Builder."]}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-ink-dim text-[15px] sm:text-base leading-relaxed max-w-md"
          >
            I build mobile apps with Flutter and explore what AI-powered
            software can do — currently a CS Engineering student at MITS
            Gwalior, seeking internships and hackathons to grow as a
            developer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="#projects" variant="primary">
              View projects <ArrowDown size={15} />
            </Button>
            <Button href={site.resumeUrl} variant="secondary" icon={<FileDown size={15} />}>
              Resume
            </Button>
            <Button href="#contact" variant="ghost" icon={<Mail size={15} />}>
              Get in touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center gap-6 prop-token"
          >
            <span>
              <span className="prop-key">education</span>:{" "}
              <span className="prop-value">&quot;B.Tech CSE&apos;28&quot;</span>
            </span>
            <span className="hidden sm:inline">
              <span className="prop-key">location</span>:{" "}
              <span className="prop-value">&quot;Gwalior, IN&quot;</span>
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-faint hover:text-cyan transition-colors"
        aria-label="Scroll to About"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
