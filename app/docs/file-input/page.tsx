"use client"

import { FileInput } from "@/components/Form/FileInput"
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

export default function FileInputDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "props", title: "Props" },
    { id: "accessibility", title: "Accessibility" },
  ]

  const propsRows: PropsTableRow[] = [
    {
      prop: "onFileSelect",
      type: "(files: FileList) => void",
      description: "Callback fired when the user selects one or more files.",
      required: true,
    },
    {
      prop: "showPreview",
      type: "boolean",
      defaultValue: "false",
      description: "Displays thumbnail previews for supported file types.",
    },
    {
      prop: "accept",
      type: "string",
      description: "Restricts selectable MIME types using the native accept attribute.",
    },
    {
      prop: "multiple",
      type: "boolean",
      defaultValue: "false",
      description: "Allows users to select multiple files in a single interaction.",
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
              <BreadcrumbPage>File Input</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "FileInput",
              description: "A drag-and-drop friendly file uploader with previews and multiple selection support.",
              category: "Form · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("file-input")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Run the CLI to copy the uploader, its styles, and helper hooks into your project.
                </p>
              </div>
              <InstallationTabs componentName="file-input" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Import the component and wire up the <code className="font-mono text-xs">onFileSelect</code> callback to handle uploaded files.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CodeBlock language="tsx" filename="components/Form/FileInput.tsx">
{`import { FileInput } from "@/components/Form/FileInput"`}
                </CodeBlock>
                <CodeBlock language="tsx" filename="example.tsx">
{`<FileInput onFileSelect={files => console.log(files)} />`}
                </CodeBlock>
              </div>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Showcase different validation rules and preview modes to match your upload flows.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Default</h3>
                  <FileInput />
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">With label</h3>
                  <div className="space-y-2">
                    <Label>Upload document</Label>
                    <FileInput />
                  </div>
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Preview files</h3>
                  <FileInput showPreview />
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Image only</h3>
                  <FileInput accept="image/*" showPreview />
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-6 shadow-sm lg:col-span-2">
                  <h3 className="text-lg font-semibold">Multiple files</h3>
                  <FileInput multiple showPreview />
                </div>
              </div>
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  Extend the uploader with the following props; all native input attributes are forwarded.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Keep uploads inclusive by respecting keyboard and screen reader flows.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Always pair the input with a visible <code className="font-mono text-xs">Label</code>.</li>
                <li>Describe accepted file types in helper text or aria-describedby copy.</li>
                <li>Expose upload progress and errors using live regions when handling async uploads.</li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
