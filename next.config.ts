import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Intuitive URLs people type by habit
      { source: "/admin/login", destination: "/admin", permanent: true },
      { source: "/login", destination: "/admin", permanent: true },
      { source: "/book", destination: "/reservation", permanent: true },
      { source: "/booking", destination: "/reservation", permanent: true },
      { source: "/prices", destination: "/rates", permanent: true },
      { source: "/fares", destination: "/rates", permanent: true },
    ];
  },
};

export default nextConfig;
