"use client"

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
import { PreviewTabs } from "@/components/ui/preview-tabs"
import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"

// Example components
import { BasicUsageExample } from "@/examples/docs/use-mobile/basic-usage"
import { CustomBreakpointExample } from "@/examples/docs/use-mobile/custom-breakpoint"

// Raw imports
import basicUsageCode from "@/examples/docs/use-mobile/basic-usage.tsx?raw"
import customBreakpointCode from "@/examples/docs/use-mobile/custom-breakpoint.tsx?raw"

export default function UseMobileDocs() {
  const isMobile = useMobile()
  const isTablet = useMobile({ breakpoint: 1024 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
              <BreadcrumbPage>useMobile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useMobile</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A hook that detects whether the current viewport is mobile-sized with SSR-safe
              responsive breakpoint detection.
            </p>
            <Badge variant="secondary">React Hook</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the hook using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="use-mobile" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <PreviewTabs
                title="Basic Implementation"
                preview={<BasicUsageExample />}
                code={`import { useMobile } from "@/hooks/use-mobile"

function MyComponent() {
  const isMobile = useMobile()
  const isTablet = useMobile({ breakpoint: 1024 })

  return (
    <div>
      {isMobile ? 'Mobile Layout' : 'Desktop Layout'}
    </div>
  )
}`}
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <PreviewTabs
                title="Live Device Detection"
                preview={<BasicUsageExample />}
                code={basicUsageCode}
              />

              <PreviewTabs
                title="Custom Breakpoints"
                preview={<CustomBreakpointExample />}
                code={customBreakpointCode}
              />

              <PreviewTabs
                title="SSR Configuration"
                preview={
                  <div className="text-center p-4 text-muted-foreground">
                    See code for SSR configuration options
                  </div>
                }
                code={`import { useMobile } from "@/hooks/use-mobile"

// Disable SSR-safe mode for immediate detection
const isMobile = useMobile({ 
  ssrSafe: false,
  defaultValue: false 
})

// Custom default value during SSR
const isMobileMobile = useMobile({ 
  defaultValue: true  // Assume mobile during SSR
})

export function Example() {
  return (
    <div>
      Device detection: {isMobile ? "Mobile" : "Desktop"}
    </div>
  )
}`}
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Parameter</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Default</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">options</td>
                          <td className="p-2">UseMobileOptions</td>
                          <td className="p-2">{`{}`}</td>
                          <td className="p-2">Configuration options</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">options.breakpoint</td>
                          <td className="p-2">number</td>
                          <td className="p-2">768</td>
                          <td className="p-2">Custom breakpoint in pixels</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">options.defaultValue</td>
                          <td className="p-2">boolean</td>
                          <td className="p-2">false</td>
                          <td className="p-2">Initial value before hydration</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">options.ssrSafe</td>
                          <td className="p-2">boolean</td>
                          <td className="p-2">true</td>
                          <td className="p-2">Whether to use SSR-safe mode</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Returns</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">boolean</td>
                          <td className="p-2">
                            True if viewport is below breakpoint (mobile), false otherwise
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>SSR-safe with proper hydration handling</li>
                <li>Uses modern matchMedia API for performance</li>
                <li>Customizable breakpoint values</li>
                <li>Automatic cleanup on unmount</li>
                <li>Fallback support for older browsers</li>
                <li>TypeScript support with full type safety</li>
                <li>No layout shift during hydration</li>
                <li>Memory efficient with proper event cleanup</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Breakpoints</CardTitle>
              <CardDescription>Standard breakpoints for different device types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Mobile First</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <code>320px</code> - Small mobile
                    </div>
                    <div>
                      <code>480px</code> - Large mobile
                    </div>
                    <div>
                      <code>768px</code> - Tablet (default)
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Desktop</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <code>1024px</code> - Small desktop
                    </div>
                    <div>
                      <code>1200px</code> - Medium desktop
                    </div>
                    <div>
                      <code>1440px</code> - Large desktop
                    </div>
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
