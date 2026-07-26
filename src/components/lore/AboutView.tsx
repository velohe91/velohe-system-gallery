"use client";

import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { LoreSection } from "@/components/lore/LoreSection";
import { TerminalNote } from "@/components/lore/TerminalNote";
import { NeonButton } from "@/components/ui/NeonButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageTransition } from "@/components/ui/PageTransition";
import { aboutLore } from "@/data/lore";
import { SITE_NAME, SITE_VERSION } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function AboutView() {
  const reduced = usePrefersReducedMotion();

  return (
    <PageTransition>
      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <GlowOrb className="right-0 top-10 h-48 w-48" color="cyan" />

        <SectionHeading
          eyebrow="Node // Identity"
          title={SITE_NAME}
          subtitle={aboutLore.tagline}
        />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-10"
        >
          <TerminalNote
            label="boot"
            lines={[aboutLore.heroStatus, `BUILD // ${SITE_VERSION}`]}
          />
        </motion.div>

        <div className="flex flex-col gap-6">
          <LoreSection
            eyebrow={aboutLore.whatIs.eyebrow}
            title={aboutLore.whatIs.title}
            paragraphs={[...aboutLore.whatIs.paragraphs]}
            delay={0.05}
          />
          <LoreSection
            eyebrow={aboutLore.aethergrid.eyebrow}
            title={aboutLore.aethergrid.title}
            paragraphs={[...aboutLore.aethergrid.paragraphs]}
            delay={0.08}
          />
          <LoreSection
            eyebrow={aboutLore.sigma.eyebrow}
            title={aboutLore.sigma.title}
            paragraphs={[...aboutLore.sigma.paragraphs]}
            delay={0.11}
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <NeonButton href="/lore">Full Lore & Archives</NeonButton>
          <NeonButton href="/gallery" variant="outline">
            Open Gallery
          </NeonButton>
          <NeonButton href="/transmissions" variant="ghost">
            Read Logs
          </NeonButton>
        </div>
      </div>
    </PageTransition>
  );
}
