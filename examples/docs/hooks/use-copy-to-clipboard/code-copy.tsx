"use client"

import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { Copy, Check } from "lucide-react"

export function CodeCopyExample() {
  const { copy, copied } = useCopyToClipboard()

  const sampleCode = `import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"\n\nfunction CopyButton() {\n  const { copy, copied } = useCopyToClipboard()\n  \n  return (\n    <button onClick={() => copy("Hello World!")}>\n      {copied ? "Copied!" : "Copy"}\n    </button>\n  )\n}`

  return (
    <div className="space-y-4">
      <div className="relative">
        <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
          <code>{sampleCode}</code>
        </pre>
        <Button
          onClick={() => copy(sampleCode, "code example")}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Click the copy button to copy the code to your clipboard
      </p>
    </div>
  )
}
