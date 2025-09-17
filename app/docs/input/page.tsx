import { Input } from "@/components/Form/Input"
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
import { DocsLayout, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"

export default function InputDocs() {
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
      prop: "type",
      type: "React.InputHTMLAttributes<HTMLInputElement>[\"type\"]",
      defaultValue: "text",
      description: "Determines the HTML input type and keyboard behaviour.",
    },
    {
      prop: "placeholder",
      type: "string",
      description: "Helper copy rendered when the input has no value.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Visually and functionally disables the input.",
    },
    {
      prop: "className",
      type: "string",
      description: "Optional utility classes merged with the base styles.",
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
              <BreadcrumbPage>Input</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsLayout
            toc={toc}
            header={{
              title: "Input",
              description:
                "A basic input field for capturing single-line text, email, numbers, and more with consistent styling.",
              category: "Form · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("input")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install the Input component with the CLI to ensure styles and dependencies match the design system.
                </p>
              </div>
              <InstallationTabs componentName="input" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Import the component and compose it with labels or helper text depending on the validation rules of your form.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CodeBlock language="tsx" filename="components/Form/Input.tsx">
{`import { Input } from "@/components/Form/Input"`}
                </CodeBlock>
                <CodeBlock language="tsx" filename="example.tsx">
{`<Input type="email" placeholder="Enter your email" />`}
                </CodeBlock>
              </div>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Combine the input with labels, helper text, or different HTML types to cover common collection patterns.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Default</h3>
                  <Input type="text" placeholder="Enter text..." />
                </div>
                <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">With label</h3>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Disabled</h3>
                  <Input type="text" placeholder="Disabled input" disabled />
                </div>
                <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Different types</h3>
                  <div className="grid gap-3">
                    <Input type="text" placeholder="Text input" />
                    <Input type="email" placeholder="Email input" />
                    <Input type="password" placeholder="Password input" />
                    <Input type="number" placeholder="Number input" />
                    <Input type="tel" placeholder="Phone input" />
                    <Input type="url" placeholder="URL input" />
                  </div>
                </div>
              </div>
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  The Input forwards all native <code className="font-mono text-xs">input</code> attributes, so only the custom props are documented below.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Inputs rely on semantic HTML to communicate context to assistive tech.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Pair every input with a <code className="font-mono text-xs">Label</code> component using the same <code className="font-mono text-xs">id</code>.</li>
                <li>Use the <code className="font-mono text-xs">aria-invalid</code> attribute to announce error states.</li>
                <li>Expose helper or error text with <code className="font-mono text-xs">aria-describedby</code> for additional guidance.</li>
              </ul>
            </section>

            <section id="guidelines" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Design guidelines</h2>
                <p className="text-muted-foreground">
                  Keep interactions consistent across forms and states.
                </p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-l-4 border-l-emerald-500 bg-emerald-500/5 p-5">
                  <h3 className="text-sm font-semibold uppercase text-emerald-700">Do</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>Group related inputs vertically with consistent 8px spacing.</li>
                    <li>Show inline validation states immediately after blur.</li>
                    <li>Use helpful placeholder copy that clarifies formatting.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-l-4 border-l-rose-500 bg-rose-500/5 p-5">
                  <h3 className="text-sm font-semibold uppercase text-rose-700">Don’t</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>Rely on placeholder text as the only form of labelling.</li>
                    <li>Disable the input to show validation errors.</li>
                    <li>Mix multiple text alignments inside a single form.</li>
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
