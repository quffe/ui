'use client'

import { useState, useRef } from 'react'
import { useStateChangeEffect } from '@/hooks/useStateChangeEffect'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Palette, RefreshCw } from 'lucide-react'

interface DataPoint {
  label: string
  value: number
  category: string
}

const generateMockData = (): DataPoint[] => [
  { label: 'Product A', value: Math.floor(Math.random() * 100) + 20, category: 'electronics' },
  { label: 'Product B', value: Math.floor(Math.random() * 100) + 20, category: 'books' },
  { label: 'Product C', value: Math.floor(Math.random() * 100) + 20, category: 'clothing' },
  { label: 'Product D', value: Math.floor(Math.random() * 100) + 20, category: 'electronics' },
  { label: 'Product E', value: Math.floor(Math.random() * 100) + 20, category: 'books' },
  { label: 'Product F', value: Math.floor(Math.random() * 100) + 20, category: 'clothing' }
]

export default function DataVisualizationExample() {
  const [data, setData] = useState<DataPoint[]>(generateMockData())
  const [chartConfig, setChartConfig] = useState({
    type: 'bar',
    colors: ['#3b82f6', '#ef4444', '#10b981'],
    animation: true
  })
  const [filters, setFilters] = useState({
    categories: [] as string[],
    minValue: 0
  })
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart')
  const [renderCount, setRenderCount] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Recompute visualization whenever any dependency changes
  useStateChangeEffect(() => {
    const filteredData = applyFilters(data, filters)
    const chartData = transformDataForChart(filteredData, chartConfig)
    
    if (viewMode === 'chart') {
      renderChart(chartData, chartConfig)
    }
    
    setRenderCount(prev => prev + 1)
    
    // Simulate URL params update for sharing
    console.log('Updated visualization with:', {
      config: chartConfig,
      filters: filters,
      view: viewMode,
      dataCount: filteredData.length
    })
  }, [data, chartConfig, filters, viewMode])

  const applyFilters = (rawData: DataPoint[], currentFilters: typeof filters) => {
    return rawData
      .filter(item => currentFilters.categories.length === 0 || currentFilters.categories.includes(item.category))
      .filter(item => item.value >= currentFilters.minValue)
  }

  const transformDataForChart = (rawData: DataPoint[], config: typeof chartConfig) => {
    // Simple data transformation for visualization
    return rawData.map(item => ({
      ...item,
      normalizedValue: config.animation ? item.value * 1.1 : item.value
    }))
  }

  const renderChart = (chartData: any[], config: typeof chartConfig) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Simple bar chart rendering
    const barWidth = Math.floor(canvas.width / chartData.length) - 10
    const maxValue = Math.max(...chartData.map(d => d.value))

    chartData.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * (canvas.height - 40)
      const x = index * (barWidth + 10) + 5
      const y = canvas.height - barHeight - 20

      // Choose color based on category
      const colorIndex = ['electronics', 'books', 'clothing'].indexOf(item.category)
      ctx.fillStyle = config.colors[colorIndex] || config.colors[0]
      
      // Draw bar
      ctx.fillRect(x, y, barWidth, barHeight)
      
      // Draw label
      ctx.fillStyle = '#666'
      ctx.font = '10px Arial'
      ctx.fillText(item.label.slice(0, 8), x, canvas.height - 5)
    })
  }

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const refreshData = () => {
    setData(generateMockData())
  }

  const filteredData = applyFilters(data, filters)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Data Visualization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Chart Type</Label>
            <Select 
              value={chartConfig.type} 
              onValueChange={(value) => setChartConfig(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>View Mode</Label>
            <Select value={viewMode} onValueChange={(value: 'chart' | 'table') => setViewMode(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chart">Chart View</SelectItem>
                <SelectItem value="table">Table View</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Min Value: {filters.minValue}</Label>
            <input
              type="range"
              min="0"
              max="50"
              value={filters.minValue}
              onChange={(e) => setFilters(prev => ({ ...prev, minValue: Number(e.target.value) }))}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="animation">Animation</Label>
            <Switch
              id="animation"
              checked={chartConfig.animation}
              onCheckedChange={(checked) => setChartConfig(prev => ({ ...prev, animation: checked }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Categories Filter</Label>
          <div className="flex gap-2 flex-wrap">
            {['electronics', 'books', 'clothing'].map(category => (
              <Badge
                key={category}
                variant={filters.categories.includes(category) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Renders: {renderCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="text-sm">Items: {filteredData.length}</span>
            </div>
          </div>
          <Button onClick={refreshData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        <div className="min-h-[300px] border rounded-md p-4">
          {viewMode === 'chart' ? (
            <canvas
              ref={canvasRef}
              width={600}
              height={250}
              className="w-full h-full border rounded"
            />
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4 font-semibold text-sm border-b pb-2">
                <div>Label</div>
                <div>Category</div>
                <div>Value</div>
              </div>
              {filteredData.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 text-sm py-1">
                  <div>{item.label}</div>
                  <div>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
