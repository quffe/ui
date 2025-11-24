"use server"

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
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

// Example components
import { Example as DataTableBasicExample } from "@/examples/components/data-table/basic"
import { AdvancedExample as DataTableAdvancedExample } from "@/examples/components/data-table/advanced"
import { Example as ModalBasicExample } from "@/examples/components/modal/basic"
import { AdvancedExample as ModalAdvancedExample } from "@/examples/components/modal/advanced"
import { Example as InputAmountExample } from "@/examples/components/input-amount/basic"
import { Example as OtpInputExample } from "@/examples/components/otp-input/basic"
import { Example as DateRangePickerExample } from "@/examples/components/date-range-picker/basic"
import { Example as DropdownExample } from "@/examples/components/dropdown/basic"
import { Example as InputSelectExample } from "@/examples/components/input-select/basic"
import { Example as CandleChartExample } from "@/examples/components/candle-chart/basic"
import { getExampleCode } from "@/lib/serverUtils"

// Raw imports
const dataTableBasicCode = getExampleCode("components/data-table/basic.tsx")
const dataTableAdvancedCode = getExampleCode("components/data-table/advanced.tsx")
const modalBasicCode = getExampleCode("components/modal/basic.tsx")
const modalAdvancedCode = getExampleCode("components/modal/advanced.tsx")
const inputAmountCode = getExampleCode("components/input-amount/basic.tsx")
const otpInputCode = getExampleCode("components/otp-input/basic.tsx")
const dateRangePickerCode = getExampleCode("components/date-range-picker/basic.tsx")
const dropdownCode = getExampleCode("components/dropdown/basic.tsx")
const inputSelectCode = getExampleCode("components/input-select/basic.tsx")
const candleChartCode = getExampleCode("components/candle-chart/basic.tsx")

const components = [
  {
    name: "candle-chart",
    title: "CandleChart",
    description: "Opinionated candlestick chart for OHLC trading data.",
    category: "Data",
    preview: <CandleChartExample />,
    code: candleChartCode,
    docUrl: "/docs/candle-chart",
  },
  {
    name: "data-table",
    title: "DataTable",
    description: "A powerful data table with sorting, filtering, and pagination",
    category: "Data",
    preview: <DataTableBasicExample />,
    code: dataTableBasicCode,
    advancedCode: dataTableAdvancedCode,
    advancedPreview: <DataTableAdvancedExample />,
    docUrl: "/docs/data-table",
  },
  {
    name: "input-amount",
    title: "InputAmount",
    description: "Specialized input for monetary amounts with currency support",
    category: "Input",
    preview: <InputAmountExample />,
    code: inputAmountCode,
    docUrl: "/docs/input-amount",
  },
  {
    name: "otp-input",
    title: "OtpInput",
    description: "One-time password input with multiple fields",
    category: "Input",
    preview: <OtpInputExample />,
    code: otpInputCode,
    docUrl: "/docs/otp-input",
  },
  {
    name: "date-range-picker",
    title: "DateRangePicker",
    description: "Date range picker with presets and dual calendar view",
    category: "Input",
    preview: <DateRangePickerExample />,
    code: dateRangePickerCode,
    docUrl: "/docs/date-range-picker",
  },
  {
    name: "modal",
    title: "Modal",
    description: "Flexible modal component with customizable sizing and positioning",
    category: "Modal",
    preview: <ModalBasicExample />,
    code: modalBasicCode,
    advancedCode: modalAdvancedCode,
    advancedPreview: <ModalAdvancedExample />,
    docUrl: "/docs/modal",
  },
  {
    name: "dropdown",
    title: "Dropdown",
    description: "Searchable dropdown component with keyboard navigation",
    category: "Input",
    preview: <DropdownExample />,
    code: dropdownCode,
    docUrl: "/docs/dropdown",
  },
  {
    name: "input-select",
    title: "InputSelect",
    description: "Form-ready select component with label, error handling, and size variants",
    category: "Input",
    preview: <InputSelectExample />,
    code: inputSelectCode,
    docUrl: "/docs/input-select",
  },
]

export default async function ComponentsPage() {
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
                        <div className="space-y-8">
                          <PreviewTabs
                            title="Basic Example"
                            preview={component.preview}
                            code={component.code}
                          />
                          {component.advancedCode && (
                            <PreviewTabs
                              title={
                                component.name === "modal"
                                  ? "Multiple Modal Types with Different Configurations"
                                  : component.name === "data-table"
                                    ? "State Management with Dynamic Pagination"
                                    : "Advanced Usage"
                              }
                              preview={
                                component.advancedPreview || (
                                  <div className="text-center p-4 text-muted-foreground">
                                    Advanced functionality - see code example
                                  </div>
                                )
                              }
                              code={component.advancedCode}
                            />
                          )}
                        </div>
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
