"use client";

import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { NeonButton } from "@/components/ui/NeonButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STATUS_BADGES = [
  "UNDER CONSTRUCTION",
  "RESTRICTED ACCESS",
  "PROTOTYPE",
] as const;

/**
 * Placeholder shell for the upcoming interactive game layer.
 * Does not alter existing archive / gallery content.
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

          <p className="mx-auto mt-4 max-w-lg font-mono text-sm leading-relaxed text-muted">
            A new interactive layer is being constructed within VΣLOHE SYSTEM
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

          <div className="mx-auto mt-8 max-w-md space-y-3 border-t border-neon-cyan/15 pt-6 text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan/60">
              Placeholder // Brief
            </p>
            <p className="font-mono text-xs leading-relaxed text-muted sm:text-sm">
              This sector is reserved for an upcoming interactive experience.
              Mechanics, objectives, and reward channels will be indexed here
              once the protocol stabilizes. Existing exhibition content remains
              unchanged.
            </p>
          </div>

          <p
            className="mt-8 font-mono text-xs text-neon-cyan/80 sm:text-sm"
            role="status"
          >
            <span className="mr-1.5 text-neon-cyan/40" aria-hidden>
              &gt;
            </span>
            Awaiting further system directives...
            <motion.span
              className="ml-1 inline-block h-3.5 w-1.5 bg-neon-cyan/80 align-middle"
              animate={reduced ? undefined : { opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              aria-hidden
            />
          </p>

          <div className="mt-10 flex justify-center">
            <NeonButton href="/" variant="outline" className="min-w-[220px]">
              Return to Archive
            </NeonButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
