'use client'

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
import Link from "next/link"
import {
  Copy,
  Timer,
  Database,
  Play,
  Monitor,
  Package,
  RefreshCw,
  Zap,
  Smartphone,
  ArrowRight,
} from "lucide-react"

const hooks = [
  // Device & Layout Hooks
  {
    title: "useMobile",
    url: "/docs/hooks/use-mobile",
    icon: Smartphone,
    description: "Responsive viewport detection with SSR support",
    category: "Device & Layout",
    features: ["SSR-safe", "Customizable breakpoints", "matchMedia API"],
  },
  {
    title: "useOnWindowResize",
    url: "/docs/hooks/useOnWindowResize",
    icon: Monitor,
    description: "Window resize event handling",
    category: "Device & Layout",
    features: ["Auto cleanup", "Immediate execution", "Event listeners"],
  },
  // State Management Hooks
  {
    title: "useLocalStorage",
    url: "/docs/hooks/useLocalStorage",
    icon: Database,
    description: "Persistent localStorage state management",
    category: "State Management",
    features: ["JSON serialization", "TypeScript generics", "Error handling"],
  },
  {
    title: "usePackageManager",
    url: "/docs/hooks/usePackageManager",
    icon: Package,
    description: "Package manager preference storage",
    category: "State Management",
    features: ["Type safety", "Validation", "Default fallbacks"],
  },
  {
    title: "useStateChangeEffect",
    url: "/docs/hooks/useStateChangeEffect",
    icon: Zap,
    description: "Effect triggered by state changes",
    category: "State Management",
    features: ["Deep comparison", "Multiple states", "JSON-based"],
  },
  // Utility Hooks
  {
    title: "useCopyToClipboard",
    url: "/docs/hooks/use-copy-to-clipboard",
    icon: Copy,
    description: "Advanced clipboard operations",
    category: "Utilities",
    features: ["Modern API", "Fallback support", "Loading states"],
  },
  {
    title: "useCountdown",
    url: "/docs/hooks/useCountdown",
    icon: Timer,
    description: "Countdown timers with loop support",
    category: "Utilities",
    features: ["Loop support", "Pause/resume", "Progress tracking"],
  },
  {
    title: "useOnMountEffect",
    url: "/docs/hooks/useOnMountEffect",
    icon: Play,
    description: "Mount-only effect execution",
    category: "Utilities",
    features: ["One-time execution", "Cleanup handling", "Dependency capture"],
  },
  {
    title: "useRevalidate",
    url: "/docs/hooks/useRevalidate",
    icon: RefreshCw,
    description: "SWR cache revalidation helper",
    category: "Utilities",
    features: ["SWR integration", "Bulk operations", "URL matching"],
  },
]

const groupedHooks = hooks.reduce(
  (acc, hook) => {
    const category = hook.category || "Other"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(hook)
    return acc
  },
  {} as Record<string, typeof hooks>
)

export default function HooksOverview() {
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
              <BreadcrumbPage>React Hooks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">React Hooks</h1>
            <p className="text-lg text-muted-foreground mb-6">
              A comprehensive collection of custom React hooks built with TypeScript for enhanced functionality and developer experience.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">{hooks.length} Hooks</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">SSR-Safe</Badge>
            </div>
          </div>

          <div className="mb-8">
            <Card className="w-1/2">
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>
                  Get started with our custom hooks in your React application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-1">
                  <div>
                    <h4 className="font-semibold mb-2">Import & Use</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <code className="text-sm">
                        {`import { useMobile } from "@/hooks/use-mobile"`}
                      </code>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Features</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Full TypeScript support</li>
                      <li>• SSR-safe implementations</li>
                      <li>• Comprehensive error handling</li>
                      <li>• Automatic cleanup</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {Object.entries(groupedHooks).map(([category, categoryHooks]) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{category} Hooks</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categoryHooks.map(hook => (
                  <Card key={hook.title} className="group hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                          <hook.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{hook.title}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">
                            {hook.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="mb-4">
                        {hook.description}
                      </CardDescription>

                      <div className="mb-4">
                        <h5 className="text-sm font-medium mb-2">Key Features:</h5>
                        <ul className="text-sm space-y-1">
                          {hook.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-muted-foreground">
                              <span className="w-1 h-1 bg-current rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link href={hook.url}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          View Documentation
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 text-center">
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Check out our comprehensive documentation and examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-4">
                  <Link href="/installation">
                    <Button variant="outline">
                      Installation Guide
                    </Button>
                  </Link>
                  <Link href="/components">
                    <Button variant="outline">
                      View Components
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
