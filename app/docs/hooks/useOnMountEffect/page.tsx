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
import { useState } from "react"
import { useOnMountEffect, useStrictMountEffect, useHasMounted } from "@/hooks/useOnMountEffect"

export default function UseOnMountEffectDocs() {
  const [mountCount, setMountCount] = useState(0)
  const [strictMountCount, setStrictMountCount] = useState(0)
  const [rerenderCount, setRerenderCount] = useState(0)
  const hasMounted = useHasMounted()

  // Demonstrate useOnMountEffect
  useOnMountEffect(() => {
    console.log("useOnMountEffect: Component mounted!")
    setMountCount(prev => prev + 1)

    return () => {
      console.log("useOnMountEffect: Cleanup on unmount")
    }
  })

  // Demonstrate useStrictMountEffect
  useStrictMountEffect(() => {
    console.log("useStrictMountEffect: Component mounted!")
    setStrictMountCount(prev => prev + 1)

    return () => {
      console.log("useStrictMountEffect: Cleanup on unmount")
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
              <BreadcrumbPage>useOnMountEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useOnMountEffect</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A collection of hooks for running effects only once when components mount, with proper
              cleanup handling.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">Effect</Badge>
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
              <InstallationTabs componentName="useOnMountEffect" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <CodeBlock language="typescript">
                  {`import { useOnMountEffect, useStrictMountEffect, useHasMounted } from "@/hooks/useOnMountEffect"`}
                </CodeBlock>
              </div>

              <CodeBlock language="tsx">
                {`// Basic usage - runs once on mount
function MyComponent() {
  useOnMountEffect(() => {
    console.log('Component mounted!')
    
    // Optional cleanup
    return () => {
      console.log('Component unmounting')
    }
  })

  return <div>Component content</div>
}

// Strict mount effect - ignores all dependencies
function StrictComponent() {
  useStrictMountEffect(() => {
    // This runs exactly once, no matter what
    initializeApp()
  })

  return <div>App content</div>
}

// Check if component has mounted
function ConditionalComponent() {
  const hasMounted = useHasMounted()
  
  if (!hasMounted) {
    return <div>Loading...</div>
  }
  
  return <div>Component is mounted!</div>
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
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      useOnMountEffect runs: <strong>{mountCount} time(s)</strong>
                    </div>
                    <div>
                      useStrictMountEffect runs: <strong>{strictMountCount} time(s)</strong>
                    </div>
                    <div>
                      Component re-renders: <strong>{rerenderCount} time(s)</strong>
                    </div>
                    <div>
                      Has mounted: <strong>{hasMounted ? "Yes" : "No"}</strong>
                    </div>
                  </div>
                  <Button onClick={triggerRerender}>
                    Trigger Re-render (count: {rerenderCount})
                  </Button>
                  <div className="text-xs text-muted-foreground mt-2">
                    Notice how the mount effects only run once, even when re-rendering.
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Data Fetching on Mount</h3>
                <CodeBlock language="tsx">
                  {`function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useOnMountEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const userData = await fetch(\`/api/users/\${userId}\`)
        const user = await userData.json()
        setUser(user)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId]) // userId captured on mount, changes ignored

  if (loading) return <div>Loading user...</div>
  if (!user) return <div>User not found</div>
  
  return <div>Welcome, {user.name}!</div>
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Event Listeners Setup</h3>
                <CodeBlock language="tsx">
                  {`function KeyboardShortcuts() {
  useOnMountEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault()
        saveDocument()
      }
    }

    document.addEventListener('keydown', handleKeydown)
    
    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  })

  return <div>Press Ctrl+S to save</div>
}

function WindowResize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useOnMountEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial size
    handleResize()
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return <div>Window: {windowSize.width} x {windowSize.height}</div>
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Analytics and Tracking</h3>
                <CodeBlock language="tsx">
                  {`function AnalyticsTracker({ page }: { page: string }) {
  useStrictMountEffect(() => {
    // Track page view once per component mount
    analytics.track('page_view', {
      page: page,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent
    })
  })

  return <div>Page content...</div>
}

function AdComponent() {
  useOnMountEffect(() => {
    // Initialize ad tracking
    const adTracker = new AdTracker()
    adTracker.initialize()
    
    return () => {
      // Cleanup ad resources
      adTracker.cleanup()
    }
  })

  return <div id="ad-container">Advertisement</div>
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">SSR-Safe Rendering</h3>
                <CodeBlock language="tsx">
                  {`function ClientOnlyComponent() {
  const hasMounted = useHasMounted()
  
  // Avoid hydration mismatch by only rendering client-specific content after mount
  if (!hasMounted) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <div>Current URL: {window.location.href}</div>
      <div>User Agent: {navigator.userAgent}</div>
      <div>Screen Size: {screen.width} x {screen.height}</div>
    </div>
  )
}

function ThemeComponent() {
  const hasMounted = useHasMounted()
  const [theme, setTheme] = useState<string | null>(null)
  
  useOnMountEffect(() => {
    // Access localStorage only after mount
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
  })
  
  if (!hasMounted || !theme) {
    return <div>Loading theme...</div>
  }
  
  return <div className={\`theme-\${theme}\`}>Themed content</div>
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
                  <h3 className="font-semibold mb-3">useOnMountEffect</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Runs an effect only once when the component mounts, even if dependencies change.
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
                          <td className="p-2">The effect function to run on mount</td>
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
                  <h3 className="font-semibold mb-3">useStrictMountEffect</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Runs an effect exactly once on first render, completely ignoring all
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
                          <td className="p-2">The effect function to run on mount</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">useHasMounted</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Returns a boolean indicating whether the component has completed its initial
                    mount.
                  </p>

                  <h4 className="font-medium mb-2">Parameters</h4>
                  <div className="text-sm">None</div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
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
                            True if component has mounted, false during initial render
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
                <li>Runs effects exactly once per component mount</li>
                <li>Proper cleanup handling with return functions</li>
                <li>Ignores dependency changes after first run</li>
                <li>TypeScript support with full type safety</li>
                <li>Three hook variants for different use cases</li>
                <li>SSR-safe with proper hydration handling</li>
                <li>Memory efficient with ref-based tracking</li>
                <li>Compatible with React Strict Mode</li>
                <li>Prevents common effect re-run issues</li>
                <li>Automatic cleanup on component unmount</li>
                <li>No unnecessary re-renders or effect executions</li>
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
                  <h4 className="font-semibold mb-2">useOnMountEffect</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Initial data fetching</div>
                    <div>• Setting up event listeners</div>
                    <div>• Initializing third-party libraries</div>
                    <div>• Analytics/tracking setup</div>
                    <div>• WebSocket connections</div>
                    <div>• Timers and intervals</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">useStrictMountEffect</h4>
                  <div className="space-y-1 text-sm">
                    <div>• One-time app initialization</div>
                    <div>• Global event listeners</div>
                    <div>• Performance monitoring setup</div>
                    <div>• Feature flag initialization</div>
                    <div>• Theme system setup</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">useHasMounted</h4>
                  <div className="space-y-1 text-sm">
                    <div>• SSR hydration safety</div>
                    <div>• Client-only rendering</div>
                    <div>• Browser API access</div>
                    <div>• Conditional rendering</div>
                    <div>• Loading states</div>
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
