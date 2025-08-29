"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Database, Server, BarChart3 } from "lucide-react"
import { useState } from "react"
import useRevalidate from "@/hooks/useRevalidate"

export default function BulkDataRevalidationExample() {
  const [revalidateCount, setRevalidateCount] = useState(0)
  const [lastRevalidate, setLastRevalidate] = useState<string>("")
  const [revalidationHistory, setRevalidationHistory] = useState<
    Array<{
      urls: string[]
      timestamp: string
      type: string
    }>
  >([])
  const { revalidate } = useRevalidate()

  const handleRevalidate = (urls: string[], type: string) => {
    revalidate(urls)
    const timestamp = new Date().toLocaleTimeString()
    setRevalidateCount(prev => prev + 1)
    setLastRevalidate(timestamp)
    setRevalidationHistory(prev => [
      ...prev.slice(-4), // Keep last 4 entries
      { urls, timestamp, type },
    ])
  }

  const sampleUrls = ["/api/users", "/api/posts", "/api/comments", "/api/analytics"]

  const clearHistory = () => {
    setRevalidationHistory([])
    setRevalidateCount(0)
    setLastRevalidate("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Bulk Data Revalidation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Revalidation Stats */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Revalidation Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-card rounded p-3 text-center">
                <div className="text-2xl font-bold text-secondary">{revalidateCount}</div>
                <div className="text-xs text-muted-foreground">Total Calls</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-secondary">
                  {revalidationHistory.reduce((acc, curr) => acc + curr.urls.length, 0)}
                </div>
                <div className="text-xs text-muted-foreground">URLs Revalidated</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-sm font-bold text-secondary-foreground">
                  {lastRevalidate || "Never"}
                </div>
                <div className="text-xs text-muted-foreground">Last Revalidation</div>
              </div>
            </div>
          </div>

          {/* Revalidation Actions */}
          <div className="bg-card border rounded-lg p-4">
            <h4 className="font-medium mb-3">Revalidation Actions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                onClick={() => handleRevalidate(["/api/users"], "User Data")}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                <Database className="h-4 w-4 mr-2" />
                Refresh Users Only
              </Button>
              <Button
                onClick={() => handleRevalidate(["/api/posts", "/api/comments"], "Content Data")}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                <Server className="h-4 w-4 mr-2" />
                Refresh Content
              </Button>
              <Button
                onClick={() =>
                  handleRevalidate(["/api/analytics", "/api/reports"], "Analytics Data")
                }
                variant="outline"
                size="sm"
                className="justify-start"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Refresh Analytics
              </Button>
              <Button
                onClick={() => handleRevalidate(sampleUrls, "All Data")}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Everything
              </Button>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Click buttons to simulate SWR cache revalidation calls
              </div>
              <Button onClick={clearHistory} variant="outline" size="sm">
                Clear History
              </Button>
            </div>
          </div>

          {/* Sample API Endpoints */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3 text-sm">Sample API Endpoints</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {sampleUrls.map(url => (
                <div key={url} className="bg-card rounded px-3 py-2">
                  <div className="font-mono text-xs text-secondary">{url}</div>
                  <div className="text-xs text-muted-foreground">
                    {url.includes("users")
                      ? "User data"
                      : url.includes("posts")
                        ? "Post data"
                        : url.includes("comments")
                          ? "Comment data"
                          : "Analytics data"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revalidation History */}
          {revalidationHistory.length > 0 && (
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-medium mb-3 text-sm">Recent Revalidations</h4>
              <div className="space-y-2">
                {revalidationHistory.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm"
                  >
                    <div>
                      <div className="font-medium">{entry.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.urls.join(", ")} ({entry.urls.length} endpoints)
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{entry.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-warn-soft/10 p-3 rounded">
            <strong>How it works:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Each button triggers revalidation of specific SWR cache entries</li>
              <li>The hook matches cache keys by URL and triggers refetch</li>
              <li>Multiple URLs can be revalidated in a single call</li>
              <li>Real applications would have actual data that updates after revalidation</li>
              <li>Check browser console for detailed revalidation logs (if SWR is configured)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
