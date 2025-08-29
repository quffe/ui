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
import LiveWindowTrackingExample from "@/examples/docs/hooks/useOnWindowResize/live-window-tracking"
import ResponsiveLayoutExample from "@/examples/docs/hooks/useOnWindowResize/responsive-layout"
import ChartResizingExample from "@/examples/docs/hooks/useOnWindowResize/chart-resizing"
import DynamicNavigationExample from "@/examples/docs/hooks/useOnWindowResize/dynamic-navigation"
import PerformanceOptimizationExample from "@/examples/docs/hooks/useOnWindowResize/performance-optimization"
import ViewportBasedEffectsExample from "@/examples/docs/hooks/useOnWindowResize/viewport-based-effects"

const liveWindowTrackingCode = getExampleCode(
  "docs/hooks/useOnWindowResize/live-window-tracking.tsx"
)
const responsiveLayoutCode = getExampleCode("docs/hooks/useOnWindowResize/responsive-layout.tsx")
const chartResizingCode = getExampleCode("docs/hooks/useOnWindowResize/chart-resizing.tsx")
const dynamicNavigationCode = getExampleCode("docs/hooks/useOnWindowResize/dynamic-navigation.tsx")
const performanceOptimizationCode = getExampleCode(
  "docs/hooks/useOnWindowResize/performance-optimization.tsx"
)
const viewportBasedEffectsCode = getExampleCode(
  "docs/hooks/useOnWindowResize/viewport-based-effects.tsx"
)

export default async function UseOnWindowResizeDocs() {
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
              <BreadcrumbPage>useOnWindowResize</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useOnWindowResize</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A simple hook for listening to window resize events with automatic cleanup and
              immediate execution.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">Event</Badge>
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
              <InstallationTabs componentName="useOnWindowResize" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <CodeBlock language="typescript">
                  {`import { useOnWindowResize } from "@/hooks/useOnWindowResize"`}
                </CodeBlock>
              </div>

              <CodeBlock language="tsx">
                {`function ResponsiveComponent() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useOnWindowResize(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  })

  return (
    <div>
      <p>Window size: {windowSize.width} x {windowSize.height}</p>
      <p>Is mobile: {windowSize.width < 768 ? &apos;Yes&apos; : &apos;No&apos;}</p>
    </div>
  )
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <PreviewTabs preview={<LiveWindowTrackingExample />} code={liveWindowTrackingCode} />

              <PreviewTabs preview={<ResponsiveLayoutExample />} code={responsiveLayoutCode} />

              <PreviewTabs preview={<ChartResizingExample />} code={chartResizingCode} />

              <PreviewTabs preview={<DynamicNavigationExample />} code={dynamicNavigationCode} />

              <PreviewTabs
                preview={<PerformanceOptimizationExample />}
                code={performanceOptimizationCode}
              />

              <PreviewTabs
                preview={<ViewportBasedEffectsExample />}
                code={viewportBasedEffectsCode}
              />
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
                          <td className="p-2 font-mono">handler</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Function to execute on window resize</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Returns</h3>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Behavior</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Executes the handler immediately on mount</li>
                    <li>Adds resize event listener to window</li>
                    <li>Executes handler on every resize event</li>
                    <li>Automatically removes listener on unmount</li>
                    <li>Re-subscribes if handler function changes</li>
                  </ul>
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
                <li>Automatic event listener setup and cleanup</li>
                <li>Immediate execution on component mount</li>
                <li>TypeScript support with type safety</li>
                <li>Memory efficient with proper cleanup</li>
                <li>Works with both function and arrow function handlers</li>
                <li>Re-subscribes when handler changes</li>
                <li>SSR-safe implementation</li>
                <li>Lightweight with minimal overhead</li>
                <li>Compatible with React Strict Mode</li>
                <li>No external dependencies</li>
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
                  <h4 className="font-semibold mb-2">Layout & UI</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Responsive component layouts</div>
                    <div>• Dynamic navigation menus</div>
                    <div>• Sidebar collapse/expand</div>
                    <div>• Modal positioning</div>
                    <div>• Grid system adjustments</div>
                    <div>• Image gallery layouts</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Content & Data</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Chart and graph resizing</div>
                    <div>• Table column adjustments</div>
                    <div>• Video player resizing</div>
                    <div>• Canvas element scaling</div>
                    <div>• Map component resizing</div>
                    <div>• Virtual scrolling updates</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Performance</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Viewport-based optimizations</div>
                    <div>• Lazy loading adjustments</div>
                    <div>• Image quality selection</div>
                    <div>• Content prioritization</div>
                    <div>• Resource loading strategies</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Interaction</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Touch vs mouse interactions</div>
                    <div>• Gesture recognition adjustments</div>
                    <div>• Keyboard navigation changes</div>
                    <div>• Focus management updates</div>
                    <div>• Accessibility improvements</div>
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
