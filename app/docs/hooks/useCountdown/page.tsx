"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { InstallationTabs } from "@/components/internal/installation"
import { CodeBlock } from "@/components/ui/code-block"
import { useState, useEffect } from "react"
import { useCountdown, useCountdownLoopTimer } from "@/hooks/useCountdown"

export default function UseCountdownDocs() {
  const [mounted, setMounted] = useState(false)
  const { seconds, start, stop, reset, isActive } = useCountdown(30, () => {
    alert("Simple countdown completed!")
  })

  const {
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    remainingSeconds,
    isRunning,
    isPaused,
    loopCount,
    progress,
  } = useCountdownLoopTimer({
    intervalMs: 1000,
    durationMs: 10000, // 10 seconds
    onTick: () => {
      console.log("Loop completed!")
    },
    autoRestart: false,
    maxLoops: 3,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

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
              <BreadcrumbPage>useCountdown</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useCountdown</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A versatile countdown timer hook with basic and advanced features for creating timers,
              loops, and progress tracking.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">Timer</Badge>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the hook using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="useCountdown" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <CodeBlock language="typescript">
                  {`import { useCountdown, useCountdownLoopTimer } from "@/hooks/useCountdown"`}
                </CodeBlock>
              </div>

              <CodeBlock language="tsx">
                {`// Simple countdown
function SimpleTimer() {
  const { seconds, start, stop, reset, isActive } = useCountdown(60, () => {
    alert('Time is up!')
  })

  return (
    <div>
      <div>{seconds} seconds remaining</div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// Advanced countdown with loops
function AdvancedTimer() {
  const { 
    startTimer, 
    stopTimer, 
    remainingSeconds, 
    loopCount,
    progress 
  } = useCountdownLoopTimer({
    intervalMs: 1000,
    durationMs: 30000, // 30 seconds
    onTick: () => console.log('Loop completed!'),
    autoRestart: true,
    maxLoops: 5
  })

  return (
    <div>
      <div>Time: {remainingSeconds}s</div>
      <div>Progress: {progress.toFixed(1)}%</div>
      <div>Loop: {loopCount}</div>
    </div>
  )
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Simple Countdown</h3>
                <div className="border rounded-lg p-4">
                  <div className="text-sm mb-4">
                    Time remaining: <strong>{mounted ? seconds : 0} seconds</strong>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={start} disabled={isActive}>
                      Start
                    </Button>
                    <Button size="sm" onClick={stop} disabled={!isActive}>
                      Stop
                    </Button>
                    <Button size="sm" onClick={reset}>
                      Reset
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Status: {mounted ? (isActive ? "Running" : "Stopped") : "Loading..."}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Advanced Loop Timer</h3>
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      Time: <strong>{mounted ? remainingSeconds : 0}s</strong>
                    </div>
                    <div>
                      Progress: <strong>{mounted ? progress.toFixed(1) : 0}%</strong>
                    </div>
                    <div>
                      Loop: <strong>{mounted ? loopCount : 0}</strong>
                    </div>
                    <div>
                      Status:{" "}
                      <strong>
                        {mounted
                          ? isRunning
                            ? "Running"
                            : isPaused
                              ? "Paused"
                              : "Stopped"
                          : "Loading..."}
                      </strong>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={startTimer} disabled={isRunning}>
                      Start
                    </Button>
                    <Button size="sm" onClick={stopTimer} disabled={!isRunning && !isPaused}>
                      Stop
                    </Button>
                    <Button size="sm" onClick={pauseTimer} disabled={!isRunning}>
                      Pause
                    </Button>
                    <Button size="sm" onClick={resumeTimer} disabled={!isPaused}>
                      Resume
                    </Button>
                    <Button size="sm" onClick={resetTimer}>
                      Reset
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Pomodoro Timer Example</h3>
                <CodeBlock language="tsx">
                  {`function PomodoroTimer() {
  const [mode, setMode] = useState('work') // 'work' | 'break'
  
  const { startTimer, stopTimer, remainingSeconds, loopCount } = useCountdownLoopTimer({
    intervalMs: 1000,
    durationMs: mode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000, // 25min work, 5min break
    onTick: () => {
      // Switch between work and break
      setMode(prev => prev === 'work' ? 'break' : 'work')
      // Show notification
      new Notification(\`\${mode === 'work' ? 'Break' : 'Work'} time!\`)
    },
    autoRestart: true,
    maxLoops: 0 // Infinite loops
  })
  
  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60
  
  return (
    <div className="text-center">
      <h2>{mode === 'work' ? '🍅 Work Time' : '☕ Break Time'}</h2>
      <div className="text-4xl font-mono">
        {minutes:02d}:{seconds:02d}
      </div>
      <div>Session: {Math.floor(loopCount / 2) + 1}</div>
    </div>
  )
}`}
                </CodeBlock>
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
                  <h3 className="font-semibold mb-3">useCountdown</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Simple countdown hook for basic use cases.
                  </p>

                  <h4 className="font-medium mb-2">Parameters</h4>
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
                          <td className="p-2 font-mono">initialTime</td>
                          <td className="p-2">number</td>
                          <td className="p-2">Initial countdown time in seconds</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">onComplete</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Optional callback when countdown reaches zero</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Returns</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Property</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">seconds</td>
                          <td className="p-2">number</td>
                          <td className="p-2">Current remaining seconds</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">start</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Start the countdown</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">stop</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Stop the countdown</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">reset</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Reset countdown to initial time</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">isActive</td>
                          <td className="p-2">boolean</td>
                          <td className="p-2">Whether countdown is running</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">useCountdownLoopTimer</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Advanced countdown hook with loop functionality and fine-grained control.
                  </p>

                  <h4 className="font-medium mb-2">Parameters (UseCountdownLoopTimerOptions)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Parameter</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Default</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">intervalMs</td>
                          <td className="p-2">number</td>
                          <td className="p-2">-</td>
                          <td className="p-2">Interval between ticks in milliseconds</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">durationMs</td>
                          <td className="p-2">number</td>
                          <td className="p-2">-</td>
                          <td className="p-2">Total duration per loop in milliseconds</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">onTick</td>
                          <td className="p-2">() =&gt; Promise&lt;void&gt; | void</td>
                          <td className="p-2">-</td>
                          <td className="p-2">Callback called on each loop completion</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">start</td>
                          <td className="p-2">boolean</td>
                          <td className="p-2">false</td>
                          <td className="p-2">Whether to start timer immediately</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">autoRestart</td>
                          <td className="p-2">boolean</td>
                          <td className="p-2">false</td>
                          <td className="p-2">Whether to auto-restart after completion</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">maxLoops</td>
                          <td className="p-2">number</td>
                          <td className="p-2">0</td>
                          <td className="p-2">Maximum number of loops (0 = infinite)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Returns (UseCountdownLoopTimerReturn)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Property</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">startTimer</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Start the timer</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">stopTimer</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Stop the timer</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">resetTimer</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Reset and restart the timer</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">pauseTimer</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Pause the timer (preserves remaining time)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">resumeTimer</td>
                          <td className="p-2">() =&gt; void</td>
                          <td className="p-2">Resume a paused timer</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">remainingMs</td>
                          <td className="p-2">number</td>
                          <td className="p-2">Remaining time in milliseconds</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">remainingSeconds</td>
                          <td className="p-2">number</td>
                          <td className="p-2">Remaining time in seconds (rounded up)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">isRunning</td>
                          <td className="p-2">boolean</td>
                          <td className="p-2">Whether the timer is currently running</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">isPaused</td>
                          <td className="p-2">boolean</td>
                          <td className="p-2">Whether the timer is paused</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">loopCount</td>
                          <td className="p-2">number</td>
                          <td className="p-2">Number of completed loops</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">progress</td>
                          <td className="p-2">number</td>
                          <td className="p-2">Progress as percentage (0-100)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Two hook variants: simple countdown and advanced loop timer</li>
                <li>Customizable intervals and durations</li>
                <li>Auto-restart capability with loop limits</li>
                <li>Pause/resume functionality</li>
                <li>Progress tracking as percentage</li>
                <li>Async callback support for loop completion</li>
                <li>Automatic cleanup on unmount</li>
                <li>TypeScript support with full type safety</li>
                <li>Memory efficient with proper interval cleanup</li>
                <li>Error handling for callback functions</li>
                <li>Flexible time units (milliseconds and seconds)</li>
                <li>Perfect for timers, pomodoro apps, and periodic tasks</li>
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
                  <h4 className="font-semibold mb-2">Simple Countdown</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Authentication timeouts</div>
                    <div>• Form submission delays</div>
                    <div>• Quiz/test timers</div>
                    <div>• Session expiry warnings</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Advanced Loop Timer</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Pomodoro technique timers</div>
                    <div>• Exercise interval training</div>
                    <div>• Periodic data polling</div>
                    <div>• Auto-save functionality</div>
                    <div>• Slideshow presentations</div>
                    <div>• Game turn timers</div>
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
