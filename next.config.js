/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["assets.coingecko.com", "media.graphassets.com", "openweathermap.org"]
    },
   experimental: {
       workerThreads: false,
       cpus: 1
    }
}
/*const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
  module.exports = withBundleAnalyzer({})*/
module.exports = nextConfig
