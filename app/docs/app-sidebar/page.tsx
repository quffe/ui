"use client"

import { AppSidebar } from "@/components/Layout/AppSidebar"
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

export default function AppSidebarDocs() {
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
              <BreadcrumbPage>AppSidebar</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">AppSidebar</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A comprehensive application sidebar with navigation, search functionality, and
              component organization.
            </p>
            <Badge variant="secondary">Layout Component</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>
                Install the component using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="app-sidebar" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import { AppSidebar } from "@/components/Layout/AppSidebar"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
                  {`<SidebarProvider>
  <AppSidebar />
  <main>
    <SidebarTrigger />
    {/* Your content */}
  </main>
</SidebarProvider>`}
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
                <li>Component search with real-time filtering</li>
                <li>Navigation with active state indication</li>
                <li>Organized component groups</li>
                <li>Responsive sidebar with collapsible rail</li>
                <li>Icon-based navigation items</li>
                <li>Search functionality with no-results state</li>
                <li>Accessible with proper ARIA labeling</li>
                <li>Integration with Next.js routing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Component Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Header Section</h3>
                  <p className="text-sm text-muted-foreground">
                    Contains the application title and search functionality for filtering
                    components.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Navigation Section</h3>
                  <p className="text-sm text-muted-foreground">
                    Primary navigation links like Home, with active state highlighting.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Components Section</h3>
                  <p className="text-sm text-muted-foreground">
                    Organized list of available components with descriptions and icons.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Adding New Components</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <code className="text-sm whitespace-pre-line">
                      {`const components = [
  {
    title: "New Component",
    url: "/docs/new-component",
    icon: YourIcon,
    description: "Component description"
  },
  // ... existing components
]`}
                    </code>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Modifying Search</h3>
                  <p className="text-sm text-muted-foreground">
                    The search filters both component titles and descriptions. Modify the
                    filteredComponents logic to change search behavior.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
