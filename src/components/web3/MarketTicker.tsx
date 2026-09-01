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
 * Compact cyberpunk price chips — BTC, ETH, SOL, XTZ, and POL.
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

  const btcLabel =
    status === "loading" && !data
      ? "…"
      : formatUsd(data?.btcUsd ?? null, 2);
  const ethLabel =
    status === "loading" && !data
      ? "…"
      : formatUsd(data?.ethUsd ?? null, 2);
  const solLabel =
    status === "loading" && !data
      ? "…"
      : formatUsd(data?.solUsd ?? null, 2);
  const xtzLabel =
    status === "loading" && !data
      ? "…"
      : formatUsd(data?.xtzUsd ?? null, data?.xtzUsd != null && data.xtzUsd < 1 ? 4 : 2);
  const polLabel =
    status === "loading" && !data
      ? "…"
      : formatUsd(data?.polUsd ?? null, data?.polUsd != null && data.polUsd < 1 ? 4 : 2);

  return (
    <div
      className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider sm:gap-2 sm:text-[10px]"
      title={
        data
          ? `Updated ${data.updatedAt} · BTC:${data.sources.btc} · ETH:${data.sources.eth} · SOL:${data.sources.sol} · XTZ:${data.sources.xtz} · POL:${data.sources.pol}`
          : status === "error"
            ? "Price feed offline"
            : "Loading market feed"
      }
      aria-live="polite"
    >
      <span
        className={`rounded border px-1.5 py-0.5 sm:px-2 ${
          status === "error" || data?.btcUsd == null
            ? "border-neon-blue/20 text-muted"
            : "border-[#f7931a]/60 bg-[#f7931a]/10 text-[#ffb45a] shadow-[0_0_8px_rgba(247,147,26,0.12)]"
        }`}
      >
        <span className="hidden text-muted sm:inline">BTC // </span>
        <span className="sm:hidden">BTC </span>
        {btcLabel}
      </span>
      <span
        className={`rounded border px-1.5 py-0.5 sm:px-2 ${
          status === "error" || data?.ethUsd == null
            ? "border-rose-400/30 text-rose-300/80"
            : "border-slate-300/45 bg-slate-200/10 text-slate-100 shadow-[0_0_8px_rgba(226,232,240,0.1)]"
        }`}
      >
        <span className="hidden text-muted sm:inline">ETH // </span>
        <span className="sm:hidden">ETH </span>
        {ethLabel}
      </span>
      <span
        className={`rounded border px-1.5 py-0.5 sm:px-2 ${
          status === "error" || data?.solUsd == null
            ? "border-neon-blue/20 text-muted"
            : "border-[#14f1d9]/60 bg-[#14f1d9]/10 text-[#6fffe9] shadow-[0_0_8px_rgba(20,241,217,0.12)]"
        }`}
      >
        <span className="hidden text-muted sm:inline">SOL // </span>
        <span className="sm:hidden">SOL </span>
        {solLabel}
      </span>
      <span
        className={`rounded border px-1.5 py-0.5 sm:px-2 ${
          status === "error" || data?.xtzUsd == null
            ? "border-neon-blue/20 text-muted"
            : "border-[#2f7df6]/60 bg-[#2f7df6]/10 text-[#75a8ff] shadow-[0_0_8px_rgba(47,125,246,0.12)]"
        }`}
      >
        <span className="hidden text-muted sm:inline">XTZ // </span>
        <span className="sm:hidden">TXZ </span>
        {xtzLabel}
      </span>
      <span
        className={`rounded border px-1.5 py-0.5 sm:px-2 ${
          status === "error" || data?.polUsd == null
            ? "border-neon-blue/20 text-muted"
            : "border-[#a855f7]/60 bg-[#a855f7]/10 text-[#d8a4ff] shadow-[0_0_8px_rgba(168,85,247,0.12)]"
        }`}
      >
        <span className="hidden text-muted sm:inline">POL // </span>
        <span className="sm:hidden">POL </span>
        {polLabel}
      </span>
    </div>
  );
}
