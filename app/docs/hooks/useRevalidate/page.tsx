'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { InstallationTabs } from "@/components/InstallationTabs"
import { useState } from "react"
import useRevalidate from "@/hooks/useRevalidate"
import { RefreshCw, Database, Server } from "lucide-react"

export default function UseRevalidateDocs() {
  const [revalidateCount, setRevalidateCount] = useState(0)
  const [lastRevalidate, setLastRevalidate] = useState<string>('')
  const { revalidate } = useRevalidate()

  const handleRevalidate = (urls: string[]) => {
    revalidate(urls)
    setRevalidateCount(prev => prev + 1)
    setLastRevalidate(new Date().toLocaleTimeString())
  }

  const sampleUrls = [
    '/api/users',
    '/api/posts', 
    '/api/comments',
    '/api/analytics'
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
              <BreadcrumbPage>useRevalidate</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useRevalidate</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A SWR integration hook for revalidating cached data by matching URL patterns, perfect for refreshing multiple API endpoints.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">SWR</Badge>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Install the hook using your preferred package manager</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="useRevalidate" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
              <CardDescription>This hook requires SWR to be installed and configured</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  npm install swr
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`// Wrap your app with SWR configuration
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
        revalidateOnFocus: false,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import useRevalidate from "@/hooks/useRevalidate"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`function DataManager() {
  const { revalidate } = useRevalidate()

  const handleRefreshData = () => {
    revalidate([
      '/api/users',
      '/api/posts',
      '/api/comments'
    ])
  }

  return (
    <button onClick={handleRefreshData}>
      Refresh All Data
    </button>
  )
}`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Bulk Data Revalidation</h3>
                <div className="border rounded-lg p-4">
                  <div className="mb-4 text-sm text-muted-foreground">
                    <div>Revalidate count: <strong>{revalidateCount}</strong></div>
                    <div>Last revalidate: <strong>{lastRevalidate || 'Never'}</strong></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleRevalidate(['/api/users'])}
                      variant="outline"
                    >
                      <Database className="h-4 w-4 mr-2" />
                      Refresh Users
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRevalidate(['/api/posts', '/api/comments'])}
                      variant="outline"
                    >
                      <Server className="h-4 w-4 mr-2" />
                      Refresh Content
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRevalidate(sampleUrls)}
                      variant="outline"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh All
                    </Button>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Click the buttons to simulate SWR cache revalidation calls.
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Form Submission with Revalidation</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function UserForm() {
  const { revalidate } = useRevalidate()
  const [formData, setFormData] = useState({ name: '', email: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      // Revalidate related data after successful submission
      revalidate([
        '/api/users',           // User list
        '/api/users/stats',     // User statistics
        '/api/dashboard'        // Dashboard data that includes user count
      ])
      
      setFormData({ name: '', email: '' })
      alert('User created successfully!')
      
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
        required
      />
      <button type="submit">Create User</button>
    </form>
  )
}`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Admin Dashboard Actions</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function AdminDashboard() {
  const { revalidate } = useRevalidate()

  const refreshUserData = () => {
    revalidate([
      '/api/users',
      '/api/users/active',
      '/api/users/stats',
      '/api/analytics/users'
    ])
  }

  const refreshContentData = () => {
    revalidate([
      '/api/posts',
      '/api/posts/published',
      '/api/posts/stats',
      '/api/comments',
      '/api/analytics/content'
    ])
  }

  const refreshAllData = () => {
    revalidate([
      '/api/users',
      '/api/posts',
      '/api/comments',
      '/api/analytics',
      '/api/dashboard',
      '/api/reports',
      '/api/settings'
    ])
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="refresh-controls">
        <button onClick={refreshUserData}>
          Refresh User Data
        </button>
        <button onClick={refreshContentData}>
          Refresh Content Data
        </button>
        <button onClick={refreshAllData}>
          Refresh Everything
        </button>
      </div>

      {/* Dashboard components that use SWR to fetch data */}
      <UserStats />
      <ContentStats />
      <RecentActivity />
    </div>
  )
}`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Real-time Updates</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function RealTimeComponent() {
  const { revalidate } = useRevalidate()

  useEffect(() => {
    // Set up WebSocket connection for real-time updates
    const ws = new WebSocket('ws://localhost:3001')
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      switch (data.type) {
        case 'USER_UPDATED':
          revalidate(['/api/users', \`/api/users/\${data.userId}\`])
          break
          
        case 'POST_CREATED':
          revalidate(['/api/posts', '/api/posts/recent'])
          break
          
        case 'COMMENT_ADDED':
          revalidate([
            '/api/comments', 
            \`/api/posts/\${data.postId}/comments\`
          ])
          break
          
        case 'BULK_UPDATE':
          // Refresh multiple related endpoints
          revalidate(data.endpoints)
          break
      }
    }

    return () => {
      ws.close()
    }
  }, [revalidate])

  return <div>Real-time data components</div>
}

// Server-sent events example
function SSEComponent() {
  const { revalidate } = useRevalidate()

  useEffect(() => {
    const eventSource = new EventSource('/api/events')
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.revalidate) {
        revalidate(data.revalidate)
      }
    }

    return () => {
      eventSource.close()
    }
  }, [revalidate])

  return <div>SSE-powered components</div>
}`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Error Recovery</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function ErrorRecovery() {
  const { revalidate } = useRevalidate()
  const [retryCount, setRetryCount] = useState(0)

  const handleRetry = async () => {
    try {
      setRetryCount(prev => prev + 1)
      
      // Attempt to refresh failed requests
      revalidate([
        '/api/users',
        '/api/posts',
        '/api/analytics'
      ])
      
      // Wait a moment and check if data loaded successfully
      setTimeout(() => {
        // You could check SWR cache or component state here
        // and show success/failure messages
      }, 1000)
      
    } catch (error) {
      console.error('Retry failed:', error)
    }
  }

  return (
    <div className="error-recovery">
      <h3>Connection Issues?</h3>
      <p>Some data failed to load. Try refreshing.</p>
      <button onClick={handleRetry} disabled={retryCount > 3}>
        {retryCount > 0 ? \`Retry (\${retryCount}/3)\` : 'Retry'}
      </button>
    </div>
  )
}`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Conditional Revalidation</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`function ConditionalRevalidation() {
  const { revalidate } = useRevalidate()
  const [user, setUser] = useState(null)

  const handleUserAction = async (action: string, payload: any) => {
    try {
      const response = await fetch(\`/api/actions/\${action}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        // Conditional revalidation based on user role and action
        const urlsToRevalidate = []

        // Always revalidate user's own data
        urlsToRevalidate.push(\`/api/users/\${user.id}\`)

        // Admin users get additional revalidations
        if (user.role === 'admin') {
          urlsToRevalidate.push(
            '/api/users',
            '/api/analytics',
            '/api/reports'
          )
        }

        // Action-specific revalidations
        switch (action) {
          case 'create-post':
            urlsToRevalidate.push(
              '/api/posts',
              '/api/posts/recent',
              \`/api/users/\${user.id}/posts\`
            )
            break

          case 'update-profile':
            urlsToRevalidate.push(
              '/api/profile',
              '/api/users'
            )
            break

          case 'delete-comment':
            urlsToRevalidate.push(
              '/api/comments',
              \`/api/posts/\${payload.postId}/comments\`
            )
            break
        }

        revalidate(urlsToRevalidate)
      }
    } catch (error) {
      console.error('Action failed:', error)
    }
  }

  return (
    <div>
      {/* Action buttons that trigger conditional revalidation */}
    </div>
  )
}`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Parameters</h3>
                  <div className="text-sm">None</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Returns</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Property</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">revalidate</td>
                          <td className="p-2">(urls: string[]) =&gt; void</td>
                          <td className="p-2">Function to revalidate SWR cache entries by URL</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Revalidation Logic</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm whitespace-pre-line">
{`const revalidate = (urls: string[]) => {
  urls.forEach(url => {
    mutate((key: { url: string }) => key.url === url)
  })
}`}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    The hook uses SWR's mutate function to match cache keys by URL and trigger revalidation.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">SWR Integration</h3>
                  <div className="text-sm space-y-2">
                    <p>This hook works with SWR's cache key matching system:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Matches cache entries where the key's URL property equals the provided URL</li>
                      <li>Triggers revalidation for all matching cache entries</li>
                      <li>Works with SWR's global mutate function</li>
                      <li>Supports both string keys and object keys with URL properties</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Bulk revalidation of multiple SWR cache entries</li>
                <li>URL-based cache key matching</li>
                <li>Seamless SWR integration</li>
                <li>TypeScript support with type safety</li>
                <li>Lightweight with minimal overhead</li>
                <li>Batch processing of revalidation requests</li>
                <li>Compatible with all SWR features and configurations</li>
                <li>Works with complex cache key structures</li>
                <li>Easy to integrate with existing SWR setups</li>
                <li>Supports conditional and dynamic revalidation</li>
                <li>Error-safe implementation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
              <CardDescription>Common scenarios where this hook is useful</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Data Management</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Post-mutation cache updates</div>
                    <div>• Bulk data refresh operations</div>
                    <div>• Related data synchronization</div>
                    <div>• Cache invalidation after CRUD operations</div>
                    <div>• Dashboard data refresh</div>
                    <div>• Admin panel operations</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Real-time Features</h4>
                  <div className="space-y-1 text-sm">
                    <div>• WebSocket-triggered updates</div>
                    <div>• Server-sent event handling</div>
                    <div>• Push notification responses</div>
                    <div>• Live data synchronization</div>
                    <div>• Collaborative editing updates</div>
                    <div>• Activity feed refresh</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">User Actions</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Form submission handling</div>
                    <div>• User preference updates</div>
                    <div>• Profile modification effects</div>
                    <div>• Content creation/editing</div>
                    <div>• Social interaction updates</div>
                    <div>• Shopping cart changes</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">System Operations</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Error recovery mechanisms</div>
                    <div>• Background sync operations</div>
                    <div>• Scheduled data refresh</div>
                    <div>• Cache warming strategies</div>
                    <div>• Performance optimization</div>
                    <div>• Data consistency maintenance</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}