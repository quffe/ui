import { useLocalStorage } from "@/hooks/useLocalStorage"

export function Example() {
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
