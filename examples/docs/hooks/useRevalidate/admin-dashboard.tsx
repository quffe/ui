"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, MessageSquare, TrendingUp, RefreshCw } from "lucide-react"
import { useState } from "react"
import useRevalidate from "@/hooks/useRevalidate"

export default function AdminDashboardExample() {
  const [lastRefresh, setLastRefresh] = useState<{ [key: string]: string }>({})
  const [refreshCounts, setRefreshCounts] = useState<{ [key: string]: number }>({})
  const [isRefreshing, setIsRefreshing] = useState<{ [key: string]: boolean }>({})
  const { revalidate } = useRevalidate()

  const handleRefresh = async (type: string, urls: string[]) => {
    setIsRefreshing(prev => ({ ...prev, [type]: true }))

    // Simulate some async work
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700))

    revalidate(urls)

    const timestamp = new Date().toLocaleTimeString()
    setLastRefresh(prev => ({ ...prev, [type]: timestamp }))
    setRefreshCounts(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }))
    setIsRefreshing(prev => ({ ...prev, [type]: false }))
  }

  const refreshActions = [
    {
      id: "users",
      title: "User Data",
      description: "Refresh all user-related information",
      icon: Users,
      color: "bg-secondary/10 border-secondary/30 text-secondary",
      urls: ["/api/users", "/api/users/active", "/api/users/stats", "/api/analytics/users"],
      items: ["User List", "Active Users", "User Statistics", "User Analytics"],
    },
    {
      id: "content",
      title: "Content Data",
      description: "Refresh posts, comments, and content metrics",
      icon: FileText,
      color: "bg-green-900/10 border-green-200 text-secondary",
      urls: [
        "/api/posts",
        "/api/posts/published",
        "/api/posts/stats",
        "/api/comments",
        "/api/analytics/content",
      ],
      items: ["All Posts", "Published Posts", "Post Statistics", "Comments", "Content Analytics"],
    },
    {
      id: "analytics",
      title: "Analytics Data",
      description: "Refresh all analytics and reporting data",
      icon: TrendingUp,
      color: "bg-purple-900/10 border-purple-200 text-secondary-foreground",
      urls: [
        "/api/analytics",
        "/api/analytics/traffic",
        "/api/analytics/conversion",
        "/api/reports",
        "/api/dashboard",
      ],
      items: ["General Analytics", "Traffic Data", "Conversions", "Reports", "Dashboard"],
    },
    {
      id: "system",
      title: "System Data",
      description: "Refresh system settings and configurations",
      icon: MessageSquare,
      color: "bg-orange-900/10 border-orange-200 text-foreground",
      urls: ["/api/settings", "/api/system/health", "/api/notifications", "/api/audit-logs"],
      items: ["Settings", "System Health", "Notifications", "Audit Logs"],
    },
  ]

  const refreshAllData = async () => {
    setIsRefreshing(prev => ({ ...prev, all: true }))

    const allUrls = refreshActions.flatMap(action => action.urls)
    revalidate(allUrls)

    await new Promise(resolve => setTimeout(resolve, 1200))

    const timestamp = new Date().toLocaleTimeString()
    setLastRefresh(prev => ({ ...prev, all: timestamp }))
    setRefreshCounts(prev => ({ ...prev, all: (prev.all || 0) + 1 }))
    setIsRefreshing(prev => ({ ...prev, all: false }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Admin Dashboard Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Global Refresh */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4 border border-indigo-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-indigo-700">Global Refresh</h3>
                <p className="text-sm text-muted-foreground">
                  Refresh all data across the entire admin panel
                </p>
              </div>
              <Button
                onClick={refreshAllData}
                disabled={isRefreshing.all}
                variant="outline"
                className="bg-card"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing.all ? "animate-spin" : ""}`} />
                {isRefreshing.all ? "Refreshing..." : "Refresh All"}
              </Button>
            </div>

            {(lastRefresh.all || refreshCounts.all) && (
              <div className="flex items-center gap-4 text-sm">
                {lastRefresh.all && (
                  <span className="text-muted-foreground">
                    Last refresh: <strong>{lastRefresh.all}</strong>
                  </span>
                )}
                {refreshCounts.all && (
                  <Badge variant="secondary">
                    {refreshCounts.all} refresh{refreshCounts.all > 1 ? "es" : ""}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Individual Refresh Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {refreshActions.map(action => {
              const IconComponent = action.icon
              const isLoading = isRefreshing[action.id]
              const count = refreshCounts[action.id]
              const lastTime = lastRefresh[action.id]

              return (
                <div key={action.id} className={`rounded-lg p-4 border ${action.color}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5" />
                      <div>
                        <h4 className="font-medium">{action.title}</h4>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm font-medium mb-2">Will refresh:</div>
                    <div className="flex flex-wrap gap-1">
                      {action.items.map(item => (
                        <Badge key={item} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {lastTime && <div>Last: {lastTime}</div>}
                      {count && (
                        <div>
                          {count} refresh{count > 1 ? "es" : ""}
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => handleRefresh(action.id, action.urls)}
                      disabled={isLoading}
                      size="sm"
                      variant="outline"
                      className="bg-card"
                    >
                      <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? "animate-spin" : ""}`} />
                      {isLoading ? "Refreshing..." : "Refresh"}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Refresh Statistics */}
          <div className="bg-card border rounded-lg p-4">
            <h4 className="font-medium mb-3">Refresh Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              {[...refreshActions, { id: "all", title: "Global" }].map(action => (
                <div key={action.id} className="text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {refreshCounts[action.id] || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">{action.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Dashboard Components */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border rounded-lg p-4">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                User Stats
              </h5>
              <div className="text-2xl font-bold text-secondary">1,234</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
              <div className="text-xs text-muted-foreground mt-2">
                {lastRefresh.users ? `Updated: ${lastRefresh.users}` : "Not refreshed yet"}
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Content Stats
              </h5>
              <div className="text-2xl font-bold text-secondary">567</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
              <div className="text-xs text-muted-foreground mt-2">
                {lastRefresh.content ? `Updated: ${lastRefresh.content}` : "Not refreshed yet"}
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Analytics
              </h5>
              <div className="text-2xl font-bold text-secondary-foreground">89%</div>
              <div className="text-sm text-muted-foreground">Engagement Rate</div>
              <div className="text-xs text-muted-foreground mt-2">
                {lastRefresh.analytics ? `Updated: ${lastRefresh.analytics}` : "Not refreshed yet"}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-secondary/10 p-3 rounded">
            <strong>Admin Dashboard Demo:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Each section refreshes specific groups of related API endpoints</li>
              <li>Global refresh revalidates all endpoints across the entire dashboard</li>
              <li>Refresh actions are debounced and show loading states</li>
              <li>Statistics track how many times each section has been refreshed</li>
              <li>In a real app, the dashboard components would update with fresh data</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
