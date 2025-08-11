"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InstallationTabs } from "@/components/InstallationTabs"
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

const components = [
  {
    name: "data-table",
    title: "DataTable",
    description: "A powerful data table with sorting, filtering, and pagination",
    category: "Data",
    dependencies: ["@tanstack/react-table", "lucide-react"],
  },
  {
    name: "input-amount",
    title: "InputAmount",
    description: "Specialized input for monetary amounts with currency support",
    category: "Input",
    dependencies: [],
  },
  {
    name: "otp-input",
    title: "OtpInput",
    description: "One-time password input with multiple fields",
    category: "Input",
    dependencies: [],
  },
  {
    name: "date-range-picker",
    title: "DateRangePicker",
    description: "Date range picker with presets and dual calendar view",
    category: "Input",
    dependencies: ["react-day-picker", "date-fns"],
  },
  {
    name: "modal",
    title: "Modal",
    description: "Flexible modal component with customizable sizing",
    category: "Modal",
    dependencies: [],
  },
  {
    name: "dropdown",
    title: "Dropdown",
    description: "Searchable dropdown with Command and Popover primitives",
    category: "Navigation",
    dependencies: ["cmdk"],
  },
  {
    name: "input-select",
    title: "InputSelect",
    description: "Type-safe select input with labels and validation",
    category: "Navigation",
    dependencies: [],
  },
  {
    name: "select-dropdown",
    title: "SelectDropdown",
    description: "Custom dropdown with keyboard navigation",
    category: "Navigation",
    dependencies: ["class-variance-authority"],
  },
  {
    name: "app-sidebar",
    title: "AppSidebar",
    description: "Application sidebar with navigation and search",
    category: "Layout",
    dependencies: [],
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
              Browse and install all available UI components. Select your preferred package manager
              in the top-right corner.
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-primary">{category} Components</h2>
                  <Badge variant="outline">{categoryComponents.length} components</Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryComponents.map(component => (
                    <Card key={component.name} className="h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg mb-1">{component.title}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {component.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {component.dependencies.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                              Dependencies:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {component.dependencies.map(dep => (
                                <Badge key={dep} variant="outline" className="text-xs">
                                  {dep}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <InstallationTabs componentName={component.name} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Package Manager Support</CardTitle>
              <CardDescription>
                All components support installation with your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">📦</div>
                  <div className="font-mono text-sm">pnpm</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="font-mono text-sm">npm</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">🧶</div>
                  <div className="font-mono text-sm">yarn</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">🥟</div>
                  <div className="font-mono text-sm">bun</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
