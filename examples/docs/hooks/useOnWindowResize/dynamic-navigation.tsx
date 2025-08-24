"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, User, Settings, Mail, Search } from "lucide-react"
import { useState } from "react"
import { useOnWindowResize } from "@/hooks/useOnWindowResize"

export default function DynamicNavigationExample() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [navLayout, setNavLayout] = useState<'horizontal' | 'vertical' | 'compact'>('horizontal')
  const [windowWidth, setWindowWidth] = useState(0)

  useOnWindowResize(() => {
    const width = window.innerWidth
    setWindowWidth(width)
    
    if (width < 768) {
      setNavLayout('vertical')
      setShowMobileMenu(false) // Close mobile menu on resize
    } else if (width < 1024) {
      setNavLayout('compact')
      setShowMobileMenu(false)
    } else {
      setNavLayout('horizontal')
      setShowMobileMenu(false)
    }
  })

  const navItems = [
    { icon: Home, label: 'Home', href: '#' },
    { icon: User, label: 'Profile', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
    { icon: Mail, label: 'Messages', href: '#' },
    { icon: Search, label: 'Search', href: '#' }
  ]

  const getLayoutDescription = () => {
    switch (navLayout) {
      case 'horizontal': return 'Full horizontal navigation with labels'
      case 'compact': return 'Compact horizontal with icons and short labels'
      case 'vertical': return 'Mobile hamburger menu'
      default: return 'Unknown layout'
    }
  }

  const getBreakpointInfo = () => {
    if (windowWidth >= 1024) return { name: 'Desktop', color: 'text-secondary' }
    if (windowWidth >= 768) return { name: 'Tablet', color: 'text-foreground' }
    return { name: 'Mobile', color: 'text-muted-foreground' }
  }

  const breakpoint = getBreakpointInfo()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Dynamic Navigation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Navigation Info */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-card rounded p-3 text-center">
                <div className={`text-lg font-bold ${breakpoint.color}`}>
                  {breakpoint.name}
                </div>
                <div className="text-xs text-muted-foreground">Device Type</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-secondary capitalize">
                  {navLayout}
                </div>
                <div className="text-xs text-muted-foreground">Nav Layout</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-secondary-foreground">
                  {windowWidth}px
                </div>
                <div className="text-xs text-muted-foreground">Window Width</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground text-center">
              {getLayoutDescription()}
            </div>
          </div>

          {/* Navigation Demo */}
          <div className="bg-card border rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Website Header</h3>
                
                {/* Navigation based on layout */}
                {navLayout === 'vertical' ? (
                  // Mobile hamburger menu
                  <div className="relative">
                    <Button
                      onClick={() => setShowMobileMenu(!showMobileMenu)}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-gray-300"
                    >
                      {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                    
                    {showMobileMenu && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg z-10">
                        {navItems.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-muted border-b last:border-b-0"
                          >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : navLayout === 'compact' ? (
                  // Compact horizontal (tablet)
                  <nav className="flex items-center space-x-4">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-1 px-2 py-1 text-white hover:text-gray-300 text-sm"
                        title={item.label}
                      >
                        <item.icon size={16} />
                        <span className="hidden sm:inline">{item.label.substring(0, 4)}</span>
                      </a>
                    ))}
                  </nav>
                ) : (
                  // Full horizontal (desktop)
                  <nav className="flex items-center space-x-6">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            </div>

            {/* Page content simulation */}
            <div className="p-6">
              <h4 className="font-medium mb-3">Page Content</h4>
              <p className="text-sm text-muted-foreground mb-4">
                This simulates the main content area of a website. The navigation above automatically 
                adapts based on screen size using the useOnWindowResize hook.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded p-4">
                  <h5 className="font-medium mb-2">Content Block 1</h5>
                  <p className="text-sm text-muted-foreground">
                    Sample content that would be shown on the page. The layout adapts 
                    to different screen sizes.
                  </p>
                </div>
                <div className="bg-muted/50 rounded p-4">
                  <h5 className="font-medium mb-2">Content Block 2</h5>
                  <p className="text-sm text-muted-foreground">
                    More sample content demonstrating responsive behavior alongside 
                    the dynamic navigation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Layout Breakdown */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3 text-sm">Navigation Breakpoints</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">≥1024px (Desktop):</span>
                <span className="text-muted-foreground">Full horizontal navigation with icons + labels</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">768-1023px (Tablet):</span>
                <span className="text-muted-foreground">Compact horizontal with shortened labels</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">&lt;768px (Mobile):</span>
                <span className="text-muted-foreground">Hamburger menu with dropdown</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-secondary/10 p-3 rounded">
            <strong>Navigation Behavior:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Desktop: Full navigation with icons and complete labels</li>
              <li>Tablet: Compact navigation with icons and shortened labels</li>
              <li>Mobile: Hamburger menu that toggles a dropdown</li>
              <li>Menu automatically closes when window is resized</li>
              <li>Responsive layout prevents navigation overflow issues</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}