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

import BasicUsageExample from "@/examples/docs/hooks/useLocalStorage/basic-usage"
import ObjectStorageExample from "@/examples/docs/hooks/useLocalStorage/object-storage"
import AdvancedUsageExample from "@/examples/docs/hooks/useLocalStorage/advanced-usage"
import UsageExamplesExample from "@/examples/docs/hooks/useLocalStorage/usage-examples"
import { getExampleCode } from "@/lib/serverUtils"

const basicUsageCode = getExampleCode("docs/hooks/useLocalStorage/basic-usage.tsx")
const objectStorageCode = getExampleCode("docs/hooks/useLocalStorage/object-storage.tsx")
const advancedUsageCode = getExampleCode("docs/hooks/useLocalStorage/advanced-usage.tsx")
const usageExamplesCode = getExampleCode("docs/hooks/useLocalStorage/usage-examples.tsx")

const parameterRows: PropsTableRow[] = [
  {
    prop: "keyName",
    type: "string",
    description: "Storage key used when reading/writing to localStorage.",
    required: true,
  },
  {
    prop: "defaultValue",
    type: "T",
    description: "Optional fallback value when nothing is stored yet.",
  },
]

const returnRows: PropsTableRow[] = [
  {
    prop: "value",
    type: "T",
    description: "Current value synced with localStorage.",
    required: true,
  },
  {
    prop: "setValue",
    type: "(newValue: T) => void",
    description: "Updates localStorage and the in-memory state.",
    required: true,
  },
]

export default async function UseLocalStorageDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "features", title: "Features" },
    { id: "api-parameters", title: "Parameters" },
    { id: "api-returns", title: "Returns" },
    { id: "tips", title: "Persistence tips" },
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
              <BreadcrumbPage>useLocalStorage</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <HookDocsPage
            toc={toc}
            header={{
              title: "useLocalStorage",
              description:
                "Synchronise React state with localStorage, with JSON parsing, error handling, and SSR guards.",
              category: "State · Hook",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("useLocalStorage")} />,
            }}
            parameters={parameterRows}
            returns={returnRows}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Run the CLI to install the hook with built-in JSON serialization helpers.
                </p>
              </div>
              <InstallationTabs componentName="useLocalStorage" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Import the hook and treat the returned pair like{" "}
                  <code className="font-mono text-xs">useState</code>, but persisted.
                </p>
              </div>
              <CodeBlock language="tsx" filename="usage.tsx">
                {`const [value, setValue] = useLocalStorage<string>("preferredTheme", "light")`}
              </CodeBlock>
              <PreviewTabs preview={<UsageExamplesExample />} code={usageExamplesCode} />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Common scenarios ranging from primitives to complex objects.
                </p>
              </div>
              <PreviewTabs
                title="Basic usage"
                preview={<BasicUsageExample />}
                code={basicUsageCode}
              />
              <PreviewTabs
                title="Object storage"
                preview={<ObjectStorageExample />}
                code={objectStorageCode}
              />
              <PreviewTabs
                title="Advanced usage"
                preview={<AdvancedUsageExample />}
                code={advancedUsageCode}
              />
            </section>

            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <p className="text-muted-foreground">
                  Why this hook is safer than accessing{" "}
                  <code className="font-mono text-xs">localStorage</code> manually.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>JSON serialization/deserialization baked in.</li>
                <li>Guards against SSR and private browsing constraints.</li>
                <li>
                  Lightweight API similar to <code className="font-mono text-xs">useState</code>.
                </li>
                <li>Type inference with explicit generic overrides available.</li>
              </ul>
            </section>

            <section id="tips" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Persistence tips</h2>
                <p className="text-muted-foreground">
                  Keep client-side persistence robust across environments.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Namespace keys (e.g. <code className="font-mono text-xs">app.theme</code>) to
                  avoid collisions.
                </li>
                <li>Wrap calls in try/catch if storing large payloads that may exceed quotas.</li>
                <li>
                  Reset state when <code className="font-mono text-xs">window</code> is unavailable
                  to avoid hydration mismatches.
                </li>
              </ul>
            </section>
          </HookDocsPage>
        </div>
      </div>
    </div>
  )
}
