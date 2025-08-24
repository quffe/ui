"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useStrictMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"

export default function CriticalStyleSetupExample() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isInitialized, setIsInitialized] = useState(false)

  useStrictMountLayoutEffect(() => {
    // Apply theme synchronously before paint to prevent flash
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    setIsInitialized(true)
    
    return () => {
      // Cleanup theme on unmount
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.style.removeProperty('color-scheme')
    }
  })

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    // Apply theme change immediately
    document.documentElement.setAttribute('data-theme', newTheme)
    document.documentElement.style.colorScheme = newTheme
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Critical Style Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-gradient-to-r from-muted/30 to-muted/50">
            <h3 className="font-semibold mb-2">Theme Provider Simulation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This component applies critical theme styles before paint to prevent visual flash.
            </p>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm">Current theme: <strong>{theme}</strong></span>
              <span className="text-sm">Initialized: <strong>{isInitialized ? 'Yes' : 'No'}</strong></span>
            </div>
            
            <Button onClick={toggleTheme} variant="outline" size="sm">
              Toggle Theme (Current: {theme})
            </Button>
            
            <div className="text-xs text-muted-foreground mt-4">
              Theme is applied synchronously on mount and when toggled to prevent flash of unstyled content.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}