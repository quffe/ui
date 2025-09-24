"use client"

import { Textarea } from "@/components/Form/Textarea"
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
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { InstallationTabs } from "@/components/internal/installation"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { DocsPage, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"

export default function TextareaDocs() {
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
      description: "Placeholder copy displayed while the field is empty.",
    },
    {
      prop: "rows",
      type: "number",
      description: "Defines the number of visible text lines.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables input and dims the textarea.",
    },
    {
      prop: "className",
      type: "string",
      description: "Additional classes merged into the textarea.",
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
              <BreadcrumbPage>Textarea</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "Textarea",
              description:
                "A multi-line text input with consistent styling and disabled state support.",
              category: "Form · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("textarea")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Scaffold the textarea via CLI to apply design-system tokens and focus states.
                </p>
              </div>
              <InstallationTabs componentName="textarea" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Import the component and use it like a native{" "}
                  <code className="font-mono text-xs">textarea</code> element.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CodeBlock language="tsx" filename="components/Form/Textarea.tsx">
                  {`import { Textarea } from "@/components/Form/Textarea"`}
                </CodeBlock>
                <CodeBlock language="tsx" filename="example.tsx">
                  {`<Textarea placeholder="Enter your message..." />`}
                </CodeBlock>
              </div>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Combine the textarea with labels and adjust the height for different contexts.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Default</h3>
                  <Textarea placeholder="Enter your message..." />
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">With label</h3>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Enter your message..." />
                  </div>
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Custom height</h3>
                  <Textarea placeholder="Larger textarea..." className="min-h-[120px]" />
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Disabled</h3>
                  <Textarea placeholder="Disabled textarea" disabled />
                </div>
              </div>
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  The component forwards all native{" "}
                  <code className="font-mono text-xs">textarea</code> props.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Multi-line inputs should announce context and requirements clearly.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Pair the textarea with a descriptive{" "}
                  <code className="font-mono text-xs">Label</code>.
                </li>
                <li>
                  Include character or word limits using{" "}
                  <code className="font-mono text-xs">aria-describedby</code>.
                </li>
                <li>
                  Keep placeholder text supplemental; never rely on it as the only instruction.
                </li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
