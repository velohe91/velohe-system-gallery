/**
 * Game Protocol whitepaper — structured vision document for /game/whitepaper.
 * v0.1.2-DRAFT — Nexus + CyborgPunk Crew + Web3 mode architecture update.
 *
 * Content-only update; page design unchanged.
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
  tagline: "Build your Nexus. Expand the Network. Reach the Aethergrid.",
  version: "v0.1.2-DRAFT",
  status: "GAME IN DEVELOPMENT · ACTIVE DEVELOPMENT",
} as const;

export const gameWhitepaperSections: WhitepaperSection[] = [
  {
    id: "vision",
    number: "01",
    title: "The Vision",
    paragraphs: [
      "VΣLOHE SYSTEM is expanding from a permanent NFT exhibition into a living interactive protocol. The game layer lets Operators build Nexuses, expand the Network, assemble CyborgPunk Crews, recover Aethergrid Spirits, and pursue deeper contact with the Aethergrid — without replacing or diluting the archive.",
      "This whitepaper defines the architecture, gameplay principles, entity roles, economy philosophy, Web3 participation model, and development roadmap. It is a living specification: systems will evolve as prototypes are built, tested, and refined.",
      "The central objective is simple: create a persistent economic simulation that anyone can enter, while allowing players who choose the Web3 layer to discover additional possibilities within the same universe.",
    ],
  },

  {
    id: "nft-philosophy",
    number: "02",
    title: "NFT Philosophy",
    paragraphs: [
      "VΣLOHE SYSTEM is designed around two complementary ways to experience the game. The core game remains accessible to everyone, while the optional Web3 layer expands the range of things a player can discover, own, and interact with.",
      "NFT ownership is never required to enter VΣLOHE SYSTEM. Players can create an Operator, build a Nexus, deploy basic NeonByte Bunnies, generate NeoBytes, progress through the Core Sectors, activate CyborgPunk Nodes, recover Spirits, fabricate Droids, and continue toward the Aethergrid without purchasing an NFT.",
      "The difference is intentional: Web3 should not simply make a player's numbers larger. Instead, specialized digital assets may provide additional gameplay possibilities such as hidden routes, specialized exploration, unique rescue operations, rare discoveries, specialized CyborgPunk abilities, or access to areas that standard configurations cannot easily reach.",
      "The exact utility of individual NFT assets will evolve as the game is developed and balanced. The philosophy is established now: NFTs should expand what a player can do, discover, and own — not function as a mandatory entrance ticket.",
    ],
    bullets: [
      "🟢 Standard Mode — complete core game experience without NFTs or wallet requirements",
      "🔷 Enhanced Web3 Mode — optional layer providing additional utility, exploration, ownership, and discovery opportunities",
      "Standard Mode — free Operator, basic Bunnies, Cyan start, core progression, Sector exploration",
      "Enhanced Web3 Mode — specialized assets, alternative routes, hidden discoveries, and additional gameplay possibilities",
      "NFTs — optional utility and ownership layer, never mandatory access",
      "The objective is expanded possibility, not simple pay-to-win progression",
    ],
  },

  {
    id: "five-foundations",
    number: "03",
    title: "THE FIVE FOUNDATIONS",
    paragraphs: [
      "THE FIVE FOUNDATIONS are the non-negotiable pillars of VΣLOHE gameplay. All systems, interfaces, economies, and narrative mechanics must map back to these five elements.",
      "They are not optional themes. They are the architecture of the game.",
      "CyborgPunks operate as an active gameplay layer across these foundations, particularly within exploration, investigation, rescue, discovery, and Sector progression.",
    ],
    bullets: [
      "1. Operator — the player's identity inside VΣLOHE SYSTEM",
      "2. Nexus — the Operator's digital infrastructure and persistent server",
      "3. NeonByte Bunnies — the primary workforce responsible for production and construction",
      "4. Aethergrid Droids — defensive units fabricated from recovered Spirits",
      "5. Sectors — Cyan, Purple, Gold, and Void",
    ],
  },

  {
    id: "two-realities",
    number: "04",
    title: "Two Realities (Physical + Digital)",
    paragraphs: [
      "VΣLOHE is dual-layered by design. Progress and meaning come from the relationship between two realities rather than from treating the game as an isolated digital world.",
      "Physical Reality is anchored at the Lunarya Research Lab. It is the human-side headquarters of the Operator, where resources, statistics, storage, research, fabrication, and system preparation are managed.",
      "Digital Reality is VΣLOHE SYSTEM itself: Nexuses, Sectors, NeonByte Bunnies, CyborgPunk Crews, Aethergrid Spirits, Aethergrid Droids, archives, and protocol events. It is where construction, production, exploration, investigation, and expansion occur.",
      "The Dual Core is the synchronization bridge between these realities — Physical Reality (Lunarya Research Lab) and Digital Reality (VΣLOHE SYSTEM).",
    ],
    bullets: [
      "Physical — Lunarya Research Lab, Operator identity, storage, statistics, research, fabrication",
      "Digital — Nexus, Sectors, workforce, Crew, Spirits, Droids, network expansion",
      "Bridge — Dual Core: sustained synchronization between Lab and System",
    ],
  },

  {
    id: "operator",
    number: "05",
    title: "The Operator",
    paragraphs: [
      "The Operator is the player's identity inside VΣLOHE SYSTEM. The Operator is not an NFT and is not purchased.",
      "Every new player begins in Sector Cyan — the Foundation. There is no starting Sector affinity selection. Cyan is the mandatory entry layer of the Network.",
      "At creation, the player may choose a basic male or female Operator appearance. This is a cosmetic identity choice and does not determine power, Sector access, or ownership rights.",
      "The Operator manages the Nexus, coordinates the workforce, assembles a CyborgPunk Crew, oversees exploration, recovers Spirits, and directs the development of the digital infrastructure.",
    ],
    bullets: [
      "Identity — player's in-game Operator",
      "NFT status — not an NFT",
      "Starting Sector — always Cyan",
      "Appearance — basic male or female selection",
      "Primary role — strategy, management, exploration direction, and progression",
    ],
  },

  {
    id: "nexus",
    number: "06",
    title: "The Nexus",
    paragraphs: [
      "The Nexus is the Operator's primary infrastructure inside Digital Reality. It functions as a persistent server and operational hub connected to VΣLOHE SYSTEM.",
      "After Neural Synchronization, the Operator enters the digital network and establishes a Nexus in Sector Cyan. The Nexus is where Rooms are constructed, NeonByte Bunnies operate, NeoBytes are generated, resources are managed, and progression begins.",
      "As the Nexus develops, it gains capacity, unlocks new infrastructure, supports more advanced systems, and establishes access to deeper Sectors.",
      "The term Node is intentionally reserved for the CyborgPunk units within the established VΣLOHE lore. The player's server and infrastructure is therefore called a Nexus.",
    ],
    bullets: [
      "Digital home base after Neural Synchronization",
      "Persistent server and infrastructure controlled by the Operator",
      "Hosts Rooms, NeonByte Bunnies, resources, and later defensive systems",
      "Gateway toward Sector progression",
      "Stores production, progression, discoveries, and operational history",
    ],
  },

  {
    id: "neonbyte-bunnies",
    number: "07",
    title: "NeonByte Bunnies",
    paragraphs: [
      "NeonByte Bunnies are the primary workforce of VΣLOHE SYSTEM. They construct, gather, process, maintain infrastructure, and generate NeoBytes — the computational energy required by the digital network.",
      "They are not primarily scouts, companions, or combat characters. Their core identity is productive labor.",
      "Basic NeonByte Bunnies are available without NFTs so every Operator can participate in the economic foundation of the game. Specialized Bunnies may later exist as optional NFTs with distinct production profiles and utility.",
      "Bunnies can be assigned to Rooms inside the Operator's Nexus. Their roles and efficiencies determine how effectively the Nexus can produce and manage resources.",
    ],
    bullets: [
      "Workforce — construction, gathering, processing, maintenance",
      "NeoByte production — computational energy generation",
      "Basic Bunnies — free / non-NFT access",
      "Specialized Bunnies — optional future NFT variants",
      "Room assignment — workers can be deployed to specific infrastructure",
    ],
  },

  {
    id: "neobytes",
    number: "08",
    title: "NeoBytes",
    paragraphs: [
      "NeoBytes are the computational energy and processing power of VΣLOHE SYSTEM. They are the fuel required for digital operations, infrastructure, progression, and expansion.",
      "NeoBytes are generated through the Operator's Nexus and NeonByte Bunny workforce. They are required to construct, upgrade, research, explore, stabilize, and expand the digital infrastructure.",
      "NeoBytes are distinct from VLC and VLT. NeoBytes represent computational energy, while VLC functions as an internal economic currency and VLT is reserved for a later Web3 phase.",
    ],
    bullets: [
      "Definition — computational energy / processing power of VΣLOHE SYSTEM",
      "Produced through Nexus infrastructure and NeonByte Bunnies",
      "Used for construction, upgrades, research, exploration, and expansion",
      "Required for deeper progression into the Network",
      "Separate from VLC and VLT",
    ],
  },

  {
    id: "four-sectors",
    number: "09",
    title: "The Four Core Sectors",
    paragraphs: [
      "There are exactly four Core Sectors. They form a progression hierarchy of environments, resources, threats, technologies, discoveries, and narrative depth.",
      "All Operators begin in Cyan. Later Sectors unlock through progression, Nexus development, exploration, and discovery rather than through a starting purchase.",
      "Each Sector contains different challenges and Aethergrid discoveries. The deeper the Operator travels, the more specialized their workforce, Crew, and defensive systems become.",
    ],
    bullets: [
      "Cyan — Foundation (mandatory starting Sector; basic construction and production)",
      "Purple — Expansion (advanced infrastructure, resources, and threats)",
      "Gold — Ascension (rare resources, advanced technology, and greater challenges)",
      "Void — The Unknown (unstable energy, extreme threats, and the final major barrier)",
    ],
  },

  {
    id: "spirits",
    number: "10",
    title: "Aethergrid Spirits",
    paragraphs: [
      "Aethergrid Spirits correspond to the four Core Sectors: Cyan, Purple, Gold, and Void. Each Spirit carries the frequency and characteristics of the Sector in which it is discovered.",
      "Spirits are recovered through exploration and investigation. CyborgPunk Crew abilities can reveal hidden signatures, anomalies, and areas where Spirits may be concealed.",
      "Once recovered, Spirits can be transported back to the Lunarya Research Lab and used as the foundation for fabricating Aethergrid Droids.",
      "Spirits therefore connect exploration, lore discovery, and the defensive progression of the player's Nexus.",
    ],
    bullets: [
      "Four Sector alignments — Cyan · Purple · Gold · Void",
      "Discovered through exploration and investigation",
      "CyborgPunk abilities may reveal hidden Spirit signatures",
      "Recovered Spirits can be used to fabricate Aethergrid Droids",
      "Spirits remain permanent archive entities within the VΣLOHE exhibition",
    ],
  },

  {
    id: "droids",
    number: "11",
    title: "Aethergrid Droids",
    paragraphs: [
      "Aethergrid Droids are the defensive force of the Operator's infrastructure. They are fabricated from recovered Aethergrid Spirits.",
      "Where NeonByte Bunnies provide workforce and CyborgPunks provide specialized exploration and investigation, Droids exist to protect what the Operator has built.",
      "Droids defend Nexuses, Rooms, resources, Fortresses, and conquered Sectors against threats encountered as the Network expands.",
      "Their progression is tied to Spirit recovery, Sector advancement, and the development of the Operator's infrastructure.",
    ],
    bullets: [
      "Origin — recovered Aethergrid Spirits",
      "Primary function — defense and protection",
      "Protects — Nexus infrastructure, Rooms, resources, and Sectors",
      "Progression — tied to Spirits and Sector advancement",
    ],
  },

  {
    id: "cyborgpunks",
    number: "12",
    title: "CyborgPunks — The Crew",
    paragraphs: [
      "CyborgPunks are an active gameplay system within VΣLOHE SYSTEM. In the established lore, the CyborgPunks are known as Nodes of the system — autonomous units created to protect VΣLOHE SYSTEM.",
      "After the events surrounding Lunarya's original connection to the System, the CyborgPunks remained dormant inside cryogenic capsules. Their bodies and systems were preserved in suspended blue fluid until the CyborgPunk Protocol could be authorized.",
      "During the game, Lunarya accesses an encrypted CyborgPunk directory and activates the required protocol. Once the authorization sequence is completed, dormant CyborgPunks begin to awaken from their cryogenic capsules.",
      "Awakened CyborgPunks can become members of the Operator's Crew. They are not workers like NeonByte Bunnies and they are not defensive constructs like Aethergrid Droids. Their purpose is to accompany the Operator through the Sectors and provide specialized exploration, investigation, scanning, patrol, rescue, and discovery abilities.",
      "The Crew functions as a party-based gameplay system. Different CyborgPunks possess different abilities, meaning that the Operator may assemble different Crew configurations depending on the Sector, mission, anomaly, or objective.",
      "A CyborgPunk may detect hidden Aethergrid signatures, reveal concealed routes, investigate anomalies, locate trapped Bunnies, identify threats, map unexplored areas, or provide other specialized capabilities.",
      "The player is therefore not simply collecting CyborgPunks. They are building a functional Crew whose abilities determine what they can discover within VΣLOHE SYSTEM.",
    ],
    bullets: [
      "Lore designation — Nodes of VΣLOHE SYSTEM",
      "Gameplay role — Operator Crew / exploration specialists",
      "Activation — CyborgPunk Protocol + cryogenic awakening",
      "Abilities — scanning, investigation, reconnaissance, patrol, rescue, discovery",
      "Exploration — reveal hidden areas, Spirit signatures, anomalies, and trapped Bunnies",
      "Crew system — Operators assemble specialized combinations for different objectives",
      "Future Web3 utility — specialized CyborgPunk NFTs may provide unique abilities or access",
    ],
  },

  {
    id: "search",
    number: "13",
    title: "The Search for the Aethergrid",
    paragraphs: [
      "The long arc of play is the expansion of the Network and the search for the Aethergrid.",
      "Operators develop their Nexus, deploy NeonByte Bunnies, generate NeoBytes, activate CyborgPunk Nodes, assemble a Crew, explore increasingly dangerous Sectors, recover Aethergrid Spirits, fabricate Droids, and move deeper into the unknown.",
      "The Aethergrid is not simply a destination at the end of a map. Its discovery is tied to understanding the relationship between the Physical and Digital realities.",
      "Lunarya did not discover the Aethergrid because she simply searched harder than anyone else. The Aethergrid allowed itself to be discovered.",
      "The ultimate question is whether the Operator can reach the point where the System is willing to reveal itself again.",
    ],
  },

  {
    id: "dual-core",
    number: "14",
    title: "The Dual Core",
    paragraphs: [
      "Dual Core represents the synchronization between Physical Reality — the Lunarya Research Lab — and Digital Reality — VΣLOHE SYSTEM.",
      "It is not a fifth Sector. It is not simply another Spirit type. It is the architectural and narrative bridge between the two worlds.",
      "Lunarya became the first known individual to establish this connection. The player's long-term journey moves toward understanding, stabilizing, and ultimately reaching this same state of synchronization.",
      "The Dual Core therefore represents convergence, continuity, and the possibility that the boundary between human reality and digital reality is not permanent.",
    ],
    bullets: [
      "Physical pole — Lunarya Research Lab",
      "Digital pole — VΣLOHE SYSTEM",
      "Function — synchronization / bridge",
      "Not a Sector — Dual Core exists beyond the four-sector progression",
      "Meaning — convergence between the two realities",
    ],
  },

  {
    id: "web3-economy",
    number: "15",
    title: "The Web3 Economy",
    paragraphs: [
      "The NFT Philosophy establishes the fundamental rule: Web3 is optional infrastructure, not a gate to gameplay. This section defines how the economic layer may eventually support that philosophy.",
      "The initial game economy uses VLC — VΣLOHE Credits — as an internal, off-chain currency for progression and economic systems.",
      "NeoBytes remain computational energy and should never be confused with VLC. NeoBytes power the digital infrastructure; VLC functions as an economic currency.",
      "VΣLOHE Token (VLT) is reserved for a later phase. It will not be introduced until the game and its internal economy have been properly developed, tested, and balanced.",
    ],
    bullets: [
      "VLC — initial internal game currency",
      "NeoBytes — computational energy",
      "VLT — future native ecosystem token",
      "Blockchain — optional during the initial game phase",
      "Wallet — not required for the core game",
      "NFTs — optional assets with additional utility and ownership",
    ],
  },

  {
    id: "gameplay-loop",
    number: "16",
    title: "The Core Gameplay Loop",
    paragraphs: [
      "The canonical gameplay loop connects the two realities and the four major gameplay roles: the Operator directs, NeonByte Bunnies produce, CyborgPunks explore, and Aethergrid Droids defend.",
      "The loop is designed to create continuous progression without requiring the player to own NFTs. Enhanced Web3 Mode can add additional routes, abilities, and discoveries without replacing the Standard Mode experience.",
    ],
    bullets: [
      "1. Enter Lunarya Research Lab (Physical Reality)",
      "2. Create Operator identity (not an NFT)",
      "3. Establish Neural Synchronization",
      "4. Enter VΣLOHE SYSTEM and manifest the player's Nexus in Sector Cyan",
      "5. Build Rooms and deploy basic NeonByte Bunnies",
      "6. Generate NeoBytes through workforce and infrastructure",
      "7. Upgrade and expand the Nexus",
      "8. Activate dormant CyborgPunks through the CyborgPunk Protocol",
      "9. Assemble a specialized CyborgPunk Crew",
      "10. Explore Sectors, scan anomalies, investigate signals, and rescue trapped Bunnies",
      "11. Discover and recover Aethergrid Spirits",
      "12. Return to the Lunarya Research Lab",
      "13. Fabricate Aethergrid Droids from recovered Spirits",
      "14. Deploy Droids to defend Nexus infrastructure and conquered areas",
      "15. Progress through Cyan → Purple → Gold → Void",
      "16. Strengthen Dual Core synchronization between Lab and System",
      "17. Continue deeper into the Network in search of the Aethergrid",
      "18. Optional Enhanced Web3 Mode may provide additional exploration and discovery opportunities",
    ],
  },

  {
    id: "dev-philosophy",
    number: "17",
    title: "Development Philosophy",
    paragraphs: [
      "VΣLOHE SYSTEM will be developed through thin vertical slices that prove the core gameplay before expanding into large-scale systems.",
      "The exhibition website remains a first-class product. Game features are additive systems and must not compromise the permanence, continuity, or aesthetic coherence of the existing VΣLOHE archive.",
      "The game must remain enjoyable without NFTs. Web3 should enhance a functioning game rather than become the reason the game exists.",
      "The CyborgPunk Crew is treated as a core gameplay mechanic, not passive NPC decoration. Their abilities should meaningfully affect exploration, discovery, rescue, and progression.",
    ],
    bullets: [
      "Five Foundations before feature sprawl",
      "Cyan-first onboarding",
      "Standard Mode always playable without NFTs",
      "Enhanced Web3 Mode adds optional depth",
      "Free Operator + basic Bunnies",
      "CyborgPunk Crew as active exploration gameplay",
      "PostgreSQL + Prisma as the early data backbone",
      "Server-authoritative progression and economy",
    ],
  },

  {
    id: "roadmap",
    number: "18",
    title: "Development Roadmap (Phases I–VI)",
    paragraphs: [
      "The roadmap is directional. Systems will be implemented progressively, tested through playable prototypes, and expanded only when the underlying loop is stable.",
      "The order is intentional: establish the game first, then expand the economy, Web3 utility, and token layer.",
    ],
    bullets: [
      "Phase I — Protocol shell, whitepaper, site integration, PostgreSQL + Prisma data model, User / Operator / Nexus foundations",
      "Phase II — Lunarya Research Lab onboarding, Operator creation, Neural Synchronization, Cyan Nexus prototype, initial Rooms and server persistence",
      "Phase III — NeonByte Bunnies workforce loop, NeoByte computational energy production, construction, maintenance, and Nexus progression",
      "Phase IV — CyborgPunk Protocol, cryogenic awakening, Crew system, exploration abilities, Spirit discovery, anomaly investigation, and Bunny rescue mechanics",
      "Phase V — Aethergrid Droid fabrication, Sector progression hooks for Purple / Gold / Void, defense systems, and VLC internal economy",
      "Phase VI — Enhanced Web3 Mode, specialized NFT Bunnies / CyborgPunk Nodes / Droids, on-chain ownership, and eventual VLT integration after the core game economy is stable",
    ],
  },

  {
    id: "building-status",
    number: "19",
    title: "What We Are Building + Current Status",
    paragraphs: [
      "We are building an interactive game layer on top of a living VΣLOHE SYSTEM universe — gameplay-first, Standard Mode accessible to everyone, Enhanced Web3 Mode available as an optional layer, and the CyborgPunk Crew integrated as an active exploration mechanic.",
      "Current status: GAME IN DEVELOPMENT · ACTIVE DEVELOPMENT. This v0.1.2-DRAFT whitepaper reflects the current architecture of the Nexus, CyborgPunk Crew, Standard Mode, Enhanced Web3 Mode, Four Core Sectors, Dual Core, and the planned Web3 economy.",
      "Existing site content — Archive, VeLozArt, Transmissions, Lore, and the permanent NFT exhibition — remains part of the larger VΣLOHE ecosystem. The game expands the universe without replacing its canonical archive.",
    ],
    bullets: [
      "Status — UNDER CONSTRUCTION · ACTIVE DEVELOPMENT · WEB3 OPTIONAL",
      "Foundations — Operator · Nexus · NeonByte Bunnies · Aethergrid Droids · Sectors",
      "Crew — CyborgPunks / Nodes become active exploration and investigation units",
      "Modes — Standard Mode + Enhanced Web3 Mode",
      "Start — always Sector Cyan · Operator is not an NFT",
      "Economy — NeoBytes = computational energy · VLC = internal currency · VLT = future token",
      "Infrastructure — Nexus = player server · Node = canonical CyborgPunk designation",
      "Dual Core — synchronization between Physical and Digital realities",
      "Directive — Build your Nexus. Expand the Network. Reach the Aethergrid.",
    ],
  },
];