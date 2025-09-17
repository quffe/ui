"use client"

import { PasswordInput } from "@/components/Form/PasswordInput"
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

export default function PasswordInputDocs() {
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
      description: "Placeholder copy displayed before input.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the input and eye toggle button.",
    },
    {
      prop: "className",
      type: "string",
      description: "Additional utility classes applied to the wrapper.",
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
              <BreadcrumbPage>Password Input</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "PasswordInput",
              description: "A secure password field with built-in visibility toggle and disabled state support.",
              category: "Form · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("password-input")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install the component via CLI to copy the toggle button and accessibility wiring.
                </p>
              </div>
              <InstallationTabs componentName="password-input" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Import the component and drop it into your authentication or settings forms.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CodeBlock language="tsx" filename="components/Form/PasswordInput.tsx">
{`import { PasswordInput } from "@/components/Form/PasswordInput"`}
                </CodeBlock>
                <CodeBlock language="tsx" filename="example.tsx">
{`<PasswordInput placeholder="Enter your password" />`}
                </CodeBlock>
              </div>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Combine the control with labels and helper text to improve clarity.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Default</h3>
                  <PasswordInput placeholder="Enter your password" />
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">With label</h3>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput id="password" placeholder="Enter your password" />
                  </div>
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm lg:col-span-2">
                  <h3 className="text-lg font-semibold">Disabled</h3>
                  <PasswordInput placeholder="Disabled password input" disabled />
                </div>
              </div>
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  The component forwards all native input props, so only the custom additions are listed below.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Treat password inputs as sensitive fields with clear affordances.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Ensure the visibility toggle has an accessible name (handled by the component).</li>
                <li>Communicate password requirements via <code className="font-mono text-xs">aria-describedby</code>.</li>
                <li>Avoid auto-focusing the field unexpectedly to respect screen reader flow.</li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
