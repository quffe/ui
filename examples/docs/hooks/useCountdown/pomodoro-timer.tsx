'use client'

import { useState } from 'react'
import { useCountdownLoopTimer } from '@/hooks/useCountdown'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlayIcon, PauseIcon, RotateCcw } from 'lucide-react'

export default function PomodoroTimerExample() {
  const [mode, setMode] = useState<'work' | 'break'>('work')

  const { startTimer, stopTimer, resetTimer, isRunning, remainingSeconds, loopCount } = useCountdownLoopTimer({
    intervalMs: 1000,
    durationMs: mode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000, // 25min work, 5min break
    onTick: () => {
      // Switch between work and break
      setMode(prev => prev === 'work' ? 'break' : 'work')
      // Show notification (in real app - here we just log)
      console.log(`${mode === 'work' ? 'Break' : 'Work'} time!`)
    },
    autoRestart: true,
    maxLoops: 0 // Infinite loops
  })

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60
  const sessionNumber = Math.floor(loopCount / 2) + 1

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <span className="text-2xl">
            {mode === 'work' ? '🍅' : '☕'}
          </span>
          {mode === 'work' ? 'Work Time' : 'Break Time'}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="space-y-2">
          <div className="text-6xl font-mono font-bold tracking-wider">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant={mode === 'work' ? 'default' : 'secondary'}>
              Session {sessionNumber}
            </Badge>
            <Badge variant="outline">
              Loop {loopCount}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            onClick={isRunning ? stopTimer : startTimer}
            size="sm"
            className="flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <PauseIcon className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <PlayIcon className="h-4 w-4" />
                Start
              </>
            )}
          </Button>
          
          <Button
            onClick={resetTimer}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>🍅 Work: 25 minutes</p>
          <p>☕ Break: 5 minutes</p>
          <p>Timer automatically switches between work and break</p>
        </div>
      </CardContent>
    </Card>
  )
}
