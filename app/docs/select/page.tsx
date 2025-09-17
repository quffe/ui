"use client"

import { Select } from "@/components/Form/Select"
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

export default function SelectDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "props", title: "Props" },
    { id: "accessibility", title: "Accessibility" },
  ]

  const propsRows: PropsTableRow[] = [
    {
      prop: "placeholder",
      type: "string",
      description: "Helper text shown when no value is selected.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the trigger and prevents changing the selection.",
    },
    {
      prop: "className",
      type: "string",
      description: "Additional classes merged on the select element.",
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
              <BreadcrumbPage>Select</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "Select",
              description: "A native select element with design-system styling and disabled state support.",
              category: "Form · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("select")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install the component via CLI or copy the styles if you only need the base element.
                </p>
              </div>
              <InstallationTabs componentName="select" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Import the styled <code className="font-mono text-xs">Select</code> and pass native <code className="font-mono text-xs">option</code> elements.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CodeBlock language="tsx" filename="components/Form/Select.tsx">
{`import { Select } from "@/components/Form/Select"`}
                </CodeBlock>
                <CodeBlock language="tsx" filename="example.tsx">
{`<Select placeholder="Choose an option">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</Select>`}
                </CodeBlock>
              </div>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Combine the select with labels and disabled states for clarity.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Default</h3>
                  <Select placeholder="Choose an option">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">With label</h3>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select id="country" placeholder="Select your country">
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="ca">Canada</option>
                      <option value="au">Australia</option>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm lg:col-span-2">
                  <h3 className="text-lg font-semibold">Disabled</h3>
                  <Select placeholder="Disabled select" disabled>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                  </Select>
                </div>
              </div>
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  In addition to these props, the component forwards all native <code className="font-mono text-xs">select</code> attributes.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Native selects inherit strong accessibility, but you can still improve clarity.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Always associate the select with a visible <code className="font-mono text-xs">Label</code>.</li>
                <li>Provide helper text for grouped options or country lists.</li>
                <li>Keep option labels concise so screen readers announce them cleanly.</li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
