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
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { HookDocsPage, type TocItem, type PropsTableRow } from "@/components/internal/docs"
import { getExampleCode } from "@/lib/serverUtils"

import BasicUsageExample from "@/examples/docs/hooks/useStateChangeEffect/basic-usage"
import LiveDemoExample from "@/examples/docs/hooks/useStateChangeEffect/live-demo"
import FormValidationExample from "@/examples/docs/hooks/useStateChangeEffect/form-validation"
import SearchDebouncingExample from "@/examples/docs/hooks/useStateChangeEffect/search-debouncing"
import LocalStorageSyncExample from "@/examples/docs/hooks/useStateChangeEffect/local-storage-sync"
import AnalyticsTrackingExample from "@/examples/docs/hooks/useStateChangeEffect/analytics-tracking"
import DataVisualizationExample from "@/examples/docs/hooks/useStateChangeEffect/data-visualization"

const basicUsageCode = getExampleCode("docs/hooks/useStateChangeEffect/basic-usage.tsx")
const liveDemoCode = getExampleCode("docs/hooks/useStateChangeEffect/live-demo.tsx")
const formValidationCode = getExampleCode("docs/hooks/useStateChangeEffect/form-validation.tsx")
const searchDebouncingCode = getExampleCode("docs/hooks/useStateChangeEffect/search-debouncing.tsx")
const localStorageSyncCode = getExampleCode("docs/hooks/useStateChangeEffect/local-storage-sync.tsx")
const analyticsTrackingCode = getExampleCode("docs/hooks/useStateChangeEffect/analytics-tracking.tsx")
const dataVisualizationCode = getExampleCode("docs/hooks/useStateChangeEffect/data-visualization.tsx")

const parameters: PropsTableRow[] = [
  {
    prop: "effect",
    type: "() => void",
    description: "Callback executed whenever the monitored states change.",
    required: true,
  },
  {
    prop: "states",
    type: "T[]",
    description: "Array of state values to track with deep comparison.",
    required: true,
  },
]

export default async function UseStateChangeEffectDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "api-parameters", title: "Parameters" },
    { id: "features", title: "Features" },
    { id: "comparison", title: "Comparison" },
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
              <BreadcrumbPage>useStateChangeEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <HookDocsPage
            toc={toc}
            header={{
              title: "useStateChangeEffect",
              description: "Run effects when specific states change, with deep comparison out of the box.",
              category: "React · Hook",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("useStateChangeEffect")} />,
            }}
            parameters={parameters}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install via CLI to include the hook and its deep comparison utilities.
                </p>
              </div>
              <InstallationTabs componentName="useStateChangeEffect" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Pass the states you want to monitor; the hook handles serialization and change detection for you.
                </p>
              </div>
              <PreviewTabs preview={<BasicUsageExample />} code={basicUsageCode} />
              <CodeBlock language="tsx" filename="signature.tsx">
{`useStateChangeEffect<T>(effect: () => void, states: T[]): void`}
              </CodeBlock>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Explore form validation, debounced search, analytics, and more.
                </p>
              </div>
              <PreviewTabs title="Live demo" preview={<LiveDemoExample />} code={liveDemoCode} />
              <PreviewTabs title="Form validation" preview={<FormValidationExample />} code={formValidationCode} />
              <PreviewTabs title="API request debouncing" preview={<SearchDebouncingExample />} code={searchDebouncingCode} />
              <PreviewTabs title="Local storage sync" preview={<LocalStorageSyncExample />} code={localStorageSyncCode} />
              <PreviewTabs title="Analytics tracking" preview={<AnalyticsTrackingExample />} code={analyticsTrackingCode} />
              <PreviewTabs title="Complex data visualization" preview={<DataVisualizationExample />} code={dataVisualizationCode} />
            </section>

            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <p className="text-muted-foreground">
                  Useful for syncing UI state with side effects and external services.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Deep comparison across primitive and nested state values.</li>
                <li>Works seamlessly with memoized state or derived data.</li>
                <li>Type-safe generics with minimal boilerplate.</li>
              </ul>
            </section>

            <section id="comparison" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Comparison method</h2>
                <p className="text-muted-foreground">
                  Under the hood, the hook serializes state using <code className="font-mono text-xs">JSON.stringify</code> to detect changes.
                </p>
              </div>
              <CodeBlock language="typescript" filename="comparison.ts">
{`const hasChanged = JSON.stringify(previousStates) !== JSON.stringify(currentStates)`}
              </CodeBlock>
              <p className="text-sm text-muted-foreground">
                For extremely large objects, consider passing derived values to keep serialization fast.
              </p>
            </section>
          </HookDocsPage>
        </div>
      </div>
    </div>
  )
}
