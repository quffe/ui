// Get environment variables with fallbacks
const getRegistryUrl = () => {
  if (typeof window !== "undefined") {
    // Client side - use public env vars or current window origin
    return process.env.NEXT_PUBLIC_REGISTRY_URL || `${window.location.origin}/api/registry`
  }
  // Server side - can use either public or server env vars
  return (
    process.env.NEXT_PUBLIC_REGISTRY_URL ||
    process.env.REGISTRY_URL ||
    "http://localhost:3001/api/registry"
  )
}

const getSiteUrl = () => {
  if (typeof window !== "undefined") {
    // Client side - use current window origin
    return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  }
  // Server side
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3001"
}

export const config = {
  // Registry URLs based on environment
  registry: {
    get baseUrl() {
      return getRegistryUrl()
    },
    get apiUrl() {
      return getRegistryUrl()
    },
  },

  // Site configuration
  site: {
    get url() {
      return getSiteUrl()
    },
    name: process.env.NEXT_PUBLIC_SITE_NAME || "UI Components",
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
      "A comprehensive collection of reusable UI components",
  },

  // Environment helpers
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",

  // Component installation URLs
  getComponentUrl: (componentName: string) => {
    return `${getRegistryUrl()}/${componentName}`
  },

  // CLI installation command generator
  getInstallCommand: (componentName: string) => {
    const componentUrl = config.getComponentUrl(componentName)
    return `pnpm dlx shadcn@latest add ${componentUrl}`
  },

  // Get all available components from registry
  getRegistryIndexUrl: () => {
    return getRegistryUrl()
  },
}
