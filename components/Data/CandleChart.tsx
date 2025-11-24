"use client"

import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type CandleDatum = Record<"open" | "close" | "high" | "low", number> & {
  label?: string
}

interface CandleChartProps<TDatum extends CandleDatum = CandleDatum> {
  data: TDatum[]
  height?: number
  className?: string
  padding?: number
  positiveColor?: string
  negativeColor?: string
  neutralColor?: string
  candleWidth?: number
  gap?: number
  showGrid?: boolean
  zoomable?: boolean
  minZoom?: number
  maxZoom?: number
  zoomStep?: number
}

const defaultFormatter = (value: number) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)

export function CandleChart({
  data,
  height = 320,
  className,
  padding = 16,
  positiveColor = "#22c55e",
  negativeColor = "#ef4444",
  neutralColor = "#a3a3a3",
  candleWidth = 12,
  gap = 10,
  showGrid = true,
  zoomable = false,
  minZoom = 0.5,
  maxZoom = 3,
  zoomStep = 0.2,
}: CandleChartProps) {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const [zoom, setZoom] = React.useState(1)

  const stats = React.useMemo(() => {
    if (data.length === 0) return null

    const highs = data.map(d => d.high)
    const lows = data.map(d => d.low)
    const maxHigh = Math.max(...highs)
    const minLow = Math.min(...lows)
    const latest = data[data.length - 1]
    const change = latest.close - latest.open
    const changePct = latest.open === 0 ? 0 : (change / latest.open) * 100

    return { maxHigh, minLow, latest, change, changePct }
  }, [data])

  const layout = React.useMemo(() => {
    if (data.length === 0) {
      return {
        viewWidth: 100,
        viewHeight: height,
        yScale: () => {
          return height / 2
        },
      }
    }

    const highs = data.map(d => d.high)
    const lows = data.map(d => d.low)
    const maxHigh = Math.max(...highs)
    const minLow = Math.min(...lows)
    const range = maxHigh - minLow || 1
    const effectiveWidth = candleWidth * zoom
    const effectiveGap = gap * zoom
    const viewWidth =
      padding * 2 + data.length * effectiveWidth + Math.max(0, (data.length - 1) * effectiveGap)
    const viewHeight = height
    const drawableHeight = height - padding * 2

    const yScale = (value: number) =>
      padding + ((maxHigh - value) / range) * drawableHeight

    return {
      viewWidth,
      viewHeight,
      yScale,
      maxHigh,
      minLow,
      range,
      effectiveWidth,
      effectiveGap,
    }
  }, [candleWidth, data, gap, height, padding, zoom])

  const gridLines = React.useMemo(() => {
    if (!showGrid || !layout.range || data.length === 0) return []
    const steps = 4
    const lines = []
    for (let i = 0; i <= steps; i++) {
      const value = layout.maxHigh - (layout.range / steps) * i
      const y = layout.yScale(value)
      lines.push({ y, value })
    }
    return lines
  }, [data.length, layout, showGrid])

  const resolveColor = (datum: CandleDatum) => {
    if (datum.close > datum.open) return positiveColor
    if (datum.close < datum.open) return negativeColor
    return neutralColor
  }

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const normalizedX = (offsetX / rect.width) * layout.viewWidth - padding
    const stride = (layout.effectiveWidth ?? candleWidth) + (layout.effectiveGap ?? gap)
    const index = Math.max(0, Math.min(data.length - 1, Math.floor(normalizedX / stride)))
    setActiveIndex(isFinite(index) ? index : null)
  }

  const handleWheel = (event: React.WheelEvent<SVGSVGElement>) => {
    if (!zoomable) return
    event.preventDefault()
    const direction = event.deltaY > 0 ? -1 : 1
    const nextZoom = Math.min(maxZoom, Math.max(minZoom, zoom + direction * zoomStep))
    setZoom(nextZoom)
  }

  const handlePointerLeave = () => setActiveIndex(null)

  if (data.length === 0) {
    return (
      <Card className={cn("border-dashed bg-muted/40", className)}>
        <CardContent className="flex h-[280px] items-center justify-center text-muted-foreground">
          No candle data to display.
        </CardContent>
      </Card>
    )
  }

  const activeCandle = activeIndex != null ? data[activeIndex] : stats?.latest

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">CandleChart</CardTitle>
            <p className="text-sm text-muted-foreground">
              Visualize OHLC series with bullish/bearish coloring, crosshair hover, and gridlines.
            </p>
          </div>
          {stats ? (
            <div className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
              <div className="text-sm">
                <div className="text-xs text-muted-foreground">Last</div>
                <div className="font-semibold">
                  {defaultFormatter(stats.latest.close)}
                  {stats.latest.label ? ` · ${stats.latest.label}` : ""}
                </div>
              </div>
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium",
                  stats.change > 0
                    ? "bg-emerald-500/15 text-emerald-500"
                    : stats.change < 0
                      ? "bg-red-500/15 text-red-500"
                      : "bg-muted-foreground/10 text-muted-foreground"
                )}
              >
                {stats.change > 0 ? "+" : ""}
                {defaultFormatter(stats.change)} ({stats.changePct.toFixed(2)}%)
              </span>
            </div>
          ) : null}
        </div>

        {stats ? (
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between rounded-md border px-3 py-2">
              <span>High</span>
              <span className="font-medium text-foreground">{defaultFormatter(stats.maxHigh)}</span>
            </div>
            <div className="flex items-center justify-between rounded-md border px-3 py-2">
              <span>Low</span>
              <span className="font-medium text-foreground">{defaultFormatter(stats.minLow)}</span>
            </div>
            <div className="flex items-center justify-between rounded-md border px-3 py-2">
              <span>Range</span>
              <span className="font-medium text-foreground">
                {defaultFormatter(stats.maxHigh - stats.minLow)}
              </span>
            </div>
          </div>
        ) : null}
      </CardHeader>

      <CardContent className="pt-2">
        <div className="relative">
          <svg
            ref={svgRef}
            role="img"
            aria-label="Candlestick chart"
            viewBox={`0 0 ${layout.viewWidth} ${layout.viewHeight}`}
            className="w-full overflow-visible"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onWheel={handleWheel}
          >
            {gridLines.map(line => (
              <g key={line.y}>
                <line
                  x1={0}
                  x2={layout.viewWidth}
                  y1={line.y}
                  y2={line.y}
                  stroke="currentColor"
                  strokeWidth={0.75}
                  strokeDasharray="4 4"
                  opacity={0.35}
                />
                <text
                  x={layout.viewWidth - 4}
                  y={line.y - 5}
                  textAnchor="end"
                  fontSize={10}
                  fill="currentColor"
                  opacity={0.6}
                >
                  {defaultFormatter(line.value)}
                </text>
              </g>
            ))}

            {data.map((datum, index) => {
              const width = layout.effectiveWidth ?? candleWidth
              const spacing = layout.effectiveGap ?? gap
              const x = padding + index * (width + spacing)
              const wickX = x + width / 2
              const yHigh = layout.yScale(datum.high)
              const yLow = layout.yScale(datum.low)
              const yOpen = layout.yScale(datum.open)
              const yClose = layout.yScale(datum.close)
              const bodyY = Math.min(yOpen, yClose)
              const bodyHeight = Math.max(2, Math.abs(yClose - yOpen))
              const color = resolveColor(datum)
              const isActive = activeIndex === index

              return (
                <g key={`${datum.label ?? index}-${index}`}>
                  {isActive ? (
                    <rect
                      x={x - gap / 2}
                      y={0}
                      width={candleWidth + gap}
                      height={layout.viewHeight}
                      fill="rgba(59,130,246,0.08)"
                    />
                  ) : null}
                  <line
                    x1={wickX}
                    x2={wickX}
                    y1={yHigh}
                    y2={yLow}
                    stroke={color}
                    strokeWidth={isActive ? 2 : 1.5}
                    strokeLinecap="round"
                    opacity={isActive ? 1 : 0.9}
                  />
                  <rect
                    x={x}
                    y={bodyY}
                    width={width}
                    height={bodyHeight}
                    fill={color}
                    rx={isActive ? 2 : 1}
                    opacity={isActive ? 1 : 0.9}
                  >
                    <title>
                      {`Open ${datum.open}, High ${datum.high}, Low ${datum.low}, Close ${datum.close}${
                        datum.label ? ` · ${datum.label}` : ""
                      }`}
                    </title>
                  </rect>
                  {isActive ? (
                    <rect
                      x={x - gap / 2}
                      y={0}
                      width={width + spacing}
                      height={layout.viewHeight}
                      fill="rgba(59,130,246,0.06)"
                    />
                  ) : null}
                </g>
              )
            })}
          </svg>

          {activeCandle ? (
            <div className="pointer-events-none absolute left-3 top-3 rounded-lg bg-background/90 px-3 py-2 shadow-sm ring-1 ring-border">
              <div className="text-xs text-muted-foreground">
                {activeIndex != null && data[activeIndex]?.label ? data[activeIndex].label : "Latest"}
              </div>
              <div className="flex gap-3 text-sm font-medium">
                <span>O {defaultFormatter(activeCandle.open)}</span>
                <span>H {defaultFormatter(activeCandle.high)}</span>
                <span>L {defaultFormatter(activeCandle.low)}</span>
                <span>C {defaultFormatter(activeCandle.close)}</span>
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
