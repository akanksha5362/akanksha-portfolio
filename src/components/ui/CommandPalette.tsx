"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, Home, Folder, User } from "lucide-react";
import { navItems } from "@/data/nav";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (e.key === "/" && document.activeElement?.tagName === "INPUT") return;
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const openHandler = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", openHandler);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", openHandler);
    };
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      if (href.startsWith("#")) {
        window.location.hash = href;
      } else if (href.startsWith("http") || href.startsWith("mailto")) {
        window.open(href, "_blank");
      } else {
        router.push(href);
      }
    },
    [router]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[151] w-[92vw] max-w-lg"
          >
            <Command
              label="Command Palette"
              className="glass rounded-2xl overflow-hidden shadow-panel border border-white/10"
            >
              <div className="flex items-center gap-2 px-4 border-b border-white/10">
                <span className="font-mono text-cyan text-sm">$</span>
                <Command.Input
                  autoFocus
                  placeholder="Search sections, projects, actions..."
                  className="w-full bg-transparent py-3.5 text-sm text-ink placeholder:text-ink-faint outline-none font-mono"
                />
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2 no-scrollbar">
                <Command.Empty className="text-center text-sm text-ink-faint py-6">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Navigate"
                  className="text-xs font-mono text-ink-faint uppercase tracking-wider px-2 py-1.5"
                >
                  <Command.Item
                    onSelect={() => go("#top")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-dim aria-selected:bg-white/[0.06] aria-selected:text-ink cursor-pointer"
                  >
                    <Home size={15} /> Home
                  </Command.Item>
                  {navItems.map((item) => (
                    <Command.Item
                      key={item.href}
                      onSelect={() => go(item.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-dim aria-selected:bg-white/[0.06] aria-selected:text-ink cursor-pointer"
                    >
                      <User size={15} /> {item.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Projects"
                  className="text-xs font-mono text-ink-faint uppercase tracking-wider px-2 py-1.5 mt-1"
                >
                  {projects.map((p) => (
                    <Command.Item
                      key={p.slug}
                      onSelect={() => go(`/projects/${p.slug}`)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-dim aria-selected:bg-white/[0.06] aria-selected:text-ink cursor-pointer"
                    >
                      <Folder size={15} /> {p.name}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Actions"
                  className="text-xs font-mono text-ink-faint uppercase tracking-wider px-2 py-1.5 mt-1"
                >
                  <Command.Item
                    onSelect={() => go(site.resumeUrl)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-dim aria-selected:bg-white/[0.06] aria-selected:text-ink cursor-pointer"
                  >
                    <FileDown size={15} /> Download resume
                  </Command.Item>
                  <Command.Item
                    onSelect={() => go(site.github)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-dim aria-selected:bg-white/[0.06] aria-selected:text-ink cursor-pointer"
                  >
                    <Github size={15} /> Open GitHub
                  </Command.Item>
                  <Command.Item
                    onSelect={() => go(site.linkedin)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-dim aria-selected:bg-white/[0.06] aria-selected:text-ink cursor-pointer"
                  >
                    <Linkedin size={15} /> Open LinkedIn
                  </Command.Item>
                  <Command.Item
                    onSelect={() => go(`mailto:${site.email}`)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-dim aria-selected:bg-white/[0.06] aria-selected:text-ink cursor-pointer"
                  >
                    <Mail size={15} /> Copy / send email
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
