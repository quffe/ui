"use client"

import { useState } from "react"
import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, User, Activity, Eye } from "lucide-react"

interface AnalyticsEvent {
  id: string
  type: string
  data: Record<string, unknown>
  timestamp: string
}

// Mock analytics object
const analytics = {
  track: (event: string, properties: Record<string, unknown>) => {
    console.log("Analytics tracked:", event, properties)
  },
  identify: (userId: string, traits: Record<string, unknown>) => {
    console.log("User identified:", userId, traits)
  },
}

export default function AnalyticsTrackingExample() {
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null)
  const [page, setPage] = useState("/")
  const [filters, setFilters] = useState({ category: "", sortBy: "name" })
  const [events, setEvents] = useState<AnalyticsEvent[]>([])

  // Track user interactions and state changes
  useStateChangeEffect(() => {
    if (user) {
      const event = {
        id: Date.now().toString(),
        type: "user_interaction",
        data: {
          userId: user.id,
          page: page,
          filters: filters,
          timestamp: new Date().toISOString(),
        },
        timestamp: new Date().toLocaleTimeString(),
      }

      analytics.track("user_interaction", event.data)
      setEvents(prev => [event, ...prev.slice(0, 4)]) // Keep only last 5 events
    }
  }, [user, page, filters])

  // Track specific user actions
  useStateChangeEffect(() => {
    if (user) {
      const event = {
        id: Date.now().toString(),
        type: "user_identified",
        data: {
          email: user.email,
          name: user.name,
          lastSeen: new Date().toISOString(),
        },
        timestamp: new Date().toLocaleTimeString(),
      }

      analytics.identify(user.id, event.data)
      setEvents(prev => [event, ...prev.slice(0, 4)])
    }
  }, [user])

  const simulateLogin = () => {
    setUser({
      id: "user_" + Date.now(),
      email: "user@example.com",
      name: "John Doe",
    })
  }

  const simulateLogout = () => {
    setUser(null)
    setEvents([])
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Analytics Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <Label>User Status</Label>
            </div>

            {user ? (
              <div className="space-y-2">
                <div className="text-sm">
                  <div>
                    ID: <code className="text-xs">{user.id}</code>
                  </div>
                  <div>Name: {user.name}</div>
                  <div>Email: {user.email}</div>
                </div>
                <Button onClick={simulateLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={simulateLogin} size="sm">
                Simulate Login
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Page</Label>
              <Select value={page} onValueChange={setPage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/">Home</SelectItem>
                  <SelectItem value="/products">Products</SelectItem>
                  <SelectItem value="/profile">Profile</SelectItem>
                  <SelectItem value="/settings">Settings</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={filters.category}
                  onValueChange={value => setFilters(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select
                  value={filters.sortBy}
                  onValueChange={value => setFilters(prev => ({ ...prev, sortBy: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {user && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <Label>Recent Events</Label>
              <Badge variant="secondary">{events.length}</Badge>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {events.length === 0 ? (
                <div className="text-center text-muted-foreground py-4 text-sm">
                  No events tracked yet. Try changing filters or navigating pages.
                </div>
              ) : (
                events.map(event => (
                  <div key={event.id} className="p-3 bg-muted rounded-md space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3" />
                        <span className="text-sm font-medium">{event.type}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                    </div>
                    <code className="text-xs text-muted-foreground block">
                      {JSON.stringify(event.data, null, 2)}
                    </code>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
