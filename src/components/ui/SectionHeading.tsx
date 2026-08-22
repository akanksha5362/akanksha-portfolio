"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}
    >
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="section-heading">{title}</h2>
      {description && (
        <p className="text-ink-dim mt-4 max-w-xl text-[15px] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
