import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { ArrowRight, Package, Zap, Shield, Code } from "lucide-react"

const features = [
  {
    title: "Shadcn/UI Compatible",
    description: "Built with the same principles and patterns as Shadcn/UI components",
    icon: Package,
  },
  {
    title: "TypeScript First",
    description: "Fully type-safe components with excellent TypeScript support",
    icon: Shield,
  },
  {
    title: "Easy Installation",
    description: "Install components individually using the Shadcn CLI",
    icon: Zap,
  },
  {
    title: "Copy & Paste",
    description: "Own your code. Copy, paste, and customize to your needs",
    icon: Code,
  },
]

const quickLinks = [
  {
    title: "Installation Guide",
    description: "Learn how to install and configure components",
    href: "/installation",
    badge: "Start here"
  },
  {
    title: "All Components",
    description: "Browse all available components with examples",
    href: "/components",
    badge: "Catalog"
  },
  {
    title: "Data Components",
    description: "Tables, charts, and data visualization components",
    href: "/docs/data-table",
    badge: "Featured"
  }
]

export default function Introduction() {
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Introduction</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-6xl font-bold tracking-tight mb-6">
              UI Components
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A comprehensive collection of beautifully designed, accessible, and reusable UI components 
              built with React, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/installation">
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/components">
                <Button variant="outline" size="lg">
                  Browse Components
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Components?</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Quick Start</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {quickLinks.map((link) => (
                <Link key={link.title} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{link.title}</CardTitle>
                        <Badge variant={link.badge === "Start here" ? "default" : "secondary"}>
                          {link.badge}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {link.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-primary font-medium">
                        Learn more <ArrowRight className="inline h-3 w-3 ml-1" />
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Installation Preview */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl">Quick Installation</CardTitle>
              <CardDescription>
                Get started in seconds with the Shadcn CLI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">1. Initialize Shadcn/UI in your project</p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  pnpm dlx shadcn@latest init
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">2. Install any component</p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  pnpm dlx shadcn@latest add {process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/api/registry/data-table
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">3. Import and use</p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  import {"{ DataTable }"} from "@/components/ui/data-table"
                </div>
              </div>
              <Link href="/installation" className="w-full">
                <Button className="w-full">
                  View Full Installation Guide
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Built With Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Built with modern tools</h3>
            <div className="flex justify-center gap-6 text-muted-foreground">
              <Badge variant="outline">React 19</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
              <Badge variant="outline">Radix UI</Badge>
              <Badge variant="outline">Next.js 15</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
