"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useRef, useCallback } from "react"
import { useOnUnmountEffect } from "@/hooks/useOnUnmountEffect"

export default function WebSocketCleanupExample() {
  const [isComponentMounted, setIsComponentMounted] = useState(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">WebSocket Connection Cleanup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setIsComponentMounted(!isComponentMounted)}
              variant={isComponentMounted ? "destructive" : "default"}
              size="sm"
            >
              {isComponentMounted ? "Unmount Component (Close WebSocket)" : "Mount Component"}
            </Button>
          </div>

          <div className="min-h-96">{isComponentMounted && <WebSocketComponent />}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function WebSocketComponent() {
  const wsRef = useRef<WebSocket | null>(null)
  const [messages, setMessages] = useState<
    Array<{ id: number; text: string; time: string; type: "sent" | "received" | "system" }>
  >([])
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "error"
  >("connecting")
  const [newMessage, setNewMessage] = useState("")
  const messageIdRef = useRef(0)

  // Memoized addMessage function to prevent infinite loops
  const addMessage = useCallback((text: string, type: "sent" | "received" | "system") => {
    setMessages(prev => [
      ...prev,
      {
        id: messageIdRef.current++,
        text,
        time: typeof window !== "undefined" ? new Date().toLocaleTimeString() : "",
        type,
      },
    ])
  }, [])

  // Simulate WebSocket connection (using echo.websocket.org as example)
  useEffect(() => {
    try {
      // Note: This is a real WebSocket connection to a test server
      wsRef.current = new WebSocket("wss://echo.websocket.org/")

      wsRef.current.onopen = () => {
        setConnectionStatus("connected")
        addMessage("Connected to WebSocket server", "system")
      }

      wsRef.current.onmessage = event => {
        addMessage(`Echo: ${event.data}`, "received")
      }

      wsRef.current.onerror = () => {
        setConnectionStatus("error")
        addMessage("WebSocket connection error", "system")
      }

      wsRef.current.onclose = () => {
        setConnectionStatus("disconnected")
        addMessage("WebSocket connection closed", "system")
      }
    } catch (error) {
      setConnectionStatus("error")
      addMessage("Failed to create WebSocket connection", "system")
    }

    return () => {
      // This cleanup runs on every re-render, but we want cleanup only on unmount
      // That's why we use useOnUnmountEffect below
    }
  }, [addMessage])

  // Close WebSocket connection ONLY on unmount
  useOnUnmountEffect(() => {
    console.log("Closing WebSocket connection on unmount...")
    if (wsRef.current) {
      wsRef.current.close(1000, "Component unmounting") // 1000 = normal closure
    }
  })

  const sendMessage = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && newMessage.trim()) {
      wsRef.current.send(newMessage)
      addMessage(newMessage, "sent")
      setNewMessage("")
    }
  }, [newMessage, addMessage])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-900/20 text-secondary"
      case "connecting":
        return "bg-warn-soft/10 text-foreground"
      case "disconnected":
        return "bg-muted text-muted-foreground"
      case "error":
        return "bg-red-900/20 text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const clearMessages = () => {
    setMessages([])
    messageIdRef.current = 0
  }

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-r from-muted/30 to-muted/50">
      <h3 className="font-semibold mb-2">WebSocket Chat Component</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This component maintains a WebSocket connection that's properly closed only on unmount.
      </p>

      <div className="space-y-3">
        {/* Status */}
        <div className={`p-2 rounded text-sm ${getStatusColor()}`}>
          <strong>Connection Status:</strong> {connectionStatus}
          {connectionStatus === "connected" && (
            <span className="ml-2">🟢 Ready to send/receive messages</span>
          )}
        </div>

        {/* Message input */}
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message (will echo back)..."
            disabled={connectionStatus !== "connected"}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={connectionStatus !== "connected" || !newMessage.trim()}
            size="sm"
          >
            Send
          </Button>
        </div>

        {/* Messages */}
        <div className="bg-card rounded border h-48 overflow-y-auto p-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm">Messages</h4>
            <Button onClick={clearMessages} size="sm" variant="outline">
              Clear
            </Button>
          </div>

          <div className="space-y-2">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm">
                No messages yet. Send a message to see it echo back!
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`text-sm p-2 rounded ${
                    message.type === "sent"
                      ? "bg-secondary/10 text-secondary ml-8"
                      : message.type === "received"
                        ? "bg-green-900/20 text-secondary mr-8"
                        : "bg-muted text-gray-700 text-center"
                  }`}
                >
                  <div>{message.text}</div>
                  <div className="text-xs opacity-75">{message.time}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-secondary/10 p-3 rounded">
          <strong>WebSocket Demo:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Connected to echo.websocket.org (echoes back your messages)</li>
            <li>Send messages to see real-time communication</li>
            <li>Unmount component to see proper connection cleanup</li>
            <li>Check console for cleanup messages when unmounting</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
