import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  allowedDevOrigins: ["372h9zx333.preview.c35.airoapp.ai"], // For godaddy's airo environement
};

export default nextConfig;
