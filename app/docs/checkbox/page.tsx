"use client"

import { Checkbox } from "@/components/Form/Checkbox"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
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
import { CodeBlock } from "@/components/internal/ui/code-block"
import {
  DocsLayout,
  PropsTable,
  type TocItem,
  type PropsTableRow,
} from "@/components/internal/docs"

export default function CheckboxDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "props", title: "Props" },
    { id: "accessibility", title: "Accessibility" },
    { id: "guidelines", title: "Design guidelines" },
  ]

  const propsRows: PropsTableRow[] = [
    {
      prop: "id",
      type: "string",
      description: "Unique identifier used to pair the checkbox with its label.",
      required: true,
    },
    {
      prop: "label",
      type: "string",
      description: "Optional text rendered next to the checkbox control.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables user interaction and applies muted styling.",
    },
    {
      prop: "defaultChecked",
      type: "boolean",
      defaultValue: "false",
      description: "Sets the initial checked state for uncontrolled usage.",
    },
    {
      prop: "className",
      type: "string",
      description: "Extends the root element with additional utility classes.",
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
              <BreadcrumbPage>Checkbox</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsLayout
            toc={toc}
            header={{
              title: "Checkbox",
              description:
                "A controlled checkbox for binary selections with optional labels and helper messaging.",
              category: "Form · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("checkbox")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Scaffold the Checkbox from the CLI to copy the necessary primitive wiring and
                  styles.
                </p>
              </div>
              <InstallationTabs componentName="checkbox" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Import the Checkbox and pair it with contextual copy to explain what the user is
                  opting into.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CodeBlock language="tsx" filename="components/Form/Checkbox.tsx">
                  {`import { Checkbox } from "@/components/Form/Checkbox"`}
                </CodeBlock>
                <CodeBlock language="tsx" filename="example.tsx">
                  {`<Checkbox id="terms" label="Accept terms and conditions" />`}
                </CodeBlock>
              </div>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Configure the component for standalone usage or as part of option groups.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Default</h3>
                  <Checkbox id="default" aria-label="Default checkbox" />
                </div>
                <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">With label</h3>
                  <Checkbox id="terms" label="I accept the terms and conditions" />
                </div>
                <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Multiple options</h3>
                  <div className="space-y-3">
                    <Checkbox id="newsletter" label="Subscribe to newsletter" />
                    <Checkbox id="updates" label="Receive product updates" />
                    <Checkbox id="marketing" label="Marketing communications" />
                  </div>
                </div>
                <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Disabled states</h3>
                  <div className="space-y-3">
                    <Checkbox id="disabled1" label="Disabled unchecked" disabled />
                    <Checkbox id="disabled2" label="Disabled checked" disabled defaultChecked />
                  </div>
                </div>
              </div>
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  In addition to these props, the Checkbox forwards any native{" "}
                  <code className="font-mono text-xs">input</code> attributes.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Ensure checkboxes communicate state and intent to assistive technologies.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Always pass an <code className="font-mono text-xs">id</code> and pair it with a
                  visible label.
                </li>
                <li>
                  Prefer <code className="font-mono text-xs">aria-describedby</code> to link
                  supporting guidance or error copy.
                </li>
                <li>Use fieldsets when presenting multiple checkboxes within the same question.</li>
              </ul>
            </section>

            <section id="guidelines" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Design guidelines</h2>
                <p className="text-muted-foreground">Keep option groups predictable and legible.</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-l-4 border-l-emerald-500 bg-emerald-500/5 p-5">
                  <h3 className="text-sm font-semibold uppercase text-emerald-700">Do</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>Align checkbox labels vertically for quick scanning.</li>
                    <li>Provide clear helper copy for terms or marketing consents.</li>
                    <li>Use progressive disclosure for long lists of options.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-l-4 border-l-rose-500 bg-rose-500/5 p-5">
                  <h3 className="text-sm font-semibold uppercase text-rose-700">Don’t</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>Stack unrelated toggles together in a single section.</li>
                    <li>Force users to deselect a pre-checked marketing consent.</li>
                    <li>Use checkboxes for mutually exclusive choices—prefer radio groups.</li>
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
