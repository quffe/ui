"use client"

import { useState } from "react"

import { RadioGroup } from "@/components/Form/RadioGroup"
import { Label } from "@/components/ui/label"
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
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { DocsPage, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"

const paymentOptions = [
  { value: "credit", label: "Credit Card" },
  { value: "debit", label: "Debit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bank", label: "Bank Transfer" },
]

const sizeOptions = [
  { value: "xs", label: "Extra Small" },
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
  { value: "xl", label: "Extra Large", disabled: true },
]

export default function RadioGroupDocs() {
  const [selectedValue, setSelectedValue] = useState("credit")
  const [selectedSize, setSelectedSize] = useState("m")

  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "props", title: "Props" },
    { id: "accessibility", title: "Accessibility" },
  ]

  const propsRows: PropsTableRow[] = [
    {
      prop: "name",
      type: "string",
      description: "Shared name attribute used to group the radios.",
      required: true,
    },
    {
      prop: "options",
      type: "RadioOption[]",
      description: "Array of options with labels, values, and optional disabled state.",
      required: true,
    },
    {
      prop: "value",
      type: "string",
      description: "Controlled value representing the selected option.",
    },
    {
      prop: "onChange",
      type: "(value: string) => void",
      description: "Called when the user picks a different option.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the entire group of radios.",
    },
    {
      prop: "className",
      type: "string",
      description: "Additional styling applied to the root container.",
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
              <BreadcrumbPage>Radio Group</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "RadioGroup",
              description: "A stacked radio control for choosing a single option from a small list.",
              category: "Form · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("radio-group")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install via CLI to scaffold the radio options helper and styling tokens.
                </p>
              </div>
              <InstallationTabs componentName="radio-group" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Map your options array to the component and control the value via state.
                </p>
              </div>
              <CodeBlock language="tsx" filename="example.tsx">
{`const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
]

<RadioGroup
  name="example"
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
/>`}
              </CodeBlock>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Demonstrate grouped selections, disabled items, and labelled usage.
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Payment method</h3>
                  <RadioGroup
                    name="payment"
                    options={paymentOptions}
                    value={selectedValue}
                    onChange={setSelectedValue}
                  />
                  <p className="text-sm text-muted-foreground">
                    Selected: {paymentOptions.find(opt => opt.value === selectedValue)?.label}
                  </p>
                </div>

                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">With label</h3>
                  <div className="space-y-2">
                    <Label>Choose a size</Label>
                    <RadioGroup
                      name="size"
                      options={sizeOptions}
                      value={selectedSize}
                      onChange={setSelectedSize}
                    />
                  </div>
                </div>

                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Disabled group</h3>
                  <RadioGroup name="shipping" options={paymentOptions} disabled />
                </div>
              </div>
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  Configure the group with these props; any additional radio attributes can be passed through options.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Radios need clear group labelling and focus management.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Wrap radios in a fieldset with legend when the context benefits from a title.</li>
                <li>Keep option labels short so they’re read fully during keyboard navigation.</li>
                <li>Include helper text for disabled options to explain availability.</li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
