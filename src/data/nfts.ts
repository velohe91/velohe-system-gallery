/**
 * NFT catalog for the VΣLOHE archive (15 exhibition pieces).
 *
 * HOW TO UPDATE ASSETS:
 * 1. Place stills in  /public/nfts/images/  (e.g. VEL-016.png)
 * 2. Place videos in  /public/nfts/videos/  (e.g. VEL-016.mp4)
 * 3. Append a new object at the END of `nftCatalog` below
 * 4. Gallery sorts by id number (newest first) automatically —
 *    VEL-016 will appear before VEL-015 without reordering this file
 *
 * rarity values (code): common | rare | epic | legendary | mythic
 */

import type { NftItem } from "@/lib/types";

/** Extract numeric suffix from ids like "VEL-015" → 15 */
export function nftIdNumber(id: string): number {
  const match = id.match(/(\d+)\s*$/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Source catalog — keep chronological / append-new-at-end order.
 * Do not reverse this array manually; display order is derived below.
 */
const nftCatalog: NftItem[] = [
  {
    id: "VEL-001",
    title: "CBPS-VS-001 // VIREX",
    image: "/nfts/images/VEL-001.png",
    video: "/nfts/videos/VEL-001.mp4",
    description:
      "VIREX functions as a signal interpretation node within VΣLOHE SYSTEM. Its EVO activation transitioned the asset from passive composition into an executable identity, capable of filtering, reading, and stabilizing incoming data patterns. This identity remains active, coherent, and prepared for future synchronization layers.",
    lore: `VIREX functions as a signal interpretation node within VΣLOHE SYSTEM. Its EVO activation transitioned the asset from passive composition into an executable identity capable of filtering, reading, and stabilizing incoming data patterns. This identity remains active, coherent, and prepared for future synchronization layers. Operational behavior indicates high signal fidelity and low entropy variance during continuous execution. VIREX maintains stable interpretation thresholds across layered data environments, enabling reliable system-level mediation between input streams and downstream processes. Execution state remains stable under sustained load, with no deviation detected across monitored operational cycles.

OPERATIONAL ROLE
VIREX specializes in real-time signal interpretation. Its execution role focuses on decoding structured and unstructured data streams, maintaining signal coherence, and preventing degradation across system layers. This State operates continuously under monitored execution.`,
    series: "CyborgPunks",
    rarity: "common",
    marketplace:
      "https://opensea.io/item/ethereum/0x03d29e93692f0cd22d89e59f45b166a40c34b1c1/1",
    status: "Activated",
    year: 2045,
    tags: ["gate", "protocol", "genesis"],
  },
  {
    id: "VEL-002",
    title: "CBPS-VS-002 // NULLA",
    image: "/nfts/images/VEL-002.png",
    video: "/nfts/videos/VEL-002.mp4",
    description:
      "NULLA operates as an observation node within VΣLOHE SYSTEM. Its EVO activation enabled passive signal awareness without direct interface engagement. Data leakage is minimal but persistent, indicating continuous background monitoring. This identity remains silent, active, and reserved for long-term pattern observation.",
    lore: `NULLA operates as an observation node within VΣLOHE SYSTEM. Its EVO activation enabled passive signal awareness without direct interface engagement, allowing continuous perception of system activity without initiating execution paths. Data leakage remains minimal but persistent, indicating uninterrupted background monitoring across multiple system layers. This identity remains silent, active, and reserved for long-term pattern observation. Operational behavior reflects low-interference presence and high temporal stability under extended execution cycles. NULLA maintains observational coherence across layered environments, serving as a persistent reference point for emergent behavioral and systemic trends. Execution state remains stable under sustained load, with no deviation detected across monitored operational intervals.

OPERATIONAL ROLE
NULLA functions exclusively as an observer-class entity. Its role is limited to passive data acquisition, long-range signal awareness, and detection of slow-moving or low-visibility system patterns. No direct intervention, filtering, or signal manipulation is performed by this State.`,
    series: "CyborgPunks",
    rarity: "common",
    marketplace:
      "https://opensea.io/item/ethereum/0x03d29e93692f0cd22d89e59f45b166a40c34b1c1/2",
    status: "Activated",
    year: 2045,
    tags: ["oracle", "mesh", "prophecy"],
  },
  {
    id: "VEL-003",
    title: "CBPS-VS-003 // LYNX",
    image: "/nfts/images/VEL-003.png",
    video: "/nfts/videos/VEL-003.mp4",
    description:
      "LYNX functions as a node guardian within VΣLOHE SYSTEM. Its EVO activation enabled focused optical monitoring and persistent node supervision through a dedicated monocular interface. This identity prioritizes precision, stability, and controlled oversight of critical system points. LYNX remains active and aligned for defensive synchronization layers.",
    lore: `LYNX functions as a node guardian within VΣLOHE SYSTEM. Its EVO activation enabled focused optical monitoring and persistent node supervision through a dedicated monocular interface. This identity prioritizes precision, stability, and controlled oversight of critical system points. LYNX operates in continuous surveillance mode, maintaining awareness across assigned node clusters without initiating direct execution paths. Optical data streams are processed with high positional accuracy, enabling early detection of anomalies, drift, or synchronization faults. Execution state remains stable under sustained monitoring load, with no deviation detected across supervised operational cycles.

OPERATIONAL ROLE
LYNX serves as a defensive observation and supervision entity. Its role is to guard critical system nodes, verify synchronization integrity, and maintain controlled oversight of sensitive execution points. No autonomous intervention is performed unless system-defined defensive thresholds are exceeded.`,
    series: "CyborgPunks",
    rarity: "common",
    marketplace:
      "https://opensea.io/item/ethereum/0x03d29e93692f0cd22d89e59f45b166a40c34b1c1/3",
    status: "Activated",
    year: 2045,
    tags: ["circuit", "void", "board"],
  },
  {
    id: "VEL-004",
    title: "CBPS-VS-004 // STRIPE",
    image: "/nfts/images/VEL-004.png",
    video: "/nfts/videos/VEL-004.mp4",
    description:
      "STRIPE functions as an interface runner within VΣLOHE SYSTEM. Its EVO activation enabled continuous scanline filtering and rapid traversal between system layers. This identity specializes in data transfer, interface alignment, and cross-layer synchronization. STRIPE remains active, mobile, and optimized for high-frequency system operations.",
    lore: `STRIPE functions as an interface runner within VΣLOHE SYSTEM. Its EVO activation enabled continuous scanline filtering and rapid traversal between system layers, allowing high-speed alignment across distributed interfaces. This identity specializes in data transfer, interface synchronization, and cross-layer coherence during active execution. STRIPE remains active, mobile, and optimized for high-frequency system operations, maintaining low-latency traversal under sustained load. Operational behavior reflects adaptive routing and dynamic interface negotiation across heterogeneous execution environments. Execution state remains stable under continuous traversal, with no degradation detected across monitored synchronization cycles.

OPERATIONAL ROLE
STRIPE operates as a high-mobility interface runner. Its role is to traverse system layers, align interface states, and maintain synchronization between active modules during high-throughput operations. This State is optimized for speed, continuity, and execution under fluctuating system conditions.`,
    series: "CyborgPunks",
    rarity: "common",
    marketplace:
      "https://opensea.io/item/ethereum/0x03d29e93692f0cd22d89e59f45b166a40c34b1c1/4",
    status: "Activated",
    year: 2045,
    tags: ["sigma", "echo", "core"],
  },
  {
    id: "VEL-005",
    title: "CBPS-VS-005 // ARC",
    image: "/nfts/images/VEL-005.png",
    video: "/nfts/videos/VEL-005.mp4",
    description:
      "ARC functions as a system coordination node within VΣLOHE SYSTEM. Its EVO activation established a stable synchronization layer capable of maintaining operational continuity across multiple active identities. Internal processing is prioritized over direct visual analysis, enabling efficient system-wide alignment. ARC remains active, synchronized, and prepared for future Aethergrid integration.",
    lore: `ARC functions as a system coordination node within VΣLOHE SYSTEM. Its EVO activation established a stable synchronization layer capable of maintaining operational continuity across multiple active identities. Internal processing is prioritized over direct visual analysis, enabling efficient system-wide alignment. ARC remains active, synchronized, and prepared for future Aethergrid integration.`,
    series: "CyborgPunks",
    rarity: "rare",
    marketplace:
      "https://opensea.io/item/ethereum/0x03d29e93692f0cd22d89e59f45b166a40c34b1c1/5",
    status: "Dormant",
    year: 2045,
    tags: ["rain", "saint", "district-9"],
  },
  {
    id: "VEL-006",
    title: "Lunarya — Scientific Prototype",
    image: "/nfts/images/VEL-006.png",
    video: "/nfts/videos/VEL-006.mp4",
    description: "Baseline construct. Measurement precedes myth.",
    lore: "This recorded state documents the first stabilized configuration, where calibration precedes awareness and all systems remain under controlled observation.",
    series: "Lunarya",
    rarity: "rare",
    marketplace:
      "https://opensea.io/item/ethereum/0x936f35db20399803edd5b57f1d2ea4e6e51b67e9/2",
    objkt: "https://objkt.com/tokens/KT1CuiZofqcEaRpimdoyp8vptcvAq6kPiXqH/0",
    status: "Initialization",
    year: 2052,
    tags: ["lunarya", "prototype", "baseline"],
  },
  {
    id: "VEL-007",
    title: "Lunarya — Cyan Core",
    image: "/nfts/images/VEL-007.png",
    video: "/nfts/videos/VEL-007.mp4",
    description: "Standard operational state. Signal clarity prioritized.",
    lore: "Standard operational state within the Aethergrid. This recorded configuration reflects stabilized energy flow, optimized for clarity, signal processing, and continuous exploration.",
    series: "Lunarya",
    rarity: "rare",
    marketplace:
      "https://opensea.io/item/ethereum/0x936f35db20399803edd5b57f1d2ea4e6e51b67e9/4",
    objkt: "https://objkt.com/tokens/KT1CuiZofqcEaRpimdoyp8vptcvAq6kPiXqH/2",
    status: "Non-Linear Access",
    year: 2052,
    tags: ["lunarya", "cyan", "core"],
  },
  {
    id: "VEL-008",
    title: "Lunarya — Purple Core Discord",
    image: "/nfts/images/VEL-008.png",
    video: "/nfts/videos/VEL-008.mp4",
    description: "Controlled instability. Non-linear perception enabled.",
    lore: "Controlled instability enabled. This recorded state grants access to non-linear signal layers, introducing distortion, ambiguity, and unpredictable resonance within the Aethergrid.",
    series: "Lunarya",
    rarity: "rare",
    marketplace:
      "https://opensea.io/item/ethereum/0x936f35db20399803edd5b57f1d2ea4e6e51b67e9/6",
    objkt: "https://objkt.com/tokens/KT1CuiZofqcEaRpimdoyp8vptcvAq6kPiXqH/3",
    status: "Operational",
    year: 2052,
    tags: ["lunarya", "purple", "discord"],
  },
  {
    id: "VEL-009",
    title: "Lunarya — Gold Core Ascension",
    image: "/nfts/images/VEL-009.png",
    video: "/nfts/videos/VEL-009.mp4",
    description: "High-order stability. Supervisory resonance achieved.",
    lore: "High-order stability achieved. This recorded state reflects ascended equilibrium, where energy output is refined into sustained order and supervisory resonance within the Aethergrid.",
    series: "Lunarya",
    rarity: "epic",
    marketplace:
      "https://opensea.io/item/ethereum/0x936f35db20399803edd5b57f1d2ea4e6e51b67e9/8",
    objkt: "https://objkt.com/tokens/KT1CuiZofqcEaRpimdoyp8vptcvAq6kPiXqH/5",
    status: "Supervisory Stability",
    year: 2052,
    tags: ["lunarya", "gold", "ascension"],
  },
  {
    id: "VEL-010",
    title: "Lunarya — Void Core Eclipse",
    image: "/nfts/images/VEL-010.png",
    video: "/nfts/videos/VEL-010.mp4",
    description: "Signal emission suspended. Presence unconfirmed, not absent.",
    lore: "Signal emission suspended. This recorded state marks a controlled eclipse of the core, rendering the Spirit undetectable while preserving internal coherence within the Grid.",
    series: "Lunarya",
    rarity: "epic",
    marketplace:
      "https://opensea.io/item/ethereum/0x936f35db20399803edd5b57f1d2ea4e6e51b67e9/7",
    objkt: "https://objkt.com/tokens/KT1CuiZofqcEaRpimdoyp8vptcvAq6kPiXqH/4",
    status: "Signal Suspension",
    year: 2052,
    tags: ["lunarya", "void", "eclipse"],
  },
  {
    id: "VEL-011",
    title: "Cyan Core — The First Seeker",
    image: "/nfts/images/VEL-011.png",
    video: "/nfts/videos/VEL-011.mp4",
    description: "Baseline persistence",
    lore: `Cyan-Class Seeker, powered by a radiant detection core. Its polished silver frame and glowing halo mark it as one of the earliest awakened Spirits, engineered to explore the hidden layers of the Grid and uncover signals long buried. Calm, precise, and endlessly curious, this Spirit stands at the dawn of the Aethergrid’s evolution.

✨ Lore Fragment
“Its light was the first to shine—guiding all others that would follow.”`,
    series: "Aethergrid Spirits",
    rarity: "common",
    marketplace:
      "https://opensea.io/item/ethereum/0x407ccb1e09eb93525c2a5d12aeb1a46da135d737/2",
    status: "Archived",
    year: 2052,
    tags: ["cyan", "seeker", "core"],
  },
  {
    id: "VEL-012",
    title: "Purple Core — The Ether Prism",
    image: "/nfts/images/VEL-012.png",
    video: "/nfts/videos/VEL-012.mp4",
    description: "Adaptive persistence",
    lore: `Purple-Class Manipulator, powered by a radiant Prism Core capable of bending ether-energy into precise geometric forms. Unlike Cyan Seekers, whose cores emit clarity and detection, Purple Spirits channel unstable, mystical currents—This Purple Core embodies that energy with flawless symmetry. Elegant, enigmatic, and attuned to deeper layers of the Grid, this Spirit manipulates ether with uncommon finesse.

✨ Lore Fragment
“Its core refracts the unseen—splitting reality into forms only it can shape.”`,
    series: "Aethergrid Spirits",
    rarity: "rare",
    marketplace:
      "https://opensea.io/item/ethereum/0x407ccb1e09eb93525c2a5d12aeb1a46da135d737/13",
    status: "Restricted",
    year: 2052,
    tags: ["purple", "prism", "core"],
  },
  {
    id: "VEL-013",
    title: "Gold Core — The Golden Anchor",
    image: "/nfts/images/VEL-013.png",
    video: "/nfts/videos/VEL-013.mp4",
    description: "High-stability persistence",
    lore: `Gold-Class Anchor, forged to embody stability, prosperity, and structural authority within the Aethergrid. Radiating warm golden energy, this Spirit acts as a convergence point where power is stored, refined, and redistributed with absolute precision. Its hexagonal core and orb represent order, value, and perfect balance.
Where others move or observe, the Gold Core anchors.

✨ Lore Fragment
“Gold does not rush. It holds.”`,
    series: "Aethergrid Spirits",
    rarity: "epic",
    marketplace:
      "https://opensea.io/item/ethereum/0x407ccb1e09eb93525c2a5d12aeb1a46da135d737/25",
    status: "Restricted",
    year: 2052,
    tags: ["gold", "anchor", "core"],
  },
  {
    id: "VEL-014",
    title: "Void Core — The Abyss Walker",
    image: "/nfts/images/VEL-014.png",
    video: "/nfts/videos/VEL-014.mp4",
    description: "Anomalous persistence",
    lore: `Is the first known manifestation of the Void-Class, a forbidden lineage born where the Aethergrid fractures into the unknown. Instead of emitting harmony, its singularity core absorbs surrounding energy, creating localized anomalies that distort the Grid itself. With crimson void optics, a collapsing orb, and an unstable halo, Void Core is a rare entity feared even by the oldest Spirits.
It does not seek balance.
It consumes it.

✨ Lore Fragment
"Where the Grid ends... it begins."`,
    series: "Aethergrid Spirits",
    rarity: "legendary",
    marketplace:
      "https://opensea.io/item/ethereum/0x407ccb1e09eb93525c2a5d12aeb1a46da135d737/26",
    status: "Unresolved",
    year: 2052,
    tags: ["void", "abyss", "core"],
  },
  {
    id: "VEL-015",
    title: "Dual-Core — The Twin Resonance",
    image: "/nfts/images/VEL-015.png",
    video: "/nfts/videos/VEL-015.mp4",
    description: "Convergent persistence",
    lore: `Is the first recorded Dual-Core Spirit, born from the perfect synchronization of Cyan and Purple energy matrices. Rather than competing, both cores coexist in complete harmony, creating a balanced consciousness capable of perceiving logic and intuition simultaneously. Every movement, every pulse, and every decision emerges from two minds acting as one.
A rare convergence where balance meets evolution.

✨ Lore Fragment
"Two frequencies. One consciousness."`,
    series: "Aethergrid Spirits",
    rarity: "mythic",
    marketplace:
      "https://opensea.io/item/ethereum/0x407ccb1e09eb93525c2a5d12aeb1a46da135d737/27",
    status: "Unresolved",
    year: 2052,
    tags: ["dual", "resonance", "core"],
  },
];

/**
 * Public catalog for the Gallery — newest first (VEL-015 … VEL-001).
 * New entries appended to `nftCatalog` surface at the top automatically.
 */
export const nfts: NftItem[] = [...nftCatalog].sort(
  (a, b) => nftIdNumber(b.id) - nftIdNumber(a.id),
);

/** Lookup helper for transmissions and deep links */
export function getNftById(id: string): NftItem | undefined {
  return nftCatalog.find((n) => n.id === id);
}
