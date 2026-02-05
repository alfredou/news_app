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
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
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
