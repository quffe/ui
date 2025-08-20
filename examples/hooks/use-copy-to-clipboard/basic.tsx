import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { Button } from "@/components/ui/button"

export function Example() {
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
