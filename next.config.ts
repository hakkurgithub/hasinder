import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/basinda-biz",
        destination: "/",
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;