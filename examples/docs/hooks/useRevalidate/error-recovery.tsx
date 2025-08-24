"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, RotateCcw, Wifi } from "lucide-react"
import { useState } from "react"
import useRevalidate from "@/hooks/useRevalidate"

type EndpointStatus = {
  url: string
  status: 'success' | 'error' | 'loading'
  lastAttempt?: string
  errorMessage?: string
  successCount: number
  errorCount: number
}

export default function ErrorRecoveryExample() {
  const [endpoints, setEndpoints] = useState<EndpointStatus[]>([
    { url: '/api/users', status: 'error', errorMessage: 'Network timeout', errorCount: 2, successCount: 0 },
    { url: '/api/posts', status: 'error', errorMessage: '500 Internal Server Error', errorCount: 1, successCount: 0 },
    { url: '/api/analytics', status: 'success', successCount: 3, errorCount: 0 },
    { url: '/api/comments', status: 'error', errorMessage: 'Service unavailable', errorCount: 3, successCount: 0 },
  ])
  const [retryAttempts, setRetryAttempts] = useState(0)
  const [isRecovering, setIsRecovering] = useState(false)
  const { revalidate } = useRevalidate()

  const simulateEndpointCheck = async (url: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    // Simulate different success rates based on endpoint
    const successRate = url.includes('analytics') ? 0.9 : 
                       url.includes('users') ? 0.7 : 
                       url.includes('posts') ? 0.6 : 0.4
    
    if (Math.random() < successRate) {
      return { success: true }
    } else {
      const errors = ['Network timeout', '500 Internal Server Error', 'Service unavailable', 'Rate limit exceeded']
      return { success: false, error: errors[Math.floor(Math.random() * errors.length)] }
    }
  }

  const retryEndpoint = async (url: string) => {
    setEndpoints(prev => prev.map(ep => 
      ep.url === url ? { ...ep, status: 'loading', lastAttempt: new Date().toLocaleTimeString() } : ep
    ))

    const result = await simulateEndpointCheck(url)
    
    setEndpoints(prev => prev.map(ep => {
      if (ep.url === url) {
        if (result.success) {
          return {
            ...ep,
            status: 'success',
            successCount: ep.successCount + 1,
            errorMessage: undefined
          }
        } else {
          return {
            ...ep,
            status: 'error',
            errorCount: ep.errorCount + 1,
            errorMessage: result.error
          }
        }
      }
      return ep
    }))

    if (result.success) {
      // Trigger revalidation for successful endpoint
      revalidate([url])
    }
  }

  const handleRetryAll = async () => {
    setIsRecovering(true)
    setRetryAttempts(prev => prev + 1)
    
    const failedEndpoints = endpoints.filter(ep => ep.status === 'error')
    
    // Set all failed endpoints to loading
    setEndpoints(prev => prev.map(ep => 
      ep.status === 'error' 
        ? { ...ep, status: 'loading', lastAttempt: new Date().toLocaleTimeString() }
        : ep
    ))

    // Test all failed endpoints concurrently
    const results = await Promise.all(
      failedEndpoints.map(ep => 
        simulateEndpointCheck(ep.url).then(result => ({ url: ep.url, ...result }))
      )
    )

    // Update endpoint statuses
    setEndpoints(prev => prev.map(ep => {
      const result = results.find(r => r.url === ep.url)
      if (result) {
        if (result.success) {
          return {
            ...ep,
            status: 'success',
            successCount: ep.successCount + 1,
            errorMessage: undefined
          }
        } else {
          return {
            ...ep,
            status: 'error',
            errorCount: ep.errorCount + 1,
            errorMessage: result.error
          }
        }
      }
      return ep
    }))

    // Revalidate all successful endpoints
    const successfulUrls = results.filter(r => r.success).map(r => r.url)
    if (successfulUrls.length > 0) {
      revalidate(successfulUrls)
    }

    setIsRecovering(false)
  }

  const resetAll = () => {
    setEndpoints(prev => prev.map(ep => ({
      ...ep,
      status: Math.random() > 0.5 ? 'success' : 'error',
      errorMessage: ep.status === 'error' ? 'Simulated error' : undefined,
      successCount: 0,
      errorCount: 0,
      lastAttempt: undefined
    })))
    setRetryAttempts(0)
  }

  const getStatusColor = (status: EndpointStatus['status']) => {
    switch (status) {
      case 'success': return 'text-secondary bg-green-900/10 border-green-200'
      case 'error': return 'text-muted-foreground bg-red-soft/10 border-red-soft/30'
      case 'loading': return 'text-secondary bg-secondary/10 border-secondary/30'
      default: return 'text-gray-600 bg-muted/50 border-gray-200'
    }
  }

  const getStatusIcon = (status: EndpointStatus['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4" />
      case 'error': return <AlertTriangle className="h-4 w-4" />
      case 'loading': return <RotateCcw className="h-4 w-4 animate-spin" />
      default: return null
    }
  }

  const errorCount = endpoints.filter(ep => ep.status === 'error').length
  const successCount = endpoints.filter(ep => ep.status === 'success').length
  const loadingCount = endpoints.filter(ep => ep.status === 'loading').length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Error Recovery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Status Overview */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-semibold mb-4 text-foreground">Connection Recovery System</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-card rounded p-3 text-center">
                <div className="text-2xl font-bold text-muted-foreground">{errorCount}</div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-2xl font-bold text-secondary">{successCount}</div>
                <div className="text-xs text-muted-foreground">Success</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-2xl font-bold text-secondary">{loadingCount}</div>
                <div className="text-xs text-muted-foreground">Retrying</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-2xl font-bold text-secondary-foreground">{retryAttempts}</div>
                <div className="text-xs text-muted-foreground">Retry Attempts</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleRetryAll}
                disabled={isRecovering || errorCount === 0}
                variant="outline"
                size="sm"
                className="bg-card"
              >
                <RotateCcw className={`h-4 w-4 mr-2 ${isRecovering ? 'animate-spin' : ''}`} />
                {isRecovering ? 'Retrying...' : `Retry Failed (${errorCount})`}
              </Button>
              <Button onClick={resetAll} variant="outline" size="sm" className="bg-card">
                Reset Simulation
              </Button>
            </div>
          </div>

          {/* Error Alert */}
          {errorCount > 0 && !isRecovering && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {errorCount} endpoint{errorCount > 1 ? 's' : ''} failed to load. 
                Some data may be outdated. Click "Retry Failed" to attempt recovery.
              </AlertDescription>
            </Alert>
          )}

          {/* Endpoint Status List */}
          <div className="bg-card border rounded-lg p-4">
            <h4 className="font-medium mb-4">Endpoint Status</h4>
            <div className="space-y-3">
              {endpoints.map(endpoint => (
                <div key={endpoint.url} className={`border rounded-lg p-3 ${getStatusColor(endpoint.status)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(endpoint.status)}
                      <span className="font-mono text-sm">{endpoint.url}</span>
                      <Badge variant="outline" className="text-xs">
                        {endpoint.status}
                      </Badge>
                    </div>
                    {endpoint.status === 'error' && (
                      <Button
                        onClick={() => retryEndpoint(endpoint.url)}
                        size="sm"
                        variant="outline"
                        className="bg-card text-xs h-6"
                      >
                        Retry
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <strong>Success:</strong> {endpoint.successCount}
                    </div>
                    <div>
                      <strong>Errors:</strong> {endpoint.errorCount}
                    </div>
                    <div>
                      <strong>Last Attempt:</strong> {endpoint.lastAttempt || 'Never'}
                    </div>
                    <div>
                      {endpoint.errorMessage && (
                        <span className="text-muted-foreground">
                          <strong>Error:</strong> {endpoint.errorMessage}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recovery Strategy */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3 text-sm">Recovery Strategy</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-secondary/100 text-white rounded-full flex items-center justify-center text-xs">1</div>
                <span>Detect failed endpoints automatically</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-900/100 text-white rounded-full flex items-center justify-center text-xs">2</div>
                <span>Provide manual retry options for individual or bulk recovery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-900/100 text-white rounded-full flex items-center justify-center text-xs">3</div>
                <span>Show clear status indicators and error messages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-900/100 text-white rounded-full flex items-center justify-center text-xs">4</div>
                <span>Revalidate successful endpoints to refresh stale data</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-secondary/10 p-3 rounded">
            <strong>Error Recovery Demo:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>This simulates API endpoints with different failure rates</li>
              <li>Click "Retry Failed" to attempt recovery of all failed endpoints</li>
              <li>Individual endpoints can be retried using their "Retry" buttons</li>
              <li>Successful recoveries trigger SWR revalidation to refresh data</li>
              <li>Real apps would use this pattern for network resilience</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}