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

import { BasicDropdownExample } from "@/examples/docs/select-dropdown/basic-dropdown"
import { SizeVariantsExample } from "@/examples/docs/select-dropdown/size-variants"
import { NumberValuesExample } from "@/examples/docs/select-dropdown/number-values"
import { ErrorStateExample } from "@/examples/docs/select-dropdown/error-state"
import { DisabledStateExample } from "@/examples/docs/select-dropdown/disabled-state"

const basicDropdownCode = getExampleCode("docs/select-dropdown/basic-dropdown.tsx")
const sizeVariantsCode = getExampleCode("docs/select-dropdown/size-variants.tsx")
const numberValuesCode = getExampleCode("docs/select-dropdown/number-values.tsx")
const errorStateCode = getExampleCode("docs/select-dropdown/error-state.tsx")
const disabledStateCode = getExampleCode("docs/select-dropdown/disabled-state.tsx")

export default async function SelectDropdownDocs() {
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
      type: "SelectDropdownOption<T>[]",
      description: "Array of selectable options rendered in the dropdown.",
      required: true,
    },
    {
      prop: "value",
      type: "T | null",
      defaultValue: "null",
      description: "Controlled value for the current selection.",
    },
    {
      prop: "onChange",
      type: "(value: T) => void",
      description: "Handler invoked when a new option is chosen.",
      required: true,
    },
    {
      prop: "placeholder",
      type: "string",
      defaultValue: "Select an option",
      description: "Trigger copy shown before a value is selected.",
    },
    {
      prop: "size",
      type: "'default' | 'sm' | 'lg'",
      defaultValue: "'default'",
      description: "Adjusts trigger height and typography.",
    },
    {
      prop: "variant",
      type: "'default' | 'error'",
      defaultValue: "'default'",
      description: "Switches between standard and error styling.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the trigger and prevents interactions.",
    },
    {
      prop: "error",
      type: "string",
      description: "Optional error message rendered beneath the field.",
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
      prop: "label",
      type: "string",
      description: "Optional label displayed above the trigger.",
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
              <BreadcrumbPage>SelectDropdown</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "SelectDropdown",
              description:
                "A custom dropdown built on headless components with keyboard navigation and type-safe options.",
              category: "Navigation · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("select-dropdown")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install via CLI to include the trigger, command list, and keyboard bindings.
                </p>
              </div>
              <InstallationTabs componentName="select-dropdown" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Provide an options array and manage the selection via state.
                </p>
              </div>
              <PreviewTabs
                preview={<BasicDropdownExample />}
                code={basicDropdownCode}
                title="Basic dropdown"
              />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Explore different data types, size variants, and validation states.
                </p>
              </div>
              <PreviewTabs
                preview={<NumberValuesExample />}
                code={numberValuesCode}
                title="Number values"
              />
              <PreviewTabs
                preview={<SizeVariantsExample />}
                code={sizeVariantsCode}
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
                  Besides these props, any trigger attributes are forwarded to the underlying
                  button.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Custom dropdowns must mimic native semantics to stay inclusive.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Keep the trigger labelled and reflect the current selection in its text.</li>
                <li>
                  Announce errors via <code className="font-mono text-xs">aria-describedby</code>{" "}
                  when using the error variant.
                </li>
                <li>Ensure keyboard navigation covers opening, moving, and closing via ESC.</li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
