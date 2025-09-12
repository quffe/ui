"use client"

import { RadioGroup } from "@/components/Form/RadioGroup"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { useState } from "react"
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

export default function RadioGroupDocs() {
  const [selectedValue, setSelectedValue] = useState("")
  const [selectedSize, setSelectedSize] = useState("")

  const paymentOptions = [
    { value: "credit", label: "Credit Card" },
    { value: "debit", label: "Debit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank", label: "Bank Transfer" },
  ]

  const sizeOptions = [
    { value: "xs", label: "Extra Small" },
    { value: "s", label: "Small" },
    { value: "m", label: "Medium" },
    { value: "l", label: "Large" },
    { value: "xl", label: "Extra Large", disabled: true },
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
              <BreadcrumbPage>Radio Group</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="flex items-end gap-3 mb-4">
          <h1 className="text-4xl font-bold">RadioGroup</h1>
          <Badge variant="secondary">Form Component</Badge>
        </div>
        <p className="text-lg text-muted-foreground mb-4">
          A group of radio button options for single selection.
        </p>
        <CopyableCodeBadge text={config.getNamespacePath("radio-group")} />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Installation</CardTitle>
          <CardDescription>Install the Radio Group component via CLI</CardDescription>
        </CardHeader>
        <CardContent>
          <InstallationTabs componentName="radio-group" />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock language="tsx" filename="components/Form/RadioGroup.tsx">
{`import { RadioGroup } from "@/components/Form/RadioGroup"`}
          </CodeBlock>
          <div className="h-4" />
          <CodeBlock language="tsx" filename="example.tsx">
{`const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" }
]

<RadioGroup 
  name="example" 
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
/>`}
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <RadioGroup
              name="payment"
              options={paymentOptions}
              value={selectedValue}
              onChange={setSelectedValue}
            />
            {selectedValue && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {paymentOptions.find(opt => opt.value === selectedValue)?.label}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">With Label</h3>
            <div className="space-y-2">
              <Label>Size</Label>
              <RadioGroup
                name="size"
                options={sizeOptions}
                value={selectedSize}
                onChange={setSelectedSize}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Disabled Group</h3>
            <RadioGroup name="disabled" options={paymentOptions} disabled />
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
                  <td className="p-2 font-mono text-sm">name</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Name attribute for the radio group</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">options</td>
                  <td className="p-2">RadioOption[]</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Array of radio options</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">value</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Currently selected value</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">onChange</td>
                  <td className="p-2">function</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Callback when selection changes</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">disabled</td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">false</td>
                  <td className="p-2">Whether the entire group is disabled</td>
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
