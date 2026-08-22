"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";

const links = [
  { label: "GitHub", href: site.github, icon: Github },
  { label: "LinkedIn", href: site.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only demo: wire this up to Formspree, Resend, or an API route.
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Contact(open: true)"
          title="Let's build something."
          description="Internships, hackathon teams, collaborations, or just a conversation about Flutter and AI — my inbox is open."
          align="center"
        />

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 mt-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                <GlassCard className="p-4 flex items-center gap-4 hover:border-emerald/30 border border-transparent transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald">
                    <link.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-ink font-medium">{link.label}</p>
                    <p className="text-xs text-ink-faint font-mono">
                      {link.label === "Email" ? site.email : link.href.replace("https://", "")}
                    </p>
                  </div>
                </GlassCard>
              </a>
            ))}
            <Button
              href={site.resumeUrl}
              variant="secondary"
              icon={<FileDown size={15} />}
              className="w-full justify-center mt-2"
            >
              Download resume
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-6 sm:p-8">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="prop-token block mb-1.5">
                      <span className="prop-key">name</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-emerald/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="prop-token block mb-1.5">
                      <span className="prop-key">email</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-emerald/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="prop-token block mb-1.5">
                    <span className="prop-key">message</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="What are you building?"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-emerald/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sent}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald text-bg text-sm font-medium hover:bg-emerald-soft transition-colors disabled:opacity-70"
                >
                  {sent ? (
                    <>
                      <CheckCircle2 size={16} /> Message queued
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send message
                    </>
                  )}
                </button>
                <p className="text-[11px] text-ink-faint text-center">
                  UI demo only — connect this form to Formspree, Resend, or an API
                  route to make it functional.
                </p>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
