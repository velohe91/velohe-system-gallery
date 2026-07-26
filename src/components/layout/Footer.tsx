import { SITE_NAME, SITE_VERSION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-neon-cyan/10 bg-void/80 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:text-left sm:px-6">
        <p className="font-mono text-xs tracking-widest text-muted">
          {SITE_NAME} · {SITE_VERSION}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70">
          Exhibition System · Offline-first archive
        </p>
      </div>
    </footer>
  );
}
