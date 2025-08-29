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

// Example components
import LiveDemoExample from "@/examples/docs/hooks/useOnMountEffect/live-demo"
import DataFetchingExample from "@/examples/docs/hooks/useOnMountEffect/data-fetching"
import SSRSafeExample from "@/examples/docs/hooks/useOnMountEffect/ssr-safe"
import UsageExamplesExample from "@/examples/docs/hooks/useOnMountEffect/usage-examples"
import { getExampleCode } from "@/lib/serverUtils"

// Raw imports
const liveDemoCode = getExampleCode("docs/hooks/useOnMountEffect/live-demo.tsx")
const dataFetchingCode = getExampleCode("docs/hooks/useOnMountEffect/data-fetching.tsx")
const ssrSafeCode = getExampleCode("docs/hooks/useOnMountEffect/ssr-safe.tsx")
const usageExamplesCode = getExampleCode("docs/hooks/useOnMountEffect/usage-examples.tsx")

export default async function UseOnMountEffectDocs() {
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
              <BreadcrumbPage>useOnMountEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useOnMountEffect</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A collection of hooks for running effects only once when components mount, with proper
              cleanup handling.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">Effect</Badge>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the hook using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="useOnMountEffect" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <CodeBlock language="typescript">
                  {`import { useOnMountEffect, useStrictMountEffect, useHasMounted } from "@/hooks/useOnMountEffect"`}
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
                <h3 className="text-sm font-medium mb-4">Live Demonstration</h3>
                <PreviewTabs preview={<LiveDemoExample />} code={liveDemoCode} />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">Data Fetching Example</h3>
                <PreviewTabs preview={<DataFetchingExample />} code={dataFetchingCode} />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">SSR-Safe Components</h3>
                <PreviewTabs preview={<SSRSafeExample />} code={ssrSafeCode} />
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
                  <h3 className="font-semibold mb-3">useOnMountEffect</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Runs an effect only once when the component mounts, even if dependencies change.
                  </p>

                  <h4 className="font-medium mb-2">Parameters</h4>
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
                          <td className="p-2 font-mono">effect</td>
                          <td className="p-2">React.EffectCallback</td>
                          <td className="p-2">The effect function to run on mount</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">dependencies</td>
                          <td className="p-2">React.DependencyList</td>
                          <td className="p-2">
                            Optional dependencies array (captured on first render only)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">useStrictMountEffect</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Runs an effect exactly once on first render, completely ignoring all
                    dependencies.
                  </p>

                  <h4 className="font-medium mb-2">Parameters</h4>
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
                          <td className="p-2 font-mono">effect</td>
                          <td className="p-2">React.EffectCallback</td>
                          <td className="p-2">The effect function to run on mount</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">useHasMounted</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Returns a boolean indicating whether the component has completed its initial
                    mount.
                  </p>

                  <h4 className="font-medium mb-2">Parameters</h4>
                  <div className="text-sm">None</div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">boolean</td>
                          <td className="p-2">
                            True if component has mounted, false during initial render
                          </td>
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
              <CardTitle className="text-2xl font-bold">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Runs effects exactly once per component mount</li>
                <li>Proper cleanup handling with return functions</li>
                <li>Ignores dependency changes after first run</li>
                <li>TypeScript support with full type safety</li>
                <li>Three hook variants for different use cases</li>
                <li>SSR-safe with proper hydration handling</li>
                <li>Memory efficient with ref-based tracking</li>
                <li>Compatible with React Strict Mode</li>
                <li>Prevents common effect re-run issues</li>
                <li>Automatic cleanup on component unmount</li>
                <li>No unnecessary re-renders or effect executions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
              <CardDescription>Common scenarios where these hooks are useful</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">useOnMountEffect</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Initial data fetching</div>
                    <div>• Setting up event listeners</div>
                    <div>• Initializing third-party libraries</div>
                    <div>• Analytics/tracking setup</div>
                    <div>• WebSocket connections</div>
                    <div>• Timers and intervals</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">useStrictMountEffect</h4>
                  <div className="space-y-1 text-sm">
                    <div>• One-time app initialization</div>
                    <div>• Global event listeners</div>
                    <div>• Performance monitoring setup</div>
                    <div>• Feature flag initialization</div>
                    <div>• Theme system setup</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">useHasMounted</h4>
                  <div className="space-y-1 text-sm">
                    <div>• SSR hydration safety</div>
                    <div>• Client-only rendering</div>
                    <div>• Browser API access</div>
                    <div>• Conditional rendering</div>
                    <div>• Loading states</div>
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
