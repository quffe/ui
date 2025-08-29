"use server"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { getExampleCode } from "@/lib/serverUtils"

// Example components
import { BasicModalExample } from "@/examples/docs/modal/basic-modal"
import { ConfirmationModalExample } from "@/examples/docs/modal/confirmation-modal"
import { LargeModalExample } from "@/examples/docs/modal/large-modal"

// Raw imports
const basicModalCode = getExampleCode("docs/modal/basic-modal.tsx")
const confirmationModalCode = getExampleCode("docs/modal/confirmation-modal.tsx")
const largeModalCode = getExampleCode("docs/modal/large-modal.tsx")

export default async function ModalDocs() {

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
              <BreadcrumbPage>Modal</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Modal</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A flexible modal component with customizable positioning, sizing, and behavior.
              Supports multiple sizes, animations, and accessibility features.
            </p>
            <Badge variant="secondary">Modal Component</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the component using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="modal" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <PreviewTabs
                preview={<BasicModalExample />}
                code={basicModalCode}
                title="Basic Modal"
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <PreviewTabs
                preview={<ConfirmationModalExample />}
                code={confirmationModalCode}
                title="Confirmation Modal"
              />
              
              <PreviewTabs
                preview={<LargeModalExample />}
                code={largeModalCode}
                title="Large Modal"
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Props</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Prop</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Default</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-mono">open</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Whether the modal is open</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onClose</td>
                      <td className="p-2">() =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Function called when modal should close</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">title</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Optional title for the modal</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">description</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Optional description text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">size</td>
                      <td className="p-2">
                        &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos; | &apos;2xl&apos; | &apos;3xl&apos; | &apos;4xl&apos; | &apos;full&apos;
                      </td>
                      <td className="p-2">&apos;md&apos;</td>
                      <td className="p-2">Modal size variant</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">position</td>
                      <td className="p-2">&apos;center&apos; | &apos;top&apos; | &apos;bottom&apos;</td>
                      <td className="p-2">&apos;center&apos;</td>
                      <td className="p-2">Modal positioning</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">showCloseButton</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">true</td>
                      <td className="p-2">Whether to show close (X) button</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">closeOnOutsideClick</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">true</td>
                      <td className="p-2">Whether clicking outside closes modal</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">closeOnEsc</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">true</td>
                      <td className="p-2">Whether ESC key closes modal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Multiple size variants (sm, md, lg, xl, 2xl, 3xl, 4xl, full)</li>
                <li>Flexible positioning (center, top, bottom)</li>
                <li>Keyboard navigation (ESC to close)</li>
                <li>Click outside to close functionality</li>
                <li>Smooth animations and transitions</li>
                <li>Portal rendering for proper layering</li>
                <li>Accessibility features with proper ARIA attributes</li>
                <li>Body scroll lock when modal is open</li>
                <li>Focus management</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
