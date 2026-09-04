import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/urunler/nova-03-pulse-akilli-gizli-bolmeli-komodin",
        destination: "/urunler/nova-aura-01-akilli-gizli-bolmeli-komodin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
