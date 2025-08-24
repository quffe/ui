"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { useOnWindowResize } from "@/hooks/useOnWindowResize"

export default function ChartResizingExample() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 })
  const [resizeCount, setResizeCount] = useState(0)
  const [chartData] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      x: i,
      y: Math.floor(Math.random() * 100) + 10
    }))
  )

  // Simulate chart resizing
  const resizeChart = () => {
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect()
      const newDimensions = {
        width: rect.width,
        height: rect.height
      }
      setChartDimensions(newDimensions)
      setResizeCount(prev => prev + 1)
      console.log('Chart resized to:', newDimensions)
    }
  }

  useOnWindowResize(resizeChart)

  useEffect(() => {
    // Initial size measurement
    resizeChart()
  }, [])

  const generateRandomData = () => {
    // This would trigger a chart re-render in a real chart library
    console.log('Chart data updated and resized')
  }

  // Create SVG chart elements based on dimensions
  const createChartPath = () => {
    if (!chartDimensions.width || !chartDimensions.height) return ""
    
    const padding = 40
    const chartWidth = chartDimensions.width - padding * 2
    const chartHeight = chartDimensions.height - padding * 2
    
    const points = chartData.map((point, index) => {
      const x = padding + (index / (chartData.length - 1)) * chartWidth
      const y = padding + (1 - point.y / 100) * chartHeight
      return `${x},${y}`
    })
    
    return `M ${points.join(' L ')}`
  }

  const getResponsiveSettings = () => {
    if (chartDimensions.width < 400) {
      return {
        fontSize: '12px',
        strokeWidth: 2,
        pointRadius: 3,
        showLabels: false
      }
    } else if (chartDimensions.width < 600) {
      return {
        fontSize: '14px',
        strokeWidth: 2.5,
        pointRadius: 4,
        showLabels: true
      }
    } else {
      return {
        fontSize: '16px',
        strokeWidth: 3,
        pointRadius: 5,
        showLabels: true
      }
    }
  }

  const settings = getResponsiveSettings()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Chart Resizing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart Info */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-secondary">
                  {Math.round(chartDimensions.width)}
                </div>
                <div className="text-xs text-muted-foreground">Chart Width</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-secondary">
                  {Math.round(chartDimensions.height)}
                </div>
                <div className="text-xs text-muted-foreground">Chart Height</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-secondary-foreground">{resizeCount}</div>
                <div className="text-xs text-muted-foreground">Resizes</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-foreground">{settings.strokeWidth}</div>
                <div className="text-xs text-muted-foreground">Stroke Width</div>
              </div>
            </div>
          </div>

          {/* Simulated Chart */}
          <div className="bg-card border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Responsive Chart</h4>
              <Button onClick={generateRandomData} size="sm" variant="outline">
                Update Data
              </Button>
            </div>
            
            <div
              ref={chartRef}
              className="w-full border rounded bg-gradient-to-b from-muted/30 to-muted/50"
              style={{ height: '300px', minHeight: '200px' }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
                className="overflow-visible"
              >
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Chart line */}
                <path
                  className="stroke-chart-1"
                  d={createChartPath()}
                  fill="none"
                  strokeWidth={settings.strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {chartData.map((point, index) => {
                  if (!chartDimensions.width) return null
                  const padding = 40
                  const chartWidth = chartDimensions.width - padding * 2
                  const chartHeight = chartDimensions.height - padding * 2
                  const x = padding + (index / (chartData.length - 1)) * chartWidth
                  const y = padding + (1 - point.y / 100) * chartHeight

                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r={settings.pointRadius}
                      className="fill-chart-1 hover:fill-red-soft transition-colors"
                    />
                  )
                })}
                
                {/* Y-axis labels */}
                {settings.showLabels && [0, 25, 50, 75, 100].map(value => {
                  const y = 40 + (1 - value / 100) * (chartDimensions.height - 80)
                  return (
                    <text
                      key={value}
                      x="30"
                      y={y + 5}
                      fontSize={settings.fontSize}
                      fill="#6b7280"
                      textAnchor="end"
                    >
                      {value}
                    </text>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Chart Settings */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3 text-sm">Responsive Chart Settings</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <strong>Font Size:</strong>
                <div className="text-muted-foreground">{settings.fontSize}</div>
              </div>
              <div>
                <strong>Point Radius:</strong>
                <div className="text-muted-foreground">{settings.pointRadius}px</div>
              </div>
              <div>
                <strong>Show Labels:</strong>
                <div className="text-muted-foreground">{settings.showLabels ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <strong>Chart Type:</strong>
                <div className="text-muted-foreground">
                  {chartDimensions.width < 400 ? 'Minimal' : 'Full'}
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-green-900/10 p-3 rounded">
            <strong>Chart Resize Behavior:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Chart automatically resizes to fit its container</li>
              <li>Visual elements scale proportionally (points, lines, text)</li>
              <li>Labels hide on small screens to reduce clutter</li>
              <li>Stroke width and point size adjust for better visibility</li>
              <li>Real chart libraries would handle this with similar resize handlers</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
