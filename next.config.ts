import type { NextConfig } from "next";
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4925',

      },
    ],
  },
}

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: false,
};
export default nextConfig;
