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
import { CodeBlock } from "@/components/internal/ui/code-block"
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { getExampleCode } from "@/lib/serverUtils"
import LiveDemoExample from "@/examples/docs/hooks/useOnMountLayoutEffect/live-demo"
import DOMMeasurementsExample from "@/examples/docs/hooks/useOnMountLayoutEffect/dom-measurements"
import CriticalStyleSetupExample from "@/examples/docs/hooks/useOnMountLayoutEffect/critical-style-setup"
import ScrollPositionRestorationExample from "@/examples/docs/hooks/useOnMountLayoutEffect/scroll-position-restoration"
import AnimationSetupExample from "@/examples/docs/hooks/useOnMountLayoutEffect/animation-setup"
import FocusManagementExample from "@/examples/docs/hooks/useOnMountLayoutEffect/focus-management"

const liveDemoCode = getExampleCode("docs/hooks/useOnMountLayoutEffect/live-demo.tsx")
const domMeasurementsCode = getExampleCode("docs/hooks/useOnMountLayoutEffect/dom-measurements.tsx")
const criticalStyleSetupCode = getExampleCode(
  "docs/hooks/useOnMountLayoutEffect/critical-style-setup.tsx"
)
const scrollPositionRestorationCode = getExampleCode(
  "docs/hooks/useOnMountLayoutEffect/scroll-position-restoration.tsx"
)
const animationSetupCode = getExampleCode("docs/hooks/useOnMountLayoutEffect/animation-setup.tsx")
const focusManagementCode = getExampleCode("docs/hooks/useOnMountLayoutEffect/focus-management.tsx")

export default async function UseOnMountLayoutEffectDocs() {
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
              <BreadcrumbPage>useOnMountLayoutEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useOnMountLayoutEffect</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A collection of hooks for running layout effects only once when components mount, with
              synchronous execution before browser paint.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">Layout Effect</Badge>
              <Badge variant="outline">Synchronous</Badge>
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
              <InstallationTabs componentName="useOnMountLayoutEffect" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <CodeBlock language="typescript">
                  {`import { useOnMountLayoutEffect, useStrictMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"`}
                </CodeBlock>
              </div>

              <CodeBlock language="tsx">
                {`// Basic usage - runs once on mount before paint
function MyComponent() {
  const ref = useRef<HTMLDivElement>(null)

  useOnMountLayoutEffect(() => {
    // Measure or modify DOM synchronously
    if (ref.current) {
      const height = ref.current.offsetHeight
      console.log(&apos;Element height:&apos;, height)
    }
    
    // Optional cleanup
    return () => {
      console.log(&apos;Component unmounting&apos;)
    }
  })

  return <div ref={ref}>Component content</div>
}

// Strict layout effect - ignores all dependencies
function StrictComponent() {
  useStrictMountLayoutEffect(() => {
    // This runs exactly once before paint, no matter what
    setupCriticalStyles()
  })

  return <div>App content</div>
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <PreviewTabs preview={<LiveDemoExample />} code={liveDemoCode} />

              <PreviewTabs preview={<DOMMeasurementsExample />} code={domMeasurementsCode} />

              <PreviewTabs preview={<CriticalStyleSetupExample />} code={criticalStyleSetupCode} />

              <PreviewTabs
                preview={<ScrollPositionRestorationExample />}
                code={scrollPositionRestorationCode}
              />

              <PreviewTabs preview={<AnimationSetupExample />} code={animationSetupCode} />

              <PreviewTabs preview={<FocusManagementExample />} code={focusManagementCode} />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">useOnMountLayoutEffect</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Runs a layout effect only once when the component mounts, even if dependencies
                    change.
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
                          <td className="p-2">The layout effect function to run on mount</td>
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
                  <h3 className="font-semibold mb-3">useStrictMountLayoutEffect</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Runs a layout effect exactly once on first render, completely ignoring all
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
                          <td className="p-2">The layout effect function to run on mount</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Key Differences from useOnMountEffect</h3>
                  <div className="space-y-2 text-sm">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Timing</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>useOnMountLayoutEffect:</strong> Runs synchronously after DOM
                          mutations but before browser paint
                        </li>
                        <li>
                          <strong>useOnMountEffect:</strong> Runs asynchronously after browser paint
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Use Cases</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>useOnMountLayoutEffect:</strong> DOM measurements, critical
                          styles, focus management
                        </li>
                        <li>
                          <strong>useOnMountEffect:</strong> Data fetching, event listeners, general
                          initialization
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Performance</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>useOnMountLayoutEffect:</strong> Can block browser paint if heavy
                          computation
                        </li>
                        <li>
                          <strong>useOnMountEffect:</strong> Does not block browser paint
                        </li>
                      </ul>
                    </div>
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
                <li>Runs layout effects exactly once per component mount</li>
                <li>Synchronous execution before browser paint</li>
                <li>Proper cleanup handling with return functions</li>
                <li>Ignores dependency changes after first run</li>
                <li>TypeScript support with full type safety</li>
                <li>Two hook variants for different use cases</li>
                <li>Perfect for DOM measurements and critical styling</li>
                <li>Memory efficient with ref-based tracking</li>
                <li>Compatible with React Strict Mode</li>
                <li>Prevents visual flashing and layout shifts</li>
                <li>Automatic cleanup on component unmount</li>
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
                  <h4 className="font-semibold mb-2">useOnMountLayoutEffect</h4>
                  <div className="space-y-1 text-sm">
                    <div>• DOM measurements and calculations</div>
                    <div>• Critical theme and style setup</div>
                    <div>• Scroll position restoration</div>
                    <div>• Animation initial states</div>
                    <div>• Focus management</div>
                    <div>• Layout-dependent computations</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">useStrictMountLayoutEffect</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Global style initialization</div>
                    <div>• Critical app setup before paint</div>
                    <div>• Theme provider setup</div>
                    <div>• Performance monitoring setup</div>
                    <div>• One-time DOM modifications</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">When to Use Layout Effects</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Measuring DOM elements</div>
                    <div>• Preventing visual flashes</div>
                    <div>• Synchronous DOM updates</div>
                    <div>• Critical rendering path optimizations</div>
                    <div>• When timing matters for UX</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Performance Notes</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Blocks browser paint</div>
                    <div>• Should be lightweight</div>
                    <div>• Use sparingly for critical operations</div>
                    <div>• Prefer useOnMountEffect for most cases</div>
                    <div>• Avoid heavy computations</div>
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
