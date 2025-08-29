"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useOnUnmountEffect } from "@/hooks/useOnUnmountEffect"

export default function NetworkRequestCancellationExample() {
  const [isComponentMounted, setIsComponentMounted] = useState(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Network Request Cancellation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setIsComponentMounted(!isComponentMounted)}
              variant={isComponentMounted ? "destructive" : "default"}
              size="sm"
            >
              {isComponentMounted ? "Unmount Component (Cancel Requests)" : "Mount Component"}
            </Button>
          </div>

          <div className="min-h-32">{isComponentMounted && <DataFetcher />}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function DataFetcher() {
  const abortControllerRef = useRef(new AbortController())
  const [data, setData] = useState<{
    id: number
    title: string
    body: string
    userId: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [requestsMade, setRequestsMade] = useState(0)

  // Simulate data fetching with cancellation support
  const fetchData = async () => {
    try {
      setLoading(true)
      setError("")
      setRequestsMade(prev => prev + 1)

      // Create new AbortController for this request
      abortControllerRef.current = new AbortController()

      // Simulate a slow API call
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const result = await response.json()
      setData(result)
      setLoading(false)
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(`Fetch error: ${err.message}`)
        setLoading(false)
      } else {
        setError("Request was cancelled")
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Cancel any pending requests on unmount
  useOnUnmountEffect(() => {
    console.log("Cancelling any pending network requests...")
    abortControllerRef.current.abort()
  })

  const manualCancel = () => {
    abortControllerRef.current.abort()
    setError("Request manually cancelled")
    setLoading(false)
  }

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-r from-muted/30 to-muted/50">
      <h3 className="font-semibold mb-2">Data Fetcher with Cancellation</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This component fetches data and cancels pending requests when unmounted.
      </p>

      <div className="space-y-3">
        <div className="bg-card rounded p-3">
          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
            <div>
              <strong>Status:</strong> {loading ? "Loading..." : "Idle"}
            </div>
            <div>
              <strong>Requests Made:</strong> {requestsMade}
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <Button onClick={fetchData} disabled={loading} size="sm" variant="outline">
              {loading ? "Loading..." : "Fetch New Data"}
            </Button>
            <Button onClick={manualCancel} disabled={!loading} size="sm" variant="outline">
              Cancel Request
            </Button>
          </div>

          {error && (
            <div className="p-2 bg-red-900/20 text-muted-foreground rounded text-sm mb-2">
              {error}
            </div>
          )}

          {data && !loading && (
            <div className="p-2 bg-green-900/20 text-secondary rounded text-sm">
              <div>
                <strong>Title:</strong> {data.title}
              </div>
              <div>
                <strong>Body:</strong> {data.body.substring(0, 100)}...
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground bg-orange-900/20 p-3 rounded">
          <strong>Try this:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Click "Fetch New Data" to start a network request</li>
            <li>While loading, click "Unmount Component" to cancel the request</li>
            <li>Check browser console for cancellation messages</li>
            <li>The AbortController prevents memory leaks from completed requests</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
