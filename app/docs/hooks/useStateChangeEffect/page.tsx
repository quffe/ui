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
import BasicUsageExample from "@/examples/docs/hooks/useStateChangeEffect/basic-usage"
import LiveDemoExample from "@/examples/docs/hooks/useStateChangeEffect/live-demo"
import FormValidationExample from "@/examples/docs/hooks/useStateChangeEffect/form-validation"
import SearchDebouncingExample from "@/examples/docs/hooks/useStateChangeEffect/search-debouncing"
import LocalStorageSyncExample from "@/examples/docs/hooks/useStateChangeEffect/local-storage-sync"
import AnalyticsTrackingExample from "@/examples/docs/hooks/useStateChangeEffect/analytics-tracking"
import DataVisualizationExample from "@/examples/docs/hooks/useStateChangeEffect/data-visualization"
import { getExampleCode } from "@/lib/serverUtils"

// Raw imports
const basicUsageCode = getExampleCode("docs/hooks/useStateChangeEffect/basic-usage.tsx")
const liveDemoCode = getExampleCode("docs/hooks/useStateChangeEffect/live-demo.tsx")
const formValidationCode = getExampleCode("docs/hooks/useStateChangeEffect/form-validation.tsx")
const searchDebouncingCode = getExampleCode("docs/hooks/useStateChangeEffect/search-debouncing.tsx")
const localStorageSyncCode = getExampleCode(
  "docs/hooks/useStateChangeEffect/local-storage-sync.tsx"
)
const analyticsTrackingCode = getExampleCode(
  "docs/hooks/useStateChangeEffect/analytics-tracking.tsx"
)
const dataVisualizationCode = getExampleCode(
  "docs/hooks/useStateChangeEffect/data-visualization.tsx"
)

export default async function UseStateChangeEffectDocs() {
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
              <BreadcrumbPage>useStateChangeEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-end gap-3 mb-4">
              <h1 className="text-4xl font-bold">useStateChangeEffect</h1>
              <div className="flex gap-2">
                <Badge variant="secondary">React Hook</Badge>
                <Badge variant="outline">Effect</Badge>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              A hook that executes effects when specific states change, with deep comparison support
              for complex objects.
            </p>
            <CopyableCodeBadge text={config.getNamespacePath("useStateChangeEffect")} />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>
                Install the hook using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="useStateChangeEffect" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Basic Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <PreviewTabs preview={<BasicUsageExample />} code={basicUsageCode} />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Live Demo</CardTitle>
              <CardDescription>
                Interactive example showing the hook in action with multiple state dependencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PreviewTabs preview={<LiveDemoExample />} code={liveDemoCode} />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Form Validation</h3>
                <PreviewTabs preview={<FormValidationExample />} code={formValidationCode} />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">API Request Debouncing</h3>
                <PreviewTabs preview={<SearchDebouncingExample />} code={searchDebouncingCode} />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Local Storage Sync</h3>
                <PreviewTabs preview={<LocalStorageSyncExample />} code={localStorageSyncCode} />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Analytics Tracking</h3>
                <PreviewTabs preview={<AnalyticsTrackingExample />} code={analyticsTrackingCode} />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Complex State Dependencies</h3>
                <PreviewTabs preview={<DataVisualizationExample />} code={dataVisualizationCode} />
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
                          <td className="p-2 font-mono">effect</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Function to execute when states change</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">states</td>
                          <td className="p-2">T[]</td>
                          <td className="p-2">Array of state values to monitor for changes</td>
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
                  <h3 className="font-semibold mb-3">Type Signature</h3>
                  <CodeBlock language="typescript">
                    {`useStateChangeEffect<T>(effect: () => void, states: T[]): void`}
                  </CodeBlock>
                  <p className="text-sm text-muted-foreground mt-2">
                    The hook is generic and can monitor any type of state values.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Comparison Method</h3>
                  <div className="text-sm space-y-2">
                    <p>
                      The hook uses <code>JSON.stringify</code> for deep comparison of state values.
                    </p>
                    <CodeBlock language="tsx">
                      {`const areStatesEqual = states.every((state, index) => JSON.stringify(state) === JSON.stringify(previousStates[index]))`}
                    </CodeBlock>
                    <p className="text-muted-foreground">
                      This means the hook can detect changes in nested objects and arrays, but may
                      not work correctly with functions, dates, or other non-serializable values.
                    </p>
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
                <li>Deep comparison using JSON serialization</li>
                <li>Multiple state monitoring in a single hook</li>
                <li>TypeScript support with generic types</li>
                <li>Memory efficient with ref-based state tracking</li>
                <li>Handles complex nested objects and arrays</li>
                <li>Automatic cleanup and state management</li>
                <li>Works with any serializable data type</li>
                <li>Prevents unnecessary effect executions</li>
                <li>Compatible with React Strict Mode</li>
                <li>Lightweight with minimal overhead</li>
                <li>Easy to integrate with existing components</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm">JSON.stringify Limitations</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                    <li>Functions are not serialized and will be ignored</li>
                    <li>Date objects are converted to strings</li>
                    <li>undefined values are omitted</li>
                    <li>Symbol properties are ignored</li>
                    <li>Circular references will cause errors</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm">Performance Considerations</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                    <li>Large objects may impact performance due to serialization</li>
                    <li>Frequent state changes can trigger many effect executions</li>
                    <li>Consider debouncing for expensive operations</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm">Alternative Approaches</h4>
                  <CodeBlock language="tsx">
                    {`// For simple value comparison, use regular useEffect
useEffect(() => {
  // Effect code
}, [simpleValue])

// For custom comparison logic, create a custom hook
function useDeepCompareEffect(callback, dependencies) {
  const ref = useRef()
  
  if (!isEqual(dependencies, ref.current)) {
    ref.current = dependencies
  }
  
  useEffect(callback, ref.current)
}`}
                  </CodeBlock>
                </div>
              </div>
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
                  <h4 className="font-semibold mb-2">Data Processing</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Form validation and processing</div>
                    <div>• Search and filtering logic</div>
                    <div>• Data transformation</div>
                    <div>• Chart and visualization updates</div>
                    <div>• API request triggering</div>
                    <div>• Cache invalidation</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">State Synchronization</h4>
                  <div className="space-y-1 text-sm">
                    <div>• localStorage synchronization</div>
                    <div>• URL parameter updates</div>
                    <div>• Analytics tracking</div>
                    <div>• Cross-component communication</div>
                    <div>• External service integration</div>
                    <div>• Real-time updates</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">UI Updates</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Dynamic theme switching</div>
                    <div>• Layout recalculation</div>
                    <div>• Component re-rendering</div>
                    <div>• Animation triggering</div>
                    <div>• Focus management</div>
                    <div>• Accessibility updates</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Side Effects</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Event logging</div>
                    <div>• Performance monitoring</div>
                    <div>• Error reporting</div>
                    <div>• Debugging and diagnostics</div>
                    <div>• User behavior tracking</div>
                    <div>• Notification triggering</div>
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
