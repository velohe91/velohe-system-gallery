import type { Metadata } from "next";
import { NftGrid } from "@/components/gallery/NftGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageTransition } from "@/components/ui/PageTransition";
import { nfts } from "@/data/nfts";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse the VΣLOHE SYSTEM NFT archive.",
};

export default function GalleryPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          eyebrow="Archive // Catalog"
          title="Gallery"
          subtitle="Newest fragments first. Select a piece to expand lore and metadata."
        />
        <NftGrid items={nfts} />
      </div>
    </PageTransition>
  );
}
