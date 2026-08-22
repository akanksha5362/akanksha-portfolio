import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";
import ScrollToTop from "./ScrollToTop";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg text-ink">{site.name}</p>
          <p className="prop-token">
            <span className="prop-key">status</span>:{" "}
            <span className="prop-value">&quot;open to internships&quot;</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-dim hover:text-emerald transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-dim hover:text-cyan transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-ink-dim hover:text-emerald transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        <p className="text-xs text-ink-faint font-mono">
          © {new Date().getFullYear()} — built with Next.js
        </p>
      </div>
      <ScrollToTop />
    </footer>
  );
}
