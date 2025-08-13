'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { InstallationTabs } from "@/components/internal/installation"
import { CodeBlock } from "@/components/ui/code-block"
import { useState } from "react"
import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"

export default function UseStateChangeEffectDocs() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [settings, setSettings] = useState({ theme: 'light', lang: 'en' })
  const [effectCount, setEffectCount] = useState(0)
  const [lastChange, setLastChange] = useState<string>('')

  // Demonstrate the hook
  useStateChangeEffect(() => {
    setEffectCount(prev => prev + 1)
    setLastChange(new Date().toLocaleTimeString())
    console.log('State changed:', { name, age, settings })
  }, [name, age, settings])

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
              <BreadcrumbPage>useStateChangeEffect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useStateChangeEffect</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A hook that executes effects when specific states change, with deep comparison support for complex objects.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">Effect</Badge>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Install the hook using your preferred package manager</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="useStateChangeEffect" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <CodeBlock language="typescript">
                  {`import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"`}
                </CodeBlock>
              </div>
              
              <CodeBlock language="tsx">
{`function DataProcessor() {
  const [data, setData] = useState(null)
  const [filters, setFilters] = useState({})
  const [sortOrder, setSortOrder] = useState('asc')

  useStateChangeEffect(() => {
    // This runs whenever data, filters, or sortOrder changes
    processData(data, filters, sortOrder)
  }, [data, filters, sortOrder])

  return <div>Data processing component</div>
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Live State Change Detection</h3>
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        placeholder="Enter your age..."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <select
                        id="theme"
                        className="w-full p-2 border rounded-md"
                        value={settings.theme}
                        onChange={(e) => setSettings({...settings, theme: e.target.value})}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="w-full p-2 border rounded-md"
                        value={settings.lang}
                        onChange={(e) => setSettings({...settings, lang: e.target.value})}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Effect trigger count: <strong>{effectCount}</strong></div>
                    <div>Last change: <strong>{lastChange || 'Never'}</strong></div>
                    <div>Current values: <code>{JSON.stringify({ name, age, settings })}</code></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Form Validation</h3>
                <CodeBlock language="tsx">
{`function FormWithValidation() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useStateChangeEffect(() => {
    const newErrors: Record<string, string> = {}
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    // Confirm password validation
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
  }, [formData])

  return (
    <form>
      <input
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        placeholder="Password"
      />
      {errors.password && <span className="error">{errors.password}</span>}
      
      <input
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
    </form>
  )
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">API Request Debouncing</h3>
                <CodeBlock language="tsx">
{`function SearchComponent() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ category: '', priceRange: [0, 100] })
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Debounced search effect
  useStateChangeEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        performSearch(query, filters)
      } else {
        setResults([])
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [query, filters])

  const performSearch = async (searchQuery: string, searchFilters: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, filters: searchFilters })
      })
      const data = await response.json()
      setResults(data.results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <div className="filters">
        {/* Filter components */}
      </div>
      <div className="results">
        {loading ? <div>Searching...</div> : results.map(renderResult)}
      </div>
    </div>
  )
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Local Storage Sync</h3>
                <CodeBlock language="tsx">
{`function UserPreferences() {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    notifications: true,
    autoSave: false
  })

  // Sync preferences to localStorage whenever they change
  useStateChangeEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences))
    console.log('Preferences saved to localStorage')
  }, [preferences])

  // Load preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      try {
        setPreferences(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to parse saved preferences:', error)
      }
    }
  }, [])

  const updatePreference = (key: keyof typeof preferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="preferences">
      <h3>User Preferences</h3>
      <label>
        <input
          type="checkbox"
          checked={preferences.notifications}
          onChange={(e) => updatePreference('notifications', e.target.checked)}
        />
        Enable Notifications
      </label>
      <label>
        <input
          type="checkbox"
          checked={preferences.autoSave}
          onChange={(e) => updatePreference('autoSave', e.target.checked)}
        />
        Auto Save
      </label>
      <select
        value={preferences.theme}
        onChange={(e) => updatePreference('theme', e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="auto">Auto</option>
      </select>
    </div>
  )
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Analytics Tracking</h3>
                <CodeBlock language="tsx">
{`function AnalyticsWrapper() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('/')
  const [filters, setFilters] = useState({})

  // Track user interactions and state changes
  useStateChangeEffect(() => {
    // Track page views and filter changes
    if (user) {
      analytics.track('user_interaction', {
        userId: user.id,
        page: page,
        filters: filters,
        timestamp: new Date().toISOString()
      })
    }
  }, [user, page, filters])

  // Track specific user actions
  useStateChangeEffect(() => {
    if (user) {
      analytics.identify(user.id, {
        email: user.email,
        name: user.name,
        lastSeen: new Date().toISOString()
      })
    }
  }, [user])

  return (
    <div>
      {/* Your app content */}
    </div>
  )
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Complex State Dependencies</h3>
                <CodeBlock language="tsx">
{`function DataVisualization() {
  const [data, setData] = useState([])
  const [chartConfig, setChartConfig] = useState({
    type: 'bar',
    colors: ['#blue', '#red', '#green'],
    animation: true
  })
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    categories: [],
    minValue: 0
  })
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart')

  // Recompute visualization whenever any dependency changes
  useStateChangeEffect(() => {
    const filteredData = applyFilters(data, filters)
    const chartData = transformDataForChart(filteredData, chartConfig)
    
    if (viewMode === 'chart') {
      renderChart(chartData, chartConfig)
    } else {
      renderTable(filteredData)
    }
    
    // Update URL params for sharing
    const params = new URLSearchParams()
    params.set('config', JSON.stringify(chartConfig))
    params.set('filters', JSON.stringify(filters))
    params.set('view', viewMode)
    
    window.history.replaceState(null, '', \`?\${params.toString()}\`)
  }, [data, chartConfig, filters, viewMode])

  return (
    <div className="visualization">
      <div className="controls">
        {/* Filter and configuration controls */}
      </div>
      <div className="display">
        {/* Chart or table display */}
      </div>
    </div>
  )
}`}
                </CodeBlock>
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
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Parameter</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">effect</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Function to execute when states change</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">states</td>
                          <td className="p-2">T[]</td>
                          <td className="p-2">Array of state values to monitor for changes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Returns</h3>
                  <div className="text-sm">void</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Type Signature</h3>
                  <CodeBlock language="typescript">
                      useStateChangeEffect&lt;T&gt;(effect: () =&gt; void, states: T[]): void
                  </CodeBlock>
                  <p className="text-sm text-muted-foreground mt-2">
                    The hook is generic and can monitor any type of state values.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Comparison Method</h3>
                  <div className="text-sm space-y-2">
                    <p>The hook uses <code>JSON.stringify</code> for deep comparison of state values.</p>
                    <CodeBlock language="tsx">
                        const areStatesEqual = states.every((state, index) =&gt; 
                          JSON.stringify(state) === JSON.stringify(previousStates[index])
                        )
                    </CodeBlock>
                    <p className="text-muted-foreground">
                      This means the hook can detect changes in nested objects and arrays, but may not work correctly with functions, dates, or other non-serializable values.
                    </p>
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
                <li>Deep comparison using JSON serialization</li>
                <li>Multiple state monitoring in a single hook</li>
                <li>TypeScript support with generic types</li>
                <li>Memory efficient with ref-based state tracking</li>
                <li>Handles complex nested objects and arrays</li>
                <li>Automatic cleanup and state management</li>
                <li>Works with any serializable data type</li>
                <li>Prevents unnecessary effect executions</li>
                <li>Compatible with React Strict Mode</li>
                <li>Lightweight with minimal overhead</li>
                <li>Easy to integrate with existing components</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm">JSON.stringify Limitations</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                    <li>Functions are not serialized and will be ignored</li>
                    <li>Date objects are converted to strings</li>
                    <li>undefined values are omitted</li>
                    <li>Symbol properties are ignored</li>
                    <li>Circular references will cause errors</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm">Performance Considerations</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                    <li>Large objects may impact performance due to serialization</li>
                    <li>Frequent state changes can trigger many effect executions</li>
                    <li>Consider debouncing for expensive operations</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm">Alternative Approaches</h4>
                  <CodeBlock language="tsx">
{`// For simple value comparison, use regular useEffect
useEffect(() => {
  // Effect code
}, [simpleValue])

// For custom comparison logic, create a custom hook
function useDeepCompareEffect(callback, dependencies) {
  const ref = useRef()
  
  if (!isEqual(dependencies, ref.current)) {
    ref.current = dependencies
  }
  
  useEffect(callback, ref.current)
}`}
                  </CodeBlock>
                </div>
              </div>
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
                  <h4 className="font-semibold mb-2">Data Processing</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Form validation and processing</div>
                    <div>• Search and filtering logic</div>
                    <div>• Data transformation</div>
                    <div>• Chart and visualization updates</div>
                    <div>• API request triggering</div>
                    <div>• Cache invalidation</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">State Synchronization</h4>
                  <div className="space-y-1 text-sm">
                    <div>• localStorage synchronization</div>
                    <div>• URL parameter updates</div>
                    <div>• Analytics tracking</div>
                    <div>• Cross-component communication</div>
                    <div>• External service integration</div>
                    <div>• Real-time updates</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">UI Updates</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Dynamic theme switching</div>
                    <div>• Layout recalculation</div>
                    <div>• Component re-rendering</div>
                    <div>• Animation triggering</div>
                    <div>• Focus management</div>
                    <div>• Accessibility updates</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Side Effects</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Event logging</div>
                    <div>• Performance monitoring</div>
                    <div>• Error reporting</div>
                    <div>• Debugging and diagnostics</div>
                    <div>• User behavior tracking</div>
                    <div>• Notification triggering</div>
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