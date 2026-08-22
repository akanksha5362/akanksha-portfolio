"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Smartphone } from "lucide-react";

export default function DeviceFrame({
  label,
  index,
  total,
  accent,
}: {
  label: string;
  index: number;
  total: number;
  accent: string;
}) {
  return (
    <div className="sticky top-28 mx-auto w-full max-w-[240px]">
      <div className="relative rounded-[2.2rem] border-[6px] border-[#151d19] bg-[#0D1310] shadow-panel aspect-[9/19] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#151d19] rounded-b-xl z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-grid-glow">
          <AnimatePresence mode="wait">
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-3"
            >
              <Smartphone size={28} strokeWidth={1.2} className="text-ink-faint" />
              <p className="font-mono text-[11px] text-ink-dim leading-relaxed">
                {label}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
          style={{ background: accent }}
        />
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-emerald" : "w-1.5 bg-white/15"
            }`}
          />
        ))}
      </div>
      <p className="text-center font-mono text-[11px] text-ink-faint mt-2">
        screen {index + 1} / {total}
      </p>
    </div>
  );
}
