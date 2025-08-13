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
import { useOnUnmountEffect } from "@/hooks/useOnUnmountEffect"

export default function UseOnUnmountEffectDocs() {
  const [componentMounted, setComponentMounted] = useState(true)
  const [unmountCount, setUnmountCount] = useState(0)

  // Demo component to show unmount behavior
  function DemoComponent() {
    useOnUnmountEffect(() => {
      console.log("DemoComponent is unmounting!")
      setUnmountCount(prev => prev + 1)
    })

    return (
      <div className="border rounded-lg p-4 bg-green-50">
        <h4 className="font-medium">Demo Component</h4>
        <p className="text-sm text-muted-foreground">
          This component will log to console when unmounted
        </p>
      </div>
    )
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
              <BreadcrumbPage>useOnUnmountEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useOnUnmountEffect</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A hook that runs cleanup logic only when the component unmounts, perfect for resource
              cleanup and final operations.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">Lifecycle</Badge>
              <Badge variant="outline">Cleanup</Badge>
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
              <InstallationTabs componentName="useOnUnmountEffect" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <CodeBlock language="typescript">
                  {`import { useOnUnmountEffect } from "@/hooks/useOnUnmountEffect"`}
                </CodeBlock>
              </div>

              <CodeBlock language="tsx">
                {`// Basic usage - cleanup on unmount only
function MyComponent() {
  useOnUnmountEffect(() => {
    console.log('Component is unmounting')
    // Cleanup resources, cancel subscriptions, etc.
  })

  return <div>Component content</div>
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
                  <div className="mb-4">
                    <div className="text-sm mb-2">
                      Component unmount count: <strong>{unmountCount}</strong>
                    </div>
                    <Button
                      onClick={() => setComponentMounted(!componentMounted)}
                      variant={componentMounted ? "destructive" : "default"}
                    >
                      {componentMounted ? "Unmount Component" : "Mount Component"}
                    </Button>
                  </div>

                  {componentMounted && <DemoComponent />}

                  <div className="text-xs text-muted-foreground mt-2">
                    Check the browser console to see unmount logs
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Event Listener Cleanup</h3>
                <CodeBlock language="tsx">
                  {`function WindowEventComponent() {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      console.log('Escape pressed')
    }
  }

  const handleResize = () => {
    console.log('Window resized')
  }

  // Setup listeners in useEffect
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
  }, [])

  // Cleanup only on unmount
  useOnUnmountEffect(() => {
    document.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('resize', handleResize)
  })

  return <div>App with global event listeners</div>
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Network Request Cancellation</h3>
                <CodeBlock language="tsx">
                  {`function DataFetcher() {
  const abortControllerRef = useRef(new AbortController())
  const [data, setData] = useState(null)

  useEffect(() => {
    // Fetch data with abort signal
    fetch('/api/data', { 
      signal: abortControllerRef.current.signal 
    })
      .then(response => response.json())
      .then(setData)
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error)
        }
      })
  }, [])

  // Cancel any pending requests on unmount
  useOnUnmountEffect(() => {
    abortControllerRef.current.abort()
  })

  return <div>Data: {JSON.stringify(data)}</div>
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Timer Cleanup</h3>
                <CodeBlock language="tsx">
                  {`function TimerComponent() {
  const [count, setCount] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)
  }, [])

  // Clear timer only on unmount
  useOnUnmountEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  })

  return <div>Timer: {count}</div>
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">WebSocket Connection Cleanup</h3>
                <CodeBlock language="tsx">
                  {`function WebSocketComponent() {
  const wsRef = useRef<WebSocket>()
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:8080')
    
    wsRef.current.onmessage = (event) => {
      setMessages(prev => [...prev, event.data])
    }
  }, [])

  // Close WebSocket connection on unmount
  useOnUnmountEffect(() => {
    if (wsRef.current) {
      wsRef.current.close()
    }
  })

  return (
    <div>
      <h3>Messages:</h3>
      <ul>
        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
    </div>
  )
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Analytics Cleanup</h3>
                <CodeBlock language="tsx">
                  {`function AnalyticsTracker() {
  const sessionId = useRef(generateSessionId())

  useEffect(() => {
    // Start tracking session
    analytics.startSession(sessionId.current)
  }, [])

  // End session only on unmount
  useOnUnmountEffect(() => {
    analytics.endSession(sessionId.current, {
      duration: Date.now() - startTime,
      pageViews: pageViewCount
    })
  })

  return <div>Page content with analytics</div>
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
                  <h3 className="font-semibold mb-3">useOnUnmountEffect</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Runs cleanup logic only when the component unmounts, not during re-renders or
                    updates.
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
                          <td className="p-2 font-mono">cleanup</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">The cleanup function to run on unmount</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Key Characteristics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Timing</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>Mount:</strong> No effect execution
                        </li>
                        <li>
                          <strong>Updates:</strong> No effect execution
                        </li>
                        <li>
                          <strong>Unmount:</strong> Cleanup function runs once
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Comparison with useEffect</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>useOnUnmountEffect:</strong> Only cleanup on unmount
                        </li>
                        <li>
                          <strong>useEffect with []:</strong> Effect on mount + cleanup on unmount
                        </li>
                        <li>
                          <strong>useEffect with deps:</strong> Effect + cleanup on every dependency
                          change
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
                <li>Runs cleanup only on component unmount</li>
                <li>No dependency tracking needed</li>
                <li>Perfect for resource cleanup and final operations</li>
                <li>Memory efficient implementation</li>
                <li>TypeScript support with full type safety</li>
                <li>Automatic cleanup function updates on re-render</li>
                <li>Compatible with React Strict Mode</li>
                <li>No unnecessary effect executions during updates</li>
                <li>Simple and focused API</li>
                <li>Prevents memory leaks from global resources</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
              <CardDescription>Common scenarios where this hook is useful</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Resource Cleanup</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Event listener removal</div>
                    <div>• Timer and interval cleanup</div>
                    <div>• WebSocket connection closure</div>
                    <div>• Database connection cleanup</div>
                    <div>• File handle cleanup</div>
                    <div>• Memory cache clearing</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Network Operations</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Request cancellation</div>
                    <div>• Subscription cleanup</div>
                    <div>• Stream disconnection</div>
                    <div>• Long polling termination</div>
                    <div>• Service worker cleanup</div>
                    <div>• API connection cleanup</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Analytics & Tracking</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Session ending</div>
                    <div>• Performance metric reporting</div>
                    <div>• User behavior finalization</div>
                    <div>• Error reporting flush</div>
                    <div>• Time tracking completion</div>
                    <div>• Log aggregation</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Global State</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Global listener cleanup</div>
                    <div>• Store unsubscription</div>
                    <div>• Context cleanup</div>
                    <div>• Theme reset</div>
                    <div>• Modal state reset</div>
                    <div>• Focus management cleanup</div>
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
