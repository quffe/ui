'use client'

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
import { config } from "@/lib/config"

const components = [
  {
    name: "data-table",
    title: "DataTable",
    description: "A powerful data table with sorting, filtering, and pagination",
    category: "Data",
  },
  {
    name: "input-amount",
    title: "InputAmount", 
    description: "Specialized input for monetary amounts with currency support",
    category: "Input",
  },
  {
    name: "otp-input",
    title: "OtpInput",
    description: "One-time password input with multiple fields",
    category: "Input",
  },
  {
    name: "date-range-picker",
    title: "DateRangePicker",
    description: "Date range picker with presets and dual calendar view",
    category: "Input",
  },
  {
    name: "modal",
    title: "Modal",
    description: "Flexible modal component with customizable sizing",
    category: "Modal",
  },
  {
    name: "dropdown",
    title: "Dropdown",
    description: "Searchable dropdown with Command and Popover primitives",
    category: "Navigation",
  },
]

export default function InstallationPage() {
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
              <BreadcrumbPage>Installation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Installation</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Install components directly using the Shadcn CLI with dynamic URLs based on your environment.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Environment Configuration</CardTitle>
              <CardDescription>Current registry URL based on environment variables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Registry URL</Badge>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {config.registry.baseUrl}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Environment</Badge>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {config.isDev ? 'development' : 'production'}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Prerequisites and setup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Initialize Shadcn UI in your project</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm">pnpm dlx shadcn@latest init</code>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2. Install any component</h3>
                  <InstallationTabs componentName="data-table" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Available Components</h2>
            
            {components.reduce((acc, component) => {
              const category = component.category
              if (!acc[category]) {
                acc[category] = []
              }
              acc[category].push(component)
              return acc
            }, {} as Record<string, typeof components>)}
            
            {Object.entries(
              components.reduce((acc, component) => {
                const category = component.category
                if (!acc[category]) {
                  acc[category] = []
                }
                acc[category].push(component)
                return acc
              }, {} as Record<string, typeof components>)
            ).map(([category, categoryComponents]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-4 text-primary">{category} Components</h3>
                <div className="grid gap-4">
                  {categoryComponents.map((component) => (
                    <Card key={component.name}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{component.title}</CardTitle>
                          <Badge variant="secondary">{category}</Badge>
                        </div>
                        <CardDescription>{component.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <InstallationTabs componentName={component.name} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Configure your registry URLs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Development (.env.local)</h4>
                  <div className="bg-muted p-3 rounded-md">
                    <pre className="text-sm">
{`NEXT_PUBLIC_REGISTRY_URL=http://localhost:3001/api/registry
NEXT_PUBLIC_SITE_URL=http://localhost:3001`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Production (.env.production)</h4>
                  <div className="bg-muted p-3 rounded-md">
                    <pre className="text-sm">
{`NEXT_PUBLIC_REGISTRY_URL=https://your-domain.com/api/registry
NEXT_PUBLIC_SITE_URL=https://your-domain.com`}
                    </pre>
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