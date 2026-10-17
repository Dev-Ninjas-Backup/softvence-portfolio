import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  devIndicators: false,
  images: {
    // Set NEXT_IMAGE_UNOPTIMIZED=1 to render source assets byte-for-byte,
    // which keeps screenshot diffing free of codec noise.
    unoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED === "1",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
