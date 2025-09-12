import { PasswordInput } from "@/components/Form/PasswordInput"
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

export default function PasswordInputDocs() {
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
        <div className="container mx-auto max-w-4xl">
          {/* Keep the rest of the existing content */}
          <div className="mb-8">
            <div className="flex items-end gap-3 mb-4">
              <h1 className="text-4xl font-bold">PasswordInput</h1>
              <Badge variant="secondary">Form Component</Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              A password input field with show/hide password functionality.
            </p>
            <CopyableCodeBadge text={config.getNamespacePath("password-input")} />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>Install the Password Input component via CLI</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="password-input" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="tsx" filename="components/Form/PasswordInput.tsx">
{`import { PasswordInput } from "@/components/Form/PasswordInput"`}
              </CodeBlock>
              <div className="h-4" />
              <CodeBlock language="tsx" filename="example.tsx">
{`<PasswordInput placeholder="Enter your password" />`}
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
                <PasswordInput placeholder="Enter your password" />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">With Label</h3>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <PasswordInput id="password" placeholder="Enter your password" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Disabled</h3>
                <PasswordInput placeholder="Disabled password input" disabled />
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
                      <td className="p-2 font-mono text-sm">placeholder</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Placeholder text</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-mono text-sm">disabled</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether the input is disabled</td>
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
