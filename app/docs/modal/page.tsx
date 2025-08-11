'use client'

import { Modal } from "@/components/Modal/Modal"
import { Button } from "@/components/ui/button"
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
import { InstallationTabs } from "@/components/InstallationTabs"
import { useState } from "react"

export default function ModalDocs() {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [largeOpen, setLargeOpen] = useState(false)

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
              A flexible modal component with customizable positioning, sizing, and behavior. Supports multiple sizes, animations, and accessibility features.
            </p>
            <Badge variant="secondary">Modal Component</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Install the component using your preferred package manager</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="modal" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import { Modal } from "@/components/Modal/Modal"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content goes here</p>
</Modal>`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Basic Modal</h3>
                <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
                <Modal
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  title="Basic Modal"
                  description="This is a basic modal example."
                >
                  <div className="space-y-4">
                    <p>This is the modal content. You can put any content here.</p>
                    <div className="flex gap-2">
                      <Button onClick={() => setIsOpen(false)}>Close</Button>
                      <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    </div>
                  </div>
                </Modal>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Confirmation Modal</h3>
                <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Delete Item</Button>
                <Modal
                  open={confirmOpen}
                  onClose={() => setConfirmOpen(false)}
                  title="Confirm Deletion"
                  description="Are you sure you want to delete this item? This action cannot be undone."
                  size="sm"
                >
                  <div className="flex gap-2 mt-4">
                    <Button variant="destructive" onClick={() => {
                      alert("Item deleted!")
                      setConfirmOpen(false)
                    }}>
                      Delete
                    </Button>
                    <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </Modal>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Large Modal</h3>
                <Button onClick={() => setLargeOpen(true)}>Open Large Modal</Button>
                <Modal
                  open={largeOpen}
                  onClose={() => setLargeOpen(false)}
                  title="Large Modal"
                  size="2xl"
                >
                  <div className="space-y-4">
                    <p>This is a large modal with more space for content.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded">Column 1</div>
                      <div className="p-4 bg-muted rounded">Column 2</div>
                    </div>
                    <Button onClick={() => setLargeOpen(false)}>Close</Button>
                  </div>
                </Modal>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Props</CardTitle>
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
                      <td className="p-2">'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full'</td>
                      <td className="p-2">'md'</td>
                      <td className="p-2">Modal size variant</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">position</td>
                      <td className="p-2">'center' | 'top' | 'bottom'</td>
                      <td className="p-2">'center'</td>
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
              <CardTitle>Features</CardTitle>
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