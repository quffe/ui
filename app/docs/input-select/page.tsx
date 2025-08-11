'use client'

import { InputSelect } from "@/components/Navigation/Select"
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

export default function InputSelectDocs() {
  const [basicValue, setBasicValue] = useState<string | null>(null)
  const [numberValue, setNumberValue] = useState<number | null>(null)
  const [errorValue, setErrorValue] = useState<string | null>(null)
  
  const stringOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Disabled Option", value: "disabled", disabled: true },
  ]

  const numberOptions = [
    { label: "Small", value: 1 },
    { label: "Medium", value: 2 },
    { label: "Large", value: 3 },
    { label: "Extra Large", value: 4 },
  ]

  const priorityOptions = [
    { label: "Low Priority", value: "low" },
    { label: "Medium Priority", value: "medium" },
    { label: "High Priority", value: "high" },
    { label: "Critical", value: "critical" },
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
              <BreadcrumbPage>InputSelect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">InputSelect</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A flexible, type-safe select input component with support for various data types, sizes, labels, and error states.
            </p>
            <Badge variant="secondary">Navigation Component</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Install the component using your preferred package manager</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="input-select" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import { InputSelect } from "@/components/Navigation/Select"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`<InputSelect
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  label="Choose option"
  placeholder="Select an option"
/>`}
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
                <h3 className="text-sm font-medium mb-2">Basic String Select</h3>
                <InputSelect
                  options={stringOptions}
                  value={basicValue}
                  onChange={setBasicValue}
                  label="Choose Option"
                  placeholder="Select an option"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {basicValue || 'None'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Number Select with Sizes</h3>
                <div className="space-y-4">
                  <div>
                    <InputSelect
                      options={numberOptions}
                      value={numberValue}
                      onChange={setNumberValue}
                      label="Small Size"
                      placeholder="Select size"
                      size="sm"
                    />
                  </div>
                  <div>
                    <InputSelect
                      options={numberOptions}
                      value={numberValue}
                      onChange={setNumberValue}
                      label="Default Size"
                      placeholder="Select size"
                      size="default"
                    />
                  </div>
                  <div>
                    <InputSelect
                      options={numberOptions}
                      value={numberValue}
                      onChange={setNumberValue}
                      label="Large Size"
                      placeholder="Select size"
                      size="lg"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {numberValue || 'None'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Required with Error State</h3>
                <InputSelect
                  options={priorityOptions}
                  value={errorValue}
                  onChange={setErrorValue}
                  label="Priority Level"
                  placeholder="Select priority"
                  required
                  error={!errorValue ? "Priority is required" : undefined}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {errorValue || 'None'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Disabled State</h3>
                <InputSelect
                  options={stringOptions}
                  value="option2"
                  onChange={() => {}}
                  label="Disabled Select"
                  placeholder="Cannot select"
                  disabled
                />
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
                      <td className="p-2 font-mono">options</td>
                      <td className="p-2">SelectOption&lt;T&gt;[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Array of select options</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">value</td>
                      <td className="p-2">T | null</td>
                      <td className="p-2">null</td>
                      <td className="p-2">Currently selected value</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onChange</td>
                      <td className="p-2">(value: T | null) => void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when selection changes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">placeholder</td>
                      <td className="p-2">string</td>
                      <td className="p-2">"Select an option"</td>
                      <td className="p-2">Placeholder text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">label</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Label for the select</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">error</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Error message to display</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">size</td>
                      <td className="p-2">'default' | 'sm' | 'lg'</td>
                      <td className="p-2">'default'</td>
                      <td className="p-2">Size variant</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">disabled</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether select is disabled</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">required</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether field is required</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">name</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Form field name</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">id</td>
                      <td className="p-2">string</td>
                      <td className="p-2">auto-generated</td>
                      <td className="p-2">Element ID</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>SelectOption Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`interface SelectOption<T> {
  label: string
  value: T
  disabled?: boolean
}`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Type-safe with generic type support</li>
                <li>Multiple size variants (sm, default, lg)</li>
                <li>Label and error message support</li>
                <li>Required field indication</li>
                <li>Disabled options support</li>
                <li>Accessible with proper ARIA attributes</li>
                <li>Auto-generated IDs with override option</li>
                <li>Form integration with name attribute</li>
                <li>Customizable styling with className props</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}