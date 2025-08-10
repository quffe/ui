'use client'

import * as React from 'react'

/**
 * Options for the countdown loop timer hook
 */
export interface UseCountdownLoopTimerOptions {
  /** Interval between ticks in milliseconds */
  intervalMs: number
  /** Total duration per loop in milliseconds */
  durationMs: number
  /** Callback function called on each loop completion */
  onTick: () => Promise<void> | void
  /** Whether to start the timer immediately */
  start?: boolean
  /** Whether to auto-restart the timer after completion */
  autoRestart?: boolean
  /** Maximum number of loops (0 = infinite) */
  maxLoops?: number
}

/**
 * Return type for the countdown loop timer hook
 */
export interface UseCountdownLoopTimerReturn {
  /** Start the timer */
  startTimer: () => void
  /** Stop the timer */
  stopTimer: () => void
  /** Reset and restart the timer */
  resetTimer: () => void
  /** Pause the timer (preserves remaining time) */
  pauseTimer: () => void
  /** Resume a paused timer */
  resumeTimer: () => void
  /** Remaining time in milliseconds */
  remainingMs: number
  /** Remaining time in seconds (rounded up) */
  remainingSeconds: number
  /** Whether the timer is currently running */
  isRunning: boolean
  /** Whether the timer is paused */
  isPaused: boolean
  /** Number of completed loops */
  loopCount: number
  /** Progress as percentage (0-100) */
  progress: number
}

/**
 * A hook for creating countdown timers with loop functionality
 * 
 * Features:
 * - Customizable interval and duration
 * - Auto-restart capability
 * - Pause/resume functionality
 * - Loop counting with limits
 * - Progress tracking
 * - Async callback support
 * - Automatic cleanup
 * 
 * @param options - Configuration options
 * @returns Object with timer controls and state
 * 
 * @example
 * ```tsx
 * function CountdownTimer() {
 *   const {
 *     startTimer,
 *     stopTimer,
 *     remainingSeconds,
 *     isRunning,
 *     loopCount,
 *     progress
 *   } = useCountdownLoopTimer({
 *     intervalMs: 1000,
 *     durationMs: 30000, // 30 seconds
 *     onTick: async () => {
 *       console.log('Timer completed!')
 *       await fetchData() // Some async operation
 *     },
 *     autoRestart: true,
 *     maxLoops: 5
 *   })
 * 
 *   return (
 *     <div>
 *       <div>Time remaining: {remainingSeconds}s</div>
 *       <div>Progress: {progress.toFixed(1)}%</div>
 *       <div>Loop: {loopCount}</div>
 *       <button onClick={isRunning ? stopTimer : startTimer}>
 *         {isRunning ? 'Stop' : 'Start'}
 *       </button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useCountdownLoopTimer({
  intervalMs,
  durationMs,
  onTick,
  start = false,
  autoRestart = false,
  maxLoops = 0,
}: UseCountdownLoopTimerOptions): UseCountdownLoopTimerReturn {
  const [remainingMs, setRemainingMs] = React.useState(durationMs)
  const [isRunning, setIsRunning] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)
  const [loopCount, setLoopCount] = React.useState(0)
  
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)
  const savedCallback = React.useRef(onTick)
  const startTimeRef = React.useRef<number>(0)
  const pausedTimeRef = React.useRef<number>(0)

  // Keep callback reference fresh
  React.useEffect(() => {
    savedCallback.current = onTick
  }, [onTick])

  // Calculate progress percentage
  const progress = ((durationMs - remainingMs) / durationMs) * 100

  /**
   * Clear the current interval
   */
  const clearCurrentInterval = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  /**
   * Handle timer tick
   */
  const tick = React.useCallback(() => {
    setRemainingMs(prev => {
      const newRemaining = prev - intervalMs
      return newRemaining <= 0 ? 0 : newRemaining
    })
  }, [intervalMs])

  /**
   * Handle loop completion
   */
  const handleLoopComplete = React.useCallback(async () => {
    setIsRunning(false)
    clearCurrentInterval()

    try {
      await savedCallback.current()
    } catch (error) {
      console.error('Error in onTick callback:', error)
    }

    setLoopCount(prev => prev + 1)

    // Check if we should restart
    const newLoopCount = loopCount + 1
    const shouldRestart = autoRestart && (maxLoops === 0 || newLoopCount < maxLoops)
    
    if (shouldRestart) {
      setRemainingMs(durationMs)
      setIsRunning(true)
      startTimeRef.current = Date.now()
      intervalRef.current = setInterval(tick, intervalMs)
    }
  }, [autoRestart, maxLoops, loopCount, durationMs, tick, intervalMs, clearCurrentInterval])

  /**
   * Handle when remaining time reaches zero
   */
  React.useEffect(() => {
    if (remainingMs <= 0 && isRunning) {
      handleLoopComplete()
    }
  }, [remainingMs, isRunning, handleLoopComplete])

  /**
   * Start the timer
   */
  const startTimer = React.useCallback(() => {
    if (isRunning || (maxLoops > 0 && loopCount >= maxLoops)) return
    
    setIsRunning(true)
    setIsPaused(false)
    startTimeRef.current = Date.now()
    
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(tick, intervalMs)
  }, [isRunning, maxLoops, loopCount, tick, intervalMs])

  /**
   * Stop the timer
   */
  const stopTimer = React.useCallback(() => {
    setIsRunning(false)
    setIsPaused(false)
    clearCurrentInterval()
  }, [clearCurrentInterval])

  /**
   * Pause the timer
   */
  const pauseTimer = React.useCallback(() => {
    if (!isRunning || isPaused) return
    
    setIsPaused(true)
    setIsRunning(false)
    pausedTimeRef.current = Date.now()
    clearCurrentInterval()
  }, [isRunning, isPaused, clearCurrentInterval])

  /**
   * Resume a paused timer
   */
  const resumeTimer = React.useCallback(() => {
    if (!isPaused) return
    
    setIsPaused(false)
    setIsRunning(true)
    startTimeRef.current = Date.now() - (pausedTimeRef.current - startTimeRef.current)
    
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(tick, intervalMs)
  }, [isPaused, tick, intervalMs])

  /**
   * Reset and restart the timer
   */
  const resetTimer = React.useCallback(() => {
    clearCurrentInterval()
    setRemainingMs(durationMs)
    setLoopCount(0)
    setIsPaused(false)
    
    if (start || isRunning) {
      setIsRunning(true)
      startTimeRef.current = Date.now()
      intervalRef.current = setInterval(tick, intervalMs)
    } else {
      setIsRunning(false)
    }
  }, [durationMs, start, isRunning, tick, intervalMs, clearCurrentInterval])

  // Auto-start on mount if requested
  React.useEffect(() => {
    if (start && !isRunning) {
      startTimer()
    }
    
    // Cleanup on unmount
    return () => {
      clearCurrentInterval()
    }
  }, [start]) // Only run on mount

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      clearCurrentInterval()
    }
  }, [clearCurrentInterval])

  return {
    startTimer,
    stopTimer,
    resetTimer,
    pauseTimer,
    resumeTimer,
    remainingMs,
    remainingSeconds: Math.ceil(remainingMs / 1000),
    isRunning,
    isPaused,
    loopCount,
    progress,
  }
}

/**
 * Simple countdown hook for basic use cases
 * 
 * @param initialTime - Initial countdown time in seconds
 * @param onComplete - Callback when countdown reaches zero
 * @returns Object with countdown state and controls
 * 
 * @example
 * ```tsx
 * function SimpleCountdown() {
 *   const { seconds, start, stop, reset, isActive } = useCountdown(60, () => {
 *     alert('Time is up!')
 *   })
 *   
 *   return (
 *     <div>
 *       <div>{seconds} seconds remaining</div>
 *       <button onClick={start}>Start</button>
 *       <button onClick={stop}>Stop</button>
 *       <button onClick={reset}>Reset</button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useCountdown(
  initialTime: number,
  onComplete?: () => void
) {
  const {
    startTimer,
    stopTimer,
    resetTimer,
    remainingSeconds,
    isRunning,
  } = useCountdownLoopTimer({
    intervalMs: 1000,
    durationMs: initialTime * 1000,
    onTick: onComplete || (() => {}),
    autoRestart: false,
  })

  return {
    seconds: remainingSeconds,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
    isActive: isRunning,
  }
}