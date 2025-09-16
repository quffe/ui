"use server"

import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { InstallationTabs } from "@/components/internal/installation"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"
import { GithubMention } from "@/components/Mentions/Github/GithubMention"
import { getExampleCode } from "@/lib/serverUtils"

// Live examples
import { Example as BasicExample } from "@/examples/mentions/github/basic"
import { Example as StatesExample } from "@/examples/mentions/github/states"
import { Example as RenderExample } from "@/examples/mentions/github/render"

// Source code
const basicCode = getExampleCode("mentions/github/basic.tsx")
const statesCode = getExampleCode("mentions/github/states.tsx")
const renderCode = getExampleCode("mentions/github/render.tsx")

export default async function GithubMentionsPage() {
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
              <BreadcrumbLink href="/mentions">Mentions</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>GitHub Mention</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">GitHub Mention</h1>
            <p className="text-muted-foreground">Compact metadata card for GitHub resources</p>
          </div>

          {/* Note block placed above Overview */}
          <div className="bg-warn-soft/20 border border-border rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-warn-amber mt-0.5" />
              <div>
                <p className="text-sm font-medium">Note</p>
                <p className="text-sm text-muted-foreground">
                  This ready-made <Link className="underline" href="/mentions/github">GithubMention</Link> component provides a standard, GitHub-like user interface. If you need to fully customize the UI and behavior, use the <Link className="underline" href="/mentions/hooks/useGithubMention">useGithubMention</Link> hook to build your own component instead.
                </p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Display metadata for Pull Requests, Issues, Users, and Repositories using a single
                component. Automatically detects the resource type from the provided URL.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge>Accessible</Badge>
                <Badge variant="secondary">Cache-ready (SWR/RQ)</Badge>
                <Badge variant="outline">Shadcn primitives</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Public API: <code>{"<GithubMention url=\"https://github.com/owner/repo/pull/123\" />"}</code>
              </div>
              <div className="mt-2"></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>When To Use</CardTitle>
              <CardDescription>Choose the right approach for your UI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 text-sm">
                <div>
                  <p className="font-medium mb-1">Use GithubMention when…</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>You want a ready-made GitHub-like UI</li>
                    <li>You prefer minimal code and quick adoption</li>
                    <li>You need optional server proxy support</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Use useGithubMention when…</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>You need full control over the UI</li>
                    <li>You’re building list views or custom states</li>
                    <li>You want to integrate with Suspense/SWR</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Choose your data layer: Plain, SWR, or React Query</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-warn-soft/20 border border-border rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-warn-amber mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Warning</p>
                    <p className="text-sm text-muted-foreground">
                      The default install uses a plain, no-cache hook. If you prefer a caching layer, choose the SWR or React Query variant. Installing those variants will add the corresponding dependency (<code>swr</code> or <code>@tanstack/react-query</code>).
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Plain (default, no extra deps)</p>
                <InstallationTabs componentName="github-mention" />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">SWR variant</p>
                <InstallationTabs componentName="github-mention-swr" />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">React Query variant</p>
                <InstallationTabs componentName="github-mention-react-query" />
              </div>
            </CardContent>
          </Card>

          <PreviewTabs title="Basic Demo" preview={<BasicExample />} code={basicCode} />
          <PreviewTabs
            title="States & Error Handling"
            preview={<StatesExample />}
            code={statesCode}
          />
          <PreviewTabs
            title="Custom render via render prop"
            preview={<RenderExample />}
            code={renderCode}
          />

          <div className="text-xs text-muted-foreground">
            Tip: Demos use the server proxy for reliability. Set GITHUB_TOKEN in .env.local to raise rate limits, or remove useServer to call GitHub directly.
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Props</CardTitle>
              <CardDescription>Customize behavior and rendering</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-3">
                <pre className="rounded-md bg-muted p-3 overflow-x-auto text-xs">
{`type GithubMentionProps = {
  url: string
  useServer?: boolean
  className?: string
  linkProps?: React.ComponentProps<'a'>
  render?: (data: GithubResource) => React.ReactNode
  onError?: (error: Error) => void
}`}
                </pre>
                <div className="text-muted-foreground text-xs">
                  Note: pass <code>linkProps</code> like <code>{"{ target: \"_blank\", rel: \"noopener noreferrer\" }"}</code> to open links in a new tab.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Server Proxy (Optional)</CardTitle>
              <CardDescription>Use server-side token for higher rate limits.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  Set <code>GITHUB_TOKEN</code> in <code>.env.local</code>. Then render with
                  <code>{" <GithubMention url=\"...\" useServer />"}</code>.
                </p>
                <div className="border rounded-lg p-4 bg-background">
                  <GithubMention url="https://github.com/vercel/next.js" useServer />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
