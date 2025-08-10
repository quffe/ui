import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const components = [
  {
    name: "Input",
    description: "A basic input field for text, email, and other input types",
    href: "/docs/input"
  },
  {
    name: "Password Input",
    description: "An input field with show/hide password functionality",
    href: "/docs/password-input"
  },
  {
    name: "Textarea",
    description: "A multi-line text input field",
    href: "/docs/textarea"
  },
  {
    name: "Select",
    description: "A dropdown select component",
    href: "/docs/select"
  },
  {
    name: "Checkbox",
    description: "A checkbox input with optional label",
    href: "/docs/checkbox"
  },
  {
    name: "Radio Group",
    description: "A group of radio button options",
    href: "/docs/radio-group"
  },
  {
    name: "File Input",
    description: "A file upload component with drag and drop support",
    href: "/docs/file-input"
  }
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Form Components Documentation</h1>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">Welcome to Form Components</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive collection of form input components with examples and usage instructions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {components.map((component) => (
              <Link key={component.name} href={component.href}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{component.name}</CardTitle>
                    <CardDescription>{component.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-primary">View Documentation →</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
