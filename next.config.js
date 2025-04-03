const { withBlitz } = require("@blitzjs/next")

/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "standalone",
  //target: "serverless",
  trailingSlash: true,
  experimental: {
    typedRoutes: true,
  },
}

module.exports = withBlitz(nextConfig)
