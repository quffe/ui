"use server"

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
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { HookDocsPage, type TocItem, type PropsTableRow } from "@/components/internal/docs"
import { getExampleCode } from "@/lib/serverUtils"

import LiveWindowTrackingExample from "@/examples/docs/hooks/useOnWindowResize/live-window-tracking"
import ResponsiveLayoutExample from "@/examples/docs/hooks/useOnWindowResize/responsive-layout"
import ChartResizingExample from "@/examples/docs/hooks/useOnWindowResize/chart-resizing"
import DynamicNavigationExample from "@/examples/docs/hooks/useOnWindowResize/dynamic-navigation"
import PerformanceOptimizationExample from "@/examples/docs/hooks/useOnWindowResize/performance-optimization"
import ViewportBasedEffectsExample from "@/examples/docs/hooks/useOnWindowResize/viewport-based-effects"

const liveWindowTrackingCode = getExampleCode("docs/hooks/useOnWindowResize/live-window-tracking.tsx")
const responsiveLayoutCode = getExampleCode("docs/hooks/useOnWindowResize/responsive-layout.tsx")
const chartResizingCode = getExampleCode("docs/hooks/useOnWindowResize/chart-resizing.tsx")
const dynamicNavigationCode = getExampleCode("docs/hooks/useOnWindowResize/dynamic-navigation.tsx")
const performanceOptimizationCode = getExampleCode(
  "docs/hooks/useOnWindowResize/performance-optimization.tsx"
)
const viewportBasedEffectsCode = getExampleCode(
  "docs/hooks/useOnWindowResize/viewport-based-effects.tsx"
)

const parameters: PropsTableRow[] = [
  {
    prop: "handler",
    type: "() => void",
    description: "Function executed on mount and whenever the window is resized.",
    required: true,
  },
]

export default async function UseOnWindowResizeDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "api-parameters", title: "Parameters" },
    { id: "behavior", title: "Behavior" },
    { id: "features", title: "Features" },
  ]

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
        <div className="container mx-auto max-w-5xl">
          <HookDocsPage
            toc={toc}
            header={{
              title: "useOnWindowResize",
              description: "Listen to window resize events with automatic cleanup and immediate execution.",
              category: "React · Hook",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("useOnWindowResize")} />,
            }}
            parameters={parameters}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install the hook via CLI to include the resize listener helpers and types.
                </p>
              </div>
              <InstallationTabs componentName="useOnWindowResize" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Provide a handler that reacts to window size changes. The hook runs it immediately on mount and on every resize event.
                </p>
              </div>
              <CodeBlock language="tsx" filename="usage.tsx">
{`function ResponsiveComponent() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useOnWindowResize(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  })

  return (
    <div>
      <p>Window size: {windowSize.width} × {windowSize.height}</p>
      <p>Is mobile: {windowSize.width < 768 ? 'Yes' : 'No'}</p>
    </div>
  )
}`}
              </CodeBlock>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Common resize scenarios from responsive layouts to data visualizations.
                </p>
              </div>
              <PreviewTabs preview={<LiveWindowTrackingExample />} code={liveWindowTrackingCode} title="Live tracking" />
              <PreviewTabs preview={<ResponsiveLayoutExample />} code={responsiveLayoutCode} title="Responsive layout" />
              <PreviewTabs preview={<ChartResizingExample />} code={chartResizingCode} title="Chart resizing" />
              <PreviewTabs preview={<DynamicNavigationExample />} code={dynamicNavigationCode} title="Dynamic navigation" />
              <PreviewTabs preview={<PerformanceOptimizationExample />} code={performanceOptimizationCode} title="Performance optimization" />
              <PreviewTabs preview={<ViewportBasedEffectsExample />} code={viewportBasedEffectsCode} title="Viewport effects" />
            </section>

            <section id="behavior" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Behavior</h2>
                <p className="text-muted-foreground">
                  What happens under the hood when you subscribe to window resize events.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Runs the handler immediately during effect execution.</li>
                <li>Registers <code className="font-mono text-xs">window.resize</code> and cleans up on unmount.</li>
                <li>Re-subscribes automatically if the handler reference changes.</li>
              </ul>
            </section>

            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <p className="text-muted-foreground">
                  Designed for responsive dashboards, charts, and adaptive navigation.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Immediate execution keeps UI in sync with the current viewport.</li>
                <li>Automatic cleanup prevents multiple listeners from stacking.</li>
                <li>Lightweight API that plugs into existing state management.</li>
              </ul>
            </section>
          </HookDocsPage>
        </div>
      </div>
    </div>
  )
}
