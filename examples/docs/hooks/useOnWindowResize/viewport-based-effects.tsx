"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, Smartphone, Tablet, Square } from "lucide-react"
import { useState } from "react"
import { useOnWindowResize } from "@/hooks/useOnWindowResize"

export default function ViewportBasedEffectsExample() {
  const [viewportClass, setViewportClass] = useState('')
  const [viewportInfo, setViewportInfo] = useState({
    width: 0,
    height: 0,
    aspectRatio: 0,
    orientation: 'landscape' as 'landscape' | 'portrait',
    category: 'standard' as 'wide' | 'tall' | 'standard',
    deviceType: 'desktop' as 'desktop' | 'tablet' | 'mobile'
  })

  useOnWindowResize(() => {
    const { innerWidth: width, innerHeight: height } = window
    const aspectRatio = width / height
    
    let className = ''
    let orientation: 'landscape' | 'portrait' = 'landscape'
    let category: 'wide' | 'tall' | 'standard' = 'standard'
    let deviceType: 'desktop' | 'tablet' | 'mobile' = 'desktop'
    
    // Orientation-based styling
    if (width > height) {
      className += 'landscape '
      orientation = 'landscape'
    } else {
      className += 'portrait '
      orientation = 'portrait'
    }
    
    // Aspect ratio classes
    if (aspectRatio > 1.5) {
      className += 'wide-screen'
      category = 'wide'
    } else if (aspectRatio < 0.8) {
      className += 'tall-screen'
      category = 'tall'
    } else {
      className += 'standard-screen'
      category = 'standard'
    }

    // Device type detection
    if (width < 768) {
      deviceType = 'mobile'
    } else if (width < 1024) {
      deviceType = 'tablet'
    } else {
      deviceType = 'desktop'
    }
    
    setViewportClass(className.trim())
    setViewportInfo({
      width,
      height,
      aspectRatio: Math.round(aspectRatio * 100) / 100,
      orientation,
      category,
      deviceType
    })
  })

  const getDeviceIcon = () => {
    switch (viewportInfo.deviceType) {
      case 'mobile': return <Smartphone className="w-5 h-5" />
      case 'tablet': return <Tablet className="w-5 h-5" />
      default: return <Monitor className="w-5 h-5" />
    }
  }

  const getCategoryColor = () => {
    switch (viewportInfo.category) {
      case 'wide': return 'text-secondary bg-secondary/10'
      case 'tall': return 'text-secondary-foreground bg-purple-900/10'
      default: return 'text-secondary bg-green-900/10'
    }
  }

  const getOrientationColor = () => {
    return viewportInfo.orientation === 'landscape' 
      ? 'text-foreground bg-orange-900/10' 
      : 'text-foreground bg-pink-900/10'
  }

  // Dynamic styles based on viewport
  const getContentStyles = () => {
    const baseStyles = "transition-all duration-300 rounded-lg p-6 "
    
    if (viewportInfo.category === 'wide') {
      return baseStyles + "bg-gradient-to-r from-muted/30 to-muted/50"
    } else if (viewportInfo.category === 'tall') {
      return baseStyles + "bg-gradient-to-b from-muted/30 to-muted/50"
    } else {
      return baseStyles + "bg-gradient-to-br from-muted/30 to-muted/50"
    }
  }

  const getGridColumns = () => {
    if (viewportInfo.category === 'wide' && viewportInfo.deviceType === 'desktop') {
      return 'grid-cols-4'
    } else if (viewportInfo.deviceType === 'tablet' || viewportInfo.category === 'standard') {
      return 'grid-cols-2'
    } else {
      return 'grid-cols-1'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Viewport-Based Effects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Viewport Information */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Current Viewport Analysis</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-card rounded p-3 text-center">
                <div className="flex items-center justify-center mb-2">
                  {getDeviceIcon()}
                </div>
                <div className="font-bold capitalize">{viewportInfo.deviceType}</div>
                <div className="text-xs text-muted-foreground">Device Type</div>
              </div>
              <div className={`rounded p-3 text-center ${getOrientationColor()}`}>
                <div className="text-lg font-bold capitalize">{viewportInfo.orientation}</div>
                <div className="text-xs opacity-75">Orientation</div>
              </div>
              <div className={`rounded p-3 text-center ${getCategoryColor()}`}>
                <div className="text-lg font-bold capitalize">{viewportInfo.category}</div>
                <div className="text-xs opacity-75">Aspect Category</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold">{viewportInfo.aspectRatio}:1</div>
                <div className="text-xs text-muted-foreground">Aspect Ratio</div>
              </div>
            </div>
            <div className="mt-3 text-center text-sm">
              <strong>Dimensions:</strong> {viewportInfo.width} × {viewportInfo.height} pixels
            </div>
          </div>

          {/* Adaptive Content Layout */}
          <div className={viewportClass}>
            <div className={getContentStyles()}>
              <h3 className="font-semibold mb-3 text-center">
                Viewport-Aware Content Layout
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                This content adapts its styling and layout based on your viewport characteristics.
              </p>
              
              {/* Dynamic grid based on viewport */}
              <div className={`grid ${getGridColumns()} gap-4 mb-4`}>
                {Array.from({ length: viewportInfo.category === 'wide' ? 8 : 4 }, (_, i) => (
                  <div key={i} className="bg-card/80 rounded-lg p-3 text-center text-sm">
                    <div className="font-medium mb-1">Card {i + 1}</div>
                    <div className="text-xs text-muted-foreground">
                      Adapts to {viewportInfo.category} layout
                    </div>
                  </div>
                ))}
              </div>

              {/* Orientation-specific content */}
              {viewportInfo.orientation === 'landscape' ? (
                <div className="bg-card/50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Monitor className="w-5 h-5" />
                    <span className="font-medium">Landscape Mode Active</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Content is optimized for horizontal viewing with wider layouts
                  </div>
                </div>
              ) : (
                <div className="bg-card/50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Square className="w-5 h-5 rotate-45" />
                    <span className="font-medium">Portrait Mode Active</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Content is optimized for vertical viewing with stacked layouts
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Viewport Classes Applied */}
          <div className="bg-card border rounded-lg p-4">
            <h4 className="font-medium mb-3">Applied CSS Classes</h4>
            <div className="bg-muted rounded p-3 font-mono text-sm">
              <span className="text-secondary">.{viewportClass.replace(' ', ' .')}</span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              These classes are dynamically applied based on viewport analysis and can be used 
              for CSS styling or JavaScript logic.
            </div>
          </div>

          {/* Breakpoint Details */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3 text-sm">Viewport Classification Rules</h4>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Aspect Ratio Categories:</strong>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  <li>• <span className="text-secondary">Wide Screen</span>: Ratio {'>'} 1.5 (16:9 monitors, ultrawide displays)</li>
                  <li>• <span className="text-secondary-foreground">Tall Screen</span>: Ratio {'<'} 0.8 (mobile portrait, vertical monitors)</li>
                  <li>• <span className="text-secondary">Standard Screen</span>: 0.8 ≤ Ratio ≤ 1.5 (most tablets, square displays)</li>
                </ul>
              </div>
              
              <div>
                <strong>Device Type Detection:</strong>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  <li>• <span className="text-muted-foreground">Mobile</span>: Width {'<'} 768px</li>
                  <li>• <span className="text-foreground">Tablet</span>: 768px {'≤'} Width {'<'} 1024px</li>
                  <li>• <span className="text-secondary">Desktop</span>: Width {'≥'} 1024px</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-indigo-900/10 p-3 rounded">
            <strong>Viewport Effects Demo:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Resize your window to see dynamic layout and styling changes</li>
              <li>Try rotating your device (mobile/tablet) to see orientation effects</li>
              <li>Different aspect ratios trigger different color schemes and layouts</li>
              <li>Grid columns adapt based on screen category and device type</li>
              <li>CSS classes are applied automatically for custom styling</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
