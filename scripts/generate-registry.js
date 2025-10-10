#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

// Configuration
const COMPONENTS_DIR = path.join(process.cwd(), "components")
const HOOKS_DIR = path.join(process.cwd(), "hooks")
// Output directory now serves static files from public/registry
const REGISTRY_DIR = path.join(process.cwd(), "public", "registry")

// Category mappings
const CATEGORIES = {
  Data: ["DataTable"],
  Form: [
    "InputAmount",
    "OtpInput",
    "InputSelect",
    "FileInput",
    "PasswordInput",
    "DateRangePicker",
    "Input",
    "Textarea",
    "Checkbox",
    "RadioGroup",
    "Select",
  ],
  Navigation: ["Dropdown", "SelectDropdown", "Select"],
  Modal: ["Modal", "ModalTrigger"],
  Replica: ["GithubReplica"],
}

// Common dependencies for components
const COMMON_DEPS = {
  DataTable: ["@tanstack/react-table", "lucide-react"],
  DateRangePicker: ["lucide-react", "react-day-picker", "date-fns"],
  Modal: ["lucide-react", "class-variance-authority"],
  ModalTrigger: ["class-variance-authority"],
  Dropdown: ["lucide-react"],
  SelectDropdown: ["lucide-react", "class-variance-authority"],
  InputSelect: ["lucide-react"],
  FileInput: ["lucide-react"],
  PasswordInput: ["lucide-react"],
}

// Registry dependencies (shadcn/ui components)
const REGISTRY_DEPS = {
  DataTable: ["button", "table"],
  InputAmount: ["input", "label"],
  OtpInput: ["input"],
  DateRangePicker: ["button", "calendar", "popover"],
  Modal: ["button"],
  ModalTrigger: ["button", "modal"],
  Dropdown: ["button", "command", "popover"],
  SelectDropdown: ["button"],
  InputSelect: ["input", "button", "popover"],
  FileInput: ["input", "button"],
  PasswordInput: ["input", "button"],
  GithubReplica: ["card", "badge", "avatar", "tooltip", "separator", "skeleton", "button"],
}

const COMPONENT_OVERRIDES = {
  "Replica/Github/views/issue-replica.tsx": {
    name: "github-issue-replica",
    displayName: "GithubIssueReplica",
    description: "Standalone GitHub issue view with tooltip metadata",
    dependencies: ["lucide-react"],
    registryDependencies: ["tooltip"],
  },
  "Replica/Github/views/pull-replica.tsx": {
    name: "github-pull-replica",
    displayName: "GithubPullReplica",
    description: "Standalone GitHub pull request view with branch context",
    dependencies: ["lucide-react"],
    registryDependencies: ["tooltip"],
  },
  "Replica/Github/views/repo-replica.tsx": {
    name: "github-repo-replica",
    displayName: "GithubRepoReplica",
    description: "Standalone GitHub repository view with owner preview",
    dependencies: ["lucide-react"],
    registryDependencies: ["avatar", "badge", "tooltip"],
  },
  "Replica/Github/views/user-replica.tsx": {
    name: "github-user-replica",
    displayName: "GithubUserReplica",
    description: "Standalone GitHub user view with profile hovercard",
    dependencies: ["lucide-react"],
    registryDependencies: ["avatar", "tooltip"],
  },
}

const COMPONENT_ALIASES = [
  {
    alias: "github-replica-swr",
    target: "github-replica",
    description: "GitHub Replica component bundled with SWR hook",
    dependencies: ["swr"],
  },
  {
    alias: "github-replica-react-query",
    target: "github-replica",
    description: "GitHub Replica component bundled with React Query hook",
    dependencies: ["@tanstack/react-query"],
  },
]

const HOOK_ALIASES = [
  {
    alias: "use-github-replica-plain",
    target: "use-github-replica",
    description: "GitHub replica hook without cached integrations",
  },
]

function kebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

function getComponentCategory(componentName) {
  for (const [category, components] of Object.entries(CATEGORIES)) {
    if (components.includes(componentName)) {
      return category
    }
  }
  return "Component"
}

function getComponentDescription(componentName, category) {
  const descriptions = {
    DataTable: "A powerful data table with sorting, filtering, and pagination",
    InputAmount: "Specialized input for monetary amounts with currency support",
    OtpInput: "One-time password input with multiple fields",
    InputSelect: "Enhanced select input with searchable dropdown",
    FileInput: "File upload input with drag and drop support",
    PasswordInput: "Password input with toggle visibility",
    DateRangePicker: "Date range picker with presets and dual calendar view",
    Modal: "Flexible modal component with customizable sizing",
    ModalTrigger: "Modal trigger component with button integration",
    Dropdown: "Searchable dropdown with Command and Popover primitives",
    SelectDropdown: "Custom dropdown with keyboard navigation",
    GithubReplica: "Compact metadata card for GitHub resources (PRs, Issues, Users, Repos)",
    GithubReplicaDisplay: "Renderer that routes GitHub resources to specific replica views",
    GithubIssueReplica: "Standalone GitHub issue view with tooltip metadata",
    GithubPullReplica: "Standalone GitHub pull request view with branch context",
    GithubRepoReplica: "Standalone GitHub repository view with owner preview",
    GithubUserReplica: "Standalone GitHub user view with profile hovercard",
  }

  return descriptions[componentName] || `${componentName} component`
}

function getHookDescription(hookName) {
  const descriptions = {
    useLocalStorage: "Hook for persisting state to localStorage with SSR support",
    useCopyToClipboard: "Hook for copying text to clipboard with feedback",
    useOnMountEffect: "Hook that runs effect only on component mount",
    useOnMountLayoutEffect: "Hook that runs layout effect only on component mount",
    useOnUnmountEffect: "Hook that runs cleanup effect only on component unmount",
    useOnWindowResize: "Hook that responds to window resize events",
    useStateChangeEffect: "Hook that runs effect only when state changes",
    useIsomorphicLayoutEffect: "Hook that uses layoutEffect on client, effect on server",
    useKeyboardShortcut: "Hook for handling keyboard shortcuts with context",
    useCountdown: "Hook for countdown timers with auto-decrement",
    useRevalidate: "Hook for SWR data revalidation",
    "use-mobile": "Hook to detect mobile viewport and breakpoints",
  }

  return descriptions[hookName] || `${hookName} hook`
}

function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8")
  } catch (error) {
    console.warn(`Could not read file ${filePath}:`, error.message)
    return ""
  }
}

function findComponentFiles() {
  const components = []

  const categoryDirs = ["Data", "Form", "Navigation", "Modal", "Input", "Replica"]

  function walkComponentDir(rootCategory, currentPath, relativeSegments = []) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true })

    entries.forEach(entry => {
      const entryPath = path.join(currentPath, entry.name)
      const entrySegments = [...relativeSegments, entry.name]
      if (entry.isDirectory()) {
        walkComponentDir(rootCategory, entryPath, entrySegments)
        return
      }

      if (!entry.isFile() || !entry.name.endsWith(".tsx")) return

      const componentName = path.basename(entry.name, ".tsx")
      const logicalCategory =
        rootCategory === "Input" ? getComponentCategory(componentName) : rootCategory
      const relFilePath = path.join(rootCategory, ...relativeSegments, entry.name)
      const normalizedRelPath = normalizeRelPath(relFilePath)
      const override = COMPONENT_OVERRIDES[normalizedRelPath]
      const content = readFileContent(entryPath)

      components.push({
        name: override?.name || kebabCase(componentName),
        displayName: override?.displayName || componentName,
        category: logicalCategory,
        filePath: relFilePath,
        content,
        description: override?.description,
        dependencies: override?.dependencies,
        registryDependencies: override?.registryDependencies,
      })
    })
  }

  categoryDirs.forEach(category => {
    const categoryPath = path.join(COMPONENTS_DIR, category)
    if (!fs.existsSync(categoryPath)) return
    walkComponentDir(category, categoryPath)
  })

  return components
}

function findHookFiles() {
  const hooks = []

  if (fs.existsSync(HOOKS_DIR)) {
    const files = fs.readdirSync(HOOKS_DIR)
    files.forEach(file => {
      if (file.endsWith(".ts") || file.endsWith(".tsx")) {
        if (file === "index.ts" || file.startsWith("internal")) return // Skip index and internal files

        const hookName = path.basename(file, path.extname(file))
        const filePath = path.join(HOOKS_DIR, file)
        const content = readFileContent(filePath)

        hooks.push({
          name: hookName,
          displayName: hookName,
          filePath: path.join("hooks", file),
          content,
        })
      }
    })
  }

  return hooks
}

function getNamespaceForCategory(category) {
  const categoryToNamespace = {
    Data: "data",
    Form: "form",
    Navigation: "navigation",
    Modal: "modal",
    Replica: "replica",
  }
  return categoryToNamespace[category] || "ui"
}

function generateComponentRegistry(component) {
  const namespace = getNamespaceForCategory(component.category)

  const registry = {
    name: component.name,
    type: "registry:component",
    category: component.category,
    namespace: `@quffeui/${namespace}`,
    description:
      component.description || getComponentDescription(component.displayName, component.category),
    dependencies: component.dependencies || COMMON_DEPS[component.displayName] || [],
    registryDependencies:
      component.registryDependencies || REGISTRY_DEPS[component.displayName] || [],
    files: [
      {
        type: "registry:component",
        path: component.filePath,
        content: component.content,
      },
    ],
  }

  return registry
}

function generateHookRegistry(hook) {
  const registry = {
    name: hook.name,
    type: "registry:hook",
    namespace: "@quffeui/hooks",
    description: getHookDescription(hook.name),
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        type: "registry:hook",
        path: hook.filePath,
        content: hook.content,
      },
    ],
  }

  return registry
}

function generateIndexRegistry(components, hooks) {
  const items = []

  // Add components
  components.forEach(component => {
    const namespace = getNamespaceForCategory(component.category)
    items.push({
      name: component.name,
      type: "registry:component",
      category: component.category,
      namespace: `@quffeui/${namespace}`,
      description:
        component.description || getComponentDescription(component.displayName, component.category),
      dependencies: component.dependencies || COMMON_DEPS[component.displayName] || [],
      registryDependencies:
        component.registryDependencies || REGISTRY_DEPS[component.displayName] || [],
    })
  })

  // Add hooks
  hooks.forEach(hook => {
    items.push({
      name: hook.name,
      type: "registry:hook",
      namespace: "@quffeui/hooks",
      description: getHookDescription(hook.name),
      dependencies: [],
      registryDependencies: [],
    })
  })

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000"

  // Full registry index schema for static hosting
  return {
    name: "@quffeui",
    type: "registry:index",
    description:
      "A comprehensive UI components library with TypeScript, Tailwind CSS v4, and shadcn/ui patterns",
    homepage: siteUrl,
    author: "QuffeUI Library",
    items,
    namespace: "@quffeui",
    namespaces: {
      "@quffeui": "Main UI components registry",
      "@quffeui/ui": "Base UI primitives (Button, Card, Input, etc.)",
      "@quffeui/form": "Form-specific components (InputAmount, OtpInput, etc.)",
      "@quffeui/data": "Data visualization components (DataTable)",
      "@quffeui/navigation": "Navigation components (Dropdown, SelectDropdown)",
      "@quffeui/modal": "Modal and overlay components",
      "@quffeui/replica": "Replica and integrations",
      "@quffeui/hooks": "Custom React hooks",
    },
  }
}

function ensureRegistryDir() {
  if (!fs.existsSync(REGISTRY_DIR)) {
    fs.mkdirSync(REGISTRY_DIR, { recursive: true })
    console.log("📁 Created public/registry directory")
  }
}

function normalizeRelPath(relPath) {
  return relPath.split(path.sep).join("/")
}

function writeRegistryFile(relPath, content) {
  const filePath = path.join(REGISTRY_DIR, relPath)
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
  console.log(`✅ Generated ${relPath}`)
}

function listRegistryFiles(dir = REGISTRY_DIR, relBase = "") {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const absPath = path.join(dir, entry.name)
    const relPath = relBase ? path.join(relBase, entry.name) : entry.name
    if (entry.isDirectory()) {
      return listRegistryFiles(absPath, relPath)
    }

    return [normalizeRelPath(relPath)]
  })
}

function removeEmptyDirectories(dir) {
  if (!fs.existsSync(dir)) return
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  entries.forEach(entry => {
    if (!entry.isDirectory()) return
    const childPath = path.join(dir, entry.name)
    removeEmptyDirectories(childPath)
    if (fs.existsSync(childPath) && fs.readdirSync(childPath).length === 0) {
      fs.rmdirSync(childPath)
    }
  })
}

function cleanStaleRegistryFiles(generatedFiles) {
  const existingFiles = listRegistryFiles()
  const staleFiles = existingFiles.filter(file => !generatedFiles.has(file))

  if (staleFiles.length === 0) {
    return
  }

  staleFiles.forEach(relPath => {
    const absPath = path.join(REGISTRY_DIR, relPath)
    fs.rmSync(absPath)
    console.log(`🧹 Removed stale registry file ${relPath}`)
  })

  removeEmptyDirectories(REGISTRY_DIR)
}

function main() {
  console.log("🚀 Generating static component registry to public/registry...\n")

  ensureRegistryDir()

  // Find all components and hooks
  const components = findComponentFiles()
  const hooks = findHookFiles()

  const componentByName = new Map()
  components.forEach(component => {
    componentByName.set(component.name, component)
  })

  COMPONENT_ALIASES.forEach(aliasConfig => {
    const target = componentByName.get(aliasConfig.target)
    if (!target) {
      console.warn(`⚠️ Missing target component for alias ${aliasConfig.alias}`)
      return
    }
    const baseDeps = target.dependencies || COMMON_DEPS[target.displayName] || []
    const baseRegistryDeps = target.registryDependencies || REGISTRY_DEPS[target.displayName] || []
    const aliasComponent = {
      ...target,
      name: aliasConfig.alias,
      description: aliasConfig.description || target.description,
      dependencies: Array.from(
        new Set([...(Array.isArray(baseDeps) ? baseDeps : []), ...(aliasConfig.dependencies || [])])
      ),
      registryDependencies: Array.from(
        new Set([
          ...(Array.isArray(baseRegistryDeps) ? baseRegistryDeps : []),
          ...(aliasConfig.registryDependencies || []),
        ])
      ),
    }
    components.push(aliasComponent)
    componentByName.set(aliasComponent.name, aliasComponent)
  })

  const hookByName = new Map()
  hooks.forEach(hook => {
    hookByName.set(hook.name, hook)
  })

  HOOK_ALIASES.forEach(aliasConfig => {
    const target = hookByName.get(aliasConfig.target)
    if (!target) {
      console.warn(`⚠️ Missing target hook for alias ${aliasConfig.alias}`)
      return
    }
    const aliasHook = {
      ...target,
      name: aliasConfig.alias,
      description: aliasConfig.description || target.description,
    }
    hooks.push(aliasHook)
    hookByName.set(aliasHook.name, aliasHook)
  })

  console.log(`Found ${components.length} components and ${hooks.length} hooks\n`)

  const generatedFiles = new Set()

  // Generate individual registry files for components
  components.forEach(component => {
    const registry = generateComponentRegistry(component)
    const ns = getNamespaceForCategory(component.category)
    const relPath = path.join(ns, `${component.name}.json`)
    writeRegistryFile(relPath, registry)
    generatedFiles.add(normalizeRelPath(relPath))
  })

  // Generate individual registry files for hooks
  hooks.forEach(hook => {
    const registry = generateHookRegistry(hook)
    const relPath = path.join("hooks", `${hook.name}.json`)
    writeRegistryFile(relPath, registry)
    generatedFiles.add(normalizeRelPath(relPath))
  })

  // Generate index registry
  const indexRegistry = generateIndexRegistry(components, hooks)
  writeRegistryFile("index.json", indexRegistry)
  generatedFiles.add("index.json")

  cleanStaleRegistryFiles(generatedFiles)

  console.log(`\n🎉 Successfully generated registry for ${components.length + hooks.length} items!`)
  console.log(`📍 Registry files created in: ${REGISTRY_DIR}`)
}

if (require.main === module) {
  main()
}

module.exports = { main }
