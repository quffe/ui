'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"

export function LiveStateChangeExample() {
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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name..."
          />
        </div>
        <div>
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
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="theme">Theme</Label>
          <select
            id="theme"
            className="w-full p-2 border rounded-md"
            value={settings.theme}
            onChange={e => setSettings({ ...settings, theme: e.target.value })}
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
            onChange={e => setSettings({ ...settings, lang: e.target.value })}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
      <div className="text-sm text-muted-foreground space-y-1">
        <div>
          Effect trigger count: <strong>{effectCount}</strong>
        </div>
        <div>
          Last change: <strong>{lastChange || "Never"}</strong>
        </div>
        <div>
          Current values: <code>{JSON.stringify({ name, age, settings })}</code>
        </div>
      </div>
    </div>
  )
}