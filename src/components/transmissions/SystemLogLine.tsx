"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SystemLogEntry } from "@/lib/types";
import { getNftById } from "@/data/nfts";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LEVEL_STYLES: Record<string, string> = {
  INFO: "text-sky-300 border-sky-400/40",
  WARN: "text-amber-300 border-amber-400/40",
  SIGNAL: "text-neon-cyan border-neon-cyan/50",
  LORE: "text-violet-300 border-violet-400/40",
  ERROR: "text-rose-300 border-rose-400/40",
};

const LEVEL_GLOW: Record<string, string> = {
  INFO: "bg-sky-400",
  WARN: "bg-amber-400",
  SIGNAL: "bg-neon-cyan",
  LORE: "bg-violet-400",
  ERROR: "bg-rose-400",
};

const linkClass =
  "inline-block font-mono text-[10px] uppercase tracking-widest text-neon-blue/90 transition-colors hover:text-neon-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan/60";

function relatedNftLabel(nftId: string): string {
  const nft = getNftById(nftId);
  if (!nft) return nftId;
  const callsign = nft.title.includes("//")
    ? nft.title.split("//").pop()?.trim()
    : null;
  return callsign ? `${nftId} / ${callsign}` : nftId;
}

export function SystemLogLine({
  entry,
  index,
  onOpenRelatedNft,
}: {
  entry: SystemLogEntry;
  index: number;
  onOpenRelatedNft?: (nftId: string) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const levelClass = LEVEL_STYLES[entry.level] ?? LEVEL_STYLES.INFO;
  const nodeClass = LEVEL_GLOW[entry.level] ?? LEVEL_GLOW.INFO;

  return (
    <motion.article
      className="relative pl-8"
      initial={reduced ? false : { opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3 }}
    >
      <span
        className={`absolute left-0.5 top-3 h-2.5 w-2.5 rounded-full border border-void ${nodeClass} opacity-90 box-glow`}
        aria-hidden
      />

      <div className="rounded-md border border-neon-cyan/15 bg-black/50 px-3 py-2.5 font-mono shadow-[inset_0_0_24px_rgba(0,240,255,0.04)]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] tracking-wider">
          <time className="text-muted/90">{entry.timestamp}</time>
          <span
            className={`rounded border px-1.5 py-0.5 text-[9px] uppercase ${levelClass}`}
          >
            {entry.level}
          </span>
          <span className="text-muted/50">{entry.id}</span>
          {entry.status && (
            <span className="rounded border border-emerald-400/40 px-1.5 py-0.5 text-[9px] uppercase text-emerald-300">
              {entry.status}
            </span>
          )}
          {entry.classification && (
            <span className="rounded border border-sky-400/30 px-1.5 py-0.5 text-[9px] uppercase text-sky-300/90">
              {entry.classification}
            </span>
          )}
        </div>

        {entry.title && (
          <h3 className="mt-1.5 text-[11px] font-medium tracking-wide text-foreground/90 sm:text-xs">
            {entry.title}
          </h3>
        )}

        {entry.gallery && (
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-violet-300/80">
            Gallery: {entry.gallery}
          </p>
        )}

        {entry.image && (
          <div className="relative mt-3 aspect-square w-full max-w-[220px] overflow-hidden rounded border border-neon-cyan/20 bg-void sm:max-w-[240px]">
            <Image
              src={entry.image}
              alt={entry.title ?? entry.id}
              fill
              unoptimized
              sizes="240px"
              className="object-cover object-center"
            />
          </div>
        )}

        <p className="mt-1.5 whitespace-pre-line text-xs leading-relaxed text-neon-cyan/90 sm:text-[13px]">
          <span className="mr-1.5 select-none text-neon-cyan/40" aria-hidden>
            &gt;
          </span>
          {entry.message}
        </p>

        {/* External + related actions — always clearly clickable */}
        <div className="mt-3 flex flex-col gap-2 border-t border-neon-cyan/10 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
          {entry.marketplace && (
            <a
              href={entry.marketplace}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} rounded border border-neon-cyan/30 bg-neon-cyan/5 px-2.5 py-1.5 hover:border-neon-cyan/60 hover:bg-neon-cyan/10`}
            >
              Marketplace →
            </a>
          )}
          {entry.buyerProfile && (
            <a
              href={entry.buyerProfile}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} rounded border border-neon-blue/30 bg-neon-blue/5 px-2.5 py-1.5 hover:border-neon-cyan/50 hover:bg-neon-blue/10`}
            >
              Buyer profile →
            </a>
          )}
          {entry.relatedNftId && (
            <button
              type="button"
              onClick={() => onOpenRelatedNft?.(entry.relatedNftId!)}
              className={linkClass}
            >
              → Related: {relatedNftLabel(entry.relatedNftId)}
            </button>
          )}
          {entry.blogLink && (
            <a
              href={entry.blogLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[10px] tracking-wide text-muted/70 transition-colors hover:text-neon-cyan/90"
            >
              Original log →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
