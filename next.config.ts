import type { NextConfig } from "next";

const nextConfig: NextConfig = {
output: 'export',
  trailingSlash: true, // Ensure URLs like /products/ work in static build
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
