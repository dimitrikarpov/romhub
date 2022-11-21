/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    transpilePackages: ["holy-retroarch"],
  },
}

module.exports = nextConfig
