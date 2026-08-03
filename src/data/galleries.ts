/**
 * Gallery hub sectors — selection cards on /gallery.
 * Each entry routes to a sub-gallery (archive catalog, VeLozArt wing, etc.).
 */

export type GalleryHubAccent = "cyan" | "violet";
export type GalleryHubStatus = "online" | "standby";

export type GalleryHubEntry = {
  id: "archive" | "velozart";
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
    id: "velozart",
    title: "NFT VeLozArt Gallery",
    description:
      "A separate collection of AI artworks under the VeLozArt label",
    href: "/gallery/velozart",
    badge: "EXTERNAL WING",
    seriesHint: "VeLozArt · AI collection",
    cta: "Enter VeLozArt",
    accent: "violet",
    status: "standby",
  },
];
