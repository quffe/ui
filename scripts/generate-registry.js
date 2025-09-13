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
  Mentions: ["GithubMention"],
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
  GithubMention: ["card", "badge", "avatar", "tooltip", "separator", "skeleton", "button"],
}

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
    GithubMention: "Compact metadata card for GitHub resources (PRs, Issues, Users, Repos)",
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

  // Scan categorized component directories
  const categoryDirs = ["Data", "Form", "Navigation", "Modal", "Input", "Mentions"]

  categoryDirs.forEach(category => {
    const categoryPath = path.join(COMPONENTS_DIR, category)
    if (fs.existsSync(categoryPath)) {
      const entries = fs.readdirSync(categoryPath, { withFileTypes: true })
      entries.forEach(entry => {
        if (entry.isFile() && entry.name.endsWith(".tsx")) {
          const componentName = path.basename(entry.name, ".tsx")
          const filePath = path.join(categoryPath, entry.name)
          const content = readFileContent(filePath)
          const logicalCategory = category === "Input" ? getComponentCategory(componentName) : category
          components.push({
            name: kebabCase(componentName),
            displayName: componentName,
            category: logicalCategory,
            filePath: path.join(category, entry.name),
            content,
          })
        } else if (entry.isDirectory()) {
          const subdir = path.join(categoryPath, entry.name)
          const subfiles = fs.readdirSync(subdir)
          subfiles.forEach(file => {
            if (file.endsWith(".tsx")) {
              const componentName = path.basename(file, ".tsx")
              const filePath = path.join(subdir, file)
              const content = readFileContent(filePath)
              const logicalCategory = category === "Input" ? getComponentCategory(componentName) : category
              components.push({
                name: kebabCase(componentName),
                displayName: componentName,
                category: logicalCategory,
                filePath: path.join(category, entry.name, file),
                content,
              })
            }
          })
        }
      })
    }
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
    'Data': 'data',
    'Form': 'form', 
    'Navigation': 'navigation',
    'Modal': 'modal',
    'Mentions': 'mentions'
  }
  return categoryToNamespace[category] || 'ui'
}

function generateComponentRegistry(component) {
  const namespace = getNamespaceForCategory(component.category)
  
  const registry = {
    name: component.name,
    type: "registry:component",
    category: component.category,
    namespace: `@ui-components/${namespace}`,
    description: getComponentDescription(component.displayName, component.category),
    dependencies: COMMON_DEPS[component.displayName] || [],
    registryDependencies: REGISTRY_DEPS[component.displayName] || [],
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
    namespace: "@ui-components/hooks",
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
      namespace: `@ui-components/${namespace}`,
      description: getComponentDescription(component.displayName, component.category),
      dependencies: COMMON_DEPS[component.displayName] || [],
      registryDependencies: REGISTRY_DEPS[component.displayName] || [],
    })
  })

  // Add hooks
  hooks.forEach(hook => {
    items.push({
      name: hook.name,
      type: "registry:hook",
      namespace: "@ui-components/hooks",
      description: getHookDescription(hook.name),
      dependencies: [],
      registryDependencies: [],
    })
  })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000"

  // Full registry index schema for static hosting
  return {
    name: "@ui-components",
    type: "registry:index",
    description:
      "A comprehensive UI components library with TypeScript, Tailwind CSS v4, and shadcn/ui patterns",
    homepage: siteUrl,
    author: "UI Components Library",
    items,
    namespace: "@ui-components",
    namespaces: {
      "@ui-components": "Main UI components registry",
      "@ui-components/ui": "Base UI primitives (Button, Card, Input, etc.)",
      "@ui-components/form": "Form-specific components (InputAmount, OtpInput, etc.)",
      "@ui-components/data": "Data visualization components (DataTable)",
      "@ui-components/navigation": "Navigation components (Dropdown, SelectDropdown)",
      "@ui-components/modal": "Modal and overlay components",
      "@ui-components/mentions": "Mentions and integrations",
      "@ui-components/hooks": "Custom React hooks",
    },
  }
}

function ensureRegistryDir() {
  if (!fs.existsSync(REGISTRY_DIR)) {
    fs.mkdirSync(REGISTRY_DIR, { recursive: true })
    console.log("📁 Created public/registry directory")
  }
}

function writeRegistryFile(relPath, content) {
  const filePath = path.join(REGISTRY_DIR, relPath)
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
  console.log(`✅ Generated ${relPath}`)
}

function main() {
  console.log("🚀 Generating static component registry to public/registry...\n")

  ensureRegistryDir()

  // Find all components and hooks
  const components = findComponentFiles()
  const hooks = findHookFiles()

  console.log(`Found ${components.length} components and ${hooks.length} hooks\n`)

  // Generate individual registry files for components
  components.forEach(component => {
    const registry = generateComponentRegistry(component)
    const ns = getNamespaceForCategory(component.category)
    writeRegistryFile(path.join(ns, `${component.name}.json`), registry)
  })

  // Generate individual registry files for hooks
  hooks.forEach(hook => {
    const registry = generateHookRegistry(hook)
    writeRegistryFile(path.join("hooks", `${hook.name}.json`), registry)
  })

  // Generate index registry
  const indexRegistry = generateIndexRegistry(components, hooks)
  writeRegistryFile("index.json", indexRegistry)

  console.log(`\n🎉 Successfully generated registry for ${components.length + hooks.length} items!`)
  console.log(`📍 Registry files created in: ${REGISTRY_DIR}`)
}

if (require.main === module) {
  main()
}

module.exports = { main }
