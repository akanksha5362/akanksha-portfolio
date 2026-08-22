"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { navItems } from "@/data/nav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navItems.map((n) => n.href.replace("#", "")));

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[80]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-panel"
        >
          <a href="#top" className="font-display font-semibold text-ink tracking-tight">
            AS<span className="text-emerald">.</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    isActive
                      ? "text-bg bg-emerald"
                      : "text-ink-dim hover:text-ink"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openPalette}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-ink-dim hover:text-ink hover:border-cyan/40 transition-colors text-xs font-mono"
              aria-label="Open command palette"
            >
              <Command size={13} />
              <span>K</span>
            </button>
            <button
              className="md:hidden text-ink"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl mt-2 p-4 flex flex-col gap-1 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-ink-dim hover:text-ink hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </header>
  );
}
