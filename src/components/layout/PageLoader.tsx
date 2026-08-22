"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
        >
          <div className="font-mono text-sm text-ink-dim flex flex-col items-center gap-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-[2px] bg-gradient-to-r from-emerald via-cyan to-emerald rounded-full"
            />
            <span>
              <span className="prop-key">building</span>(
              <span className="prop-value">&quot;portfolio&quot;</span>)
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
