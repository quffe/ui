"use client"

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
import { PreviewTabs } from "@/components/ui/preview-tabs"
import { useState } from "react"

// Hook examples
import { useMobile } from "@/hooks/use-mobile"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { useCountdown } from "@/hooks/useCountdown"
import { useOnMountEffect } from "@/hooks/useOnMountEffect"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

// Hook demo components
function UseMobileDemo() {
  const isMobile = useMobile()

  return (
    <div className="text-center p-4">
      <div className="text-lg font-semibold mb-2">
        Device: {isMobile ? "📱 Mobile" : "💻 Desktop"}
      </div>
      <div className="text-sm text-muted-foreground">Resize your window to see the change</div>
    </div>
  )
}

function UseLocalStorageDemo() {
  const [name, setName] = useLocalStorage("demo-name", "")

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name..."
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="text-sm text-muted-foreground">
        Value persists in localStorage: <strong>{name || "Empty"}</strong>
      </div>
    </div>
  )
}

function UseCopyToClipboardDemo() {
  const { copy, copied, error } = useCopyToClipboard()

  const handleCopy = () => {
    copy("Hello from React Hook!")
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleCopy}>{copied ? "✅ Copied!" : "📋 Copy Text"}</Button>
      {error && <div className="text-sm text-red-500">Error: {error.message}</div>}
      <div className="text-sm text-muted-foreground">
        Click to copy &quot;Hello from React Hook!&quot; to clipboard
      </div>
    </div>
  )
}

function UseCountdownDemo() {
  const { seconds, start, stop, reset, isActive } = useCountdown(10, () => console.log("Countdown completed!"))

  const formatTime = (seconds: number) => {
    return `${seconds}s`
  }

  return (
    <div className="text-center space-y-4">
      <div className="text-2xl font-bold">{formatTime(seconds)}</div>
      <div className="flex gap-2 justify-center">
        <Button onClick={start} disabled={isActive} size="sm">
          Start
        </Button>
        <Button onClick={stop} disabled={!isActive} size="sm" variant="outline">
          Stop
        </Button>
        <Button onClick={reset} size="sm" variant="outline">
          Reset
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        Status: {isActive ? "Running" : "Stopped"}
      </div>
    </div>
  )
}

function UseOnMountEffectDemo() {
  const [mountTime, setMountTime] = useState<string>("")

  useOnMountEffect(() => {
    setMountTime(new Date().toLocaleTimeString())
    console.log("Component mounted!")
  })

  return (
    <div className="text-center p-4">
      <div className="text-lg font-semibold mb-2">Mount Time: {mountTime}</div>
      <div className="text-sm text-muted-foreground">
        This effect ran only once when component mounted
      </div>
    </div>
  )
}

function UseKeyboardShortcutDemo() {
  const [count, setCount] = useState(0)

  useKeyboardShortcut(
    {
      id: "demo-increment",
      keys: "shift+space",
      description: "Increment counter",
      category: "Demo",
    },
    () => setCount(prev => prev + 1)
  )

  return (
    <div className="text-center space-y-4">
      <div className="text-2xl font-bold">Count: {count}</div>
      <div className="text-sm text-muted-foreground">
        Press <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Shift</kbd> +{" "}
        <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Space</kbd> to increment
      </div>
      <Button onClick={() => setCount(prev => prev + 1)} size="sm">
        Or click here
      </Button>
    </div>
  )
}

const hooks = [
  // Device & Layout Hooks
  {
    title: "useMobile",
    url: "/docs/hooks/use-mobile",
    description: "Responsive viewport detection with SSR support",
    category: "Device & Layout",
    preview: <UseMobileDemo />,
    code: `import { useMobile } from "@/hooks/use-mobile"

export function Example() {
  const isMobile = useMobile()
  
  return (
    <div>
      Device: {isMobile ? "📱 Mobile" : "💻 Desktop"}
    </div>
  )
}`,
  },
  {
    title: "useOnWindowResize",
    url: "/docs/hooks/useOnWindowResize",
    description: "Window resize event handling",
    category: "Device & Layout",
    preview: (
      <div className="text-center p-4">
        <div className="text-lg font-semibold mb-2">Window Resize Handler</div>
        <div className="text-sm text-muted-foreground">Resize your window to trigger the event</div>
      </div>
    ),
    code: `import { useOnWindowResize } from "@/hooks/useOnWindowResize"

export function Example() {
  useOnWindowResize(() => {
    console.log("Window resized!")
  })

  return <div>Resize the window to see logs</div>
}`,
  },
  // Life Cycles Hooks
  {
    title: "useOnMountEffect",
    url: "/docs/hooks/useOnMountEffect",
    description: "Mount-only effect execution",
    category: "Life Cycles",
    preview: <UseOnMountEffectDemo />,
    code: `import { useOnMountEffect } from "@/hooks/useOnMountEffect"
import { useState } from "react"

export function Example() {
  const [mountTime, setMountTime] = useState("")
  
  useOnMountEffect(() => {
    setMountTime(new Date().toLocaleTimeString())
    console.log("Component mounted!")
  })

  return <div>Mount Time: {mountTime}</div>
}`,
  },
  {
    title: "useOnMountLayoutEffect",
    url: "/docs/hooks/useOnMountLayoutEffect",
    description: "Mount-only layout effect with synchronous execution",
    category: "Life Cycles",
    preview: (
      <div className="text-center p-4">
        <div className="text-lg font-semibold mb-2">Layout Effect</div>
        <div className="text-sm text-muted-foreground">Runs synchronously before browser paint</div>
      </div>
    ),
    code: `import { useOnMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"

export function Example() {
  useOnMountLayoutEffect(() => {
    // Runs synchronously before paint
    console.log("Layout effect executed!")
  })

  return <div>Check console for layout effect</div>
}`,
  },
  {
    title: "useStateChangeEffect",
    url: "/docs/hooks/useStateChangeEffect",
    description: "Effect triggered by state changes",
    category: "Life Cycles",
    preview: (
      <div className="text-center p-4">
        <div className="text-lg font-semibold mb-2">State Change Effect</div>
        <div className="text-sm text-muted-foreground">
          Triggers effects when specific states change
        </div>
      </div>
    ),
    code: `import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"
import { useState } from "react"

export function Example() {
  const [count, setCount] = useState(0)
  
  useStateChangeEffect(() => {
    console.log(\`Count changed to: \${count}\`)
  }, [count])

  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
}`,
  },
  // State Management Hooks
  {
    title: "useLocalStorage",
    url: "/docs/hooks/useLocalStorage",
    description: "Persistent localStorage state management",
    category: "State Management",
    preview: <UseLocalStorageDemo />,
    code: `import { useLocalStorage } from "@/hooks/useLocalStorage"

export function Example() {
  const [name, setName] = useLocalStorage("demo-name", "")
  
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name..."
    />
  )
}`,
  },
  // Utility Hooks
  {
    title: "useCopyToClipboard",
    url: "/docs/hooks/use-copy-to-clipboard",
    description: "Advanced clipboard operations",
    category: "Utilities",
    preview: <UseCopyToClipboardDemo />,
    code: `import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"

export function Example() {
  const { copy, copied, error } = useCopyToClipboard()
  
  const handleCopy = () => {
    copy("Hello from React Hook!")
  }

  return (
    <button onClick={handleCopy}>
      {copied ? "✅ Copied!" : "📋 Copy Text"}
    </button>
  )
}`,
  },
  {
    title: "useCountdown",
    url: "/docs/hooks/useCountdown",
    description: "Countdown timers with loop support",
    category: "Utilities",
    preview: <UseCountdownDemo />,
    code: `import { useCountdown } from "@/hooks/useCountdown"

export function Example() {
  const { seconds, start, stop, reset, isActive } = useCountdown(10, () => console.log("Done!"))

  const formatTime = (seconds) => seconds + "s"

  return (
    <div>
      <div>{formatTime(seconds)}</div>
      <button onClick={start} disabled={isActive}>Start</button>
      <button onClick={stop} disabled={!isActive}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}`,
  },
  {
    title: "useKeyboardShortcut",
    url: "/docs/hooks/useKeyboardShortcut",
    description: "Global keyboard shortcuts with tooltip system",
    category: "Utilities",
    preview: <UseKeyboardShortcutDemo />,
    code: `import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import { useState } from "react"

export function Example() {
  const [count, setCount] = useState(0)
  
  useKeyboardShortcut(
    {
      id: "increment",
      keys: "shift+space",
      description: "Increment counter"
    },
    () => setCount(prev => prev + 1)
  )

  return <div>Count: {count} (Press Shift+Space)</div>
}`,
  },
  {
    title: "useRevalidate",
    url: "/docs/hooks/useRevalidate",
    description: "SWR cache revalidation helper",
    category: "Utilities",
    preview: (
      <div className="text-center p-4">
        <div className="text-lg font-semibold mb-2">SWR Revalidation</div>
        <div className="text-sm text-muted-foreground">
          Helper hook for managing SWR cache revalidation
        </div>
      </div>
    ),
    code: `import { useRevalidate } from "@/hooks/useRevalidate"

export function Example() {
  const revalidate = useRevalidate()
  
  const handleRefresh = () => {
    revalidate("/api/data") // Revalidate specific URL
  }

  return (
    <button onClick={handleRefresh}>
      Refresh Data
    </button>
  )
}`,
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
              A comprehensive collection of custom React hooks with live examples and source code.
              Built with TypeScript for enhanced functionality and developer experience.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">{hooks.length} Hooks</Badge>
              <Badge variant="outline">Live Preview</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">SSR-Safe</Badge>
            </div>
          </div>

          <div className="space-y-12">
            {Object.entries(groupedHooks).map(([category, categoryHooks]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-3xl font-bold text-primary">{category} Hooks</h2>
                  <Badge variant="outline">{categoryHooks.length} hooks</Badge>
                </div>

                <div className="space-y-8">
                  {categoryHooks.map(hook => (
                    <Card key={hook.title} className="overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex gap-2 items-end text-2xl mb-2">
                              {hook.title}
                              <Badge variant="secondary" className="text-sm">
                                {category}
                              </Badge>
                            </CardTitle>
                            <CardDescription className="text-base leading-relaxed">
                              {hook.description}
                            </CardDescription>
                          </div>

                          <Link href={hook.url}>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Docs
                            </Button>
                          </Link>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <PreviewTabs
                          preview={hook.preview}
                          code={hook.code}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-16">
            <CardHeader>
              <CardTitle>Getting Started with Hooks</CardTitle>
              <CardDescription>
                Start using these powerful React hooks in your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">🔗</div>
                  <div className="font-semibold mb-2">Import & Use</div>
                  <div className="text-sm text-muted-foreground">
                    Copy the import statement and start using the hook immediately
                  </div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">🎮</div>
                  <div className="font-semibold mb-2">Interactive Examples</div>
                  <div className="text-sm text-muted-foreground">
                    Try the live examples to see how each hook works in practice
                  </div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">📖</div>
                  <div className="font-semibold mb-2">Full Documentation</div>
                  <div className="text-sm text-muted-foreground">
                    Click &quot;View Docs&quot; for complete API reference and advanced examples
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Hook Features</CardTitle>
              <CardDescription>What makes these hooks special</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">🔧</div>
                  <div className="font-semibold text-sm mb-1">TypeScript</div>
                  <div className="text-xs text-muted-foreground">
                    Full type safety and IntelliSense
                  </div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">🌐</div>
                  <div className="font-semibold text-sm mb-1">SSR Safe</div>
                  <div className="text-xs text-muted-foreground">Works with Next.js and SSR</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">🧹</div>
                  <div className="font-semibold text-sm mb-1">Auto Cleanup</div>
                  <div className="text-xs text-muted-foreground">Automatic memory management</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-semibold text-sm mb-1">Performance</div>
                  <div className="text-xs text-muted-foreground">Optimized for production use</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
