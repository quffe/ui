import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"
import { useState } from "react"

export function AdvancedExample() {
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
          onChange={e => setUser(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Type your name..."
          className="w-full p-2 border rounded text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Age</label>
        <input
          type="number"
          value={user.age}
          onChange={e => setUser(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
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
