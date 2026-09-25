import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Allows multipart route-handler requests up to the application-level
      // 50 MB video limit plus multipart framing overhead.
      bodySizeLimit: "52mb",
    },
  },
};

export default nextConfig;
