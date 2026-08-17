/**
 * Gallery hub sectors — selection cards on /gallery.
 * Each entry routes to a sub-gallery (archive catalog, VeLozArt wing, etc.).
 */

export type GalleryHubAccent = "cyan" | "violet";
export type GalleryHubStatus = "online" | "standby";

export type GalleryHubEntry = {
  id: "archive" | "exhibition-node" | "velozart";
  title: string;
  description: string;
  href: string;
  badge: string;
  seriesHint?: string;
  cta: string;
  accent: GalleryHubAccent;
  status: GalleryHubStatus;
};

export const galleryHubEntries: GalleryHubEntry[] = [
  {
    id: "archive",
    title: "VΣLOHE SYSTEM Archive",
    description:
      "The official recorded identities and lore of VΣLOHE SYSTEM",
    href: "/gallery/archive",
    badge: "PRIMARY ARCHIVE",
    seriesHint: "CyborgPunks · Lunarya · Aethergrid Spirits",
    cta: "Enter Archive",
    accent: "cyan",
    status: "online",
  },
  {
    id: "exhibition-node",
    title: "NFT Exhibition Node",
    description:
      "A curated record of artworks acquired from the VΣLOHE community and preserved within the system.",
    href: "/gallery/exhibition-node",
    badge: "COMMUNITY ACQUISITIONS",
    seriesHint: "Verified community artworks · expanding archive",
    cta: "Enter Exhibition Node",
    accent: "violet",
    status: "online",
  },

   {
    id: "velozart",
    title: "NFT VeLozArt Gallery",
    description:
      "A separate collection of AI artworks under the VeLozArt label",
    href: "/gallery/velozart",
    badge: "EXTERNAL WING",
    seriesHint: "VeLozArt · AI collection",
    cta: "Enter VeLozArt",
    accent: "cyan",
    status: "online",
  },

];
