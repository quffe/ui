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
import { getExampleCode } from "@/lib/serverUtils"

import { BasicAmountExample } from "@/examples/docs/input-amount/basic-amount"
import { CurrencyAmountExample } from "@/examples/docs/input-amount/currency-amount"
import { ErrorStateExample } from "@/examples/docs/input-amount/error-state"

const basicAmountCode = getExampleCode("docs/input-amount/basic-amount.tsx")
const currencyAmountCode = getExampleCode("docs/input-amount/currency-amount.tsx")
const errorStateCode = getExampleCode("docs/input-amount/error-state.tsx")

export default async function InputAmountDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "props", title: "Props" },
    { id: "accessibility", title: "Accessibility" },
  ]

  const propsRows: PropsTableRow[] = [
    {
      prop: "value",
      type: "number | null",
      defaultValue: "null",
      description: "Controlled numeric value representing the current amount.",
    },
    {
      prop: "onChange",
      type: "(value: number | null) => void",
      description: "Handler invoked whenever the amount changes.",
      required: true,
    },
    {
      prop: "label",
      type: "string",
      description: "Optional field label rendered above the input.",
    },
    {
      prop: "placeholder",
      type: "string",
      defaultValue: "0.00",
      description: "Guides users on the expected format before they type.",
    },
    {
      prop: "maxDecimals",
      type: "number",
      defaultValue: "2",
      description: "Limits the decimal precision allowed in the control.",
    },
    {
      prop: "showCurrency",
      type: "boolean",
      defaultValue: "false",
      description: "Toggles the currency prefix in the input.",
    },
    {
      prop: "currency",
      type: "string",
      defaultValue: "\"$\"",
      description: "Overrides the currency symbol displayed when enabled.",
    },
    {
      prop: "error",
      type: "string",
      description: "Displays validation feedback below the control.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables interactions and dims the component.",
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
              <BreadcrumbPage>InputAmount</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "InputAmount",
              description: "A formatted currency input with validation, prefix support, and configurable precision.",
              category: "Form · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("input-amount")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Generate the amount input via CLI to get the masking utilities and types.
                </p>
              </div>
              <InstallationTabs componentName="input-amount" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  The component provides formatted display while keeping a numeric value in state.
                </p>
              </div>
              <PreviewTabs
                preview={<BasicAmountExample />}
                code={basicAmountCode}
                title="Basic amount input"
              />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Extend the base control with currency adornments, error states, and decimal rules.
                </p>
              </div>
              <PreviewTabs
                preview={<CurrencyAmountExample />}
                code={currencyAmountCode}
                title="Currency prefix"
              />
              <PreviewTabs
                preview={<ErrorStateExample />}
                code={errorStateCode}
                title="Error state"
              />
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  These props cover formatting and validation; native input props are forwarded.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Monetary inputs should provide clarity for screen readers and validation flows.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Announce currency context in the label (e.g. “Amount (USD)”).</li>
                <li>Use <code className="font-mono text-xs">aria-describedby</code> to link fee or limit guidelines.</li>
                <li>Show validation errors immediately after blur so assistive tech relays feedback.</li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
