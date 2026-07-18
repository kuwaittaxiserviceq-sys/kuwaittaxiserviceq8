import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Intuitive URLs people type by habit
      { source: "/login", destination: "/admin/login", permanent: false },
      { source: "/book", destination: "/reservation", permanent: true },
      { source: "/booking", destination: "/reservation", permanent: true },
      { source: "/prices", destination: "/rates", permanent: true },
      { source: "/fares", destination: "/rates", permanent: true },
    ];
  },
};

export default nextConfig;
