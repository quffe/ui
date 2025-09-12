"use client"

import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { poimandresTheme } from "@/lib/poimandres-theme"

const SyntaxHighlighter = dynamic(async () => (await import("react-syntax-highlighter")).Prism, {
  ssr: false,
})

interface CodeBlockProps {
  children: string
  language?: string
  className?: string
  showCopyButton?: boolean
  inline?: boolean
  filename?: string
}

export function CodeBlock({
  children,
  language = "typescript",
  className,
  showCopyButton = true,
  inline = false,
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // For inline code
  if (inline) {
    return (
      <code
        className={cn(
          "relative rounded bg-muted border border-border px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
          className
        )}
      >
        {children}
      </code>
    )
  }

  // For code blocks
  return (
    <div className={cn("relative group", className)}>
      <div className="bg-card rounded-md overflow-hidden border border-border code-scrollbar">
        {(filename || language) && (
          <div className="flex items-center justify-between px-3 py-2 border-b border-border text-xs text-muted-foreground">
            <span className="truncate">{filename}</span>
            <span className="uppercase tracking-wide bg-muted text-foreground/80 rounded px-1.5 py-0.5 text-[10px]">
              {language}
            </span>
          </div>
        )}
        <SyntaxHighlighter
          language={language}
          style={poimandresTheme}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            background: "transparent",
          }}
          showLineNumbers={false}
          wrapLines={true}
          wrapLongLines={true}
        >
          {children}
        </SyntaxHighlighter>
      </div>

      {showCopyButton && (
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </Button>
      )}
    </div>
  )
}
