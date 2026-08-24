"use client";

import { useEffect, useState } from "react";
import type { MarketPricesResponse } from "@/app/api/market/prices/route";

const POLL_MS = 45_000;

function formatUsd(value: number | null, digits = 2): string {
  if (value === null || Number.isNaN(value)) return "---";
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}

/**
 * Compact cyberpunk price chips — ETH + TXZ.
 * Polls /api/market/prices; never blocks layout on error.
 */
export function MarketTicker() {
  const [data, setData] = useState<MarketPricesResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/market/prices", { cache: "no-store" });
        if (!res.ok) throw new Error(`http_${res.status}`);
        const json = (await res.json()) as MarketPricesResponse;
        if (!cancelled) {
          setData(json);
          setStatus("ok");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    void load();
    const id = window.setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const ethLabel =
    status === "loading" && !data
      ? "…"
      : formatUsd(data?.ethUsd ?? null, 2);
  const txzLabel =
    status === "loading" && !data
      ? "…"
      : formatUsd(data?.txzUsd ?? null, data?.txzUsd != null && data.txzUsd < 1 ? 4 : 2);

  return (
    <div
      className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider sm:gap-2 sm:text-[10px]"
      title={
        data
          ? `Updated ${data.updatedAt} · ETH:${data.sources.eth} · TXZ:${data.sources.txz}`
          : status === "error"
            ? "Price feed offline"
            : "Loading market feed"
      }
      aria-live="polite"
    >
      <span
        className={`rounded border px-1.5 py-0.5 sm:px-2 ${
          status === "error"
            ? "border-rose-400/30 text-rose-300/80"
            : "border-neon-cyan/25 text-neon-cyan/90"
        }`}
      >
        <span className="hidden text-muted sm:inline">ETH // </span>
        <span className="sm:hidden">ETH </span>
        {ethLabel}
      </span>
      <span
        className={`rounded border px-1.5 py-0.5 sm:px-2 ${
          status === "error" || data?.txzUsd == null
            ? "border-neon-blue/20 text-muted"
            : "border-neon-blue/30 text-neon-blue/90"
        }`}
      >
        <span className="hidden text-muted sm:inline">TXZ // </span>
        <span className="sm:hidden">TXZ </span>
        {txzLabel}
      </span>
    </div>
  );
}
