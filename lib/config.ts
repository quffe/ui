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
    "http://localhost:3000/api/registry"
  )
}

const getSiteUrl = () => {
  if (typeof window !== "undefined") {
    // Client side - use current window origin
    return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  }
  // Server side
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000"
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
    name: process.env.NEXT_PUBLIC_SITE_NAME || "QuffeUI",
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
      "A comprehensive collection of reusable UI components",
  },

  // Environment helpers
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",

  // Component installation URLs - supports namespace syntax
  getComponentUrl: (componentName: string) => {
    // Map component names to namespace paths
    const namespaceMap: Record<string, string> = {
      // Form components
      "input-amount": "form/input-amount",
      "otp-input": "form/otp-input",
      "file-input": "form/file-input",
      "password-input": "form/password-input",
      checkbox: "form/checkbox",
      input: "form/input",
      textarea: "form/textarea",
      "radio-group": "form/radio-group",
      select: "form/select",

      // Navigation components
      dropdown: "navigation/dropdown",
      "select-dropdown": "navigation/select-dropdown",

      // Data components
      "candle-chart": "data/candle-chart",
      "data-table": "data/data-table",

      // Modal components
      modal: "modal/modal",
      "modal-trigger": "modal/modal-trigger",

      // Replica
      "github-replica": "replica/github-replica",
      "github-replica-swr": "replica/github-replica-swr",
      "github-replica-react-query": "replica/github-replica-react-query",

      // Hooks
      "use-github-replica": "hooks/use-github-replica",
      "use-github-replica-plain": "hooks/use-github-replica-plain",
      "use-github-replica-react-query": "hooks/use-github-replica-react-query",
      "use-mobile": "hooks/use-mobile",
      useCopyToClipboard: "hooks/useCopyToClipboard",
      useCountdown: "hooks/useCountdown",
      useIsomorphicLayoutEffect: "hooks/useIsomorphicLayoutEffect",
      useKeyboardShortcut: "hooks/useKeyboardShortcut",
      useLocalStorage: "hooks/useLocalStorage",
      useOnMountEffect: "hooks/useOnMountEffect",
      useOnMountLayoutEffect: "hooks/useOnMountLayoutEffect",
      useOnUnmountEffect: "hooks/useOnUnmountEffect",
      useOnWindowResize: "hooks/useOnWindowResize",
      useRevalidate: "hooks/useRevalidate",
      useStateChangeEffect: "hooks/useStateChangeEffect",
    }

    const namespacePath = namespaceMap[componentName] || componentName
    return `@quffeui/${namespacePath}`
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

  // Get namespace path for display (e.g., "form/otp-input")
  getNamespacePath: (componentName: string) => {
    const componentUrl = config.getComponentUrl(componentName)
    // Extract the path after the namespace prefix (e.g., "@quffeui/form/input-amount" -> "form/input-amount")
    return componentUrl.includes("/") ? componentUrl.split("/").slice(1).join("/") : componentUrl
  },
}
