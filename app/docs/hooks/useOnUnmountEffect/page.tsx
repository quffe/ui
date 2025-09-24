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

import LiveDemoExample from "@/examples/docs/hooks/useOnUnmountEffect/live-demo"
import EventListenerCleanupExample from "@/examples/docs/hooks/useOnUnmountEffect/event-listener-cleanup"
import NetworkRequestCancellationExample from "@/examples/docs/hooks/useOnUnmountEffect/network-request-cancellation"
import TimerCleanupExample from "@/examples/docs/hooks/useOnUnmountEffect/timer-cleanup"
import WebSocketCleanupExample from "@/examples/docs/hooks/useOnUnmountEffect/websocket-cleanup"
import AnalyticsCleanupExample from "@/examples/docs/hooks/useOnUnmountEffect/analytics-cleanup"

const liveDemoCode = getExampleCode("docs/hooks/useOnUnmountEffect/live-demo.tsx")
const eventListenerCleanupCode = getExampleCode(
  "docs/hooks/useOnUnmountEffect/event-listener-cleanup.tsx"
)
const networkRequestCancellationCode = getExampleCode(
  "docs/hooks/useOnUnmountEffect/network-request-cancellation.tsx"
)
const timerCleanupCode = getExampleCode("docs/hooks/useOnUnmountEffect/timer-cleanup.tsx")
const webSocketCleanupCode = getExampleCode("docs/hooks/useOnUnmountEffect/websocket-cleanup.tsx")
const analyticsCleanupCode = getExampleCode("docs/hooks/useOnUnmountEffect/analytics-cleanup.tsx")

const parameters: PropsTableRow[] = [
  {
    prop: "cleanup",
    type: "() => void",
    description: "Function executed when the component unmounts.",
    required: true,
  },
]

export default async function UseOnUnmountEffectDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "api-parameters", title: "Parameters" },
    { id: "characteristics", title: "Characteristics" },
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
              <BreadcrumbPage>useOnUnmountEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <HookDocsPage
            toc={toc}
            header={{
              title: "useOnUnmountEffect",
              description:
                "Run cleanup logic only when a component unmounts—ideal for aborting requests and tearing down listeners.",
              category: "Lifecycle · Hook",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("useOnUnmountEffect")} />,
            }}
            parameters={parameters}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install via CLI to copy the hook bundle and types for unmount handling.
                </p>
              </div>
              <InstallationTabs componentName="useOnUnmountEffect" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Pass a cleanup callback; it executes exactly once when the component is about to
                  unmount.
                </p>
              </div>
              <CodeBlock language="tsx" filename="usage.tsx">
                {`useOnUnmountEffect(() => {
  console.log('Component is unmounting')
  abortController.abort()
})`}
              </CodeBlock>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Practical cleanup scenarios ranging from event listeners to analytics.
                </p>
              </div>
              <PreviewTabs title="Live demo" preview={<LiveDemoExample />} code={liveDemoCode} />
              <PreviewTabs
                title="Event listener cleanup"
                preview={<EventListenerCleanupExample />}
                code={eventListenerCleanupCode}
              />
              <PreviewTabs
                title="Network request cancellation"
                preview={<NetworkRequestCancellationExample />}
                code={networkRequestCancellationCode}
              />
              <PreviewTabs
                title="Timer cleanup"
                preview={<TimerCleanupExample />}
                code={timerCleanupCode}
              />
              <PreviewTabs
                title="WebSocket cleanup"
                preview={<WebSocketCleanupExample />}
                code={webSocketCleanupCode}
              />
              <PreviewTabs
                title="Analytics cleanup"
                preview={<AnalyticsCleanupExample />}
                code={analyticsCleanupCode}
              />
            </section>

            <section id="characteristics" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Characteristics</h2>
                <p className="text-muted-foreground">
                  Understand when the hook fires compared to regular effects.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Lifecycle timing</h3>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground text-sm">
                    <li>
                      <strong>Mount:</strong> no callback execution.
                    </li>
                    <li>
                      <strong>Updates:</strong> no callback execution.
                    </li>
                    <li>
                      <strong>Unmount:</strong> cleanup runs once.
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Compared to useEffect</h3>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground text-sm">
                    <li>
                      <code className="font-mono text-xs">useOnUnmountEffect</code> fires only on
                      unmount.
                    </li>
                    <li>
                      <code className="font-mono text-xs">useEffect</code> with <code>[]</code> runs
                      on mount and cleans up on unmount.
                    </li>
                    <li>
                      <code className="font-mono text-xs">useEffect</code> with deps runs + cleans
                      up on every dependency change.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </HookDocsPage>
        </div>
      </div>
    </div>
  )
}
