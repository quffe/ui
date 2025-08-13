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
import { InstallationTabs } from "@/components/internal/installation"
import { CodeBlock } from "@/components/ui/code-block"
import { useState, useRef } from "react"
import { useOnMountLayoutEffect, useStrictMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"

export default function UseOnMountLayoutEffectDocs() {
  const [mountCount, setMountCount] = useState(0)
  const [strictMountCount, setStrictMountCount] = useState(0)
  const [rerenderCount, setRerenderCount] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)
  const measureRef = useRef<HTMLDivElement>(null)

  // Demonstrate useOnMountLayoutEffect
  useOnMountLayoutEffect(() => {
    console.log("useOnMountLayoutEffect: Component mounted!")
    setMountCount(prev => prev + 1)

    // Measure element synchronously before paint
    if (measureRef.current) {
      const height = measureRef.current.offsetHeight
      setElementHeight(height)
    }

    return () => {
      console.log("useOnMountLayoutEffect: Cleanup on unmount")
    }
  })

  // Demonstrate useStrictMountLayoutEffect
  useStrictMountLayoutEffect(() => {
    console.log("useStrictMountLayoutEffect: Component mounted!")
    setStrictMountCount(prev => prev + 1)

    return () => {
      console.log("useStrictMountLayoutEffect: Cleanup on unmount")
    }
  })

  const triggerRerender = () => {
    setRerenderCount(prev => prev + 1)
  }

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
              <BreadcrumbPage>useOnMountLayoutEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useOnMountLayoutEffect</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A collection of hooks for running layout effects only once when components mount, with
              synchronous execution before browser paint.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">Layout Effect</Badge>
              <Badge variant="outline">Synchronous</Badge>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the hook using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="useOnMountLayoutEffect" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <CodeBlock language="typescript">
                  {`import { useOnMountLayoutEffect, useStrictMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"`}
                </CodeBlock>
              </div>

              <CodeBlock language="tsx">
                {`// Basic usage - runs once on mount before paint
function MyComponent() {
  const ref = useRef<HTMLDivElement>(null)

  useOnMountLayoutEffect(() => {
    // Measure or modify DOM synchronously
    if (ref.current) {
      const height = ref.current.offsetHeight
      console.log('Element height:', height)
    }
    
    // Optional cleanup
    return () => {
      console.log('Component unmounting')
    }
  })

  return <div ref={ref}>Component content</div>
}

// Strict layout effect - ignores all dependencies
function StrictComponent() {
  useStrictMountLayoutEffect(() => {
    // This runs exactly once before paint, no matter what
    setupCriticalStyles()
  })

  return <div>App content</div>
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Live Demonstration</h3>
                <div className="border rounded-lg p-4" ref={measureRef}>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      useOnMountLayoutEffect runs: <strong>{mountCount} time(s)</strong>
                    </div>
                    <div>
                      useStrictMountLayoutEffect runs: <strong>{strictMountCount} time(s)</strong>
                    </div>
                    <div>
                      Component re-renders: <strong>{rerenderCount} time(s)</strong>
                    </div>
                    <div>
                      Measured height: <strong>{elementHeight}px</strong>
                    </div>
                  </div>
                  <Button onClick={triggerRerender}>
                    Trigger Re-render (count: {rerenderCount})
                  </Button>
                  <div className="text-xs text-muted-foreground mt-2">
                    Notice how the mount effects only run once, even when re-rendering, and the
                    height is measured before paint.
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">DOM Measurements</h3>
                <CodeBlock language="tsx">
                  {`function ResponsiveComponent() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useOnMountLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setDimensions({
        width: rect.width,
        height: rect.height
      })
    }
  })

  return (
    <div ref={ref}>
      <p>Width: {dimensions.width}px</p>
      <p>Height: {dimensions.height}px</p>
    </div>
  )
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Critical Style Setup</h3>
                <CodeBlock language="tsx">
                  {`function ThemeProvider({ children, theme }) {
  useStrictMountLayoutEffect(() => {
    // Apply theme synchronously before paint to prevent flash
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    
    return () => {
      // Cleanup theme on unmount
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.style.removeProperty('color-scheme')
    }
  })

  return <div className="theme-container">{children}</div>
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Scroll Position Restoration</h3>
                <CodeBlock language="tsx">
                  {`function ScrollRestorer({ scrollKey }: { scrollKey: string }) {
  useOnMountLayoutEffect(() => {
    // Restore scroll position before paint to prevent jump
    const savedPosition = sessionStorage.getItem(\`scroll-\${scrollKey}\`)
    if (savedPosition) {
      const position = JSON.parse(savedPosition)
      window.scrollTo(position.x, position.y)
    }

    const savePosition = () => {
      sessionStorage.setItem(\`scroll-\${scrollKey}\`, JSON.stringify({
        x: window.scrollX,
        y: window.scrollY
      }))
    }

    window.addEventListener('beforeunload', savePosition)
    
    return () => {
      window.removeEventListener('beforeunload', savePosition)
    }
  }, [scrollKey])

  return null // This component doesn't render anything
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Animation Setup</h3>
                <CodeBlock language="tsx">
                  {`function AnimatedComponent() {
  const elementRef = useRef<HTMLDivElement>(null)

  useOnMountLayoutEffect(() => {
    if (elementRef.current) {
      // Set initial animation state before paint
      elementRef.current.style.opacity = '0'
      elementRef.current.style.transform = 'translateY(20px)'
      
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        if (elementRef.current) {
          elementRef.current.style.transition = 'all 0.3s ease'
          elementRef.current.style.opacity = '1'
          elementRef.current.style.transform = 'translateY(0)'
        }
      })
    }
  })

  return (
    <div ref={elementRef}>
      <h2>Smoothly animated content</h2>
      <p>This appears with a smooth fade-in animation</p>
    </div>
  )
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Focus Management</h3>
                <CodeBlock language="tsx">
                  {`function FocusManager({ autoFocus }: { autoFocus?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null)

  useStrictMountLayoutEffect(() => {
    if (autoFocus && inputRef.current) {
      // Focus input before paint to prevent visual jump
      inputRef.current.focus()
      
      // Set cursor position if needed
      const length = inputRef.current.value.length
      inputRef.current.setSelectionRange(length, length)
    }
  })

  return (
    <div>
      <label htmlFor="focused-input">Auto-focused Input:</label>
      <input
        ref={inputRef}
        id="focused-input"
        type="text"
        placeholder="This will be focused on mount"
      />
    </div>
  )
}`}
                </CodeBlock>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">useOnMountLayoutEffect</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Runs a layout effect only once when the component mounts, even if dependencies
                    change.
                  </p>

                  <h4 className="font-medium mb-2">Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Parameter</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">effect</td>
                          <td className="p-2">React.EffectCallback</td>
                          <td className="p-2">The layout effect function to run on mount</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">dependencies</td>
                          <td className="p-2">React.DependencyList</td>
                          <td className="p-2">
                            Optional dependencies array (captured on first render only)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">useStrictMountLayoutEffect</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Runs a layout effect exactly once on first render, completely ignoring all
                    dependencies.
                  </p>

                  <h4 className="font-medium mb-2">Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Parameter</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">effect</td>
                          <td className="p-2">React.EffectCallback</td>
                          <td className="p-2">The layout effect function to run on mount</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Key Differences from useOnMountEffect</h3>
                  <div className="space-y-2 text-sm">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Timing</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>useOnMountLayoutEffect:</strong> Runs synchronously after DOM
                          mutations but before browser paint
                        </li>
                        <li>
                          <strong>useOnMountEffect:</strong> Runs asynchronously after browser paint
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Use Cases</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>useOnMountLayoutEffect:</strong> DOM measurements, critical
                          styles, focus management
                        </li>
                        <li>
                          <strong>useOnMountEffect:</strong> Data fetching, event listeners, general
                          initialization
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Performance</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>useOnMountLayoutEffect:</strong> Can block browser paint if heavy
                          computation
                        </li>
                        <li>
                          <strong>useOnMountEffect:</strong> Does not block browser paint
                        </li>
                      </ul>
                    </div>
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
                <li>Runs layout effects exactly once per component mount</li>
                <li>Synchronous execution before browser paint</li>
                <li>Proper cleanup handling with return functions</li>
                <li>Ignores dependency changes after first run</li>
                <li>TypeScript support with full type safety</li>
                <li>Two hook variants for different use cases</li>
                <li>Perfect for DOM measurements and critical styling</li>
                <li>Memory efficient with ref-based tracking</li>
                <li>Compatible with React Strict Mode</li>
                <li>Prevents visual flashing and layout shifts</li>
                <li>Automatic cleanup on component unmount</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
              <CardDescription>Common scenarios where these hooks are useful</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">useOnMountLayoutEffect</h4>
                  <div className="space-y-1 text-sm">
                    <div>• DOM measurements and calculations</div>
                    <div>• Critical theme and style setup</div>
                    <div>• Scroll position restoration</div>
                    <div>• Animation initial states</div>
                    <div>• Focus management</div>
                    <div>• Layout-dependent computations</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">useStrictMountLayoutEffect</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Global style initialization</div>
                    <div>• Critical app setup before paint</div>
                    <div>• Theme provider setup</div>
                    <div>• Performance monitoring setup</div>
                    <div>• One-time DOM modifications</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">When to Use Layout Effects</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Measuring DOM elements</div>
                    <div>• Preventing visual flashes</div>
                    <div>• Synchronous DOM updates</div>
                    <div>• Critical rendering path optimizations</div>
                    <div>• When timing matters for UX</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Performance Notes</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Blocks browser paint</div>
                    <div>• Should be lightweight</div>
                    <div>• Use sparingly for critical operations</div>
                    <div>• Prefer useOnMountEffect for most cases</div>
                    <div>• Avoid heavy computations</div>
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
