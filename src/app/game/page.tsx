import type { Metadata } from "next";
import { GameProtocolView } from "@/components/game/GameProtocolView";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Game Protocol",
  description:
    "GAME PROTOCOL — interactive layer under construction within VΣLOHE SYSTEM.",
};

/**
 * Isolated game wing — does not alter archive or gallery content.
 */
export default function GamePage() {
  return (
    <PageTransition>
      <GameProtocolView />
    </PageTransition>
  );
}
