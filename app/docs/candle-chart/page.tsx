"use client"

import { CandleChart } from "@/components/Data/CandleChart"
import { InstallationTabs } from "@/components/internal/installation"
import { DocsPage, PropsTable, type PropsTableRow, type TocItem } from "@/components/internal/docs"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { config } from "@/lib/config"

const sampleCandles = [
  { open: 134.2, high: 136.9, low: 133.5, close: 136.1, label: "Mon" },
  { open: 136.1, high: 137.8, low: 134.7, close: 135.2, label: "Tue" },
  { open: 135.2, high: 138.4, low: 134.9, close: 137.9, label: "Wed" },
  { open: 137.9, high: 139.2, low: 136.8, close: 138.6, label: "Thu" },
  { open: 138.6, high: 140.4, low: 137.1, close: 139.8, label: "Fri" },
  { open: 139.8, high: 142.3, low: 139.2, close: 141.7, label: "Mon" },
  { open: 141.7, high: 143.1, low: 140.6, close: 142.8, label: "Tue" },
  { open: 142.8, high: 144.0, low: 141.2, close: 141.9, label: "Wed" },
  { open: 141.9, high: 143.7, low: 140.4, close: 140.9, label: "Thu" },
  { open: 140.9, high: 142.6, low: 139.8, close: 142.3, label: "Fri" },
  { open: 142.3, high: 144.9, low: 141.7, close: 144.2, label: "Mon" },
  { open: 144.2, high: 145.1, low: 142.6, close: 143.0, label: "Tue" },
]

export default function CandleChartDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "example", title: "Example" },
    { id: "props", title: "Props" },
  ]

  const propsRows: PropsTableRow[] = [
    {
      prop: "data",
      type: 'Record<"open" | "close" | "high" | "low", number> & { label?: string }[]',
      description: "Series of OHLC points; `label` renders in the hover panel.",
      required: true,
    },
    {
      prop: "height",
      type: "number",
      defaultValue: "320",
      description: "Pixel height for the responsive SVG canvas.",
    },
    {
      prop: "padding",
      type: "number",
      defaultValue: "16",
      description: "Inner padding applied to chart edges.",
    },
    {
      prop: "positiveColor",
      type: "string",
      defaultValue: "#22c55e",
      description: "Body and wick color for bullish candles.",
    },
    {
      prop: "negativeColor",
      type: "string",
      defaultValue: "#ef4444",
      description: "Body and wick color for bearish candles.",
    },
    {
      prop: "neutralColor",
      type: "string",
      defaultValue: "#a3a3a3",
      description: "Color used when open equals close.",
    },
    {
      prop: "candleWidth",
      type: "number",
      defaultValue: "12",
      description: "Body width in viewBox units.",
    },
    {
      prop: "gap",
      type: "number",
      defaultValue: "10",
      description: "Horizontal gap between candles in viewBox units.",
    },
    {
      prop: "showGrid",
      type: "boolean",
      defaultValue: "true",
      description: "Toggles horizontal grid lines and price markers.",
    },
    {
      prop: "className",
      type: "string",
      description: "Tailwind classes passed to the outer card.",
    },
  ]

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
              <BreadcrumbPage>CandleChart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "CandleChart",
              description:
                "An opinionated candlestick chart for OHLC trading data with hover crosshair, gridlines, and summary stats.",
              category: "Data · Visualization",
              status: "Preview",
              actions: <CopyableCodeBadge text={config.getNamespacePath("candle-chart")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">Generate or copy the chart component.</p>
              </div>
              <InstallationTabs componentName="candle-chart" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Pass an array of OHLC objects. Heights, gaps, and colors are configurable without
                  external charting libraries.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CodeBlock language="tsx" filename="components/Data/CandleChart.tsx">
                  {`import { CandleChart } from "@/components/Data/CandleChart"`}
                </CodeBlock>
                <CodeBlock language="tsx" filename="example.tsx">
                  {`<CandleChart
  data={candles}
  height={300}
  positiveColor="#10b981"
  negativeColor="#ef4444"
/>`}
                </CodeBlock>
              </div>
            </section>

            <section id="example" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Example</h2>
                <p className="text-muted-foreground">
                  Hover to inspect each candle—gridlines and the floating panel mirror the selected
                  bar.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <CandleChart data={sampleCandles} />
              </div>
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  Extend the base type if you need additional metadata—only the OHLC keys are
                  required.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
