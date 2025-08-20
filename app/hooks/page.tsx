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
import { PreviewTabs } from "@/components/ui/preview-tabs"
import { useState, useRef, useEffect } from "react"

// Hook examples
import { useMobile } from "@/hooks/use-mobile"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { useCountdown } from "@/hooks/useCountdown"
import { useOnMountEffect } from "@/hooks/useOnMountEffect"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import { useOnWindowResize } from "@/hooks/useOnWindowResize"
import { useOnMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"
import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"
import { Dropdown } from "@/components/Navigation/Dropdown"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

// Hook demo components
function UseMobileDemo() {
  const isMobile = useMobile()

  return (
    <div className="text-center p-4">
      <div className="text-lg font-semibold mb-2">
        Device: {isMobile ? "📱 Mobile" : "💻 Desktop"}
      </div>
      <div className="text-sm text-muted-foreground">Resize your window to see the change</div>
    </div>
  )
}

function UseLocalStorageDemo() {
  const [name, setName] = useLocalStorage("demo-name", "")

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name..."
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="text-sm text-muted-foreground">
        Value persists in localStorage: <strong>{name || "Empty"}</strong>
      </div>
    </div>
  )
}

function UseCopyToClipboardDemo() {
  const { copy, copied, error } = useCopyToClipboard()

  const handleCopy = () => {
    copy("Hello from React Hook!")
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleCopy}>{copied ? "✅ Copied!" : "📋 Copy Text"}</Button>
      {error && <div className="text-sm text-red-500">Error: {error.message}</div>}
      <div className="text-sm text-muted-foreground">
        Click to copy &quot;Hello from React Hook!&quot; to clipboard
      </div>
    </div>
  )
}

function UseCountdownDemo() {
  const { seconds, start, stop, reset, isActive } = useCountdown(10, () => console.log("Countdown completed!"))

  const formatTime = (seconds: number) => {
    return `${seconds}s`
  }

  return (
    <div className="text-center space-y-4">
      <div className="text-2xl font-bold">{formatTime(seconds)}</div>
      <div className="flex gap-2 justify-center">
        <Button onClick={start} disabled={isActive} size="sm">
          Start
        </Button>
        <Button onClick={stop} disabled={!isActive} size="sm" variant="outline">
          Stop
        </Button>
        <Button onClick={reset} size="sm" variant="outline">
          Reset
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        Status: {isActive ? "Running" : "Stopped"}
      </div>
    </div>
  )
}

function UseOnMountEffectDemo() {
  const [mountTime, setMountTime] = useState<string>("")

  useOnMountEffect(() => {
    setMountTime(new Date().toLocaleTimeString())
    console.log("Component mounted!")
  })

  return (
    <div className="text-center p-4">
      <div className="text-lg font-semibold mb-2">Mount Time: {mountTime}</div>
      <div className="text-sm text-muted-foreground">
        This effect ran only once when component mounted
      </div>
    </div>
  )
}

function UseKeyboardShortcutDemo() {
  const [count, setCount] = useState(0)

  useKeyboardShortcut(
    {
      id: "demo-increment",
      keys: "shift+space",
      description: "Increment counter",
      category: "Demo",
    },
    () => setCount(prev => prev + 1)
  )

  return (
    <div className="text-center space-y-4">
      <div className="text-2xl font-bold">Count: {count}</div>
      <div className="text-sm text-muted-foreground">
        Press <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Shift</kbd> +{" "}
        <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Space</kbd> to increment
      </div>
      <Button onClick={() => setCount(prev => prev + 1)} size="sm">
        Or click here
      </Button>
    </div>
  )
}

function UseOnWindowResizeDemo() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeCount, setResizeCount] = useState(0)

  useOnWindowResize(() => {
    setIsResizing(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    setResizeCount(prev => prev + 1)
    
    // Reset resizing state after delay to show the debouncing effect
    const timeout = setTimeout(() => setIsResizing(false), 500)
    return () => clearTimeout(timeout)
  })

  return (
    <div className="text-center space-y-4">
      <div className="text-2xl font-bold">Window Resize Monitor</div>
      
      {/* Window Dimensions */}
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <div className="p-3 bg-muted rounded-md">
          <div className="text-sm text-muted-foreground">Width (X)</div>
          <div className="text-xl font-semibold">{windowSize.width}px</div>
        </div>
        <div className="p-3 bg-muted rounded-md">
          <div className="text-sm text-muted-foreground">Height (Y)</div>
          <div className="text-xl font-semibold">{windowSize.height}px</div>
        </div>
      </div>

      {/* Status and Counter */}
      <div className="space-y-2">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
          isResizing 
            ? "bg-yellow-100 text-yellow-800 border border-yellow-200" 
            : "bg-green-100 text-green-800 border border-green-200"
        }`}>
          <div className={`w-2 h-2 rounded-full ${isResizing ? "bg-yellow-500" : "bg-green-500"}`} />
          {isResizing ? "Resizing..." : "Stable"}
        </div>
        
        <div className="text-sm text-muted-foreground">
          Resize events: <span className="font-semibold">{resizeCount}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Resize your browser window to see live updates with debouncing
      </div>
    </div>
  )
}

function UseOnMountLayoutEffectDemo() {
  const [measurements, setMeasurements] = useState({ width: 0, height: 0, timing: "" })
  const elementRef = useRef<HTMLDivElement>(null)

  useOnMountLayoutEffect(() => {
    const startTime = performance.now()
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const endTime = performance.now()
      setMeasurements({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        timing: `${(endTime - startTime).toFixed(2)}ms`
      })
    }
  })

  return (
    <div className="text-center space-y-4">
      <div className="text-lg font-bold">Layout Effect Measurement</div>
      
      <div ref={elementRef} className="mx-auto p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border-2 border-dashed border-blue-300 max-w-xs">
        <div className="text-sm font-medium">Measured Element</div>
        <div className="text-xs text-muted-foreground mt-1">This element was measured before paint</div>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        <div className="p-2 bg-muted rounded text-center">
          <div className="text-xs text-muted-foreground">Width</div>
          <div className="text-sm font-semibold">{measurements.width}px</div>
        </div>
        <div className="p-2 bg-muted rounded text-center">
          <div className="text-xs text-muted-foreground">Height</div>
          <div className="text-sm font-semibold">{measurements.height}px</div>
        </div>
        <div className="p-2 bg-muted rounded text-center">
          <div className="text-xs text-muted-foreground">Timing</div>
          <div className="text-sm font-semibold">{measurements.timing}</div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        ✅ Measured synchronously before browser paint
      </div>
    </div>
  )
}

function UseStateChangeEffectDemo() {
  const [name, setName] = useState("")
  const [count, setCount] = useState(0)
  const [color, setColor] = useState("blue")
  const [effectTriggers, setEffectTriggers] = useState<string[]>([])

  // Effect that only triggers on name and count changes (not color)
  useStateChangeEffect(() => {
    const trigger = `Effect triggered! Name: "${name}", Count: ${count}`
    setEffectTriggers(prev => [trigger, ...prev.slice(0, 2)]) // Keep last 3
  }, [name, count])

  return (
    <div className="space-y-4">
      <div className="text-center text-lg font-bold">State Change Effect Monitor</div>
      
      <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
        <div>
          <label className="text-sm font-medium block mb-1">Name (triggers effect)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
            className="w-full p-2 border rounded text-sm"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium block mb-1">Count (triggers effect)</label>
            <div className="flex gap-1">
              <Button size="sm" onClick={() => setCount(c => c - 1)}>-</Button>
              <div className="flex-1 p-2 border rounded text-center text-sm">{count}</div>
              <Button size="sm" onClick={() => setCount(c => c + 1)}>+</Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Color (no effect)</label>
            <Dropdown
              value={color}
              onChange={setColor}
              options={[
                { value: "blue", label: "Blue" },
                { value: "red", label: "Red" },
                { value: "green", label: "Green" },
                { value: "purple", label: "Purple" },
              ]}
              placeholder="Select color..."
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-sm font-medium mb-2">Effect Triggers (latest first):</div>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {effectTriggers.length === 0 ? (
            <div className="text-xs text-muted-foreground italic">No effects triggered yet</div>
          ) : (
            effectTriggers.map((trigger, index) => (
              <div key={index} className="text-xs p-2 bg-muted rounded">
                {trigger}
              </div>
            ))
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          ℹ️ Only name and count changes trigger the effect, not color
        </div>
      </div>
    </div>
  )
}

// Advanced useOnWindowResize Demo
function AdvancedUseOnWindowResizeDemo() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isResizing, setIsResizing] = useState(false)

  useOnWindowResize(() => {
    setIsResizing(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    
    // Reset resizing state after delay
    const timeout = setTimeout(() => setIsResizing(false), 300)
    return () => clearTimeout(timeout)
  })

  return (
    <div className="text-center space-y-4">
      <div className="text-lg font-bold">Simple Window Monitor</div>
      <div className="space-y-2">
        <div>Window: {windowSize.width} × {windowSize.height}</div>
        <div>Status: {isResizing ? "Resizing..." : "Stable"}</div>
      </div>
    </div>
  )
}

// Advanced useStateChangeEffect Demo
function AdvancedUseStateChangeEffectDemo() {
  const [user, setUser] = useState({ name: "", age: 0 })
  const [lastUpdate, setLastUpdate] = useState("")

  // This only runs when user values actually change
  useStateChangeEffect(() => {
    setLastUpdate(new Date().toLocaleTimeString())
    console.log("useStateChangeEffect: User values changed")
  }, [user])

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="text-center text-lg font-bold">useEffect vs useStateChangeEffect</div>
      
      <div>
        <label className="text-sm font-medium block mb-1">User Name</label>
        <input 
          value={user.name}
          onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Type your name..."
          className="w-full p-2 border rounded text-sm"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium block mb-1">Age</label>
        <input 
          type="number"
          value={user.age}
          onChange={(e) => setUser(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
          className="w-full p-2 border rounded text-sm"
        />
      </div>
      
      <div className="p-3 bg-muted rounded">
        <div className="text-sm font-medium">Last meaningful update:</div>
        <div className="text-xs text-muted-foreground">{lastUpdate || "No updates yet"}</div>
      </div>
      
      <div className="text-xs text-muted-foreground">
        ℹ️ Only triggers when user values actually change, not on every render
      </div>
    </div>
  )
}

const hooks = [
  // Device & Layout Hooks
  {
    title: "useMobile",
    url: "/docs/hooks/use-mobile",
    description: "Responsive viewport detection with SSR support",
    category: "Device & Layout",
    preview: <UseMobileDemo />,
    code: `import { useMobile } from "@/hooks/use-mobile"

export function Example() {
  const isMobile = useMobile()
  
  return (
    <div>
      Device: {isMobile ? "📱 Mobile" : "💻 Desktop"}
    </div>
  )
}`,
  },
  {
    title: "useOnWindowResize",
    url: "/docs/hooks/useOnWindowResize",
    description: "Window resize event handling with real-time dimensions",
    category: "Device & Layout",
    preview: <UseOnWindowResizeDemo />,
    code: `import { useOnWindowResize } from "@/hooks/useOnWindowResize"
import { useState } from "react"

export function Example() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeCount, setResizeCount] = useState(0)

  useOnWindowResize(() => {
    setIsResizing(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    setResizeCount(prev => prev + 1)
    
    // Reset resizing state after delay to show the debouncing effect
    const timeout = setTimeout(() => setIsResizing(false), 500)
    return () => clearTimeout(timeout)
  })

  return (
    <div className="text-center space-y-4">
      <div className="text-2xl font-bold">Window Resize Monitor</div>
      
      {/* Window Dimensions */}
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <div className="p-3 bg-muted rounded-md">
          <div className="text-sm text-muted-foreground">Width (X)</div>
          <div className="text-xl font-semibold">{windowSize.width}px</div>
        </div>
        <div className="p-3 bg-muted rounded-md">
          <div className="text-sm text-muted-foreground">Height (Y)</div>
          <div className="text-xl font-semibold">{windowSize.height}px</div>
        </div>
      </div>

      {/* Status and Counter */}
      <div className="space-y-2">
        <div className={\`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium \${
          isResizing 
            ? "bg-yellow-100 text-yellow-800 border border-yellow-200" 
            : "bg-green-100 text-green-800 border border-green-200"
        }\`}>
          <div className={\`w-2 h-2 rounded-full \${isResizing ? "bg-yellow-500" : "bg-green-500"}\`} />
          {isResizing ? "Resizing..." : "Stable"}
        </div>
        
        <div className="text-sm text-muted-foreground">
          Resize events: <span className="font-semibold">{resizeCount}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Resize your browser window to see live updates with debouncing
      </div>
    </div>
  )
}`,
  },
  // Life Cycles Hooks
  {
    title: "useOnMountEffect",
    url: "/docs/hooks/useOnMountEffect",
    description: "Mount-only effect execution",
    category: "Life Cycles",
    preview: <UseOnMountEffectDemo />,
    code: `import { useOnMountEffect } from "@/hooks/useOnMountEffect"
import { useState } from "react"

export function Example() {
  const [mountTime, setMountTime] = useState("")
  
  useOnMountEffect(() => {
    setMountTime(new Date().toLocaleTimeString())
    console.log("Component mounted!")
  })

  return <div>Mount Time: {mountTime}</div>
}`,
  },
  {
    title: "useOnMountLayoutEffect",
    url: "/docs/hooks/useOnMountLayoutEffect",
    description: "DOM measurements before paint with synchronous execution",
    category: "Life Cycles",
    preview: <UseOnMountLayoutEffectDemo />,
    code: `import { useOnMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"
import { useState, useRef } from "react"

export function Example() {
  const [measurements, setMeasurements] = useState({ width: 0, height: 0 })
  const elementRef = useRef<HTMLDivElement>(null)

  useOnMountLayoutEffect(() => {
    // Measure DOM element synchronously before browser paint
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      setMeasurements({
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      })
    }
  })

  return (
    <div>
      <div ref={elementRef} className="p-4 bg-blue-100 rounded">
        Measured Element
      </div>
      <div>Width: {measurements.width}px</div>
      <div>Height: {measurements.height}px</div>
    </div>
  )
}

// Advanced example with cleanup
export function AdvancedExample() {
  const observerRef = useRef<ResizeObserver>()

  useOnMountLayoutEffect(() => {
    // Setup that must happen before paint
    const element = document.getElementById('target')
    if (element) {
      observerRef.current = new ResizeObserver(entries => {
        console.log('Element resized:', entries[0].contentRect)
      })
      observerRef.current.observe(element)
    }

    // Cleanup function
    return () => {
      observerRef.current?.disconnect()
    }
  })

  return <div id="target">Observed element</div>
}`,
  },
  {
    title: "useStateChangeEffect",
    url: "/docs/hooks/useStateChangeEffect",
    description: "Selective effect triggering based on specific state changes",
    category: "Life Cycles",
    preview: <UseStateChangeEffectDemo />,
    code: `import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"
import { Dropdown } from "@/components/Navigation/Dropdown"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Example() {
  const [name, setName] = useState("")
  const [count, setCount] = useState(0)
  const [color, setColor] = useState("blue")
  const [effectTriggers, setEffectTriggers] = useState([])

  // Effect that only triggers on name and count changes (not color)
  useStateChangeEffect(() => {
    const trigger = \`Effect triggered! Name: "\${name}", Count: \${count}\`
    setEffectTriggers(prev => [trigger, ...prev.slice(0, 2)]) // Keep last 3
  }, [name, count])

  return (
    <div className="space-y-4">
      <div className="text-center text-lg font-bold">State Change Effect Monitor</div>
      
      <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
        <div>
          <label className="text-sm font-medium block mb-1">Name (triggers effect)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
            className="w-full p-2 border rounded text-sm"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium block mb-1">Count (triggers effect)</label>
            <div className="flex gap-1">
              <Button size="sm" onClick={() => setCount(c => c - 1)}>-</Button>
              <div className="flex-1 p-2 border rounded text-center text-sm">{count}</div>
              <Button size="sm" onClick={() => setCount(c => c + 1)}>+</Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Color (no effect)</label>
            <Dropdown
              value={color}
              onChange={setColor}
              options={[
                { value: "blue", label: "Blue" },
                { value: "red", label: "Red" },
                { value: "green", label: "Green" },
                { value: "purple", label: "Purple" },
              ]}
              placeholder="Select color..."
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-sm font-medium mb-2">Effect Triggers (latest first):</div>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {effectTriggers.length === 0 ? (
            <div className="text-xs text-muted-foreground italic">No effects triggered yet</div>
          ) : (
            effectTriggers.map((trigger, index) => (
              <div key={index} className="text-xs p-2 bg-muted rounded">
                {trigger}
              </div>
            ))
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          ℹ️ Only name and count changes trigger the effect, not color
        </div>
      </div>
    </div>
  )
}`,
    advancedCode: `import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"
import { useState, useEffect } from "react"

// Compare with regular useEffect
export function ComparisonExample() {
  const [user, setUser] = useState({ name: "", age: 0 })
  const [lastUpdate, setLastUpdate] = useState("")

  // This runs on every render if user object reference changes
  useEffect(() => {
    console.log("useEffect: User changed")
  }, [user])

  // This only runs when user values actually change
  useStateChangeEffect(() => {
    setLastUpdate(new Date().toLocaleTimeString())
    console.log("useStateChangeEffect: User values changed")
  }, [user])

  return (
    <div>
      <input 
        value={user.name}
        onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
      />
      <div>Last meaningful update: {lastUpdate}</div>
    </div>
  )
}`,
  },
  // State Management Hooks
  {
    title: "useLocalStorage",
    url: "/docs/hooks/useLocalStorage",
    description: "Persistent localStorage state management",
    category: "State Management",
    preview: <UseLocalStorageDemo />,
    code: `import { useLocalStorage } from "@/hooks/useLocalStorage"

export function Example() {
  const [name, setName] = useLocalStorage("demo-name", "")
  
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name..."
    />
  )
}`,
  },
  // Utility Hooks
  {
    title: "useCopyToClipboard",
    url: "/docs/hooks/use-copy-to-clipboard",
    description: "Advanced clipboard operations",
    category: "Utilities",
    preview: <UseCopyToClipboardDemo />,
    code: `import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"

export function Example() {
  const { copy, copied, error } = useCopyToClipboard()
  
  const handleCopy = () => {
    copy("Hello from React Hook!")
  }

  return (
    <button onClick={handleCopy}>
      {copied ? "✅ Copied!" : "📋 Copy Text"}
    </button>
  )
}`,
  },
  {
    title: "useCountdown",
    url: "/docs/hooks/useCountdown",
    description: "Countdown timers with loop support",
    category: "Utilities",
    preview: <UseCountdownDemo />,
    code: `import { useCountdown } from "@/hooks/useCountdown"

export function Example() {
  const { seconds, start, stop, reset, isActive } = useCountdown(10, () => console.log("Done!"))

  const formatTime = (seconds) => seconds + "s"

  return (
    <div>
      <div>{formatTime(seconds)}</div>
      <button onClick={start} disabled={isActive}>Start</button>
      <button onClick={stop} disabled={!isActive}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}`,
  },
  {
    title: "useKeyboardShortcut",
    url: "/docs/hooks/useKeyboardShortcut",
    description: "Global keyboard shortcuts with tooltip system",
    category: "Utilities",
    preview: <UseKeyboardShortcutDemo />,
    code: `import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import { useState } from "react"

export function Example() {
  const [count, setCount] = useState(0)
  
  useKeyboardShortcut(
    {
      id: "increment",
      keys: "shift+space",
      description: "Increment counter"
    },
    () => setCount(prev => prev + 1)
  )

  return <div>Count: {count} (Press Shift+Space)</div>
}`,
  },
]

const groupedHooks = hooks.reduce(
  (acc, hook) => {
    const category = hook.category || "Other"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(hook)
    return acc
  },
  {} as Record<string, typeof hooks>
)

export default function HooksOverview() {
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
              <BreadcrumbPage>React Hooks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">React Hooks</h1>
            <p className="text-lg text-muted-foreground mb-6">
              A comprehensive collection of custom React hooks with live examples and source code.
              Built with TypeScript for enhanced functionality and developer experience.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">{hooks.length} Hooks</Badge>
              <Badge variant="outline">Live Preview</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">SSR-Safe</Badge>
            </div>
          </div>

          <div className="space-y-12">
            {Object.entries(groupedHooks).map(([category, categoryHooks]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-3xl font-bold text-primary">{category} Hooks</h2>
                  <Badge variant="outline">{categoryHooks.length} hooks</Badge>
                </div>

                <div className="space-y-8">
                  {categoryHooks.map(hook => (
                    <Card key={hook.title} className="overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex gap-2 items-end text-2xl mb-2">
                              {hook.title}
                              <Badge variant="secondary" className="text-sm">
                                {category}
                              </Badge>
                            </CardTitle>
                            <CardDescription className="text-base leading-relaxed">
                              {hook.description}
                            </CardDescription>
                          </div>

                          <Link href={hook.url}>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Docs
                            </Button>
                          </Link>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-8">
                          <PreviewTabs
                            title="Interactive Example"
                            preview={hook.preview}
                            code={hook.code}
                          />
                          {hook.advancedCode && (
                            <PreviewTabs
                              title={
                                hook.title === "useStateChangeEffect" ? "Comparison with Regular useEffect Hook" :
                                "Advanced Usage"
                              }
                              preview={
                                hook.title === "useStateChangeEffect" ? <AdvancedUseStateChangeEffectDemo /> :
                                <div className="text-center p-4 text-muted-foreground">Advanced functionality - see code example</div>
                              }
                              code={hook.advancedCode}
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-16">
            <CardHeader>
              <CardTitle>Getting Started with Hooks</CardTitle>
              <CardDescription>
                Start using these powerful React hooks in your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">🔗</div>
                  <div className="font-semibold mb-2">Import & Use</div>
                  <div className="text-sm text-muted-foreground">
                    Copy the import statement and start using the hook immediately
                  </div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">🎮</div>
                  <div className="font-semibold mb-2">Interactive Examples</div>
                  <div className="text-sm text-muted-foreground">
                    Try the live examples to see how each hook works in practice
                  </div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">📖</div>
                  <div className="font-semibold mb-2">Full Documentation</div>
                  <div className="text-sm text-muted-foreground">
                    Click &quot;View Docs&quot; for complete API reference and advanced examples
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Hook Features</CardTitle>
              <CardDescription>What makes these hooks special</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">🔧</div>
                  <div className="font-semibold text-sm mb-1">TypeScript</div>
                  <div className="text-xs text-muted-foreground">
                    Full type safety and IntelliSense
                  </div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">🌐</div>
                  <div className="font-semibold text-sm mb-1">SSR Safe</div>
                  <div className="text-xs text-muted-foreground">Works with Next.js and SSR</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">🧹</div>
                  <div className="font-semibold text-sm mb-1">Auto Cleanup</div>
                  <div className="text-xs text-muted-foreground">Automatic memory management</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-semibold text-sm mb-1">Performance</div>
                  <div className="text-xs text-muted-foreground">Optimized for production use</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
