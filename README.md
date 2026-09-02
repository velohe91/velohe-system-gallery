# VΣLOHE SYSTEM — NFT Exhibition System

An immersive cyberpunk web app for exhibiting NFT-style artifacts with lore, system logs, and a holographic gallery UI.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion

---

## Features

- **Landing** — Animated `VΣLOHE SYSTEM` logo, boot sequence (`SYSTEM ONLINE`), **Enter the Archive** CTA
- **Gallery** — Responsive NFT grid, hover glow, modal with enlarged art + lore
- **Transmissions** — Chronological system-log feed
- **About** — Short project overview
- **Immersive chrome** — Scanlines, particle field, neon theme, **Fullscreen** toggle
- **Data-driven catalog** — Add NFTs by editing one TypeScript array

---

## Requirements

- **Node.js 18+** (recommended: 20+)
- npm (comes with Node)

---

## Getting started

```bash
# Install dependencies
npm install

# Copy env and set WalletConnect project ID (required for Connect Node)
cp .env.example .env.local
# Edit .env.local → NEXT_PUBLIC_WC_PROJECT_ID=...

# Development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WC_PROJECT_ID` | **Yes** (for wallet connect) | WalletConnect Cloud project ID — [cloud.walletconnect.com](https://cloud.walletconnect.com/) |
| `TXZ_COINGECKO_ID` | No | CoinGecko asset id if TXZ is not Tezos; default maps **TXZ → Tezos (XTZ)**|

### Web3 Phase 1 (header)

- Live **ETH** / **TXZ** price chips (poll `/api/market/prices` every 45s)
- **CONNECT NODE** via RainbowKit (wagmi + viem) — Base primary, Ethereum mainnet available
- Site works fully **without** a connected wallet (no gated routes in this phase)

```bash
# Production build
npm run build

# Start production server
npm start
```

```bash
# Lint
npm run lint
```

---

## How to add a new NFT

1. Add an image under `public/nfts/` (e.g. `nft-009.svg` or `.png`).
2. Open `src/data/nfts.ts` and append an object to the `nfts` array:

```ts
{
  id: "VEL-009",
  title: "Your Title",
  image: "/nfts/nft-009.svg",
  series: "Your Series",
  rarity: "rare", // common | rare | epic | legendary | mythic
  status: "online", // online | sealed | corrupted | archived
  year: 2082,
  tags: ["tag-a", "tag-b"],
  lore: `Multi-line lore text for the modal.`,
},
```

3. Restart or refresh the dev server — the Gallery picks it up automatically.

### How to add a transmission / log

Edit `src/data/transmissions.ts` and insert a new entry at the **top** of the array (newest-first feed). Optionally set `relatedNftId` to an NFT `id`.

---

## Project structure

```
src/
  app/                  # Routes: /, /gallery, /transmissions, /about
  components/
    layout/             # Navbar, Footer, ImmersiveShell
    effects/            # Particles, scanlines, hologram frame
    home/               # Logo, boot sequence, CTA
    gallery/            # Grid, card, modal
    transmissions/      # Log feed
    ui/                 # NeonButton, headings, page transition
  data/                 # nfts.ts, transmissions.ts  ← edit these
  lib/                  # types, constants
  hooks/                # useFullscreen, usePrefersReducedMotion
public/nfts/            # NFT images
```

---

## Design notes

- **Theme:** deep void black (`#03050a`) + neon blue / cyan
- **Type:** Orbitron (display) + Share Tech Mono (body / logs)
- **Motion:** Framer Motion with `prefers-reduced-motion` respect
- **Fullscreen:** Navbar control uses the browser Fullscreen API (limited on some mobile browsers)

---

## License

Private exhibition project — customize freely for your own archive.
