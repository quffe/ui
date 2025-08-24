"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useState, useEffect } from "react"

interface UserSettings {
  notifications: boolean
  autoSave: boolean
  maxItems: number
}

const DEFAULT_SETTINGS: UserSettings = {
  notifications: true,
  autoSave: false,
  maxItems: 10
}

const DEFAULT_TODOS: string[] = []

export default function AdvancedUsageExample() {
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useLocalStorage<UserSettings>("app-settings", DEFAULT_SETTINGS)
  const [todos, setTodos] = useLocalStorage<string[]>("todo-list", DEFAULT_TODOS)
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  const updateSetting = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, newTodo.trim()])
      setNewTodo("")
    }
  }

  const removeTodo = (index: number) => {
    setTodos(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Settings Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting("notifications", !!checked)}
              />
              <Label htmlFor="notifications">Enable Notifications</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoSave"
                checked={settings.autoSave}
                onCheckedChange={(checked) => updateSetting("autoSave", !!checked)}
              />
              <Label htmlFor="autoSave">Auto Save</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxItems">Max Items ({settings.maxItems})</Label>
              <Input
                id="maxItems"
                type="range"
                min="5"
                max="50"
                step="5"
                value={settings.maxItems}
                onChange={(e) => updateSetting("maxItems", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              Settings: <code>{JSON.stringify(settings)}</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Array Storage - Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <Button onClick={addTodo} disabled={!newTodo.trim()}>
                Add
              </Button>
            </div>
            
            <div className="space-y-2">
              {todos.length === 0 ? (
                <div className="text-sm text-muted-foreground">No todos yet. Add one above!</div>
              ) : (
                todos.map((todo, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span>{todo}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeTodo(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              Todos count: {todos.length}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}