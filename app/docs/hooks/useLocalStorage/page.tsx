'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { InstallationTabs } from "@/components/InstallationTabs"
import { useState, useEffect } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export default function UseLocalStorageDocs() {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useLocalStorage<string>('demo-name', '')
  const [preferences, setPreferences] = useLocalStorage<{theme: string, language: string}>('demo-preferences', {
    theme: 'light',
    language: 'en'
  })
  const [counter, setCounter] = useLocalStorage<number>('demo-counter', 0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

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
              <BreadcrumbPage>useLocalStorage</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useLocalStorage</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A hook for managing localStorage state with automatic JSON serialization and error handling.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">Storage</Badge>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Install the hook using your preferred package manager</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="useLocalStorage" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import { useLocalStorage } from "@/hooks/useLocalStorage"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`function MyComponent() {
  // String value with default
  const [name, setName] = useLocalStorage<string>('user-name', 'Guest')
  
  // Object value with default
  const [preferences, setPreferences] = useLocalStorage<{theme: string}>('user-prefs', {
    theme: 'light'
  })
  
  // Number value
  const [counter, setCounter] = useLocalStorage<number>('counter', 0)

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button onClick={() => setCounter(counter + 1)}>
        Count: {counter}
      </button>
    </div>
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
                <h3 className="text-sm font-medium mb-2">String Storage</h3>
                <div className="border rounded-lg p-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name (persisted in localStorage)</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name..."
                    />
                    <div className="text-sm text-muted-foreground">
                      Stored value: <code>"{name}"</code>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Object Storage</h3>
                <div className="border rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="theme">Theme</Label>
                        <select 
                          id="theme"
                          className="w-full p-2 border rounded"
                          value={preferences.theme}
                          onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
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
                          className="w-full p-2 border rounded"
                          value={preferences.language}
                          onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Stored preferences: <code>{JSON.stringify(preferences)}</code>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Number Storage</h3>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Button onClick={() => setCounter(counter - 1)}>-</Button>
                    <div className="text-lg font-mono">Count: {counter}</div>
                    <Button onClick={() => setCounter(counter + 1)}>+</Button>
                    <Button variant="outline" onClick={() => setCounter(0)}>Reset</Button>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Stored value: <code>{counter}</code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Advanced Usage</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm whitespace-pre-line">
{`// Custom types
interface UserSettings {
  notifications: boolean
  autoSave: boolean
  maxItems: number
}

function SettingsComponent() {
  const [settings, setSettings] = useLocalStorage<UserSettings>('app-settings', {
    notifications: true,
    autoSave: false,
    maxItems: 10
  })

  const updateSetting = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      <label>
        <input 
          type="checkbox" 
          checked={settings.notifications}
          onChange={(e) => updateSetting('notifications', e.target.checked)}
        />
        Enable Notifications
      </label>
    </div>
  )
}

// Array storage
function TodoList() {
  const [todos, setTodos] = useLocalStorage<string[]>('todo-list', [])

  const addTodo = (todo: string) => {
    setTodos(prev => [...prev, todo])
  }

  const removeTodo = (index: number) => {
    setTodos(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          {todo}
          <button onClick={() => removeTodo(index)}>Remove</button>
        </div>
      ))}
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
                          <td className="p-2 font-mono">keyName</td>
                          <td className="p-2">string</td>
                          <td className="p-2">The localStorage key name</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">defaultValue</td>
                          <td className="p-2">T</td>
                          <td className="p-2">Optional default value if no stored value exists</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Returns</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Return</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">[0]</td>
                          <td className="p-2">T</td>
                          <td className="p-2">Current stored value</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">[1]</td>
                          <td className="p-2">(val: T) =&gt; void</td>
                          <td className="p-2">Function to update the stored value</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Generic Type</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm">
                      useLocalStorage&lt;T&gt;(keyName: string, defaultValue?: T): [T, (val: T) =&gt; void]
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    The hook is generic and will infer the type from the default value, or you can explicitly specify the type.
                  </p>
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
                <li>Automatic JSON serialization and deserialization</li>
                <li>TypeScript support with generic type inference</li>
                <li>Safe error handling for invalid JSON</li>
                <li>Automatic localStorage initialization with default values</li>
                <li>Immediate state updates when value changes</li>
                <li>Works with any serializable data type</li>
                <li>Handles string values without unnecessary JSON wrapping</li>
                <li>Falls back gracefully when localStorage is unavailable</li>
                <li>Memory efficient with minimal re-renders</li>
                <li>SSR-safe with proper hydration handling</li>
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
                  <h4 className="font-semibold mb-2">User Preferences</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Theme settings (dark/light mode)</div>
                    <div>• Language preferences</div>
                    <div>• UI customization options</div>
                    <div>• Notification settings</div>
                    <div>• Display preferences</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Application State</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Form draft persistence</div>
                    <div>• Shopping cart contents</div>
                    <div>• Recently viewed items</div>
                    <div>• User authentication tokens</div>
                    <div>• Cached API responses</div>
                    <div>• Application settings</div>
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