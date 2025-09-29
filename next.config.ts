import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Static registry rewrites
      { source: "/api/registry", destination: "/registry/index.json" },
      { source: "/api/registry/:name*", destination: "/registry/:name*.json" },
    ]
  },
  async redirects() {
    return [
      {
        source: "/docs/hooks/useGithubReplica",
        destination: "/replica/hooks/useGithubReplica",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
