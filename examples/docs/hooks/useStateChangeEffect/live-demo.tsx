"use client"

import { useState } from "react"
import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LiveDemoExample() {
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [settings, setSettings] = useState({ theme: "light", lang: "en" })
  const [effectCount, setEffectCount] = useState(0)
  const [lastChange, setLastChange] = useState<string>("")

  // Demonstrate the hook
  useStateChangeEffect(() => {
    setEffectCount(prev => prev + 1)
    setLastChange(new Date().toLocaleTimeString())
    console.log("State changed:", { name, age, settings })
  }, [name, age, settings])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Live Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={e => setAge(Number(e.target.value))}
              placeholder="Enter your age..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={settings.theme}
              onValueChange={value => setSettings({ ...settings, theme: value })}
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
          </div>
          <div className="space-y-2">
            <Label>Language</Label>
            <Select
              value={settings.lang}
              onValueChange={value => setSettings({ ...settings, lang: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-md space-y-2 text-sm">
          <div>
            Effect trigger count: <strong>{effectCount}</strong>
          </div>
          <div>
            Last change: <strong>{lastChange || "Never"}</strong>
          </div>
          <div>
            Current values:{" "}
            <code className="text-xs break-all">{JSON.stringify({ name, age, settings })}</code>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
