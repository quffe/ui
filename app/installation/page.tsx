"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InstallationTabs } from "@/components/internal/installation"
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
import { Terminal, CheckCircle, AlertCircle, Code, Package, Zap } from "lucide-react"
import { CodeBlock } from "@/components/ui/code-block"
import Link from "next/link"

const steps = [
  {
    title: "Prerequisites",
    description: "Make sure you have a React project set up",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    title: "Initialize Shadcn/UI",
    description: "Set up shadcn/ui in your project",
    icon: Terminal,
    color: "text-blue-500",
  },
  {
    title: "Install Components",
    description: "Add components using the CLI",
    icon: Package,
    color: "text-purple-500",
  },
  {
    title: "Start Building",
    description: "Import and use components in your app",
    icon: Zap,
    color: "text-orange-500",
  },
]

const frameworks = [
  {
    name: "Next.js",
    command: "npx create-next-app@latest my-app --typescript --tailwind --eslint",
    docs: "https://nextjs.org/docs",
  },
  {
    name: "Vite",
    command: "npm create vite@latest my-app -- --template react-ts",
    docs: "https://vitejs.dev/guide/",
  },
  {
    name: "Create React App",
    command: "npx create-react-app my-app --template typescript",
    docs: "https://create-react-app.dev/",
  },
]

const exampleComponents = [
  {
    name: "data-table",
    title: "DataTable",
    description: "Perfect for displaying tabular data with sorting and pagination",
    useCase: "Admin dashboards, user management, reports",
    dependencies: ["@tanstack/react-table", "lucide-react"],
  },
  {
    name: "input-amount",
    title: "InputAmount",
    description: "Handles monetary input with proper formatting",
    useCase: "E-commerce, finance apps, payment forms",
    dependencies: [],
  },
  {
    name: "otp-input",
    title: "OtpInput",
    description: "One-time password input with keyboard navigation",
    useCase: "Authentication, verification flows",
    dependencies: [],
  },
  {
    name: "modal",
    title: "Modal",
    description: "Flexible modal with multiple size and position options",
    useCase: "Confirmations, forms, detailed views",
    dependencies: ["lucide-react", "class-variance-authority"],
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
              <BreadcrumbLink href="/">Introduction</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Installation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Installation</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Get started with our component library in minutes. Choose your setup method and start
              building.
            </p>
            <div className="flex gap-3">
              <Link href="#quick-start">
                <Button>Quick Start</Button>
              </Link>
              <Link href="/components">
                <Button variant="outline">Browse Components</Button>
              </Link>
            </div>
          </div>

          {/* Installation Steps */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Installation Process</CardTitle>
              <CardDescription>Follow these steps to set up the component library</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => (
                  <div key={step.title} className="text-center">
                    <div className="mb-4 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-muted">
                        <step.icon className={`h-6 w-6 ${step.color}`} />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Start Section */}
          <section id="quick-start" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Quick Start</h2>

            {/* Step 1: Project Setup */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  Step 1: Set up your React project
                </CardTitle>
                <CardDescription>Choose your preferred framework</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  {frameworks.map(framework => (
                    <Card key={framework.name} className="p-4">
                      <h4 className="font-semibold mb-2">{framework.name}</h4>
                      <CodeBlock language="bash" showCopyButton={true} className="mb-2">
                        {framework.command}
                      </CodeBlock>
                      <a href={framework.docs} target="_blank" rel="noopener noreferrer">
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          Documentation →
                        </Button>
                      </a>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Shadcn Init */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Terminal className="h-5 w-5" />
                  </div>
                  Step 2: Initialize Shadcn/UI
                </CardTitle>
                <CardDescription>Set up the shadcn/ui CLI and configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">
                    Navigate to your project directory and run:
                  </p>
                  <CodeBlock language="bash" showCopyButton={true}>
                    pnpm dlx shadcn@latest init
                  </CodeBlock>
                </div>
                <div className="bg-secondary border border-border rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Note</p>
                      <p className="text-sm text-muted-foreground">
                        This will create the necessary configuration files and install required
                        dependencies. Answer the prompts to configure your project.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Install Components */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground">
                    <Package className="h-5 w-5" />
                  </div>
                  Step 3: Install Components
                </CardTitle>
                <CardDescription>Add components using the Shadcn CLI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">Install any component from our registry:</p>
                  <InstallationTabs componentName="data-table" />
                  <p className="text-sm text-muted-foreground">
                    The component will be installed to your{" "}
                    <CodeBlock inline={true}>components/ui</CodeBlock> directory.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Usage */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Code className="h-5 w-5" />
                  </div>
                  Step 4: Import and Use
                </CardTitle>
                <CardDescription>Start using components in your application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Import the component:</p>
                  <CodeBlock language="typescript" showCopyButton={true}>
                    {`import { DataTable } from "@/components/ui/data-table"`}
                  </CodeBlock>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Use it in your JSX:</p>
                  <CodeBlock language="tsx" showCopyButton={true}>
                    {`<DataTable
  columns={columns}
  data={data}
  pageSize={10}
/>`}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Example Components */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Popular Components</h2>
            <p className="text-muted-foreground mb-6">
              Start with these commonly used components to get familiar with the library.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {exampleComponents.map(component => (
                <Card key={component.name} className="h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">{component.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {component.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">USE CASES</p>
                      <p className="text-sm">{component.useCase}</p>
                    </div>

                    {component.dependencies.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">
                          DEPENDENCIES
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

                    <Link href={`/docs/${component.name}`}>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        View Documentation →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Troubleshooting */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Troubleshooting</CardTitle>
              <CardDescription>Common issues and solutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Component not found</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  If you get an error about a component not being found, make sure:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>
                    You've initialized shadcn/ui with{" "}
                    <CodeBlock inline={true}>pnpm dlx shadcn@latest init</CodeBlock>
                  </li>
                  <li>The component was installed successfully</li>
                  <li>You're importing from the correct path</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Missing dependencies</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Some components require additional dependencies. Install them manually if needed:
                </p>
                <CodeBlock language="bash" showCopyButton={true}>
                  pnpm install @tanstack/react-table lucide-react date-fns
                </CodeBlock>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Need help?</h4>
                <p className="text-sm text-muted-foreground">
                  Check the individual component documentation for specific usage examples and API
                  details.
                </p>
                <Link href="/components">
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                    Browse All Components →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
