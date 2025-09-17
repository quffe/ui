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

import { BasicExample } from "@/examples/docs/input-select/basic-example"
import { NumberSizesExample } from "@/examples/docs/input-select/number-sizes"
import { ErrorStateExample } from "@/examples/docs/input-select/error-state"
import { DisabledStateExample } from "@/examples/docs/input-select/disabled-state"

const basicExampleCode = getExampleCode("docs/input-select/basic-example.tsx")
const numberSizesCode = getExampleCode("docs/input-select/number-sizes.tsx")
const errorStateCode = getExampleCode("docs/input-select/error-state.tsx")
const disabledStateCode = getExampleCode("docs/input-select/disabled-state.tsx")

export default async function InputSelectDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "props", title: "Props" },
    { id: "accessibility", title: "Accessibility" },
  ]

  const propsRows: PropsTableRow[] = [
    {
      prop: "options",
      type: "SelectOption<T>[]",
      description: "Typed list of options rendered inside the dropdown.",
      required: true,
    },
    {
      prop: "value",
      type: "T | null",
      defaultValue: "null",
      description: "Currently selected value for controlled usage.",
    },
    {
      prop: "onChange",
      type: "(value: T | null) => void",
      description: "Called when the selection changes.",
      required: true,
    },
    {
      prop: "placeholder",
      type: "string",
      defaultValue: "Select an option",
      description: "Helper text shown before a value is chosen.",
    },
    {
      prop: "label",
      type: "string",
      description: "Optional label displayed above the control.",
    },
    {
      prop: "error",
      type: "string",
      description: "Error message rendered beneath the select.",
    },
    {
      prop: "size",
      type: "'default' | 'sm' | 'lg'",
      defaultValue: "'default'",
      description: "Size variant that adjusts height and text scale.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the trigger and prevents selection.",
    },
    {
      prop: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Marks the field as required for form semantics.",
    },
    {
      prop: "name",
      type: "string",
      description: "Form field name attribute.",
    },
    {
      prop: "id",
      type: "string",
      description: "ID used to associate labels and descriptions.",
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
              <BreadcrumbPage>InputSelect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "InputSelect",
              description: "A type-safe select input supporting labels, validation states, and size variants.",
              category: "Form · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("input-select")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Use the CLI to scaffold the select, ensuring the option types and styles are in sync.
                </p>
              </div>
              <InstallationTabs componentName="input-select" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Start with the basic example to wire up value and change handlers.
                </p>
              </div>
              <PreviewTabs preview={<BasicExample />} code={basicExampleCode} title="Basic example" />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Explore size variants, validation messaging, and disabled states.
                </p>
              </div>
              <PreviewTabs
                preview={<NumberSizesExample />}
                code={numberSizesCode}
                title="Size variants"
              />
              <PreviewTabs
                preview={<ErrorStateExample />}
                code={errorStateCode}
                title="Error state"
              />
              <PreviewTabs
                preview={<DisabledStateExample />}
                code={disabledStateCode}
                title="Disabled state"
              />
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  All native select props are forwarded to the trigger while these configure the wrapper.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Ensure the select communicates context for keyboard and screen reader users.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Link helper or error text via <code className="font-mono text-xs">aria-describedby</code>.</li>
                <li>Indicate required fields in the label rather than relying on color alone.</li>
                <li>Keep option labels concise so they are announced clearly when navigating.</li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
