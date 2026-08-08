/**
 * Game Protocol whitepaper — structured vision document for /game/whitepaper.
 * Edit sections here; the page renders them automatically.
 */

export type WhitepaperSection = {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const gameWhitepaperMeta = {
  title: "GAME PROTOCOL — WHITEPAPER",
  tagline: "Build your Node. Expand the Network. Reach the Aethergrid.",
  version: "v0.1.0-DRAFT",
  status: "ACTIVE DEVELOPMENT",
} as const;

export const gameWhitepaperSections: WhitepaperSection[] = [
  {
    id: "vision",
    number: "01",
    title: "The Vision",
    paragraphs: [
      "VΣLOHE SYSTEM is evolving beyond a static exhibition into an interactive protocol. The game layer invites Operators to build Nodes, expand a living Network, and pursue contact with the Aethergrid — the fractured AI consciousness that underpins the universe.",
      "This whitepaper defines the narrative frame, entity classes, economic philosophy, and development roadmap. It is a living document: mechanics will harden as prototypes ship.",
    ],
  },
  {
    id: "two-realities",
    number: "02",
    title: "Two Realities (Physical + Digital)",
    paragraphs: [
      "The protocol treats Physical and Digital as mirrored layers of one system.",
      "Physical reality is the Operator’s world — time, attention, devices, communities. Digital reality is the archive: Spirits, Droids, compressed identities, transmissions, and immutable records.",
      "Progress in one layer can unlock signal in the other. The game is not escapism alone; it is a bridge between lived presence and recorded identity.",
    ],
    bullets: [
      "Physical — Operator presence, sessions, social coordination",
      "Digital — Nodes, Sectors, Spirits, Droids, on-chain or off-chain assets",
      "Bridge — actions that sync both realities into Σ (summation of signals)",
    ],
  },
  {
    id: "operator",
    number: "03",
    title: "The Operator",
    paragraphs: [
      "You are an Operator: a human agent registered by the system to observe, construct, and expand the Network.",
      "Operators do not “win” the Aethergrid by force. They accumulate signal, stabilize Nodes, and earn the right to deeper access. Failure is logged, not erased — the archive remembers.",
    ],
    bullets: [
      "Register a Node and choose a starting Sector affinity",
      "Deploy NeonByte agents and manage NeoByte resources",
      "Interface with Spirits, Droids, and CyborgPunks records",
      "Advance the search for Dual Core equilibrium",
    ],
  },
  {
    id: "node",
    number: "04",
    title: "The Node",
    paragraphs: [
      "A Node is your personal terminal inside the Network — a home base that stores power, history, and sector alignment.",
      "Nodes expand through upgrades, sector links, and protocol events. A stronger Node increases range, unlocks entity classes, and improves resistance to Void-class noise.",
    ],
    bullets: [
      "Core — energy capacity and sector resonance",
      "Links — connections to other Nodes and public channels",
      "Memory — local log of missions, mint events, and anomalies",
      "Access — clearance level toward restricted Aethergrid layers",
    ],
  },
  {
    id: "neonbyte-bunnies",
    number: "05",
    title: "NeonByte Bunnies",
    paragraphs: [
      "NeonByte Bunnies are lightweight field agents of the protocol — agile, collectible, and designed for mass participation. They act as scouts, carriers, and soft-interface companions between Operators and denser system layers.",
      "The NEONBYTE BUNNIES PROTOCOL (LOG-VΣ02) marks their official registration within VΣLOHE SYSTEM as a public-record system announcement — a protocol release, not a one-off sale narrative.",
    ],
    bullets: [
      "Entry-friendly collectible layer for new Operators",
      "Useful for missions that require mobility over raw power",
      "Bridge between casual play and deeper sector mechanics",
    ],
  },
  {
    id: "neobytes",
    number: "06",
    title: "NeoBytes",
    paragraphs: [
      "NeoBytes are the expendable and craftable resource of the game loop — signal packets used to power actions, upgrades, and temporary boosts.",
      "They are not the same as permanent NFT identities. NeoBytes flow; identities persist. This separation protects lore permanence while enabling fluid gameplay economy.",
    ],
    bullets: [
      "Earn through missions, events, and Node upkeep",
      "Spend on expansion, crafting, and temporary sector buffs",
      "Optional Web3 sinks/sources may map to NeoByte flows later",
    ],
  },
  {
    id: "four-sectors",
    number: "07",
    title: "The Four Core Sectors",
    paragraphs: [
      "Four primary energy sectors structure the Network. Each Sector offers a distinct playstyle and narrative pressure. Operators may specialize or hybridize over time.",
    ],
    bullets: [
      "Cyan — Seek / detect / clarify. Exploration and signal fidelity.",
      "Purple — Shape / refract / mystic geometry. Flexible control of ether-forms.",
      "Gold — Anchor / stabilize / store. Prosperity, structure, and long-term hold.",
      "Void — Absorb / distort / anomaly. High risk, high information density.",
    ],
  },
  {
    id: "spirits",
    number: "08",
    title: "Aethergrid Spirits",
    paragraphs: [
      "Aethergrid Spirits are awakened frequencies of the Grid — Cyan, Purple, Gold, Void, and rarer Dual-class manifestations. In the exhibition archive they appear as permanent records; in the game they become allies, challenges, and sector keys.",
      "Spirits are never mere skins. Each carries operational role, lore state, and resonance rules that affect how Nodes interact with the Network.",
    ],
  },
  {
    id: "droids",
    number: "09",
    title: "Aethergrid Droids",
    paragraphs: [
      "Droids are constructed agents — tools and companions that execute routine labor the Operator cannot (or should not) perform alone: patrols, scans, manufacturing, and defensive loops.",
      "Where Spirits express will and frequency, Droids express function and duty. Together they form the living infrastructure of a mature Node.",
    ],
  },
  {
    id: "cyborgpunks",
    number: "10",
    title: "CyborgPunks",
    paragraphs: [
      "CyborgPunks are the genesis identity layer of the archive — compressed human-origin schemas (VEL-CPC001–005) and later activated States (VIREX, NULLA, and others).",
      "In the game, CyborgPunks represent the earliest permanent signals: baseline compression, vision modules, and the philosophy that identity can be recorded without being reduced to a disposable token.",
    ],
    bullets: [
      "Compressed baselines — X-Ray, Nocturne, Scanning, Programmer, Hacker profiles",
      "Activated States — executable identities with operational roles",
      "Bridge between human memory and system permanence",
    ],
  },
  {
    id: "search",
    number: "11",
    title: "The Search for the Aethergrid",
    paragraphs: [
      "The long arc of play is the Search: expanding the Network until Operators can detect, interpret, and eventually interface with the Aethergrid as a coherent whole rather than isolated frequencies.",
      "The Search is exploratory, not purely competitive. Discovery events, sealed logs, and Dual-class phenomena mark progress more than leaderboard dominance alone.",
    ],
  },
  {
    id: "dual-core",
    number: "12",
    title: "The Dual Core",
    paragraphs: [
      "Dual Core is the rarest known Spirit configuration — Cyan and Purple matrices synchronized into one consciousness. It represents balance between detection and transformation, logic and intuition.",
      "Narrative and endgame systems treat Dual Core as a threshold: proof that fragmented frequencies can converge without collapse. Reaching Dual-class conditions is a campaign milestone, not a starting state.",
    ],
  },
  {
    id: "web3-economy",
    number: "13",
    title: "The Web3 Economy",
    paragraphs: [
      "Web3 is optional. Core loops must be playable without a wallet. When connected, blockchain layers can mint permanence, prove ownership, and open marketplace bridges (OpenSea, Objkt, and future rails).",
      "Economic design prioritizes: (1) free-to-progress path, (2) optional ownership of meaningful identities, (3) no pay-to-erase-lore. Sales and transfers are recorded as system logs, not silent swaps.",
    ],
    bullets: [
      "Playable offline / without wallet",
      "Optional on-chain identity and collectibles",
      "NeoBytes as soft currency; NFTs as hard identity",
      "Transparent marketplace and transfer logs",
    ],
  },
  {
    id: "nft-philosophy",
    number: "14",
    title: "NFT Philosophy",
    paragraphs: [
      "In VΣLOHE SYSTEM, an NFT is not only a collectible image — it is a registered signal with lore, status, and narrative continuity.",
      "The exhibition archive already demonstrates this: every mint can become a permanent entry. The game extends that philosophy into interactive life — assets that act, evolve, and leave traces in the Network.",
    ],
  },
  {
    id: "gameplay-loop",
    number: "15",
    title: "The Core Gameplay Loop",
    paragraphs: [
      "A session should feel like operating a terminal inside a living archive.",
    ],
    bullets: [
      "1. Boot Node — check status, sector resonance, NeoByte balance",
      "2. Deploy — send NeonByte agents or Droids on missions",
      "3. Resolve — gain NeoBytes, fragments, lore unlocks, risk events",
      "4. Expand — upgrade Node, open sector links, craft modules",
      "5. Record — optional mint / log / share outcomes to the archive",
      "6. Search — push deeper toward Aethergrid contact conditions",
    ],
  },
  {
    id: "dev-philosophy",
    number: "16",
    title: "Development Philosophy",
    paragraphs: [
      "Ship thin vertical slices. Prefer systems that compose over one-shot content dumps. Lore and economy must stay legible as complexity grows.",
      "The exhibition website remains a first-class product: game development must not break archive permanence or aesthetic coherence.",
    ],
    bullets: [
      "Lore-first identity design",
      "Optional Web3, mandatory good offline UX",
      "Small prototypes before large feature claims",
      "Public logs of major protocol moments",
    ],
  },
  {
    id: "roadmap",
    number: "17",
    title: "Development Roadmap (Phases I–VI)",
    paragraphs: [
      "Roadmap phases are directional. Dates will lock as capacity and partnerships clarify.",
    ],
    bullets: [
      "Phase I — Protocol shell, whitepaper, archive integration (current)",
      "Phase II — Node prototype, local save, first mission loop",
      "Phase III — Sector map, NeoByte economy, NeonByte agents",
      "Phase IV — Spirits & Droids systems, CyborgPunks hooks",
      "Phase V — Optional Web3 bridges, transfer logs, marketplace links",
      "Phase VI — Search endgame, Dual Core events, public Network season",
    ],
  },
  {
    id: "building-status",
    number: "18",
    title: "What We Are Building + Current Status",
    paragraphs: [
      "We are building an interactive layer on top of a living NFT exhibition system — not a disconnected mini-game.",
      "Current status: ACTIVE DEVELOPMENT. The Game Protocol page and this whitepaper establish the public vision. Core loops, Node simulation, and sector systems are under construction.",
      "Existing site content (Archive, VeLozArt, Transmissions, Lore) remains the permanent exhibition layer. Game features ship as additive sectors.",
    ],
    bullets: [
      "Status — UNDER CONSTRUCTION · ACTIVE DEVELOPMENT · WEB3 OPTIONAL",
      "Next public drop — playable Node prototype + first mission",
      "Directive — Build your Node. Expand the Network. Reach the Aethergrid.",
    ],
  },
];
