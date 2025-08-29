"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Zap, Bell } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import useRevalidate from "@/hooks/useRevalidate"

// Simulated WebSocket message types
type WSMessage = {
  type: "USER_UPDATED" | "POST_CREATED" | "COMMENT_ADDED" | "BULK_UPDATE"
  userId?: string
  postId?: string
  endpoints?: string[]
  data?: Record<string, unknown>
  timestamp: string
}

export default function RealTimeUpdatesExample() {
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<WSMessage[]>([])
  const [revalidationCount, setRevalidationCount] = useState(0)
  const [autoRevalidate, setAutoRevalidate] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const { revalidate } = useRevalidate()

  // Simulate WebSocket connection
  useEffect(() => {
    if (isConnected) {
      // Simulate receiving WebSocket messages
      intervalRef.current = setInterval(
        () => {
          const messageTypes: WSMessage["type"][] = [
            "USER_UPDATED",
            "POST_CREATED",
            "COMMENT_ADDED",
            "BULK_UPDATE",
          ]
          const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)]

          const message: WSMessage = {
            type: randomType,
            timestamp: new Date().toLocaleTimeString(),
            userId:
              randomType === "USER_UPDATED" ? `user_${Math.floor(Math.random() * 100)}` : undefined,
            postId:
              randomType === "POST_CREATED" || randomType === "COMMENT_ADDED"
                ? `post_${Math.floor(Math.random() * 100)}`
                : undefined,
            endpoints:
              randomType === "BULK_UPDATE"
                ? ["/api/users", "/api/posts", "/api/analytics"]
                : undefined,
            data: randomType === "POST_CREATED" ? { title: `New Post ${Date.now()}` } : undefined,
          }

          setMessages(prev => [...prev.slice(-9), message]) // Keep last 10 messages

          if (autoRevalidate) {
            handleWebSocketMessage(message)
          }
        },
        3000 + Math.random() * 4000
      ) // Random interval between 3-7 seconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [isConnected, autoRevalidate])

  const handleWebSocketMessage = (message: WSMessage) => {
    const urlsToRevalidate: string[] = []

    switch (message.type) {
      case "USER_UPDATED":
        urlsToRevalidate.push("/api/users", `/api/users/${message.userId}`)
        break

      case "POST_CREATED":
        urlsToRevalidate.push("/api/posts", "/api/posts/recent")
        break

      case "COMMENT_ADDED":
        urlsToRevalidate.push("/api/comments", `/api/posts/${message.postId}/comments`)
        break

      case "BULK_UPDATE":
        urlsToRevalidate.push(...(message.endpoints || []))
        break
    }

    if (urlsToRevalidate.length > 0) {
      revalidate(urlsToRevalidate)
      setRevalidationCount(prev => prev + 1)
    }
  }

  const toggleConnection = () => {
    setIsConnected(!isConnected)
    if (isConnected) {
      // Clear messages when disconnecting
      setMessages([])
    }
  }

  const clearMessages = () => {
    setMessages([])
    setRevalidationCount(0)
  }

  const manualRevalidate = (message: WSMessage) => {
    handleWebSocketMessage(message)
  }

  const getMessageColor = (type: WSMessage["type"]) => {
    switch (type) {
      case "USER_UPDATED":
        return "bg-secondary/10 dark:bg-blue-950 text-secondary dark:text-secondary300 border-secondary/30 dark:border-blue-800"
      case "POST_CREATED":
        return "bg-green-900/10 dark:bg-green-950 text-secondary dark:text-green-300 border-green-200 dark:border-green-800"
      case "COMMENT_ADDED":
        return "bg-warn-soft/10 dark:bg-warn-deep/30 text-warn-soft dark:text-warn-bright border-warn-soft/30 dark:border-warn-deep/30"
      case "BULK_UPDATE":
        return "bg-purple-900/10 dark:bg-purple-950 text-secondary-foreground dark:text-purple-300 border-purple-200 dark:border-purple-800"
      default:
        return "bg-muted text-muted-foreground border"
    }
  }

  const getMessageDescription = (message: WSMessage) => {
    switch (message.type) {
      case "USER_UPDATED":
        return `User ${message.userId} was updated`
      case "POST_CREATED":
        return `New post created: "${message.data?.title}"`
      case "COMMENT_ADDED":
        return `New comment added to post ${message.postId}`
      case "BULK_UPDATE":
        return `Bulk update affecting ${message.endpoints?.length} endpoints`
      default:
        return "Unknown message type"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Real-time Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Connection Controls */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {isConnected ? (
                  <div className="flex items-center gap-2 text-secondary">
                    <Wifi className="h-5 w-5" />
                    <span className="font-medium">Connected</span>
                    <div className="w-2 h-2 bg-green-900/100 rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500">
                    <WifiOff className="h-5 w-5" />
                    <span className="font-medium">Disconnected</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={toggleConnection} variant="outline" size="sm">
                  {isConnected ? "Disconnect" : "Connect"}
                </Button>
                <Button onClick={clearMessages} variant="outline" size="sm">
                  Clear Messages
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-card rounded p-3 text-center border">
                <div className="text-2xl font-bold text-secondary400">{messages.length}</div>
                <div className="text-xs text-muted-foreground">Messages Received</div>
              </div>
              <div className="bg-card rounded p-3 text-center border">
                <div className="text-2xl font-bold text-secondary">{revalidationCount}</div>
                <div className="text-xs text-muted-foreground">Revalidations Triggered</div>
              </div>
              <div className="bg-card rounded p-3 text-center border flex items-center justify-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRevalidate}
                    onChange={e => setAutoRevalidate(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Auto-revalidate</span>
                </label>
              </div>
            </div>
          </div>

          {/* Message Stream */}
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Message Stream
              </h4>
              {isConnected && (
                <Badge variant="outline" className="text-secondary">
                  <Zap className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              )}
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  {isConnected
                    ? "Waiting for messages... (messages arrive every 3-7 seconds)"
                    : "Connect to start receiving real-time messages"}
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-3 ${getMessageColor(message.type)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {message.type.replace("_", " ")}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>

                    <div className="text-sm mb-2">{getMessageDescription(message)}</div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {message.type === "USER_UPDATED" &&
                          `Will revalidate: /api/users, /api/users/${message.userId}`}
                        {message.type === "POST_CREATED" &&
                          "Will revalidate: /api/posts, /api/posts/recent"}
                        {message.type === "COMMENT_ADDED" &&
                          `Will revalidate: /api/comments, /api/posts/${message.postId}/comments`}
                        {message.type === "BULK_UPDATE" &&
                          `Will revalidate: ${message.endpoints?.join(", ")}`}
                      </div>
                      {!autoRevalidate && (
                        <Button
                          onClick={() => manualRevalidate(message)}
                          size="sm"
                          variant="outline"
                          className="text-xs h-6"
                        >
                          Revalidate
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* WebSocket Implementation Example */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3 text-sm">Implementation Pattern</h4>
            <div className="bg-card rounded p-3 font-mono text-xs overflow-x-auto">
              <div className="text-secondary">// Real WebSocket implementation</div>
              <div className="text-secondary">useEffect</div>
              <div>(() =&gt; {`{`}</div>
              <div className="ml-2">
                const ws = new <span className="text-secondary-foreground">WebSocket</span>
                ('ws://localhost:3001')
              </div>
              <div className="ml-2">
                ws.<span className="text-foreground">onmessage</span> = (event) =&gt; {`{`}
              </div>
              <div className="ml-4">
                const data = <span className="text-secondary">JSON.parse</span>(event.data)
              </div>
              <div className="ml-4">revalidate(getUrlsForMessageType(data.type))</div>
              <div className="ml-2">{`}`}</div>
              <div className="ml-2">
                return () =&gt; ws.<span className="text-muted-foreground">close</span>()
              </div>
              <div>{`}`}, [revalidate])</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-warn-soft/10 p-3 rounded">
            <strong>Real-time Updates Demo:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Click "Connect" to simulate a WebSocket connection</li>
              <li>Messages arrive every 3-7 seconds with different event types</li>
              <li>Each message type triggers revalidation of specific endpoints</li>
              <li>Toggle "Auto-revalidate" to control automatic revalidation</li>
              <li>In real apps, this keeps data fresh when other users make changes</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
