"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useOnWindowResize } from "@/hooks/useOnWindowResize"

export default function ResponsiveLayoutExample() {
  const [isMobile, setIsMobile] = useState(false)
  const [columns, setColumns] = useState(1)
  const [itemSize, setItemSize] = useState("small")

  useOnWindowResize(() => {
    const width = window.innerWidth
    setIsMobile(width < 768)

    // Dynamic column calculation
    if (width >= 1200) {
      setColumns(4)
      setItemSize("large")
    } else if (width >= 768) {
      setColumns(3)
      setItemSize("medium")
    } else if (width >= 640) {
      setColumns(2)
      setItemSize("small")
    } else {
      setColumns(1)
      setItemSize("tiny")
    }
  })

  // Sample items
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    content: `This is content for item ${i + 1}. The layout adapts based on screen size.`,
    color: [
      "from-red-soft/20 to-red-deep/30",
      "from-primary/20 to-primary/30",
      "from-secondary/20 to-secondary/30",
      "from-warn-soft/20 to-warn-deep/30",
      "from-accent/20 to-accent/30",
      "from-muted/20 to-muted/30",
    ][i % 6],
  }))

  const getGridClass = () => {
    switch (columns) {
      case 4:
        return "grid-cols-4"
      case 3:
        return "grid-cols-3"
      case 2:
        return "grid-cols-2"
      default:
        return "grid-cols-1"
    }
  }

  const getItemPadding = () => {
    switch (itemSize) {
      case "large":
        return "p-6"
      case "medium":
        return "p-4"
      case "small":
        return "p-3"
      default:
        return "p-2"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Responsive Layout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Layout Info */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-secondary">{columns}</div>
                <div className="text-xs text-muted-foreground">Columns</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-secondary">{isMobile ? "Yes" : "No"}</div>
                <div className="text-xs text-muted-foreground">Mobile</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-secondary-foreground capitalize">
                  {itemSize}
                </div>
                <div className="text-xs text-muted-foreground">Item Size</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-foreground">
                  {isMobile ? "Stacked" : "Grid"}
                </div>
                <div className="text-xs text-muted-foreground">Layout Type</div>
              </div>
            </div>
          </div>

          {/* Responsive Grid */}
          <div className={`grid ${getGridClass()} gap-4`}>
            {items.map(item => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${item.color} rounded-lg ${getItemPadding()} ${
                  isMobile ? "text-sm" : "text-base"
                }`}
              >
                <h3 className={`font-semibold mb-2 ${isMobile ? "text-base" : "text-lg"}`}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.content}</p>
                {!isMobile && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      Column width adapts to screen size
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Responsive Navigation Simulation */}
          <div className="bg-card border rounded-lg p-4">
            <h4 className="font-medium mb-3">Navigation Layout</h4>
            <nav className={`flex ${isMobile ? "flex-col space-y-2" : "flex-row space-x-4"}`}>
              {["Home", "About", "Services", "Contact"].map(item => (
                <a
                  key={item}
                  href="#"
                  className={`${
                    isMobile
                      ? "w-full text-center py-2 px-4 bg-secondary/10 text-secondary rounded"
                      : "px-3 py-1 text-secondary hover:text-secondary/80"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-secondary/10 p-3 rounded">
            <strong>Responsive Behavior:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>
                <strong>≥1200px:</strong> 4 columns, large items, horizontal nav
              </li>
              <li>
                <strong>768-1199px:</strong> 3 columns, medium items, horizontal nav
              </li>
              <li>
                <strong>640-767px:</strong> 2 columns, small items, vertical nav
              </li>
              <li>
                <strong>&lt;640px:</strong> 1 column, tiny items, stacked nav
              </li>
              <li>Resize your browser to see the layout adapt automatically</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
