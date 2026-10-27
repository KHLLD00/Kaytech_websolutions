import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/website-design-development",
        destination: "/services/website-design",
        permanent: true,
      },
      {
        source: "/services/custom-web-development",
        destination: "/services/custom-website-design",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
