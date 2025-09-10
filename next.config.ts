import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Static registry rewrites
      { source: "/api/registry", destination: "/registry/index.json" },
      { source: "/api/registry/:name*", destination: "/registry/:name*.json" },
    ]
  },
}

export default nextConfig
