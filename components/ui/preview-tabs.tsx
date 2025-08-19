"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"

interface PreviewTabsProps {
  preview: React.ReactNode
  code: string
  language?: string
}

export function PreviewTabs({ preview, code, language = "tsx" }: PreviewTabsProps) {
  return (
    <div className="-mt-18">
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-end">
          <TabsList className="cursor-pointer">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
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
