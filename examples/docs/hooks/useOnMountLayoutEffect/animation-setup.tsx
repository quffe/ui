"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { useOnMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"

export default function AnimationSetupExample() {
  const [key, setKey] = useState(0)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Animation Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button 
              onClick={() => setKey(prev => prev + 1)} 
              size="sm" 
              variant="outline"
            >
              Remount Component (Trigger Animation)
            </Button>
          </div>
          
          <AnimatedComponent key={key} />
        </div>
      </CardContent>
    </Card>
  )
}

function AnimatedComponent() {
  const elementRef = useRef<HTMLDivElement>(null)
  const [animationState, setAnimationState] = useState('initial')

  useOnMountLayoutEffect(() => {
    if (elementRef.current) {
      // Set initial animation state before paint
      elementRef.current.style.opacity = '0'
      elementRef.current.style.transform = 'translateY(20px)'
      setAnimationState('hidden')
      
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        if (elementRef.current) {
          elementRef.current.style.transition = 'all 0.3s ease'
          elementRef.current.style.opacity = '1'
          elementRef.current.style.transform = 'translateY(0)'
          setAnimationState('visible')
        }
      })
    }
  })

  return (
    <div 
      ref={elementRef} 
      className="border rounded-lg p-6 bg-gradient-to-r from-muted/30 to-muted/50"
    >
      <h3 className="font-semibold mb-2">Smoothly Animated Content</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This component appears with a smooth fade-in animation from below.
        The initial state is set before paint to prevent flash.
      </p>
      
      <div className="bg-card rounded p-3 mb-4">
        <div className="text-sm">
          <strong>Animation State:</strong> {animationState}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          State tracked: initial → hidden → visible
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded"></div>
        <div className="h-2 bg-gradient-to-r from-pink-200 to-purple-200 rounded"></div>
        <div className="h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded"></div>
      </div>
      
      <div className="text-xs text-muted-foreground mt-4">
        Click "Remount Component" above to see the animation again.
      </div>
    </div>
  )
}