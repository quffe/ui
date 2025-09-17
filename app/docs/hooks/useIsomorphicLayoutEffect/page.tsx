"use client"

import { useRef, useState } from "react"

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
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { InstallationTabs } from "@/components/internal/installation"
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { HookDocsPage, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"
import { useIsomorphicLayoutEffect, useIsomorphicMountEffect } from "@/hooks/useIsomorphicLayoutEffect"

const layoutParameters: PropsTableRow[] = [
  {
    prop: "effect",
    type: "React.EffectCallback",
    description: "Effect that runs synchronously on the client and safely falls back to useEffect during SSR.",
    required: true,
  },
  {
    prop: "dependencies",
    type: "React.DependencyList",
    description: "Optional dependency array captured on the initial render.",
  },
]

const mountParameters: PropsTableRow[] = [
  {
    prop: "effect",
    type: "React.EffectCallback",
    description: "Mount-only effect that hydrates safely across server and client renders.",
    required: true,
  },
]

function LiveDemo() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mountRuns, setMountRuns] = useState(0)
  const [rerenders, setRerenders] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setDimensions({ width: Math.round(rect.width), height: Math.round(rect.height) })
    }
  }, [rerenders])

  useIsomorphicMountEffect(() => {
    setMountRuns(run => run + 1)
  })

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm" ref={ref}>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>Measured width: <strong>{dimensions.width}px</strong></div>
        <div>Measured height: <strong>{dimensions.height}px</strong></div>
        <div>Mount effect runs: <strong>{mountRuns}</strong></div>
        <div>Re-renders: <strong>{rerenders}</strong></div>
      </div>
      <button
        type="button"
        className="mt-4 inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        onClick={() => setRerenders(r => r + 1)}
      >
        Trigger re-measurement
      </button>
      <p className="mt-3 text-xs text-muted-foreground">
        Measurements run synchronously on the client while remaining safe during server render.
      </p>
    </div>
  )
}

export default function UseIsomorphicLayoutEffectDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "api-parameters", title: "useIsomorphicLayoutEffect" },
    { id: "use-isomorphic-mount-effect", title: "useIsomorphicMountEffect" },
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
              <BreadcrumbPage>useIsomorphicLayoutEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <HookDocsPage
            toc={toc}
            header={{
              title: "useIsomorphicLayoutEffect",
              description: "SSR-safe layout effects that avoid hydration warnings while still running before paint on the client.",
              category: "React · Hook",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("useIsomorphicLayoutEffect")} />,
            }}
            parameters={layoutParameters}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install via CLI to copy both the layout and mount variants along with TypeScript helpers.
                </p>
              </div>
              <InstallationTabs componentName="useIsomorphicLayoutEffect" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Use the layout variant for synchronous measurements and the mount variant for SSR-safe initialisation tasks.
                </p>
              </div>
              <CodeBlock language="tsx" filename="usage.tsx">
{`useIsomorphicLayoutEffect(() => {
  if (typeof window !== 'undefined') {
    const rect = elementRef.current?.getBoundingClientRect()
    setDimensions(rect)
  }
}, [])

useIsomorphicMountEffect(() => {
  document.documentElement.dataset.theme = theme
})`}
              </CodeBlock>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Measure layout, synchronise theme data, or restore focus without risking hydration mismatches.
                </p>
              </div>
              <PreviewTabs preview={<LiveDemo />} code={"<!-- see usage example -->"} title="Live demonstration" />
            </section>

            <section id="use-isomorphic-mount-effect" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">useIsomorphicMountEffect</h2>
                <p className="text-muted-foreground">
                  Mount-only variant that mirrors <code className="font-mono text-xs">useLayoutEffect</code> in the browser and <code className="font-mono text-xs">useEffect</code> on the server.
                </p>
              </div>
              <PropsTable rows={mountParameters} labels={{ prop: "Parameter" }} />
            </section>

            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <p className="text-muted-foreground">
                  Designed for Next.js and other SSR environments where layout effects would normally warn.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Seamlessly swaps between <code className="font-mono text-xs">useLayoutEffect</code> and <code className="font-mono text-xs">useEffect</code> depending on environment.</li>
                <li>Companion mount hook for one-time initialisation.</li>
                <li>Useful for measuring elements, applying themes, or restoring scroll positions without runtime checks.</li>
              </ul>
            </section>
          </HookDocsPage>
        </div>
      </div>
    </div>
  )
}
