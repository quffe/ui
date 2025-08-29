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
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { useState, useRef } from "react"
import {
  useIsomorphicLayoutEffect,
  useIsomorphicMountEffect,
} from "@/hooks/useIsomorphicLayoutEffect"

function LiveDemonstrationExample() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mountEffectRuns, setMountEffectRuns] = useState(0)
  const [rerenderCount, setRerenderCount] = useState(0)
  const measureRef = useRef<HTMLDivElement>(null)

  // Demonstrate useIsomorphicLayoutEffect
  useIsomorphicLayoutEffect(() => {
    if (measureRef.current) {
      const rect = measureRef.current.getBoundingClientRect()
      setDimensions({ width: Math.round(rect.width), height: Math.round(rect.height) })
    }
  }, [rerenderCount])

  // Demonstrate useIsomorphicMountEffect
  useIsomorphicMountEffect(() => {
    setMountEffectRuns(prev => prev + 1)
    console.log("useIsomorphicMountEffect: Component mounted (SSR-safe)!")
  })

  const triggerRerender = () => {
    setRerenderCount(prev => prev + 1)
  }

  return (
    <div className="border rounded-lg p-4" ref={measureRef}>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          Measured width: <strong>{dimensions.width}px</strong>
        </div>
        <div>
          Measured height: <strong>{dimensions.height}px</strong>
        </div>
        <div>
          Mount effect runs: <strong>{mountEffectRuns} time(s)</strong>
        </div>
        <div>
          Re-render count: <strong>{rerenderCount}</strong>
        </div>
      </div>

      <Button onClick={triggerRerender}>Trigger Re-measurement</Button>

      <div className="text-xs text-muted-foreground mt-2">
        The dimensions are measured using SSR-safe layout effects. Mount effect runs only once.
      </div>
    </div>
  )
}

export default function UseIsomorphicLayoutEffectDocs() {
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
              <BreadcrumbPage>useIsomorphicLayoutEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useIsomorphicLayoutEffect</h1>
            <p className="text-lg text-muted-foreground mb-4">
              SSR-safe layout effects that use useLayoutEffect on client and useEffect on server,
              preventing hydration mismatches.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">SSR Safe</Badge>
              <Badge variant="outline">Layout Effect</Badge>
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
              <InstallationTabs componentName="useIsomorphicLayoutEffect" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <PreviewTabs
                preview={<LiveDemonstrationExample />}
                code={`import { useIsomorphicLayoutEffect, useIsomorphicMountEffect } from "@/hooks/useIsomorphicLayoutEffect"

// Basic usage - SSR-safe layout effect
function ResponsiveComponent() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
    }
  }, [])

  return <div ref={ref}>Size: {dimensions.width}x{dimensions.height}</div>
}

// Mount-only version
function SSRSafeSetup() {
  useIsomorphicMountEffect(() => {
    // Runs once on mount, SSR-safe
    document.documentElement.setAttribute('data-app', 'loaded')
  })

  return <div>SSR-safe app</div>
}`}
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <PreviewTabs
                title="Theme Provider with SSR"
                preview={
                  <div className="text-center p-8 text-muted-foreground">
                    <div className="text-lg">🎨 Theme Provider Example</div>
                    <div className="text-sm mt-2">
                      Check the code tab to see the SSR-safe implementation
                    </div>
                  </div>
                }
                code={`function ThemeProvider({ 
  children, 
  theme 
}: { 
  children: React.ReactNode
  theme: string 
}) {
  useIsomorphicLayoutEffect(() => {
    // Apply theme synchronously on client, safely on server
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
      document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light'
    }
    
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.removeAttribute('data-theme')
        document.documentElement.style.removeProperty('color-scheme')
      }
    }
  }, [theme])

  return (
    <div className="theme-provider">
      {children}
    </div>
  )
}`}
              />

              <PreviewTabs
                title="DOM Measurements"
                preview={
                  <div className="text-center p-8 text-muted-foreground">
                    <div className="text-lg">📏 DOM Measurements Example</div>
                    <div className="text-sm mt-2">
                      Check the code tab to see the adaptive layout implementation
                    </div>
                  </div>
                }
                code={`function AdaptiveLayout() {
  const [layout, setLayout] = useState<'mobile' | 'desktop'>('desktop')
  const [elementHeight, setElementHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return

    const updateLayout = () => {
      const rect = containerRef.current!.getBoundingClientRect()
      setElementHeight(rect.height)
      setLayout(rect.width < 768 ? 'mobile' : 'desktop')
    }

    // Initial measurement
    updateLayout()

    // Listen for resize
    const resizeObserver = new ResizeObserver(updateLayout)
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="adaptive-container">
      <h2>Layout: {layout}</h2>
      <p>Container height: {elementHeight}px</p>
      <div className={layout === 'mobile' ? 'mobile-content' : 'desktop-content'}>
        Adaptive content based on size
      </div>
    </div>
  )
}`}
              />

              <PreviewTabs
                title="Focus Management"
                preview={
                  <div className="text-center p-8 text-muted-foreground">
                    <div className="text-lg">🎯 Focus Management Example</div>
                    <div className="text-sm mt-2">
                      Check the code tab to see the modal focus trap implementation
                    </div>
                  </div>
                }
                code={`function AutoFocusModal({ 
  isOpen, 
  onClose,
  children 
}: { 
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode 
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!isOpen || !modalRef.current) return

    // Store previous focus
    previousFocusRef.current = document.activeElement as HTMLElement

    // Focus modal
    modalRef.current.focus()

    // Trap focus within modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
      
      if (e.key === 'Tab') {
        // Implement focus trap logic
        const focusableElements = modalRef.current!.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      
      // Restore previous focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop">
      <div
        ref={modalRef}
        className="modal-content"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}`}
              />

              <PreviewTabs
                title="Scroll Position Restoration"
                preview={
                  <div className="text-center p-8 text-muted-foreground">
                    <div className="text-lg">📜 Scroll Restoration Example</div>
                    <div className="text-sm mt-2">
                      Check the code tab to see the scroll position implementation
                    </div>
                  </div>
                }
                code={`function ScrollRestorer({ 
  scrollKey,
  children 
}: { 
  scrollKey: string
  children: React.ReactNode 
}) {
  useIsomorphicMountEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Restore scroll position before paint
    const savedPosition = sessionStorage.getItem(\`scroll-\${scrollKey}\`)
    if (savedPosition) {
      try {
        const position = JSON.parse(savedPosition)
        window.scrollTo(position.x, position.y)
      } catch (error) {
        console.warn('Failed to restore scroll position:', error)
      }
    }

    const savePosition = () => {
      sessionStorage.setItem(\`scroll-\${scrollKey}\`, JSON.stringify({
        x: window.scrollX,
        y: window.scrollY
      }))
    }

    // Save position before page unload
    window.addEventListener('beforeunload', savePosition)
    
    // Also save on route changes (if using router)
    const handleRouteChange = () => savePosition()
    
    return () => {
      window.removeEventListener('beforeunload', savePosition)
      // Clean up route change listener if applicable
    }
  }, [scrollKey])

  return <>{children}</>
}`}
              />

              <PreviewTabs
                title="Animation Setup"
                preview={
                  <div className="text-center p-8 text-muted-foreground">
                    <div className="text-lg">✨ Animation Setup Example</div>
                    <div className="text-sm mt-2">
                      Check the code tab to see the animation implementation
                    </div>
                  </div>
                }
                code={`function AnimatedEntry({ children }: { children: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return

    // Set initial state before paint (client only)
    elementRef.current.style.opacity = '0'
    elementRef.current.style.transform = 'translateY(20px)'
    
    // Trigger animation on next frame
    const timeoutId = setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.style.transition = 'all 0.5s ease-out'
        elementRef.current.style.opacity = '1'
        elementRef.current.style.transform = 'translateY(0)'
        setIsVisible(true)
      }
    }, 50)

    // Cleanup
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div ref={elementRef} className="animated-entry">
      {children}
      {isVisible && (
        <div className="animation-complete-indicator">
          ✨ Animation complete
        </div>
      )}
    </div>
  )
}`}
              />

              <PreviewTabs
                title="Viewport Detection"
                preview={
                  <div className="text-center p-8 text-muted-foreground">
                    <div className="text-lg">📱 Viewport Detection Example</div>
                    <div className="text-sm mt-2">
                      Check the code tab to see the viewport tracking implementation
                    </div>
                  </div>
                }
                code={`function ViewportAwareComponent() {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    isMobile: false
  })

  useIsomorphicLayoutEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setViewport({
        width,
        height,
        isMobile: width < 768
      })
    }

    // Set initial viewport
    updateViewport()

    // Listen for changes
    window.addEventListener('resize', updateViewport)
    window.addEventListener('orientationchange', updateViewport)

    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('orientationchange', updateViewport)
    }
  }, [])

  return (
    <div className={viewport.isMobile ? 'mobile-layout' : 'desktop-layout'}>
      <h2>Viewport Information</h2>
      <p>Size: {viewport.width} x {viewport.height}</p>
      <p>Device: {viewport.isMobile ? 'Mobile' : 'Desktop'}</p>
      <div>
        {viewport.isMobile ? (
          <MobileContent />
        ) : (
          <DesktopContent />
        )}
      </div>
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
                  <h3 className="font-semibold mb-3">useIsomorphicLayoutEffect</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    SSR-safe layout effect that uses useLayoutEffect on client and useEffect on
                    server.
                  </p>

                  <div className="mb-4">
                    <PreviewTabs
                      preview={
                        <div className="text-center p-4 text-muted-foreground">
                          <div className="text-sm">Implementation details for SSR safety</div>
                        </div>
                      }
                      code={`const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect`}
                      language="typescript"
                    />
                  </div>

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
                          <td className="p-2">The effect function to run</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">dependencies</td>
                          <td className="p-2">React.DependencyList</td>
                          <td className="p-2">Dependencies array to watch for changes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">useIsomorphicMountEffect</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Mount-only version that combines SSR safety with single execution.
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
                            Optional dependencies (captured on first render only)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Environment Behavior</h3>
                  <div className="space-y-2 text-sm">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Client Side (Browser)</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          Uses <code>useLayoutEffect</code> for synchronous execution
                        </li>
                        <li>Runs before browser paint</li>
                        <li>Perfect for DOM measurements and critical styling</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Server Side (SSR)</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          Uses <code>useEffect</code> for safe execution
                        </li>
                        <li>Prevents hydration mismatches</li>
                        <li>No DOM access warnings</li>
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
                <li>SSR-safe implementation prevents hydration mismatches</li>
                <li>Client-side: synchronous useLayoutEffect execution</li>
                <li>Server-side: safe useEffect fallback</li>
                <li>Drop-in replacement for useLayoutEffect</li>
                <li>TypeScript support with full type safety</li>
                <li>Mount-only variant available</li>
                <li>Proper cleanup handling</li>
                <li>Compatible with Next.js and other SSR frameworks</li>
                <li>No environment detection warnings</li>
                <li>Memory efficient implementation</li>
                <li>Works with React Strict Mode</li>
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
                  <h4 className="font-semibold mb-2">DOM Measurements</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Element size calculation</div>
                    <div>• Responsive layout detection</div>
                    <div>• Scroll position handling</div>
                    <div>• Viewport size tracking</div>
                    <div>• Content height measurement</div>
                    <div>• Dynamic positioning</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Theme & Styling</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Theme provider setup</div>
                    <div>• CSS variable injection</div>
                    <div>• Critical style application</div>
                    <div>• Animation initialization</div>
                    <div>• Style synchronization</div>
                    <div>• Dark mode setup</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">User Experience</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Focus management</div>
                    <div>• Scroll restoration</div>
                    <div>• Modal focus trapping</div>
                    <div>• Keyboard navigation setup</div>
                    <div>• Accessibility enhancements</div>
                    <div>• User preference application</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">SSR Applications</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Next.js applications</div>
                    <div>• Gatsby sites</div>
                    <div>• Server-side rendered apps</div>
                    <div>• Static site generation</div>
                    <div>• Universal React apps</div>
                    <div>• Hydration-safe operations</div>
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
