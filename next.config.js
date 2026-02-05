/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.coingecko.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.graphassets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "openweathermap.org",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "openweathermap.org",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    // Avoid failing builds due to ESLint option mismatches in CI
    ignoreDuringBuilds: true,
  },
  // i18n removed — project uses single static language
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

/*const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
  module.exports = withBundleAnalyzer({})*/
module.exports = nextConfig
