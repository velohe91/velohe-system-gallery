import { NextResponse } from "next/server";

export type MarketPricesResponse = {
  ethUsd: number | null;
  txzUsd: number | null;
  updatedAt: string;
  sources: { eth: string; txz: string };
};

/** In-memory cache (~45s) to reduce upstream rate limits */
let cache: { at: number; body: MarketPricesResponse } | null = null;
const CACHE_MS = 45_000;

async function fetchEthUsd(): Promise<{
  value: number | null;
  source: string;
}> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
      { next: { revalidate: 45 }, headers: { Accept: "application/json" } },
    );
    if (!res.ok) {
      return { value: null, source: `coingecko:http_${res.status}` };
    }
    const data = (await res.json()) as { ethereum?: { usd?: number } };
    const usd = data.ethereum?.usd;
    return {
      value: typeof usd === "number" ? usd : null,
      source: "coingecko:ethereum",
    };
  } catch {
    return { value: null, source: "coingecko:error" };
  }
}

/**
 * TXZ ticker: treat as Tezos (XTZ) for exhibition / Objkt context.
 * If a distinct TXZ asset is listed later, swap the CoinGecko id here.
 */
async function fetchTxzUsd(): Promise<{
  value: number | null;
  source: string;
}> {
  const customId = process.env.TXZ_COINGECKO_ID?.trim();
  if (!customId) {
    // Default: Tezos XTZ (displayed as TXZ in chrome)
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd",
        { next: { revalidate: 45 }, headers: { Accept: "application/json" } },
      );
      if (!res.ok) {
        return { value: null, source: "pending" };
      }
      const data = (await res.json()) as { tezos?: { usd?: number } };
      const usd = data.tezos?.usd;
      return {
        value: typeof usd === "number" ? usd : null,
        source: typeof usd === "number" ? "coingecko:tezos(xtz→txz)" : "pending",
      };
    } catch {
      return { value: null, source: "pending" };
    }
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(customId)}&vs_currencies=usd`,
      { next: { revalidate: 45 }, headers: { Accept: "application/json" } },
    );
    if (!res.ok) {
      return { value: null, source: "pending" };
    }
    const data = (await res.json()) as Record<string, { usd?: number }>;
    const usd = data[customId]?.usd;
    return {
      value: typeof usd === "number" ? usd : null,
      source:
        typeof usd === "number" ? `coingecko:${customId}` : "pending",
    };
  } catch {
    return { value: null, source: "pending" };
  }
}

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.at < CACHE_MS) {
    return NextResponse.json(cache.body, {
      headers: { "Cache-Control": "public, s-maxage=45, stale-while-revalidate=30" },
    });
  }

  const [eth, txz] = await Promise.all([fetchEthUsd(), fetchTxzUsd()]);

  const body: MarketPricesResponse = {
    ethUsd: eth.value,
    txzUsd: txz.value,
    updatedAt: new Date().toISOString(),
    sources: { eth: eth.source, txz: txz.source },
  };

  cache = { at: now, body };

  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, s-maxage=45, stale-while-revalidate=30" },
  });
}
