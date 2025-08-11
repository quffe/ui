'use client'

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
import { useState, useEffect } from "react"
import { useOnWindowResize } from "@/hooks/useOnWindowResize"

export default function UseOnWindowResizeDocs() {
  const [mounted, setMounted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [resizeCount, setResizeCount] = useState(0)

  // Demonstrate the hook
  useOnWindowResize(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    setResizeCount(prev => prev + 1)
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const getBreakpoint = () => {
    if (windowSize.width >= 1200) return 'xl'
    if (windowSize.width >= 1024) return 'lg' 
    if (windowSize.width >= 768) return 'md'
    if (windowSize.width >= 640) return 'sm'
    return 'xs'
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
              <BreadcrumbPage>useOnWindowResize</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useOnWindowResize</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A simple hook for listening to window resize events with automatic cleanup and immediate execution.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">Event</Badge>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Install the hook using your preferred package manager</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="useOnWindowResize" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import { useOnWindowResize } from "@/hooks/useOnWindowResize"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`function ResponsiveComponent() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useOnWindowResize(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  })

  return (
    <div>
      <p>Window size: {windowSize.width} x {windowSize.height}</p>
      <p>Is mobile: {windowSize.width < 768 ? 'Yes' : 'No'}</p>
    </div>
  )
}`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Live Window Size Tracking</h3>
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Width: <strong>{mounted ? windowSize.width : 0}px</strong></div>
                    <div>Height: <strong>{mounted ? windowSize.height : 0}px</strong></div>
                    <div>Breakpoint: <strong>{mounted ? getBreakpoint() : 'xs'}</strong></div>
                    <div>Resize events: <strong>{resizeCount}</strong></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Resize your browser window to see the values update in real-time.
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Responsive Layout</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false)
  const [columns, setColumns] = useState(1)

  useOnWindowResize(() => {
    const width = window.innerWidth
    setIsMobile(width < 768)
    
    // Dynamic column calculation
    if (width >= 1200) setColumns(4)
    else if (width >= 768) setColumns(3)
    else if (width >= 640) setColumns(2)
    else setColumns(1)
  })

  return (
    <div className={\`grid grid-cols-\${columns} gap-4\`}>
      {items.map(item => (
        <div key={item.id} className={isMobile ? 'p-2' : 'p-4'}>
          {item.content}
        </div>
      ))}
    </div>
  )
}`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Chart Resizing</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function ResponsiveChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState(null)

  useOnWindowResize(() => {
    if (chartInstance && chartRef.current) {
      // Resize chart to fit container
      chartInstance.resize({
        width: chartRef.current.offsetWidth,
        height: chartRef.current.offsetHeight
      })
    }
  })

  useEffect(() => {
    if (chartRef.current) {
      // Initialize chart
      const chart = new Chart(chartRef.current, chartConfig)
      setChartInstance(chart)
      
      return () => chart.destroy()
    }
  }, [])

  return (
    <div ref={chartRef} className="w-full h-96">
      {/* Chart container */}
    </div>
  )
}`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Dynamic Navigation</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function DynamicNavigation() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [navLayout, setNavLayout] = useState<'horizontal' | 'vertical'>('horizontal')

  useOnWindowResize(() => {
    const width = window.innerWidth
    
    if (width < 768) {
      setNavLayout('vertical')
      setShowMobileMenu(false) // Close mobile menu on resize
    } else {
      setNavLayout('horizontal')
      setShowMobileMenu(false)
    }
  })

  return (
    <nav className={navLayout === 'vertical' ? 'flex-col' : 'flex-row'}>
      {navLayout === 'vertical' && (
        <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
          Menu
        </button>
      )}
      
      <div className={
        navLayout === 'vertical' 
          ? \`\${showMobileMenu ? 'block' : 'hidden'} mt-2\`
          : 'flex space-x-4'
      }>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  )
}`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Performance Optimization</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`// Debounced version for expensive operations
function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  return useCallback((...args: Parameters<T>) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => fn(...args), delay)
  }, [fn, delay])
}

function PerformantComponent() {
  const [layout, setLayout] = useState('desktop')

  const debouncedResize = useDebounce(() => {
    const width = window.innerWidth
    
    // Expensive layout calculations
    const newLayout = calculateOptimalLayout(width)
    setLayout(newLayout)
  }, 250) // Debounce by 250ms

  useOnWindowResize(debouncedResize)

  return <div className={layout}>Optimized content</div>
}`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Viewport-Based Effects</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function ViewportEffects() {
  const [viewportClass, setViewportClass] = useState('')

  useOnWindowResize(() => {
    const { innerWidth: width, innerHeight: height } = window
    const aspectRatio = width / height
    
    let className = ''
    
    // Orientation-based styling
    if (width > height) {
      className += 'landscape '
    } else {
      className += 'portrait '
    }
    
    // Aspect ratio classes
    if (aspectRatio > 1.5) {
      className += 'wide-screen'
    } else if (aspectRatio < 0.8) {
      className += 'tall-screen'
    } else {
      className += 'standard-screen'
    }
    
    setViewportClass(className.trim())
  })

  return (
    <div className={viewportClass}>
      <h2>Viewport-aware content</h2>
      <p>Layout adapts to screen orientation and aspect ratio</p>
    </div>
  )
}`}
                  </code>
                </div>
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
                  <h3 className="font-semibold mb-3">Parameters</h3>
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
                          <td className="p-2 font-mono">handler</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Function to execute on window resize</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Returns</h3>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Behavior</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Executes the handler immediately on mount</li>
                    <li>Adds resize event listener to window</li>
                    <li>Executes handler on every resize event</li>
                    <li>Automatically removes listener on unmount</li>
                    <li>Re-subscribes if handler function changes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Automatic event listener setup and cleanup</li>
                <li>Immediate execution on component mount</li>
                <li>TypeScript support with type safety</li>
                <li>Memory efficient with proper cleanup</li>
                <li>Works with both function and arrow function handlers</li>
                <li>Re-subscribes when handler changes</li>
                <li>SSR-safe implementation</li>
                <li>Lightweight with minimal overhead</li>
                <li>Compatible with React Strict Mode</li>
                <li>No external dependencies</li>
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
                  <h4 className="font-semibold mb-2">Layout & UI</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Responsive component layouts</div>
                    <div>• Dynamic navigation menus</div>
                    <div>• Sidebar collapse/expand</div>
                    <div>• Modal positioning</div>
                    <div>• Grid system adjustments</div>
                    <div>• Image gallery layouts</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Content & Data</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Chart and graph resizing</div>
                    <div>• Table column adjustments</div>
                    <div>• Video player resizing</div>
                    <div>• Canvas element scaling</div>
                    <div>• Map component resizing</div>
                    <div>• Virtual scrolling updates</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Performance</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Viewport-based optimizations</div>
                    <div>• Lazy loading adjustments</div>
                    <div>• Image quality selection</div>
                    <div>• Content prioritization</div>
                    <div>• Resource loading strategies</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Interaction</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Touch vs mouse interactions</div>
                    <div>• Gesture recognition adjustments</div>
                    <div>• Keyboard navigation changes</div>
                    <div>• Focus management updates</div>
                    <div>• Accessibility improvements</div>
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