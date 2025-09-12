"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface PreviewTabsProps {
  preview: React.ReactNode
  code: string
  language?: string
  title?: string
}

export function PreviewTabs({ preview, code, language = "tsx", title }: PreviewTabsProps) {
  const [value, setValue] = React.useState("preview")
  const [copied, setCopied] = React.useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  return (
    <div>
      <Tabs value={value} onValueChange={setValue} className="w-full">
        <div
          className={`flex items-start gap-4 ${title ? "justify-between flex-col sm:flex-row sm:items-center" : "justify-end"}`}
        >
          {title && <h4 className="text-lg font-semibold flex-1">{title}</h4>}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="sm:hidden"
              onClick={() => setValue(v => (v === "code" ? "preview" : "code"))}
            >
              {value === "code" ? "Hide code" : "Show code"}
            </Button>
            <Button size="sm" variant="ghost" className="hidden sm:inline-flex" onClick={onCopy}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-primary" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" /> Copy code
                </>
              )}
            </Button>
            <TabsList className="shrink-0 hidden sm:inline-flex">
              <TabsTrigger className="cursor-pointer" value="preview">
                Preview
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="code">
                Code
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="preview" className="mt-4">
          <div className="border rounded-lg p-6 min-h-32 flex items-center justify-center bg-background">
            {preview}
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <CodeBlock language={language}>{code}</CodeBlock>
        </TabsContent>
      </Tabs>
    </div>
  )
}
