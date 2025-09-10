"use server"

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
import { InstallationTabs } from "@/components/internal/installation"
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"

// Example components
import BasicUsageExample from "@/examples/docs/hooks/useLocalStorage/basic-usage"
import ObjectStorageExample from "@/examples/docs/hooks/useLocalStorage/object-storage"
import AdvancedUsageExample from "@/examples/docs/hooks/useLocalStorage/advanced-usage"
import UsageExamplesExample from "@/examples/docs/hooks/useLocalStorage/usage-examples"
import { getExampleCode } from "@/lib/serverUtils"

// Raw imports
const basicUsageCode = getExampleCode("docs/hooks/useLocalStorage/basic-usage.tsx")
const objectStorageCode = getExampleCode("docs/hooks/useLocalStorage/object-storage.tsx")
const advancedUsageCode = getExampleCode("docs/hooks/useLocalStorage/advanced-usage.tsx")
const usageExamplesCode = getExampleCode("docs/hooks/useLocalStorage/usage-examples.tsx")

export default async function UseLocalStorageDocs() {
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
              <BreadcrumbPage>useLocalStorage</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-end gap-3 mb-4">
              <h1 className="text-4xl font-bold">useLocalStorage</h1>
              <div className="flex gap-2">
                <Badge variant="secondary">React Hook</Badge>
                <Badge variant="outline">Storage</Badge>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              A hook for managing localStorage state with automatic JSON serialization and error
              handling.
            </p>
            <CopyableCodeBadge text={config.getNamespacePath("useLocalStorage")} />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the hook using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="useLocalStorage" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <CodeBlock language="typescript">
                  {`import { useLocalStorage } from "@/hooks/useLocalStorage"`}
                </CodeBlock>
              </div>

              <PreviewTabs preview={<UsageExamplesExample />} code={usageExamplesCode} />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-4">Basic Usage</h3>
                <PreviewTabs preview={<BasicUsageExample />} code={basicUsageCode} />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">Object Storage</h3>
                <PreviewTabs preview={<ObjectStorageExample />} code={objectStorageCode} />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">Advanced Usage</h3>
                <PreviewTabs preview={<AdvancedUsageExample />} code={advancedUsageCode} />
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
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Parameter</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">keyName</td>
                          <td className="p-2">string</td>
                          <td className="p-2">The localStorage key name</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">defaultValue</td>
                          <td className="p-2">T</td>
                          <td className="p-2">Optional default value if no stored value exists</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Returns</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Return</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">[0]</td>
                          <td className="p-2">T</td>
                          <td className="p-2">Current stored value</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">[1]</td>
                          <td className="p-2">(val: T) =&gt; void</td>
                          <td className="p-2">Function to update the stored value</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Generic Type</h3>
                  <CodeBlock language="typescript">
                    {`useLocalStorage<T>(keyName: string, defaultValue?: T): [T, (val: T) => void]`}
                  </CodeBlock>
                  <p className="text-sm text-muted-foreground mt-2">
                    The hook is generic and will infer the type from the default value, or you can
                    explicitly specify the type.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Automatic JSON serialization and deserialization</li>
                <li>TypeScript support with generic type inference</li>
                <li>Safe error handling for invalid JSON</li>
                <li>Automatic localStorage initialization with default values</li>
                <li>Immediate state updates when value changes</li>
                <li>Works with any serializable data type</li>
                <li>Handles string values without unnecessary JSON wrapping</li>
                <li>Falls back gracefully when localStorage is unavailable</li>
                <li>Memory efficient with minimal re-renders</li>
                <li>SSR-safe with proper hydration handling</li>
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
                  <h4 className="font-semibold mb-2">User Preferences</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Theme settings (dark/light mode)</div>
                    <div>• Language preferences</div>
                    <div>• UI customization options</div>
                    <div>• Notification settings</div>
                    <div>• Display preferences</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Application State</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Form draft persistence</div>
                    <div>• Shopping cart contents</div>
                    <div>• Recently viewed items</div>
                    <div>• User authentication tokens</div>
                    <div>• Cached API responses</div>
                    <div>• Application settings</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-warn-soft/10">
            <CardHeader>
              <CardTitle className="text-accent-foreground text-2xl">
                Important Notes: CSR vs SSR Behavior
              </CardTitle>
              <CardDescription className="text-accent-foreground/70">
                Understanding how this hook behaves in different rendering environments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-accent-foreground">
                  Client-Side Rendering (CSR) - Create React App, Vite, etc.
                </h4>
                <div className="text-sm text-accent-foreground/70 space-y-2">
                  <p>
                    In pure CSR applications, localStorage values are displayed immediately on first
                    paint with <strong>no visual flash</strong>. The hook reads from localStorage
                    before the browser renders, providing instant access to stored values.
                  </p>
                  <CodeBlock language="tsx">
                    {`// In CSR - Works perfectly without any workarounds
function MyComponent() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  
  // Shows localStorage value immediately on page load
  return <div>Current theme: {theme}</div>
}`}
                  </CodeBlock>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-accent-foreground">
                  Server-Side Rendering (SSR) - Next.js, Remix, etc.
                </h4>
                <div className="text-sm text-accent-foreground/70 space-y-2">
                  <p>
                    In SSR applications, localStorage is not available during server rendering,
                    which can cause hydration mismatches. The component initially shows the default
                    value, then updates to the localStorage value after hydration.
                  </p>

                  <h5 className="font-medium mt-3 text-accent-foreground mb-2">
                    Recommended SSR Pattern:
                  </h5>
                  <CodeBlock language="tsx">
                    {`function MyComponent() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Prevent hydration mismatch
  if (!mounted) {
    return <div>Loading...</div>
  }
  
  // Shows localStorage value after mounting
  return <div>Current theme: {theme}</div>
}`}
                  </CodeBlock>

                  <div className="bg-warn-amber/20 border rounded p-3 mt-3">
                    <p className="text-xs text-warn-bright">
                      <strong>Why this pattern is needed:</strong> During SSR, the server renders
                      with default values (no localStorage access), but the client has localStorage
                      available. This creates a mismatch that React detects during hydration. The
                      mounting pattern ensures both server and client render the same content
                      initially.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h5 className="font-medium mb-2">Performance Considerations</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>
                    Uses <code>useLayoutEffect</code> to minimize visual flash by updating before
                    paint
                  </li>
                  <li>Lazy state initialization prevents unnecessary re-renders</li>
                  <li>Stable object references prevent infinite re-initialization loops</li>
                  <li>JSON serialization ensures consistent data handling across all data types</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
