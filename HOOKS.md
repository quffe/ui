# Custom React Hooks

A comprehensive collection of reusable React hooks built with TypeScript for enhanced functionality and developer experience.

## Available Hooks

### Device & Layout Detection

- **[useMobile](#usemobile)** - Responsive viewport detection with SSR support
- **[useOnWindowResize](#useonwindowresize)** - Window resize event handling

### State Management & Storage

- **[useLocalStorage](#uselocalstorage)** - Persistent localStorage state management
- **[useStateChangeEffect](#usestatechangeeffect)** - Effect triggered by state changes

### Utilities & Effects

- **[useCopyToClipboard](#usecopytoclipboard)** - Advanced clipboard operations
- **[useCountdown](#usecountdown)** - Countdown timers with loop support
- **[useOnMountEffect](#useonmounteffect)** - Mount-only effect execution
- **[useRevalidate](#userevalidate)** - SWR cache revalidation helper

### GitHub Mentions

- useGithubMention (SWR) – default hook for fetching GitHub metadata
- useGithubMentionQuery (React Query) – optional adapter
- getGithubResource – plain fetch utility for server/client without a cache

---

## Hook Documentation

### useMobile

A responsive viewport detection hook with SSR-safe hydration and customizable breakpoints.

**Features:**
- Responsive breakpoint detection
- SSR-safe with proper hydration
- Customizable breakpoint
- Automatic cleanup
- Performance optimized with matchMedia API

```tsx
import { useMobile } from "@/hooks/use-mobile"

function MyComponent() {
  const isMobile = useMobile()
  const isTablet = useMobile({ breakpoint: 1024 })
  
  return (
    <div>
      {isMobile ? 'Mobile Layout' : 'Desktop Layout'}
    </div>
  )
}
```

**API:**
```tsx
interface UseMobileOptions {
  breakpoint?: number        // Custom breakpoint in pixels (default: 768)
  defaultValue?: boolean     // Initial value before hydration (default: false)
  ssrSafe?: boolean         // Whether to use SSR-safe mode (default: true)
}

function useMobile(options?: UseMobileOptions): boolean
```

---

### useCopyToClipboard

Advanced clipboard operations with comprehensive error handling and state management.

**Features:**
- Modern Clipboard API with fallback
- Loading and success states
- Error handling
- Customizable notifications
- Auto-reset after timeout
- TypeScript support

```tsx
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"

function CopyButton({ text }: { text: string }) {
  const { copy, copied, error, isLoading } = useCopyToClipboard({
    onSuccess: (text) => console.log('Copied:', text),
    onError: (error) => console.error('Copy failed:', error),
    timeout: 3000
  })

  return (
    <button
      onClick={() => copy(text, 'API Key')}
      disabled={isLoading}
    >
      {isLoading ? 'Copying...' : copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
```

**API:**
```tsx
interface UseCopyToClipboardOptions {
  onSuccess?: (text: string) => void
  onError?: (error: Error) => void
  timeout?: number
  showToast?: boolean
  toast?: (message: string, type?: "success" | "error") => void
}

interface UseCopyToClipboardReturn {
  copy: (text: string, label?: string) => Promise<boolean>
  copied: boolean
  error: Error | null
  isLoading: boolean
}

function useCopyToClipboard(options?: UseCopyToClipboardOptions): UseCopyToClipboardReturn
```

---

## GitHub Mentions – Installation Options

Pick one of the following depending on your stack:

- SWR (default)
  - Install via shadcn CLI: `@ui-components/hooks/use-github-mention`
  - Adds a dependency on `swr`.
  - Usage: `import { useGithubMention } from "@/hooks/use-github-mention"`

- React Query (optional)
  - Install via shadcn CLI: `@ui-components/hooks/use-github-mention-react-query`
  - Adds a dependency on `@tanstack/react-query`.
  - Usage: `import { useGithubMentionQuery } from "@/hooks/use-github-mention-react-query"`

- No cache (plain fetch)
  - Use `getGithubResource` from `@/lib/github/resource` (no extra deps)
  - Server Components: `await getGithubResource(url, { useServer: true })`
  - Client Components: call `getGithubResource(url)` inside an effect.

CLI quick refs
- Plain (default): `@ui-components/hooks/use-github-mention-plain`
- SWR: `@ui-components/hooks/use-github-mention`
- React Query: `@ui-components/hooks/use-github-mention-react-query`

Notes
- Both hooks support invalid URLs and expose `invalidReason` for quick checks.
- For higher rate limits or CORS avoidance, pass `useServer: true` to fetch via `/api/github/resource`.


### useCountdown

Countdown timers with loop functionality and comprehensive controls.

**Features:**
- Customizable interval and duration
- Auto-restart capability
- Pause/resume functionality
- Loop counting with limits
- Progress tracking
- Async callback support
- Automatic cleanup

```tsx
import { useCountdownLoopTimer, useCountdown } from "@/hooks/useCountdown"

// Advanced countdown with loops
function CountdownTimer() {
  const {
    startTimer,
    stopTimer,
    remainingSeconds,
    isRunning,
    loopCount,
    progress
  } = useCountdownLoopTimer({
    intervalMs: 1000,
    durationMs: 30000, // 30 seconds
    onTick: async () => {
      console.log('Timer completed!')
      await fetchData() // Some async operation
    },
    autoRestart: true,
    maxLoops: 5
  })

  return (
    <div>
      <div>Time remaining: {remainingSeconds}s</div>
      <div>Progress: {progress.toFixed(1)}%</div>
      <div>Loop: {loopCount}</div>
      <button onClick={isRunning ? stopTimer : startTimer}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}

// Simple countdown
function SimpleCountdown() {
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
```

**API:**
```tsx
// Advanced countdown
interface UseCountdownLoopTimerOptions {
  intervalMs: number
  durationMs: number
  onTick: () => Promise<void> | void
  start?: boolean
  autoRestart?: boolean
  maxLoops?: number
}

// Simple countdown
function useCountdown(initialTime: number, onComplete?: () => void)
```

---

### useLocalStorage

Persistent localStorage state management with TypeScript generics.

**Features:**
- TypeScript generic support
- Automatic JSON serialization/deserialization
- Fallback handling for malformed data
- Synchronized with localStorage

```tsx
import { useLocalStorage } from "@/hooks/useLocalStorage"

function Settings() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')
  const [settings, setSettings] = useLocalStorage('app-settings', {
    notifications: true,
    autoSave: false
  })

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Current theme: {theme}
      </button>
    </div>
  )
}
```

**API:**
```tsx
function useLocalStorage<T>(keyName: string, defaultValue?: T): [T, (val: T) => void]
```

---

### useOnMountEffect

Execute effects only once when component mounts, with multiple variants for different use cases.

**Features:**
- Runs effect only on first mount
- Ignores dependency changes after first run
- Proper cleanup handling
- Multiple variants available

```tsx
import { useOnMountEffect, useStrictMountEffect, useHasMounted } from "@/hooks/useOnMountEffect"

function MyComponent({ userId }: { userId: string }) {
  // Runs once on mount, captures dependencies
  useOnMountEffect(() => {
    console.log('This runs only once on mount')
    return () => {
      console.log('Cleanup on unmount')
    }
  })

  // With dependencies (still only runs once)
  useOnMountEffect(() => {
    fetchUserData(userId)
  }, [userId]) // userId is captured on mount, changes ignored

  // Strict version - completely ignores dependencies
  useStrictMountEffect(() => {
    initializeApp()
  })

  // Check if component has mounted
  const hasMounted = useHasMounted()
  
  if (!hasMounted) {
    return <div>Loading...</div>
  }

  return <div>Component content</div>
}
```

**API:**
```tsx
function useOnMountEffect(effect: React.EffectCallback, dependencies?: React.DependencyList): void
function useStrictMountEffect(effect: React.EffectCallback): void
function useHasMounted(): boolean
```

---

### useOnWindowResize

Handle window resize events with automatic cleanup.

**Features:**
- Automatic event listener setup/cleanup
- Immediate handler execution on mount
- TypeScript support

```tsx
import { useOnWindowResize } from "@/hooks/useOnWindowResize"

function ResponsiveComponent() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useOnWindowResize(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
  })

  return (
    <div>
      Window size: {dimensions.width} x {dimensions.height}
    </div>
  )
}
```

**API:**
```tsx
function useOnWindowResize(handler: () => void): void
```

---

### useStateChangeEffect

Execute effects when specific states change, with deep comparison support.

**Features:**
- Deep state comparison using JSON.stringify
- Multiple state tracking
- Automatic dependency management

```tsx
import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"

function DataProcessor() {
  const [data, setData] = useState(null)
  const [filters, setFilters] = useState({})
  const [sortOrder, setSortOrder] = useState('asc')

  useStateChangeEffect(() => {
    // This runs whenever data, filters, or sortOrder changes
    processData(data, filters, sortOrder)
  }, [data, filters, sortOrder])

  return <div>Data processing component</div>
}
```

**API:**
```tsx
function useStateChangeEffect<T>(effect: () => void, states: T[]): void
```

---

### useRevalidate

SWR cache revalidation helper for managing server state.

**Features:**
- Bulk URL revalidation
- SWR integration
- Type-safe key matching

```tsx
import useRevalidate from "@/hooks/useRevalidate"

function DataManager() {
  const { revalidate } = useRevalidate()

  const handleRefreshData = () => {
    revalidate([
      '/api/users',
      '/api/posts',
      '/api/comments'
    ])
  }

  return (
    <button onClick={handleRefreshData}>
      Refresh All Data
    </button>
  )
}
```

**API:**
```tsx
interface UseRevalidateReturn {
  revalidate: (urls: string[]) => void
}

function useRevalidate(): UseRevalidateReturn
```

---

## Installation

These hooks are part of the UI Components library. They're located in the `/hooks` directory and can be imported directly:

```tsx
import { useMobile } from "@/hooks/use-mobile"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { useCountdown } from "@/hooks/useCountdown"
// ... other hooks
```

## TypeScript Support

All hooks are built with TypeScript and include comprehensive type definitions:

- Generic type support where applicable
- Proper interface definitions
- JSDoc comments for better IDE experience
- Strict type checking enabled

## Best Practices

1. **Hook Naming**: Follow the `use` prefix convention
2. **Dependencies**: Always include proper dependency arrays for effects
3. **Cleanup**: Implement cleanup functions for effects with subscriptions
4. **TypeScript**: Use generics for reusable hooks with different data types
5. **SSR**: Consider server-side rendering compatibility where applicable
6. **Performance**: Use React.useCallback and React.useMemo for expensive operations

## Legacy Support

Some hooks include legacy exports for backward compatibility:
- `useIsMobile` → use `useMobile` instead
- `useCopyToClipboard_Legacy` → use `useCopyToClipboard` instead
- `useOnMountEffect_Legacy` → use `useOnMountEffect` instead

These legacy exports are deprecated and will be removed in future versions.
