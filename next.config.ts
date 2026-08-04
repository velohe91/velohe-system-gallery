import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve optimized images inline (attachment can break gallery display)
    contentDispositionType: "inline",
    // Local public/ assets — skip optimizer issues with large JPG/GIF NFT media
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
