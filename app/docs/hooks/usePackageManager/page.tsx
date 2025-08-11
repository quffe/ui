'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { InstallationTabs } from "@/components/InstallationTabs"
import { useState, useEffect } from "react"
import { usePackageManager, type PackageManager } from "@/hooks/usePackageManager"

export default function UsePackageManagerDocs() {
  const [mounted, setMounted] = useState(false)
  const { packageManager, setPackageManager, isLoaded } = usePackageManager()

  useEffect(() => {
    setMounted(true)
  }, [])

  const packageManagers: PackageManager[] = ['pnpm', 'npm', 'yarn', 'bun']

  const getInstallCommand = (pm: PackageManager, packageName: string = 'package-name') => {
    const commands = {
      pnpm: `pnpm add ${packageName}`,
      npm: `npm install ${packageName}`,
      yarn: `yarn add ${packageName}`,
      bun: `bun add ${packageName}`
    }
    return commands[pm]
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>usePackageManager</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">usePackageManager</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A hook for managing package manager preferences with localStorage persistence and TypeScript support.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">Storage</Badge>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Install the hook using your preferred package manager</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="usePackageManager" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import { usePackageManager, type PackageManager } from "@/hooks/usePackageManager"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`function PackageManagerSelector() {
  const { packageManager, setPackageManager, isLoaded } = usePackageManager()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <select
      value={packageManager}
      onChange={(e) => setPackageManager(e.target.value as PackageManager)}
    >
      <option value="pnpm">pnpm</option>
      <option value="npm">npm</option>
      <option value="yarn">yarn</option>
      <option value="bun">bun</option>
    </select>
  )
}`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Package Manager Selector</h3>
                <div className="border rounded-lg p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Choose your preferred package manager:
                    </label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={isLoaded ? packageManager : 'pnpm'}
                      onChange={(e) => setPackageManager(e.target.value as PackageManager)}
                      disabled={!isLoaded}
                    >
                      {packageManagers.map(pm => (
                        <option key={pm} value={pm}>
                          {pm.charAt(0).toUpperCase() + pm.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Current preference: <code>{isLoaded ? packageManager : 'Loading...'}</code>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Example install command: <code>{isLoaded ? getInstallCommand(packageManager) : 'Loading...'}</code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Dynamic Install Commands</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function InstallationInstructions({ packageName }: { packageName: string }) {
  const { packageManager, isLoaded } = usePackageManager()

  if (!isLoaded) {
    return <div>Loading installation instructions...</div>
  }

  const getCommand = () => {
    switch (packageManager) {
      case 'pnpm': return \`pnpm add \${packageName}\`
      case 'npm': return \`npm install \${packageName}\`
      case 'yarn': return \`yarn add \${packageName}\`
      case 'bun': return \`bun add \${packageName}\`
    }
  }

  return (
    <div className="installation-guide">
      <h3>Installation</h3>
      <pre>
        <code>{getCommand()}</code>
      </pre>
    </div>
  )
}`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Package Manager Badge</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function PackageManagerBadge() {
  const { packageManager, isLoaded } = usePackageManager()

  if (!isLoaded) {
    return <span className="badge loading">...</span>
  }

  const colors = {
    pnpm: 'bg-orange-100 text-orange-800',
    npm: 'bg-red-100 text-red-800',
    yarn: 'bg-blue-100 text-blue-800',
    bun: 'bg-yellow-100 text-yellow-800'
  }

  return (
    <span className={\`badge \${colors[packageManager]}\`}>
      Using {packageManager}
    </span>
  )
}`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Script Runner</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function ScriptRunner() {
  const { packageManager } = usePackageManager()

  const runScript = (scriptName: string) => {
    const commands = {
      pnpm: \`pnpm \${scriptName}\`,
      npm: \`npm run \${scriptName}\`,
      yarn: \`yarn \${scriptName}\`,
      bun: \`bun run \${scriptName}\`
    }
    
    const command = commands[packageManager]
    
    // Copy to clipboard or execute
    navigator.clipboard.writeText(command)
    console.log(\`Running: \${command}\`)
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => runScript('dev')}>
        Start Development
      </button>
      <button onClick={() => runScript('build')}>
        Build Project
      </button>
      <button onClick={() => runScript('test')}>
        Run Tests
      </button>
    </div>
  )
}`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Context Provider Pattern</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`// Create a context for package manager
const PackageManagerContext = createContext<{
  packageManager: PackageManager
  setPackageManager: (pm: PackageManager) => void
  isLoaded: boolean
} | null>(null)

function PackageManagerProvider({ children }: { children: React.ReactNode }) {
  const packageManagerState = usePackageManager()
  
  return (
    <PackageManagerContext.Provider value={packageManagerState}>
      {children}
    </PackageManagerContext.Provider>
  )
}

function usePackageManagerContext() {
  const context = useContext(PackageManagerContext)
  if (!context) {
    throw new Error('usePackageManagerContext must be used within PackageManagerProvider')
  }
  return context
}

// Usage in child components
function InstallButton({ packageName }: { packageName: string }) {
  const { packageManager } = usePackageManagerContext()
  
  return (
    <button onClick={() => copyInstallCommand(packageManager, packageName)}>
      Install {packageName}
    </button>
  )
}`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Parameters</h3>
                  <div className="text-sm">None</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Returns</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Property</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">packageManager</td>
                          <td className="p-2">PackageManager</td>
                          <td className="p-2">Current selected package manager</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">setPackageManager</td>
                          <td className="p-2">(pm: PackageManager) =&gt; void</td>
                          <td className="p-2">Function to update package manager preference</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">isLoaded</td>
                          <td className="p-2">boolean</td>
                          <td className="p-2">Whether the preference has been loaded from localStorage</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Types</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm">
                      type PackageManager = "pnpm" | "npm" | "yarn" | "bun"
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Supported package managers with type safety.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Storage</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Key</th>
                          <th className="text-left p-2">Default</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">ui-components-package-manager</td>
                          <td className="p-2">pnpm</td>
                          <td className="p-2">localStorage key for persisting preference</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Persistent localStorage-based preference storage</li>
                <li>TypeScript support with strict type checking</li>
                <li>Loading state management</li>
                <li>Automatic validation of stored values</li>
                <li>Default fallback to pnpm</li>
                <li>SSR-safe with proper hydration handling</li>
                <li>Supports all major package managers</li>
                <li>Immediate state updates on preference change</li>
                <li>Memory efficient with minimal re-renders</li>
                <li>Easy integration with existing components</li>
                <li>Context provider pattern compatible</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
              <CardDescription>Common scenarios where this hook is useful</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Documentation</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Dynamic installation instructions</div>
                    <div>• Package manager-specific examples</div>
                    <div>• Command generation</div>
                    <div>• User preference persistence</div>
                    <div>• Copy-to-clipboard functionality</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Development Tools</h4>
                  <div className="space-y-1 text-sm">
                    <div>• CLI tool selection</div>
                    <div>• Script runner interfaces</div>
                    <div>• Build tool configuration</div>
                    <div>• Project scaffolding</div>
                    <div>• Development environment setup</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Component Libraries</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Installation badge components</div>
                    <div>• Command display widgets</div>
                    <div>• Package manager selectors</div>
                    <div>• Integration guides</div>
                    <div>• Getting started flows</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Admin Interfaces</h4>
                  <div className="space-y-1 text-sm">
                    <div>• User preference management</div>
                    <div>• Team configuration settings</div>
                    <div>• Project setup wizards</div>
                    <div>• Developer onboarding</div>
                    <div>• Environment customization</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}