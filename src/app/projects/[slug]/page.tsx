import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { site } from "@/data/site";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CaseStudyBody from "@/components/case-study/CaseStudyBody";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.name} — Case Study | ${site.name}`,
      description: project.summary,
      url: `${site.url}/projects/${project.slug}`,
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    applicationCategory: "MobileApplication",
    operatingSystem: "Android, iOS",
    description: project.summary,
    author: { "@type": "Person", name: site.name },
  };

  return (
    <article className="pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-ink-dim hover:text-emerald transition-colors mb-10"
        >
          <ArrowLeft size={15} /> Back to projects
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {project.featured && <Badge variant="cyan">Featured</Badge>}
          <span className="font-mono text-xs text-ink-faint">
            {project.year} · {project.role} · {project.status}
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-ink tracking-tight mb-4">
          {project.name}
        </h1>
        <p className="text-emerald-soft text-lg mb-8">{project.tagline}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          <Button href={project.githubUrl} variant="secondary" icon={<Github size={15} />}>
            View source
          </Button>
          {project.demoUrl && (
            <Button href={project.demoUrl} variant="primary" icon={<ExternalLink size={15} />}>
              Live demo
            </Button>
          )}
        </div>

        <CaseStudyBody project={project} />

        <div className="mt-24 pt-10 border-t border-white/10 flex items-center justify-between">
          <div>
            <p className="eyebrow mb-1">Next project</p>
            <p className="font-display text-lg text-ink">{next.name}</p>
          </div>
          <Link
            href={`/projects/${next.slug}`}
            className="w-11 h-11 rounded-full glass flex items-center justify-center text-ink hover:text-emerald hover:border-emerald/40 transition-colors"
            aria-label={`Next project: ${next.name}`}
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
