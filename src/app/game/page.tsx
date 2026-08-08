import type { Metadata } from "next";
import { GameProtocolView } from "@/components/game/GameProtocolView";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Game Protocol",
  description:
    "Build your Node. Expand the Network. Reach the Aethergrid. — VΣLOHE game layer in active development.",
};

/**
 * Short game hub — whitepaper lives at /game/whitepaper
 */
export default function GamePage() {
  return (
    <PageTransition>
      <GameProtocolView />
    </PageTransition>
  );
}
