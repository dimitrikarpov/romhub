/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  transpilePackages: ["holy-retroarch"],
  swcPlugins: [["next-superjson-plugin", {}]],
}

module.exports = nextConfig
