"use client"

import { FileInput } from "@/components/Form/FileInput"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

export default function FileInputDocs() {
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
        <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="flex items-end gap-3 mb-4">
          <h1 className="text-4xl font-bold">FileInput</h1>
          <Badge variant="secondary">Form Component</Badge>
        </div>
        <p className="text-lg text-muted-foreground mb-4">
          A file upload component with drag and drop support and file preview.
        </p>
        <CopyableCodeBadge text={config.getNamespacePath("file-input")} />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Installation</CardTitle>
          <CardDescription>Install the File Input component via CLI</CardDescription>
        </CardHeader>
        <CardContent>
          <InstallationTabs componentName="file-input" />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock language="tsx" filename="components/Form/FileInput.tsx">
{`import { FileInput } from "@/components/Form/FileInput"`}
          </CodeBlock>
          <div className="h-4" />
          <CodeBlock language="tsx" filename="example.tsx">
{`<FileInput onFileSelect={(files) => console.log(files)} />`}
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Default</h3>
            <FileInput />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">With Label</h3>
            <div className="space-y-2">
              <Label>Upload Document</Label>
              <FileInput />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">With File Preview</h3>
            <FileInput showPreview />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Image Only</h3>
            <FileInput accept="image/*" showPreview />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Multiple Files</h3>
            <FileInput multiple showPreview />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Props</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 font-semibold">Prop</th>
                  <th className="text-left p-2 font-semibold">Type</th>
                  <th className="text-left p-2 font-semibold">Default</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">onFileSelect</td>
                  <td className="p-2">function</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Callback when files are selected</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">showPreview</td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">false</td>
                  <td className="p-2">Whether to show file preview</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">accept</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">File types to accept</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">multiple</td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">false</td>
                  <td className="p-2">Allow multiple file selection</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono text-sm">className</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  )
}
