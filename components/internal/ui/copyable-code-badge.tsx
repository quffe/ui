"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyableCodeBadgeProps {
  text: string
  className?: string
}

export function CopyableCodeBadge({ text, className }: CopyableCodeBadgeProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-muted bg-muted/30 px-2 py-1 text-xs font-mono text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors",
        className
      )}
      onClick={copyToClipboard}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          copyToClipboard()
        }
      }}
    >
      <code className="text-xs">{text}</code>
      {copied ? (
        <Check className="h-3 w-3 text-green-600" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </div>
  )
}