"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useState, useEffect } from "react"

export default function BasicUsageExample() {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useLocalStorage<string>("demo-name", "")
  const [counter, setCounter] = useLocalStorage<number>("demo-counter", 0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">String Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="name">Name (persisted in localStorage)</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name..."
            />
            <div className="text-sm text-muted-foreground">
              Stored value: <code>&quot;{name}&quot;</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Number Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button onClick={() => setCounter(counter - 1)}>-</Button>
            <div className="text-lg font-mono">Count: {counter}</div>
            <Button onClick={() => setCounter(counter + 1)}>+</Button>
            <Button variant="outline" onClick={() => setCounter(0)}>
              Reset
            </Button>
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Stored value: <code>{counter}</code>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}