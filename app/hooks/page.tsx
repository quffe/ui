"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PreviewTabs } from "@/components/ui/preview-tabs"
import { useState, useRef, useEffect } from "react"

import { Dropdown } from "@/components/Navigation/Dropdown"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

// Example components
import { Example as UseMobileExample } from "@/examples/hooks/use-mobile/basic"
import { AdvancedExample as UseMobileAdvancedExample } from "@/examples/hooks/use-mobile/advanced"
import { Example as UseLocalStorageExample } from "@/examples/hooks/use-local-storage/basic"
import { Example as UseCopyToClipboardExample } from "@/examples/hooks/use-copy-to-clipboard/basic"
import { Example as UseCountdownExample } from "@/examples/hooks/use-countdown/basic"
import { Example as UseOnMountEffectExample } from "@/examples/hooks/use-on-mount-effect/basic"
import { Example as UseKeyboardShortcutExample } from "@/examples/hooks/use-keyboard-shortcut/basic"
import { Example as UseOnWindowResizeExample } from "@/examples/hooks/use-on-window-resize/basic"
import { AdvancedExample as UseOnWindowResizeAdvancedExample } from "@/examples/hooks/use-on-window-resize/advanced"
import { Example as UseOnMountLayoutEffectExample } from "@/examples/hooks/use-on-mount-layout-effect/basic"
import { Example as UseStateChangeEffectExample } from "@/examples/hooks/use-state-change-effect/basic"
import { AdvancedExample as UseStateChangeEffectAdvancedExample } from "@/examples/hooks/use-state-change-effect/advanced"

// Raw imports
import useMobileBasicCode from "@/examples/hooks/use-mobile/basic.tsx?raw"
import useMobileAdvancedCode from "@/examples/hooks/use-mobile/advanced.tsx?raw"
import useLocalStorageCode from "@/examples/hooks/use-local-storage/basic.tsx?raw"
import useCopyToClipboardCode from "@/examples/hooks/use-copy-to-clipboard/basic.tsx?raw"
import useCountdownCode from "@/examples/hooks/use-countdown/basic.tsx?raw"
import useOnMountEffectCode from "@/examples/hooks/use-on-mount-effect/basic.tsx?raw"
import useKeyboardShortcutCode from "@/examples/hooks/use-keyboard-shortcut/basic.tsx?raw"
import useOnWindowResizeBasicCode from "@/examples/hooks/use-on-window-resize/basic.tsx?raw"
import useOnWindowResizeAdvancedCode from "@/examples/hooks/use-on-window-resize/advanced.tsx?raw"
import useOnMountLayoutEffectCode from "@/examples/hooks/use-on-mount-layout-effect/basic.tsx?raw"
import useStateChangeEffectBasicCode from "@/examples/hooks/use-state-change-effect/basic.tsx?raw"
import useStateChangeEffectAdvancedCode from "@/examples/hooks/use-state-change-effect/advanced.tsx?raw"

const hooks = [
  // Device & Layout Hooks
  {
    title: "useMobile",
    url: "/docs/hooks/use-mobile",
    description: "Responsive viewport detection with SSR support",
    category: "Device & Layout",
    preview: <UseMobileExample />,
    code: useMobileBasicCode,
    advancedCode: useMobileAdvancedCode,
    advancedPreview: <UseMobileAdvancedExample />,
  },
  {
    title: "useOnWindowResize",
    url: "/docs/hooks/useOnWindowResize",
    description: "Window resize event handling with real-time dimensions",
    category: "Device & Layout",
    preview: <UseOnWindowResizeExample />,
    code: useOnWindowResizeBasicCode,
    advancedCode: useOnWindowResizeAdvancedCode,
    advancedPreview: <UseOnWindowResizeAdvancedExample />,
  },
  // Life Cycles Hooks
  {
    title: "useOnMountEffect",
    url: "/docs/hooks/useOnMountEffect",
    description: "Mount-only effect execution",
    category: "Life Cycles",
    preview: <UseOnMountEffectExample />,
    code: useOnMountEffectCode,
  },
  {
    title: "useOnMountLayoutEffect",
    url: "/docs/hooks/useOnMountLayoutEffect",
    description: "DOM measurements before paint with synchronous execution",
    category: "Life Cycles",
    preview: <UseOnMountLayoutEffectExample />,
    code: useOnMountLayoutEffectCode,
  },
  {
    title: "useStateChangeEffect",
    url: "/docs/hooks/useStateChangeEffect",
    description: "Selective effect triggering based on specific state changes",
    category: "Life Cycles",
    preview: <UseStateChangeEffectExample />,
    code: useStateChangeEffectBasicCode,
    advancedCode: useStateChangeEffectAdvancedCode,
    advancedPreview: <UseStateChangeEffectAdvancedExample />,
  },
  // State Management Hooks
  {
    title: "useLocalStorage",
    url: "/docs/hooks/useLocalStorage",
    description: "Persistent localStorage state management",
    category: "State Management",
    preview: <UseLocalStorageExample />,
    code: useLocalStorageCode,
  },
  // Utility Hooks
  {
    title: "useCopyToClipboard",
    url: "/docs/hooks/use-copy-to-clipboard",
    description: "Advanced clipboard operations",
    category: "Utilities",
    preview: <UseCopyToClipboardExample />,
    code: useCopyToClipboardCode,
  },
  {
    title: "useCountdown",
    url: "/docs/hooks/useCountdown",
    description: "Countdown timers with loop support",
    category: "Utilities",
    preview: <UseCountdownExample />,
    code: useCountdownCode,
  },
  {
    title: "useKeyboardShortcut",
    url: "/docs/hooks/useKeyboardShortcut",
    description: "Global keyboard shortcuts with tooltip system",
    category: "Utilities",
    preview: <UseKeyboardShortcutExample />,
    code: useKeyboardShortcutCode,
  },
]

const groupedHooks = hooks.reduce(
  (acc, hook) => {
    const category = hook.category || "Other"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(hook)
    return acc
  },
  {} as Record<string, typeof hooks>
)

export default function HooksOverview() {
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>React Hooks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">React Hooks</h1>
            <p className="text-lg text-muted-foreground mb-6">
              A comprehensive collection of custom React hooks with live examples and source code.
              Built with TypeScript for enhanced functionality and developer experience.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">{hooks.length} Hooks</Badge>
              <Badge variant="outline">Live Preview</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">SSR-Safe</Badge>
            </div>
          </div>

          <div className="space-y-12">
            {Object.entries(groupedHooks).map(([category, categoryHooks]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-3xl font-bold text-primary">{category} Hooks</h2>
                  <Badge variant="outline">{categoryHooks.length} hooks</Badge>
                </div>

                <div className="space-y-8">
                  {categoryHooks.map(hook => (
                    <Card key={hook.title} className="overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex gap-2 items-end text-2xl mb-2">
                              {hook.title}
                              <Badge variant="secondary" className="text-sm">
                                {category}
                              </Badge>
                            </CardTitle>
                            <CardDescription className="text-base leading-relaxed">
                              {hook.description}
                            </CardDescription>
                          </div>

                          <Link href={hook.url}>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Docs
                            </Button>
                          </Link>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-8">
                          <PreviewTabs
                            title="Interactive Example"
                            preview={hook.preview}
                            code={hook.code}
                          />
                          {hook.advancedCode && (
                            <PreviewTabs
                              title={
                                hook.title === "useStateChangeEffect"
                                  ? "Comparison with Regular useEffect Hook"
                                  : "Advanced Usage"
                              }
                              preview={
                                hook.advancedPreview || (
                                  <div className="text-center p-4 text-muted-foreground">
                                    Advanced functionality - see code example
                                  </div>
                                )
                              }
                              code={hook.advancedCode}
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-16">
            <CardHeader>
              <CardTitle>Getting Started with Hooks</CardTitle>
              <CardDescription>
                Start using these powerful React hooks in your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">🔗</div>
                  <div className="font-semibold mb-2">Import & Use</div>
                  <div className="text-sm text-muted-foreground">
                    Copy the import statement and start using the hook immediately
                  </div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">🎮</div>
                  <div className="font-semibold mb-2">Interactive Examples</div>
                  <div className="text-sm text-muted-foreground">
                    Try the live examples to see how each hook works in practice
                  </div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">📖</div>
                  <div className="font-semibold mb-2">Full Documentation</div>
                  <div className="text-sm text-muted-foreground">
                    Click &quot;View Docs&quot; for complete API reference and advanced examples
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Hook Features</CardTitle>
              <CardDescription>What makes these hooks special</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">🔧</div>
                  <div className="font-semibold text-sm mb-1">TypeScript</div>
                  <div className="text-xs text-muted-foreground">
                    Full type safety and IntelliSense
                  </div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">🌐</div>
                  <div className="font-semibold text-sm mb-1">SSR Safe</div>
                  <div className="text-xs text-muted-foreground">Works with Next.js and SSR</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">🧹</div>
                  <div className="font-semibold text-sm mb-1">Auto Cleanup</div>
                  <div className="text-xs text-muted-foreground">Automatic memory management</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-semibold text-sm mb-1">Performance</div>
                  <div className="text-xs text-muted-foreground">Optimized for production use</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
