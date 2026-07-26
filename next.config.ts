import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local SVG placeholders used as NFT art
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
