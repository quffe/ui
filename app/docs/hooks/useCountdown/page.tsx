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
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { HookDocsPage, type TocItem, type PropsTableRow } from "@/components/internal/docs"

import { Example as BasicExample } from "@/examples/hooks/use-countdown/basic"
import { SimpleCountdownExample } from "@/examples/docs/hooks/useCountdown/simple-countdown"
import { AdvancedLoopExample } from "@/examples/docs/hooks/useCountdown/advanced-loop"
import PomodoroTimerExample from "@/examples/docs/hooks/useCountdown/pomodoro-timer"
import { getExampleCode } from "@/lib/serverUtils"

const basicExampleCode = getExampleCode("hooks/use-countdown/basic.tsx")
const simpleCountdownCode = getExampleCode("docs/hooks/useCountdown/simple-countdown.tsx")
const advancedLoopCode = getExampleCode("docs/hooks/useCountdown/advanced-loop.tsx")
const pomodoroTimerCode = getExampleCode("docs/hooks/useCountdown/pomodoro-timer.tsx")

const loopParameters: PropsTableRow[] = [
  {
    prop: "initialTime",
    type: "number",
    description: "Starting point for the countdown loop in seconds.",
    required: true,
  },
  {
    prop: "step",
    type: "number",
    defaultValue: "1",
    description: "Increment/decrement applied each interval tick.",
  },
  {
    prop: "loop",
    type: "boolean",
    defaultValue: "false",
    description: "When true, restarts the timer automatically after completion.",
  },
  {
    prop: "onComplete",
    type: "(info: { loops: number }) => void",
    description: "Called after each loop completes, providing loop count.",
  },
]

const loopReturns: PropsTableRow[] = [
  { prop: "seconds", type: "number", description: "Current remaining seconds." },
  { prop: "start", type: "() => void", description: "Begin or resume the countdown." },
  { prop: "pause", type: "() => void", description: "Pause the countdown." },
  { prop: "reset", type: "() => void", description: "Reset to the initial time." },
  { prop: "isActive", type: "boolean", description: "Whether the timer is currently running." },
  { prop: "loopCount", type: "number", description: "Number of completed loops." },
]

export default async function UseCountdownDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "features", title: "Features" },
    { id: "api-parameters", title: "Parameters" },
    { id: "api-returns", title: "Returns" },
    { id: "accessibility", title: "Accessibility" },
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
              <BreadcrumbPage>useCountdown</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <HookDocsPage
            toc={toc}
            header={{
              title: "useCountdown",
              description: "Countdown timers with optional looping, progress tracking, and granular controls.",
              category: "React · Hook",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("useCountdown")} />,
            }}
            parameters={loopParameters}
            returns={loopReturns}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install the hook via CLI to include helper utilities and TypeScript definitions.
                </p>
              </div>
              <InstallationTabs componentName="useCountdown" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Import the hook and start the timer with <code className="font-mono text-xs">start()</code>; pause or reset as needed.
                </p>
              </div>
              <PreviewTabs preview={<BasicExample />} code={basicExampleCode} />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Different countdown scenarios including loops, progress bars, and Pomodoro timers.
                </p>
              </div>
              <PreviewTabs
                title="Simple countdown"
                preview={<SimpleCountdownExample />}
                code={simpleCountdownCode}
              />
              <PreviewTabs
                title="Advanced loop timer"
                preview={<AdvancedLoopExample />}
                code={advancedLoopCode}
              />
              <PreviewTabs
                title="Pomodoro timer"
                preview={<PomodoroTimerExample />}
                code={pomodoroTimerCode}
              />
            </section>

            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <p className="text-muted-foreground">
                  Built to support rich timer experiences out of the box.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Looping support with customizable step intervals.</li>
                <li>Pause, reset, and resume controls.</li>
                <li>Callbacks for completion and loop counts.</li>
                <li>Designed for dashboard, fitness, or productivity scenarios.</li>
              </ul>
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Communicate countdown progress clearly to assistive technologies.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Expose remaining time via <code className="font-mono text-xs">aria-live</code> regions.</li>
                <li>Allow users to pause timers to reduce time pressure.</li>
                <li>Combine visual progress with textual updates for clarity.</li>
              </ul>
            </section>
          </HookDocsPage>
        </div>
      </div>
    </div>
  )
}
