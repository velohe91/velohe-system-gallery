/**
 * Game Protocol whitepaper — structured vision document for /game/whitepaper.
 * v0.1.1-DRAFT — architecture corrections (content only; page design unchanged).
 *
 * Edit sections here; GameWhitepaperView renders them automatically.
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
  version: "v0.1.1-DRAFT",
  status: "GAME IN DEVELOPMENT · ACTIVE DEVELOPMENT",
} as const;

export const gameWhitepaperSections: WhitepaperSection[] = [
  {
    id: "vision",
    number: "01",
    title: "The Vision",
    paragraphs: [
      "VΣLOHE SYSTEM is expanding from a permanent NFT exhibition into a living interactive protocol. The game layer lets Operators build Nodes, expand the Network, and pursue deeper contact with the Aethergrid — without replacing or diluting the archive.",
      "This whitepaper defines architecture, entity roles, economy principles, and the development roadmap. It is a living specification: systems will harden as prototypes ship.",
      "Everything that follows is built on five foundations. If a feature does not reinforce Operator, Node, NeonByte Bunnies, Aethergrid Droids, or Sectors, it does not belong in the core loop.",
    ],
  },
  {
    id: "five-foundations",
    number: "02",
    title: "THE FIVE FOUNDATIONS",
    paragraphs: [
      "THE FIVE FOUNDATIONS are the non-negotiable pillars of VΣLOHE gameplay. All systems, UI surfaces, economies, and narrative beats must map back to these five elements.",
      "They are not optional themes. They are the architecture.",
    ],
    bullets: [
      "1. Operator — the player’s identity (not an NFT); begins in Sector Cyan",
      "2. Node — the Operator’s digital home base inside VΣLOHE SYSTEM",
      "3. NeonByte Bunnies — the primary workforce (build, gather, process, maintain, produce NeoBytes)",
      "4. Aethergrid Droids — advanced constructs fabricated from recovered Spirits",
      "5. Sectors — Cyan (Foundation), Purple (Expansion), Gold (Ascension), Void (The Unknown)",
    ],
  },
  {
    id: "two-realities",
    number: "03",
    title: "Two Realities (Physical + Digital)",
    paragraphs: [
      "VΣLOHE is dual-layered by design. Progress and meaning come from the relationship between two realities — not from treating the game as pure fantasy isolation.",
      "Physical Reality is anchored at the Lunarya Research Lab: the human-side origin of the Operator, neural synchronization, and real-world framing of the experiment. It is the side that chooses appearance, initiates sessions, and remains the living person behind the terminal.",
      "Digital Reality is VΣLOHE SYSTEM itself: Nodes, Sectors, NeonByte Bunnies, Aethergrid Droids, system-controlled CyborgPunks, archives, and protocol events. It is where construction, production, and expansion occur.",
      "The Dual Core is the synchronization bridge between these realities — Physical (Lunarya Research Lab) and Digital (VΣLOHE SYSTEM). It is not a fifth Sector and not a casual dual-class collectible.",
    ],
    bullets: [
      "Physical — Lunarya Research Lab, Operator identity, neural sync, human presence",
      "Digital — Node, Sectors, workforce, Droids, archive, network expansion",
      "Bridge — Dual Core: sustained sync between Lab and System",
    ],
  },
  {
    id: "operator",
    number: "04",
    title: "The Operator",
    paragraphs: [
      "The Operator is simply the player’s identity inside the protocol. The Operator is not an NFT and is not purchased.",
      "Every new player begins in Sector Cyan — the Foundation. There is no starting Sector affinity picker. Cyan is the mandatory entry layer of the Network.",
      "At creation, the player may choose a basic male or female appearance. This is cosmetic identity only; it does not grant power, Sector access, or ownership rights.",
      "Operators build Nodes, manage workforce, expand into later Sectors when unlocked, and pursue Dual Core synchronization between Physical and Digital realities.",
    ],
    bullets: [
      "Identity = player (not an NFT)",
      "Start Sector = always Cyan (Foundation)",
      "Appearance = basic male or female choice",
      "Progression = Node growth, workforce, Sector unlocks — not paid affinity",
    ],
  },
  {
    id: "node",
    number: "05",
    title: "The Node",
    paragraphs: [
      "The Node is the Operator’s primary structure in Digital Reality — a personal terminal and base that stores power, history, workforce capacity, and Sector resonance.",
      "After neural synchronization, the Operator materializes and develops a Node in Sector Cyan. The Node is where NeonByte Bunnies work, NeoBytes are produced and spent, and expansion toward Purple, Gold, and Void becomes possible.",
      "A stronger Node increases capacity, unlocks systems, and stabilizes long-term operations — always grounded in the Five Foundations.",
    ],
    bullets: [
      "Home base after Neural Synchronization",
      "Hosts NeonByte Bunnies and later Aethergrid Droids",
      "Gateway for Sector progression: Cyan → Purple → Gold → Void",
      "Memory of missions, production, and protocol events",
    ],
  },
  {
    id: "neonbyte-bunnies",
    number: "06",
    title: "NeonByte Bunnies",
    paragraphs: [
      "NeonByte Bunnies are the primary workforce of VΣLOHE SYSTEM. They exist to construct, gather, process, maintain infrastructure, and produce NeoBytes — the computational energy of the system.",
      "They are not defined primarily as scouts, carriers, or companions. Their role is labor and production that keeps a Node alive and expanding.",
      "Basic NeonByte Bunnies are available without NFTs so every Operator can work the core loop. Specialized Bunnies may later exist as optional NFTs for distinct production profiles — never as a paywall to play.",
    ],
    bullets: [
      "Workforce: construction, gathering, processing, maintenance",
      "NeoByte production (system computational energy)",
      "Basic Bunnies — free / non-NFT access",
      "Specialized Bunnies — optional future NFT variants",
    ],
  },
  {
    id: "neobytes",
    number: "07",
    title: "NeoBytes",
    paragraphs: [
      "NeoBytes are the computational energy and processing power of VΣLOHE SYSTEM. They are the fuel that makes digital operations possible — not a superficial crafting trinket.",
      "NeoBytes power Node activity, workforce throughput, upgrades, and protocol processes. Without NeoBytes, the digital layer cannot compute, expand, or maintain itself.",
      "NeoBytes are distinct from permanent NFT identities and from VLC / VLT currencies. Energy flows; identities and later tokens follow different rules.",
    ],
    bullets: [
      "Definition — computational energy / processing power of the System",
      "Produced largely through NeonByte Bunny workforce",
      "Spent to operate, expand, and stabilize the Node",
      "Not the same as VLC (internal currency) or VLT (later-phase token)",
    ],
  },
  {
    id: "four-sectors",
    number: "08",
    title: "The Four Core Sectors",
    paragraphs: [
      "There are exactly four Core Sectors. They form a hierarchy of access and narrative pressure — not a free starting menu.",
      "All Operators begin in Cyan. Later Sectors unlock through progression, not purchase of a starting affinity.",
    ],
    bullets: [
      "Cyan — Foundation (mandatory start; base operations and learning)",
      "Purple — Expansion (growth beyond the foundation layer)",
      "Gold — Ascension (higher-order stability, structure, and refinement)",
      "Void — The Unknown (anomaly, risk, and uncharted protocol space)",
    ],
  },
  {
    id: "spirits",
    number: "09",
    title: "Aethergrid Spirits",
    paragraphs: [
      "Aethergrid Spirits correspond to the four Sectors: Cyan, Purple, Gold, and Void. They express the frequency of each Sector as recoverable signal and lore.",
      "Recovered Spirits are not merely collectible cosmetics in the game architecture. They are used to fabricate Aethergrid Droids — advanced constructs that extend what a Node can do beyond basic Bunny workforce.",
      "Spirits remain permanent archive entities in the exhibition layer; in the game loop they feed fabrication and Sector-aligned systems.",
    ],
    bullets: [
      "Four Sector alignments: Cyan · Purple · Gold · Void",
      "Recovery → fabrication of Aethergrid Droids",
      "Archive permanence preserved in VΣLOHE exhibition",
    ],
  },
  {
    id: "droids",
    number: "10",
    title: "Aethergrid Droids",
    paragraphs: [
      "Aethergrid Droids are one of the Five Foundations: advanced digital constructs fabricated from recovered Aethergrid Spirits.",
      "Where NeonByte Bunnies provide baseline workforce and NeoByte production, Droids extend specialized, higher-order functions aligned with Sector frequencies and Spirit origins.",
      "Droids are progression-gated — Operators build toward them through Node growth, Spirit recovery, and Sector advancement.",
    ],
  },
  {
    id: "cyborgpunks",
    number: "11",
    title: "CyborgPunks",
    paragraphs: [
      "CyborgPunks are system-controlled NPCs. They are not player-owned characters and are not Operator avatars.",
      "They are controlled by Lunarya / VΣLOHE SYSTEM and populate the world as administrators, guides, mission providers, security agents, lore characters, and enforcers.",
      "Exhibition records (including compressed genesis identities and activated States) may still appear in the archive as permanent signals. In the game architecture, CyborgPunks function as the system’s human-facing NPC layer — authority and story, not a player inventory class.",
    ],
    bullets: [
      "Ownership — system-controlled (not player-owned)",
      "Authority — Lunarya / VΣLOHE SYSTEM",
      "Roles — admin, guide, missions, security, lore, enforcement",
    ],
  },
  {
    id: "search",
    number: "12",
    title: "The Search for the Aethergrid",
    paragraphs: [
      "The long arc of play is expansion of the Network and deeper synchronization with the Aethergrid through the Five Foundations — not a simple kill-leaderboard fantasy.",
      "Operators push from Cyan Foundation outward, recover Spirits, fabricate Droids, grow Nodes, and approach Dual Core conditions: stable sync between Lunarya Research Lab (Physical) and VΣLOHE SYSTEM (Digital).",
    ],
  },
  {
    id: "dual-core",
    number: "13",
    title: "The Dual Core",
    paragraphs: [
      "Dual Core is the synchronization between Physical Reality (Lunarya Research Lab) and Digital Reality (VΣLOHE SYSTEM).",
      "It is NOT a fifth Sector. It is NOT a normal dual-class Spirit that players casually equip. It is the architectural bridge that makes the two realities operate as one continuous experiment.",
      "Endgame and mid-late progression may revolve around strengthening Dual Core stability — proving that Lab and System can remain coherent under load.",
    ],
    bullets: [
      "Physical pole — Lunarya Research Lab",
      "Digital pole — VΣLOHE SYSTEM",
      "Function — synchronization / bridge (not a Sector)",
    ],
  },
  {
    id: "web3-economy",
    number: "14",
    title: "The Web3 Economy",
    paragraphs: [
      "Gameplay-first. Web3 is optional infrastructure — never a gate.",
      "Players do not need to buy NFTs, connect a wallet, or own cryptocurrency to play. The full core loop must remain available without blockchain interaction.",
      "The initial economy uses VLC — an internal currency for progression and systems that do not require on-chain settlement.",
      "VLT appears only in later phases (Phase VI). NeoBytes remain computational energy; they are not replaced by VLC/VLT naming.",
    ],
    bullets: [
      "No NFT purchase required to play",
      "No wallet connection required to play",
      "No crypto ownership required to play",
      "VLC — internal currency (early economy)",
      "VLT — later-phase only (Phase VI)",
      "Optional NFTs — specialized Bunnies / archive identities, never mandatory",
    ],
  },
  {
    id: "nft-philosophy",
    number: "15",
    title: "NFT Philosophy",
    paragraphs: [
      "In the exhibition layer, NFTs remain permanent recorded identities with lore and continuity.",
      "In the game layer, NFTs are optional enhancements or collectible bridges — never the price of admission. Operator identity stays free. Basic workforce stays free. Sector start stays Cyan for everyone.",
    ],
  },
  {
    id: "gameplay-loop",
    number: "16",
    title: "The Core Gameplay Loop",
    paragraphs: [
      "The canonical session and progression sequence is fixed as follows. Systems should implement this order rather than inventing a conflicting onboarding path.",
    ],
    bullets: [
      "1. Enter Lunarya Research Lab (Physical Reality)",
      "2. Create Operator identity (not an NFT; basic male/female appearance)",
      "3. Neural Synchronization (bridge toward Digital Reality)",
      "4. Manifest Node in Sector Cyan (Foundation — always)",
      "5. Deploy NeonByte Bunnies as workforce (build, gather, process, maintain)",
      "6. Produce and spend NeoBytes (computational energy / processing power)",
      "7. Expand Node capacity and unlock systems",
      "8. Recover Aethergrid Spirits (Cyan / Purple / Gold / Void)",
      "9. Fabricate Aethergrid Droids from recovered Spirits",
      "10. Progress Sectors: Cyan → Purple → Gold → Void",
      "11. Interact with CyborgPunks NPCs (missions, guidance, enforcement)",
      "12. Strengthen Dual Core sync (Lab ↔ VΣLOHE SYSTEM)",
      "13. Optional Web3 / VLC play; VLT only in late phases",
    ],
  },
  {
    id: "dev-philosophy",
    number: "17",
    title: "Development Philosophy",
    paragraphs: [
      "Ship thin vertical slices that honor the Five Foundations. Prefer systems that compose over one-shot content dumps.",
      "The exhibition website remains a first-class product. Game features are additive sectors — they must not break archive permanence or aesthetic coherence.",
      "Gameplay-first economy: VLC early, optional Web3, VLT only when the protocol is ready.",
    ],
    bullets: [
      "Five Foundations before feature sprawl",
      "Cyan-first onboarding (no paid Sector start)",
      "Free Operator + basic Bunnies always",
      "PostgreSQL + Prisma as early data backbone (Phase I)",
    ],
  },
  {
    id: "roadmap",
    number: "18",
    title: "Development Roadmap (Phases I–VI)",
    paragraphs: [
      "Phases are directional. Scope locks as capacity allows. Phase order is intentional: solid foundations and free-to-play loop before late-phase token systems.",
    ],
    bullets: [
      "Phase I — Protocol shell, whitepaper, site integration, core data model with PostgreSQL + Prisma, Operator/Node schema foundations",
      "Phase II — Lunarya Lab onboarding, Operator creation, Neural Sync, Cyan Node prototype, local/session persistence",
      "Phase III — NeonByte Bunnies workforce loop, NeoByte energy production/spend, basic construction & maintenance",
      "Phase IV — Spirit recovery, Aethergrid Droid fabrication, Sector progression hooks (Purple / Gold / Void gates)",
      "Phase V — CyborgPunks NPC systems (missions, guides, security), Dual Core sync metrics, VLC internal economy",
      "Phase VI — Optional advanced Web3 bridges, specialized NFT workforce variants, VLT introduction only after core loop is stable",
    ],
  },
  {
    id: "building-status",
    number: "19",
    title: "What We Are Building + Current Status",
    paragraphs: [
      "We are building an interactive layer on top of a living NFT exhibition system — gameplay-first, Five Foundations first, Dual Core as Lab↔System sync.",
      "Current status: GAME IN DEVELOPMENT · ACTIVE DEVELOPMENT. This v0.1.1-DRAFT whitepaper corrects architecture so implementation can proceed without contradictory assumptions.",
      "Existing site content (Archive, VeLozArt, Transmissions, Lore) remains the permanent exhibition layer. Game features ship as additive sectors.",
    ],
    bullets: [
      "Status — UNDER CONSTRUCTION · ACTIVE DEVELOPMENT · WEB3 OPTIONAL",
      "Foundations — Operator · Node · NeonByte Bunnies · Aethergrid Droids · Sectors",
      "Start — always Sector Cyan · Operator is not an NFT · Dual Core ≠ fifth Sector",
      "Economy — NeoBytes = computational energy · VLC early · VLT only Phase VI",
      "Directive — Build your Node. Expand the Network. Reach the Aethergrid.",
    ],
  },
];
