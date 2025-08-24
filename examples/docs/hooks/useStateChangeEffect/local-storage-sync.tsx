'use client'

import { useState, useEffect } from 'react'
import { useStateChangeEffect } from '@/hooks/useStateChangeEffect'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Settings } from 'lucide-react'

export default function LocalStorageSyncExample() {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    notifications: true,
    autoSave: false
  })
  const [saveCount, setSaveCount] = useState(0)

  // Sync preferences to localStorage whenever they change
  useStateChangeEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences))
    setSaveCount(prev => prev + 1)
    console.log('Preferences saved to localStorage')
  }, [preferences])

  // Load preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      try {
        const parsedPreferences = JSON.parse(saved)
        setPreferences(parsedPreferences)
      } catch (error) {
        console.error('Failed to parse saved preferences:', error)
      }
    }
  }, [])

  const updatePreference = (key: keyof typeof preferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const resetPreferences = () => {
    setPreferences({
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSave: false
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          User Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Enable Notifications</Label>
            <Switch
              id="notifications"
              checked={preferences.notifications}
              onCheckedChange={(checked) => updatePreference('notifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="autoSave">Auto Save</Label>
            <Switch
              id="autoSave"
              checked={preferences.autoSave}
              onCheckedChange={(checked) => updatePreference('autoSave', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label>Theme</Label>
            <Select 
              value={preferences.theme} 
              onValueChange={(value) => updatePreference('theme', value)}
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
              value={preferences.language} 
              onValueChange={(value) => updatePreference('language', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Auto-saves:</span>
            <Badge variant="secondary">{saveCount}</Badge>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <div>Current preferences:</div>
            <code className="block p-2 bg-muted rounded text-xs break-all">
              {JSON.stringify(preferences, null, 2)}
            </code>
          </div>

          <button
            onClick={resetPreferences}
            className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset to defaults
          </button>
        </div>
      </CardContent>
    </Card>
  )
}