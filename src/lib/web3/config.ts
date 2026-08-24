/**
 * Central Web3 config for VΣLOHE SYSTEM Phase 1.
 * Edit chains / app name here only.
 */

import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

/** Primary chain for “switch network” prompts */
export const PRIMARY_CHAIN = base;

/** Deploy / browse targets — easy to extend */
export const SUPPORTED_CHAINS = [base, mainnet] as const;

export const WC_PROJECT_ID =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "MISSING_WC_PROJECT_ID";

export const APP_NAME = "VΣLOHE SYSTEM";

/** Create wagmi config in the client provider (not at import time). */
export function getWagmiConfig() {
  // Note: coinbaseWallet omitted — CDP SDK pulls optional @x402 deps that break Next builds.
  const connectors = connectorsForWallets(
    [
      {
        groupName: "Recommended",
        wallets: [metaMaskWallet, rainbowWallet, walletConnectWallet],
      },
    ],
    {
      appName: APP_NAME,
      projectId: WC_PROJECT_ID,
    },
  );

  return createConfig({
    connectors,
    chains: [base, mainnet],
    transports: {
      [base.id]: http(),
      [mainnet.id]: http(),
    },
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });
}

export type WagmiConfig = ReturnType<typeof getWagmiConfig>;