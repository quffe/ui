"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useOnUnmountEffect } from "@/hooks/useOnUnmountEffect"

// Simulated analytics service
const analytics = {
  startSession: (sessionId: string) => {
    console.log(`📊 Analytics: Started session ${sessionId}`)
  },
  
  endSession: (sessionId: string, data: { duration: number; pageViews: number; interactions: number }) => {
    console.log(`📊 Analytics: Ended session ${sessionId}`, data)
  },
  
  trackEvent: (event: string, data?: any) => {
    console.log(`📊 Analytics: Event "${event}"`, data || '')
  }
}

const generateSessionId = () => Math.random().toString(36).substring(2, 15)

export default function AnalyticsCleanupExample() {
  const [isComponentMounted, setIsComponentMounted] = useState(true)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Analytics Cleanup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsComponentMounted(!isComponentMounted)}
              variant={isComponentMounted ? "destructive" : "default"}
              size="sm"
            >
              {isComponentMounted ? "Unmount Component (End Session)" : "Mount Component"}
            </Button>
          </div>
          
          <div className="min-h-64">
            {isComponentMounted && <AnalyticsTracker />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AnalyticsTracker() {
  const sessionId = useRef<string>('')
  const startTime = useRef<number>(0)
  const [pageViews, setPageViews] = useState(1) // Start with 1 for initial page load
  const [interactions, setInteractions] = useState(0)
  const [sessionData, setSessionData] = useState({
    sessionId: '',
    startTime: '',
    duration: 0
  })
  const [mounted, setMounted] = useState(false)
  
  // Use refs to store current values for cleanup
  const pageViewsRef = useRef(pageViews)
  const interactionsRef = useRef(interactions)
  
  // Update refs when state changes
  pageViewsRef.current = pageViews
  interactionsRef.current = interactions

  // Initialize client-side only values
  useEffect(() => {
    // Set dynamic values only on client
    sessionId.current = generateSessionId()
    startTime.current = Date.now()
    setSessionData({
      sessionId: sessionId.current,
      startTime: new Date(startTime.current).toLocaleTimeString(),
      duration: 0
    })
    setMounted(true)
    
    // Start tracking session
    analytics.startSession(sessionId.current)
    
    const interval = setInterval(() => {
      const duration = Math.floor((Date.now() - startTime.current) / 1000)
      setSessionData(prev => ({ ...prev, duration }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Track user interactions
  const trackInteraction = (type: string) => {
    analytics.trackEvent('user_interaction', { type, sessionId: sessionId.current })
    setInteractions(prev => prev + 1)
  }

  const simulatePageView = () => {
    analytics.trackEvent('page_view', { sessionId: sessionId.current })
    setPageViews(prev => prev + 1)
  }

  // End session only on unmount
  useOnUnmountEffect(() => {
    const finalDuration = Math.floor((Date.now() - startTime.current) / 1000)
    
    analytics.endSession(sessionId.current, {
      duration: finalDuration,
      pageViews: pageViewsRef.current,
      interactions: interactionsRef.current
    })
    
    console.log('📊 Analytics cleanup complete')
  })

  if (!mounted) {
    return (
      <div className="border rounded-lg p-4 bg-gradient-to-r from-muted/30 to-muted/50">
        <h3 className="font-semibold mb-2">Analytics Session Tracker</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Initializing analytics session...
        </p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-r from-muted/30 to-muted/50">
      <h3 className="font-semibold mb-2">Analytics Session Tracker</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This component tracks user analytics and properly ends the session only on unmount.
      </p>
      
      <div className="space-y-3">
        {/* Session Info */}
        <div className="bg-card rounded p-4">
          <h4 className="font-medium text-sm mb-3">Current Session</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Session ID:</strong>
              <div className="font-mono text-xs bg-muted p-1 rounded mt-1">
                {sessionData.sessionId}
              </div>
            </div>
            <div>
              <strong>Start Time:</strong>
              <div className="text-muted-foreground">{sessionData.startTime}</div>
            </div>
            <div>
              <strong>Duration:</strong>
              <div className="text-lg font-bold text-secondary">
                {sessionData.duration}s
              </div>
            </div>
            <div>
              <strong>Status:</strong>
              <div className="text-secondary">🟢 Active</div>
            </div>
          </div>
        </div>
        
        {/* Metrics */}
        <div className="bg-card rounded p-4">
          <h4 className="font-medium text-sm mb-3">Session Metrics</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-secondary-foreground">{pageViews}</div>
              <div className="text-xs text-muted-foreground">Page Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{interactions}</div>
              <div className="text-xs text-muted-foreground">Interactions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">
                {sessionData.duration > 0 ? Math.round(interactions / (sessionData.duration / 60) * 10) / 10 : 0}
              </div>
              <div className="text-xs text-muted-foreground">Per Minute</div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="bg-card rounded p-4">
          <h4 className="font-medium text-sm mb-3">Simulate User Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => trackInteraction('button_click')}
              size="sm"
              variant="outline"
            >
              Button Click
            </Button>
            <Button 
              onClick={() => trackInteraction('form_submit')}
              size="sm"
              variant="outline"
            >
              Form Submit
            </Button>
            <Button 
              onClick={() => trackInteraction('scroll')}
              size="sm"
              variant="outline"
            >
              Scroll Event
            </Button>
            <Button 
              onClick={simulatePageView}
              size="sm"
              variant="outline"
            >
              Page View
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground bg-warn-soft/10 p-3 rounded">
          <strong>Analytics Demo:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Session starts automatically when component mounts</li>
            <li>Click buttons to simulate user interactions and page views</li>
            <li>Session data is tracked in real-time with duration updates</li>
            <li>Session ends with final metrics only when component unmounts</li>
            <li>Check browser console for detailed analytics logs</li>
          </ul>
        </div>
      </div>
    </div>
  )
}