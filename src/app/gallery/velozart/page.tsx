import type { Metadata } from "next";
import { GalleryBackLink } from "@/components/gallery/GalleryBackLink";
import { VelozArtPlaceholder } from "@/components/gallery/VelozArtPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "NFT VeLozArt Gallery",
  description: "VeLozArt AI artworks wing — catalog pending.",
};

/**
 * VeLozArt wing — placeholder until assets are added.
 */
export default function VelozArtGalleryPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <GalleryBackLink />
        <SectionHeading
          eyebrow="Sector // VeLozArt"
          title="NFT VeLozArt Gallery"
          subtitle="A separate collection of AI artworks under the VeLozArt label."
        />
        <VelozArtPlaceholder />
      </div>
    </PageTransition>
  );
}
