"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  connectSolanaNode,
  connectTezosNode,
  disconnectSolanaNode,
  disconnectTezosNode,
  type LinkedSession,
} from "@/lib/web3/multi-chain";

type MultiChainContextValue = {
  solana: LinkedSession | null;
  tezos: LinkedSession | null;
  connecting: "solana" | "tezos" | null;
  error: string | null;
  clearError: () => void;
  connectSolana: () => Promise<void>;
  connectTezos: () => Promise<void>;
  disconnectSolana: () => Promise<void>;
  disconnectTezos: () => Promise<void>;
  hasAnyAltChain: boolean;
};

const MultiChainContext = createContext<MultiChainContextValue | null>(null);

export function MultiChainProvider({ children }: { children: ReactNode }) {
  const [solana, setSolana] = useState<LinkedSession | null>(null);
  const [tezos, setTezos] = useState<LinkedSession | null>(null);
  const [connecting, setConnecting] = useState<"solana" | "tezos" | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const connectSolana = useCallback(async () => {
    setError(null);
    setConnecting("solana");
    try {
      const session = await connectSolanaNode();
      setSolana(session);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Solana connect failed.");
      throw e;
    } finally {
      setConnecting(null);
    }
  }, []);

  const connectTezos = useCallback(async () => {
    setError(null);
    setConnecting("tezos");
    try {
      const session = await connectTezosNode();
      setTezos(session);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Tezos connect failed.");
      throw e;
    } finally {
      setConnecting(null);
    }
  }, []);

  const disconnectSolana = useCallback(async () => {
    await disconnectSolanaNode();
    setSolana(null);
  }, []);

  const disconnectTezos = useCallback(async () => {
    await disconnectTezosNode();
    setTezos(null);
  }, []);

  const value = useMemo<MultiChainContextValue>(
    () => ({
      solana,
      tezos,
      connecting,
      error,
      clearError,
      connectSolana,
      connectTezos,
      disconnectSolana,
      disconnectTezos,
      hasAnyAltChain: Boolean(solana || tezos),
    }),
    [
      solana,
      tezos,
      connecting,
      error,
      clearError,
      connectSolana,
      connectTezos,
      disconnectSolana,
      disconnectTezos,
    ],
  );

  return (
    <MultiChainContext.Provider value={value}>
      {children}
    </MultiChainContext.Provider>
  );
}

export function useMultiChain() {
  const ctx = useContext(MultiChainContext);
  if (!ctx) {
    throw new Error("useMultiChain must be used within MultiChainProvider");
  }
  return ctx;
}
