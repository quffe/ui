"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { PreviewTabs } from "@/components/ui/preview-tabs"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

// Component examples
import { DataTable } from "@/components/Data/DataTable"
import { InputAmount } from "@/components/Input/InputAmount"
import { OtpInput } from "@/components/Input/OtpInput"
import { DateRangePicker } from "@/components/Input/DateRangePicker"
import { Modal } from "@/components/Modal/Modal"
import { Dropdown } from "@/components/Navigation/Dropdown"
import { InputSelect } from "@/components/Navigation/Select"
import { SelectDropdown } from "@/components/Navigation/SelectDropdown"

const components = [
  {
    name: "data-table",
    title: "DataTable",
    description: "A powerful data table with sorting, filtering, and pagination",
    category: "Data",
    preview: (
      <DataTable
        data={[
          { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
        ]}
        columns={[
          { accessorKey: "name", header: "Name" },
          { accessorKey: "email", header: "Email" },
          { accessorKey: "role", header: "Role" },
        ]}
      />
    ),
    code: `import { DataTable } from "@/components/DataTable"

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
]

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
]

export function Example() {
  return <DataTable data={data} columns={columns} />
}`,
    docUrl: "/docs/data-table",
  },
  {
    name: "input-amount",
    title: "InputAmount",
    description: "Specialized input for monetary amounts with currency support",
    category: "Input",
    preview: <InputAmount value={null} onChange={() => { }} placeholder="Enter amount" currency="USD" />,
    code: `import { InputAmount } from "@/components/form/InputAmount"

export function Example() {
  const [value, setValue] = useState(null)
  
  return (
    <InputAmount 
      value={value}
      onChange={setValue}
      placeholder="Enter amount" 
      currency="USD" 
    />
  )
}`,
    docUrl: "/docs/input-amount",
  },
  {
    name: "otp-input",
    title: "OtpInput",
    description: "One-time password input with multiple fields",
    category: "Input",
    preview: <OtpInput value="" onChange={() => { }} length={6} onComplete={value => console.log(value)} />,
    code: `import { OtpInput } from "@/components/form/OtpInput"

export function Example() {
  const [value, setValue] = useState("")
  
  return (
    <OtpInput 
      value={value}
      onChange={setValue}
      length={6} 
      onComplete={(value) => console.log(value)} 
    />
  )
}`,
    docUrl: "/docs/otp-input",
  },
  {
    name: "date-range-picker",
    title: "DateRangePicker",
    description: "Date range picker with presets and dual calendar view",
    category: "Input",
    preview: <DateRangePicker onChange={range => console.log(range)} />,
    code: `import { DateRangePicker } from "@/components/DateRangePicker"

  export function Example() {
    return (
      <DateRangePicker 
        onChange={(range) => console.log(range)} 
      />
    )
  }`,
    docUrl: "/docs/date-range-picker",
  },
  {
    name: "modal",
    title: "Modal",
    description: "Flexible modal component with customizable sizing",
    category: "Modal",
    preview: <div>Modal component preview</div>,
    code: `import { Modal } from "@/components/Modal"
  import { Button } from "@/components/ui/button"
  import { useState } from "react"

  export function Example() {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Open Modal
        </Button>
        <Modal 
          open={isOpen} 
          onClose={() => setIsOpen(false)}
          title="Example Modal"
        >
          <p>This is modal content.</p>
        </Modal>
      </>
    )
  }`,
    docUrl: "/docs/modal",
  },
]

export default function ComponentsPage() {
  const groupedComponents = components.reduce(
    (acc, component) => {
      const category = component.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(component)
      return acc
    },
    {} as Record<string, typeof components>
  )

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
              <BreadcrumbPage>All Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">All Components</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Browse and preview all available UI components. Each component includes live examples
              and source code.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">{components.length} Components</Badge>
              <Badge variant="outline">Live Preview</Badge>
              <Badge variant="outline">TypeScript</Badge>
            </div>
          </div>

          <div className="space-y-12">
            {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-3xl font-bold text-primary">{category} Components</h2>
                  <Badge variant="outline">{categoryComponents.length} components</Badge>
                </div>

                <div className="space-y-8">
                  {categoryComponents.map(component => (
                    <Card key={component.name} className="overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex gap-2 items-end text-2xl mb-2">
                              {component.title}
                              <Badge variant="secondary" className="text-sm">
                                {category}
                              </Badge>

                            </CardTitle>
                            <CardDescription className="text-base leading-relaxed">
                              {component.description}
                            </CardDescription>
                          </div>
                          <Link href={component.docUrl}>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Docs
                            </Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <PreviewTabs
                          preview={component.preview}
                          code={component.code}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-16">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Ready to use these components in your project?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">📋</div>
                  <div className="font-semibold mb-2">Copy & Paste</div>
                  <div className="text-sm text-muted-foreground">
                    Copy the code from any example and paste it into your project
                  </div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">📚</div>
                  <div className="font-semibold mb-2">View Documentation</div>
                  <div className="text-sm text-muted-foreground">
                    Click &quot;View Docs&quot; for detailed API reference and more examples
                  </div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">🎨</div>
                  <div className="font-semibold mb-2">Customize</div>
                  <div className="text-sm text-muted-foreground">
                    All components are built with Tailwind CSS and fully customizable
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
