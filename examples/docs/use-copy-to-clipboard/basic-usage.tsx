"use client"

import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { Copy, Check, AlertCircle } from "lucide-react"

export function BasicUsageExample() {
  const { copy, copied, error, isLoading } = useCopyToClipboard({
    onSuccess: text => console.log("Copied:", text),
    timeout: 3000,
  })

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => copy("Hello, World!", "greeting")}
        disabled={isLoading}
        size="sm"
      >
        {isLoading ? (
          "Copying..."
        ) : copied ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy Greeting
          </>
        )}
      </Button>
      {error && (
        <div className="flex items-center gap-1 text-red-soft text-sm">
          <AlertCircle className="h-4 w-4" />
          {error.message}
        </div>
      )}
    </div>
  )
}