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
import { getExampleCode } from "@/lib/serverUtils"
import { DocsLayout, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"

// Example components
import { BasicUsageExample } from "@/examples/docs/hooks/use-mobile/basic-usage"
import { CustomBreakpointExample } from "@/examples/docs/hooks/use-mobile/custom-breakpoint"

// Raw imports
const basicUsageCode = getExampleCode("docs/hooks/use-mobile/basic-usage.tsx")
const customBreakpointCode = getExampleCode("docs/hooks/use-mobile/custom-breakpoint.tsx")

export default async function UseMobileDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "examples", title: "Examples" },
    { id: "api", title: "API" },
    { id: "features", title: "Features" },
    { id: "presets", title: "Responsive presets" },
    { id: "best-practices", title: "Best practices" },
  ]

  const parameterRows: PropsTableRow[] = [
    {
      prop: "options",
      type: "UseMobileOptions",
      defaultValue: "{}",
      description: <>Configuration object that customises the breakpoint behaviour.</>,
    },
    {
      prop: "options.breakpoint",
      type: "number",
      defaultValue: "768",
      description: <>Pixel width that defines when the hook reports a mobile layout.</>,
    },
    {
      prop: "options.defaultValue",
      type: "boolean",
      defaultValue: "false",
      description: <>Initial value used during SSR to avoid hydration mismatches.</>,
    },
    {
      prop: "options.ssrSafe",
      type: "boolean",
      defaultValue: "true",
      description: (
        <>
          Enables a guard for environments without <code className="font-mono text-xs">window</code>.
        </>
      ),
    },
  ]

  const returnRows: PropsTableRow[] = [
    {
      prop: "isMobile",
      type: <code className="font-mono text-xs">boolean</code>,
      description: (
        <>
          Returns <code className="font-mono text-xs">true</code> when the viewport is below the breakpoint; otherwise <code className="font-mono text-xs">false</code>.
        </>
      ),
    },
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
              <BreadcrumbPage>useMobile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsLayout
            toc={toc}
            header={{
              title: "useMobile",
              description: "A viewport matcher that reports mobile breakpoints without hydration flicker.",
              category: "React · Hook",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("use-mobile")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install the hook via CLI so dependencies for SSR safety are copied into your project.
                </p>
              </div>
              <InstallationTabs componentName="use-mobile" />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Use the hook to branch UI or reduce motion when users land on smaller screens.
                </p>
              </div>
              <div className="space-y-8">
                <PreviewTabs
                  title="Live device detection"
                  preview={<BasicUsageExample />}
                  code={basicUsageCode}
                />
                <PreviewTabs
                  title="Custom breakpoints"
                  preview={<CustomBreakpointExample />}
                  code={customBreakpointCode}
                />
              </div>
            </section>

            <section id="api" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">API</h2>
                <p className="text-muted-foreground">
                  The hook accepts a single options object and returns a boolean that tracks the current viewport.
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Parameters</h3>
                  <PropsTable
                    rows={parameterRows}
                    labels={{ prop: "Parameter", defaultValue: "Default" }}
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Returns</h3>
                  <PropsTable rows={returnRows} labels={{ prop: "Return" }} />
                </div>
              </div>
            </section>

            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <p className="text-muted-foreground">
                  Why this hook is production ready out of the box.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>SSR-safe matching with hydration guards to prevent initial flicker.</li>
                <li>Lightweight <code className="font-mono text-xs">matchMedia</code> listener with automatic cleanup.</li>
                <li>Customisable breakpoints for tablet, desktop, or watch experiences.</li>
                <li>Optional default value for deterministic server rendering.</li>
              </ul>
            </section>

            <section id="presets" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Responsive presets</h2>
                <p className="text-muted-foreground">
                  Reference breakpoints to align with the design system.
                </p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase text-muted-foreground">Mobile first</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><code>320px</code> – Small mobile</li>
                    <li><code>480px</code> – Large mobile</li>
                    <li><code>768px</code> – Tablet (default)</li>
                  </ul>
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase text-muted-foreground">Desktop</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><code>1024px</code> – Small desktop</li>
                    <li><code>1200px</code> – Medium desktop</li>
                    <li><code>1440px</code> – Large desktop</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="best-practices" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Best practices</h2>
                <p className="text-muted-foreground">
                  Keep conditional rendering predictable and accessible.
                </p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-l-4 border-l-emerald-500 bg-emerald-500/5 p-5">
                  <h3 className="text-sm font-semibold uppercase text-emerald-700">Do</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>Fallback to server defaults so markup is consistent pre-hydration.</li>
                    <li>Pair the hook with CSS container queries when possible.</li>
                    <li>Memoize expensive render branches that only mount on desktop.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-l-4 border-l-rose-500 bg-rose-500/5 p-5">
                  <h3 className="text-sm font-semibold uppercase text-rose-700">Don’t</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>Gate critical navigation or authentication behind viewport checks.</li>
                    <li>Trigger heavy animations solely because the hook reports desktop.</li>
                    <li>Assume device type—always design for responsive breakpoints.</li>
                  </ul>
                </div>
              </div>
            </section>
          </DocsLayout>
        </div>
      </div>
    </div>
  )
}
