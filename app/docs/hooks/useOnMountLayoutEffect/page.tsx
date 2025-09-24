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
import {
  HookDocsPage,
  PropsTable,
  type TocItem,
  type PropsTableRow,
} from "@/components/internal/docs"
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

const layoutParameters: PropsTableRow[] = [
  {
    prop: "effect",
    type: "React.EffectCallback",
    description: "Layout effect callback executed once before the first paint.",
    required: true,
  },
  {
    prop: "dependencies",
    type: "React.DependencyList",
    description: "Optional dependency array captured during the initial render only.",
  },
]

const strictLayoutParameters: PropsTableRow[] = [
  {
    prop: "effect",
    type: "React.EffectCallback",
    description: "Runs synchronously before paint exactly once, ignoring dependencies.",
    required: true,
  },
]

export default async function UseOnMountLayoutEffectDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "api-parameters", title: "useOnMountLayoutEffect" },
    { id: "use-strict-mount-layout-effect", title: "useStrictMountLayoutEffect" },
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
              <BreadcrumbPage>useOnMountLayoutEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <HookDocsPage
            toc={toc}
            header={{
              title: "useOnMountLayoutEffect",
              description:
                "Synchronous mount-only layout effects for measuring or mutating DOM before paint.",
              category: "React · Hook",
              status: "Stable",
              actions: (
                <CopyableCodeBadge text={config.getNamespacePath("useOnMountLayoutEffect")} />
              ),
            }}
            parameters={layoutParameters}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install via CLI to copy the mount-only layout hooks and supporting utilities.
                </p>
              </div>
              <InstallationTabs componentName="useOnMountLayoutEffect" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Use the standard hook for one-time measurements or DOM mutations; opt into the
                  strict variant to bypass dependency checks completely.
                </p>
              </div>
              <CodeBlock language="tsx" filename="usage.tsx">
                {`import { useOnMountLayoutEffect, useStrictMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"`}
              </CodeBlock>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Measure layout, restore scroll position, or kick off critical animations before
                  paint.
                </p>
              </div>
              <PreviewTabs preview={<LiveDemoExample />} code={liveDemoCode} title="Live demo" />
              <PreviewTabs
                preview={<DOMMeasurementsExample />}
                code={domMeasurementsCode}
                title="DOM measurements"
              />
              <PreviewTabs
                preview={<CriticalStyleSetupExample />}
                code={criticalStyleSetupCode}
                title="Critical style setup"
              />
              <PreviewTabs
                preview={<ScrollPositionRestorationExample />}
                code={scrollPositionRestorationCode}
                title="Scroll restoration"
              />
              <PreviewTabs
                preview={<AnimationSetupExample />}
                code={animationSetupCode}
                title="Animation setup"
              />
              <PreviewTabs
                preview={<FocusManagementExample />}
                code={focusManagementCode}
                title="Focus management"
              />
            </section>

            <section id="use-strict-mount-layout-effect" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  useStrictMountLayoutEffect
                </h2>
                <p className="text-muted-foreground">
                  Guarantees a single synchronous invocation even under Strict Mode double
                  rendering.
                </p>
              </div>
              <PropsTable rows={strictLayoutParameters} labels={{ prop: "Parameter" }} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Layout mutations can impact assistive technology—keep changes predictable.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Avoid shifting focus during mount unless restoring previous position.</li>
                <li>Keep layout reads/writes fast to prevent blocking the initial paint.</li>
                <li>Pair visual changes with semantic updates, especially when moving elements.</li>
              </ul>
            </section>
          </HookDocsPage>
        </div>
      </div>
    </div>
  )
}
