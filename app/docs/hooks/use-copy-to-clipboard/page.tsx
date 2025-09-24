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
import { DocsPage, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"

import { BasicUsageExample } from "@/examples/docs/hooks/use-copy-to-clipboard/basic-usage"
import { WithCallbacksExample } from "@/examples/docs/hooks/use-copy-to-clipboard/with-callbacks"
import { CodeCopyExample } from "@/examples/docs/hooks/use-copy-to-clipboard/code-copy"
import { getExampleCode } from "@/lib/serverUtils"

const basicUsageCode = getExampleCode("docs/hooks/use-copy-to-clipboard/basic-usage.tsx")
const withCallbacksCode = getExampleCode("docs/hooks/use-copy-to-clipboard/with-callbacks.tsx")
const codeCopyCode = getExampleCode("docs/hooks/use-copy-to-clipboard/code-copy.tsx")

export default async function UseCopyToClipboardDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "examples", title: "Examples" },
    { id: "api", title: "API" },
    { id: "features", title: "Features" },
  ]

  const parameterRows: PropsTableRow[] = [
    {
      prop: "options",
      type: "UseCopyToClipboardOptions",
      defaultValue: "{}",
      description: "Configuration object for callbacks, timeout, and toast behavior.",
    },
    {
      prop: "options.onSuccess",
      type: "(text: string) => void",
      description: "Called when the copy action succeeds with the copied text.",
    },
    {
      prop: "options.onError",
      type: "(error: Error) => void",
      description: "Invoked when the copy action fails.",
    },
    {
      prop: "options.timeout",
      type: "number",
      defaultValue: "2000",
      description: "Duration in milliseconds before the success state resets.",
    },
    {
      prop: "options.showToast",
      type: "boolean",
      defaultValue: "false",
      description: "Displays default toast notifications when true.",
    },
  ]

  const returnRows: PropsTableRow[] = [
    {
      prop: "copy",
      type: "(text: string, label?: string) => Promise<boolean>",
      description: "Copies text to the clipboard and resolves with a boolean indicating success.",
      required: true,
    },
    {
      prop: "copied",
      type: "boolean",
      description: "Reflects whether the most recent copy attempt succeeded.",
    },
    {
      prop: "error",
      type: "Error | null",
      description: "Captures any error thrown by the clipboard API.",
    },
    {
      prop: "isLoading",
      type: "boolean",
      description: "True while a copy request is in flight.",
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
              <BreadcrumbPage>useCopyToClipboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "useCopyToClipboard",
              description:
                "A feature-rich clipboard hook with fallbacks, success state management, and optional toasts.",
              category: "React · Hook",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("useCopyToClipboard")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install the hook via CLI so clipboard fallbacks and toast helpers are included.
                </p>
              </div>
              <InstallationTabs componentName="use-copy-to-clipboard" />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Cover simple copy buttons, code blocks, and custom callbacks.
                </p>
              </div>
              <PreviewTabs
                title="Basic copy button"
                preview={<BasicUsageExample />}
                code={basicUsageCode}
              />
              <PreviewTabs
                title="Copy code with button"
                preview={<CodeCopyExample />}
                code={codeCopyCode}
              />
              <PreviewTabs
                title="With success callback"
                preview={<WithCallbacksExample />}
                code={withCallbacksCode}
              />
            </section>

            <section id="api" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">API</h2>
                <p className="text-muted-foreground">
                  Configure the hook via the options object and consume its returned helpers.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Parameters</h3>
                <PropsTable rows={parameterRows} />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Returns</h3>
                <PropsTable rows={returnRows} labels={{ prop: "Property" }} />
              </div>
            </section>

            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <p className="text-muted-foreground">
                  Why this hook is production ready for clipboard interactions.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Native clipboard API support with permission checks.</li>
                <li>
                  Graceful fallback to{" "}
                  <code className="font-mono text-xs">document.execCommand</code>.
                </li>
                <li>Success and error callbacks for custom UX.</li>
                <li>Optional toast notifications with configurable timeout.</li>
                <li>Supports copying from multiple text sources.</li>
                <li>TypeScript definitions for options and return values.</li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
