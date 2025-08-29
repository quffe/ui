"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/internal/ui/code-block"

interface PreviewTabsProps {
  preview: React.ReactNode
  code: string
  language?: string
  title?: string
}

export function PreviewTabs({ preview, code, language = "tsx", title }: PreviewTabsProps) {
  return (
    <div>
      <Tabs defaultValue="preview" className="w-full">
        <div
          className={`flex items-start gap-4 ${title ? "justify-between flex-col sm:flex-row sm:items-center" : "justify-end"}`}
        >
          {title && <h4 className="text-lg font-semibold flex-1">{title}</h4>}
          <TabsList className="shrink-0">
            <TabsTrigger className="cursor-pointer" value="preview">
              Preview
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="code">
              Code
            </TabsTrigger>
          </TabsList>
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
