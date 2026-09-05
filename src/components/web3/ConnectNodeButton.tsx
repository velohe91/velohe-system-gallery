"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMultiChain } from "@/components/web3/MultiChainProvider";
import { ChainConnectModal } from "@/components/web3/ChainConnectModal";
import { NodeAccountModal } from "@/components/web3/NodeAccountModal";
import { getChainBadgeLabel, PRIMARY_CHAIN } from "@/lib/web3/config";
import { truncateAddress } from "@/lib/web3/multi-chain";

/**
 * CONNECT NODE — multi-namespace entry.
 * EVM via RainbowKit; Solana/Tezos via injected helpers.
 * Custom NodeAccountModal replaces RainbowKit openAccountModal.
 */
export function ConnectNodeButton() {
  const { solana, tezos, hasAnyAltChain } = useMultiChain();
  const [chainModalOpen, setChainModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const evmConnected = Boolean(ready && account && chain);
        const anyConnected = evmConnected || hasAnyAltChain;

        const displayAddress = evmConnected
          ? account!.address
          : solana?.address ?? tezos?.address ?? null;

        if (!ready) {
          return (
            <button
              type="button"
              disabled
              className="rounded border border-neon-cyan/20 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted opacity-50"
            >
              …
            </button>
          );
        }

        return (
          <>
            {!anyConnected ? (
              <button
                type="button"
                onClick={() => setChainModalOpen(true)}
                className="rounded border border-neon-cyan/50 bg-neon-cyan/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neon-cyan transition-colors hover:border-neon-cyan hover:bg-neon-cyan/20"
              >
                Connect Node
              </button>
            ) : chain?.unsupported ? (
              <button
                type="button"
                onClick={openChainModal}
                className="rounded border border-amber-400/50 bg-amber-500/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-amber-200 transition-colors hover:bg-amber-500/20"
                title={`Switch to ${PRIMARY_CHAIN.name}`}
              >
                Switch Network
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                {evmConnected && chain && (
                  <button
                    type="button"
                    onClick={openChainModal}
                    className="hidden rounded border border-neon-blue/30 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-neon-blue sm:inline-flex"
                    title={chain.name}
                  >
                    {getChainBadgeLabel(chain.id, chain.name)}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setAccountModalOpen(true)}
                  className="rounded border border-neon-cyan/40 bg-neon-cyan/5 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neon-cyan transition-colors hover:border-neon-cyan hover:bg-neon-cyan/10"
                  title={displayAddress ?? "Node account"}
                >
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  {displayAddress
                    ? truncateAddress(displayAddress)
                    : "Node"}
                </button>
              </div>
            )}

            <ChainConnectModal
              open={chainModalOpen}
              onClose={() => setChainModalOpen(false)}
              onOpenEvm={openConnectModal}
            />
            <NodeAccountModal
              open={accountModalOpen}
              onClose={() => setAccountModalOpen(false)}
              onLinkAnother={() => setChainModalOpen(true)}
            />
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
