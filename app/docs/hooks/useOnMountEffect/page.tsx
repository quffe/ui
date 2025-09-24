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
import {
  HookDocsPage,
  PropsTable,
  type TocItem,
  type PropsTableRow,
} from "@/components/internal/docs"

import LiveDemoExample from "@/examples/docs/hooks/useOnMountEffect/live-demo"
import DataFetchingExample from "@/examples/docs/hooks/useOnMountEffect/data-fetching"
import SSRSafeExample from "@/examples/docs/hooks/useOnMountEffect/ssr-safe"
import UsageExamplesExample from "@/examples/docs/hooks/useOnMountEffect/usage-examples"
import { getExampleCode } from "@/lib/serverUtils"

const liveDemoCode = getExampleCode("docs/hooks/useOnMountEffect/live-demo.tsx")
const dataFetchingCode = getExampleCode("docs/hooks/useOnMountEffect/data-fetching.tsx")
const ssrSafeCode = getExampleCode("docs/hooks/useOnMountEffect/ssr-safe.tsx")
const usageExamplesCode = getExampleCode("docs/hooks/useOnMountEffect/usage-examples.tsx")

const mountParameters: PropsTableRow[] = [
  {
    prop: "effect",
    type: "React.EffectCallback",
    description: "Effect callback executed once when the component mounts.",
    required: true,
  },
  {
    prop: "dependencies",
    type: "React.DependencyList",
    description: "Optional dependencies captured at mount time; subsequent changes are ignored.",
  },
]

const strictParameters: PropsTableRow[] = [
  {
    prop: "effect",
    type: "React.EffectCallback",
    description: "Effect callback executed a single time on initial render.",
    required: true,
  },
]

const hasMountedReturns: PropsTableRow[] = [
  {
    prop: "boolean",
    type: "boolean",
    description: "Indicates whether the component has completed its first mount.",
    required: true,
  },
]

export default async function UseOnMountEffectDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "api-parameters", title: "useOnMountEffect" },
    { id: "use-strict-mount-effect", title: "useStrictMountEffect" },
    { id: "use-has-mounted", title: "useHasMounted" },
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
              <BreadcrumbPage>useOnMountEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <HookDocsPage
            toc={toc}
            header={{
              title: "useOnMountEffect",
              description:
                "Utilities for running effects a single time on mount with SSR-safe fallbacks.",
              category: "React · Hook",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("useOnMountEffect")} />,
            }}
            parameters={mountParameters}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install via CLI to copy the full hook bundle, including strict and SSR-safe
                  variants.
                </p>
              </div>
              <InstallationTabs componentName="useOnMountEffect" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Import the desired hook and run it inside your component. Dependencies are
                  captured only once at mount time.
                </p>
              </div>
              <CodeBlock language="tsx" filename="usage.tsx">
                {`import { useOnMountEffect, useStrictMountEffect, useHasMounted } from "@/hooks/useOnMountEffect"`}
              </CodeBlock>
              <PreviewTabs preview={<UsageExamplesExample />} code={usageExamplesCode} />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Different scenarios including live demos, data fetching, and SSR-safe patterns.
                </p>
              </div>
              <PreviewTabs
                title="Live demonstration"
                preview={<LiveDemoExample />}
                code={liveDemoCode}
              />
              <PreviewTabs
                title="Data fetching"
                preview={<DataFetchingExample />}
                code={dataFetchingCode}
              />
              <PreviewTabs
                title="SSR-safe components"
                preview={<SSRSafeExample />}
                code={ssrSafeCode}
              />
            </section>

            <section id="use-strict-mount-effect" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">useStrictMountEffect</h2>
                <p className="text-muted-foreground">
                  Forces the effect to run exactly once, ignoring dependency changes triggered by
                  Strict Mode double-invocation.
                </p>
              </div>
              <PropsTable rows={strictParameters} labels={{ prop: "Parameter" }} />
            </section>

            <section id="use-has-mounted" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">useHasMounted</h2>
                <p className="text-muted-foreground">
                  Lightweight helper that tells you whether the component has finished mounting.
                </p>
              </div>
              <PropsTable rows={hasMountedReturns} labels={{ prop: "Return" }} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Mount effects often trigger asynchronous work—communicate any UI changes clearly.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Announce post-mount changes via{" "}
                  <code className="font-mono text-xs">aria-live</code> regions when relevant.
                </li>
                <li>
                  Prefer lazy rendering for expensive components to avoid blocking initial paint.
                </li>
                <li>
                  Gate client-only features (like animations) until{" "}
                  <code className="font-mono text-xs">useHasMounted</code> returns true.
                </li>
              </ul>
            </section>
          </HookDocsPage>
        </div>
      </div>
    </div>
  )
}
