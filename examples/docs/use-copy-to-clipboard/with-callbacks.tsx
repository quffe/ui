"use client"

import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { Copy, Check } from "lucide-react"

export function WithCallbacksExample() {
  const { copy, copied, isLoading } = useCopyToClipboard({
    onSuccess: text => {
      console.log(`Successfully copied: ${text}`)
    },
    onError: error => {
      console.error(`Failed to copy: ${error.message}`)
    },
    timeout: 5000,
  })

  return (
    <div className="space-y-4">
      <Button
        onClick={() => copy("Custom text with callbacks", "callback example")}
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
            Copy with Callbacks
          </>
        )}
      </Button>
      <p className="text-sm text-muted-foreground">
        Check the console to see success/error callbacks in action
      </p>
    </div>
  )
}
