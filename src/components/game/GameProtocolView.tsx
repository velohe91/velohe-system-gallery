"use client";

import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { NeonButton } from "@/components/ui/NeonButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STATUS_BADGES = [
  "UNDER CONSTRUCTION",
  "ACTIVE DEVELOPMENT",
  "WEB3 OPTIONAL",
] as const;

/**
 * Short Game Protocol hub — /game
 * Deep vision lives at /game/whitepaper
 */
export function GameProtocolView() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-16">
      <GlowOrb className="-left-24 top-16 h-64 w-64" color="blue" />
      <GlowOrb className="-right-20 bottom-20 h-72 w-72" color="cyan" />

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="panel hologram-border rounded-xl px-6 py-8 text-center sm:px-10 sm:py-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neon-cyan/70">
            Protocol // Interactive Layer
          </p>

          <h1 className="mt-4 font-sans text-2xl font-semibold tracking-wide text-neon-cyan text-glow-sm sm:text-3xl md:text-4xl">
            GAME PROTOCOL — IN DEVELOPMENT
          </h1>

          <p className="mx-auto mt-4 max-w-md font-mono text-sm leading-relaxed text-muted sm:text-base">
            Build your Node. Expand the Network. Reach the Aethergrid.
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {STATUS_BADGES.map((badge) => (
              <li
                key={badge}
                className="rounded border border-amber-400/40 bg-amber-500/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-amber-200/90"
              >
                {badge}
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-lg font-mono text-xs leading-relaxed text-muted sm:text-sm">
            The interactive game layer is in active development. Operators will
            build Nodes, deploy agents, and push toward contact with the
            Aethergrid — while the exhibition archive remains fully intact.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <NeonButton
              href="/game/whitepaper"
              className="min-w-[220px] text-glow-sm"
            >
              Read Whitepaper
            </NeonButton>
            <NeonButton href="/" variant="outline" className="min-w-[220px]">
              Return to Archive
            </NeonButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
