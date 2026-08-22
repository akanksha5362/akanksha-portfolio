import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-4">Error(404)</p>
      <h1 className="section-heading mb-4">This route doesn&apos;t build.</h1>
      <p className="text-ink-dim max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist. It may have been moved, or the
        widget tree never mounted here.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-emerald text-bg font-medium hover:bg-emerald-soft transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
