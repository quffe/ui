'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMemo, useState, useEffect } from 'react'

const DEFAULT_PREFERENCES = { theme: 'light' }

export default function UsageExamplesExample() {
  const [mounted, setMounted] = useState(false)
  
  // String value with default
  const [name, setName] = useLocalStorage<string>('user-name', 'Guest')
  
  // Object value with default - use stable reference
  const [preferences, setPreferences] = useLocalStorage<{theme: string}>('user-prefs', DEFAULT_PREFERENCES)
  
  // Number value
  const [counter, setCounter] = useLocalStorage<number>('counter', 0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-muted/50 rounded animate-pulse" />
        <div className="h-32 bg-muted/50 rounded animate-pulse" />
        <div className="h-32 bg-muted/50 rounded animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">String Storage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="name">Name (stored as string)</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
          />
          <p className="text-sm text-muted-foreground">
            Current value: <code>{name}</code>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Object Storage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label>Theme Preference (stored as object)</Label>
          <Select 
            value={preferences.theme} 
            onValueChange={(theme) => setPreferences({ ...preferences, theme })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="auto">Auto</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Current object: <code>{JSON.stringify(preferences)}</code>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Number Storage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <Button onClick={() => setCounter(counter + 1)}>
              Count: {counter}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setCounter(0)}
            >
              Reset
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Current value: <code>{counter}</code>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}