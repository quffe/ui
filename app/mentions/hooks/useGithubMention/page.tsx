"use server"

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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InstallationTabs } from "@/components/internal/installation"
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { getExampleCode } from "@/lib/serverUtils"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

import { InlineExample } from "@/examples/docs/hooks/use-github-mention/inline"
import { CardExample } from "@/examples/docs/hooks/use-github-mention/card"
import { ErrorExample } from "@/examples/docs/hooks/use-github-mention/error"

const inlineCode = getExampleCode("docs/hooks/use-github-mention/inline.tsx")
const cardCode = getExampleCode("docs/hooks/use-github-mention/card.tsx")
const errorCode = getExampleCode("docs/hooks/use-github-mention/error.tsx")

export default async function UseGithubMentionDocs() {
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
              <BreadcrumbPage>useGithubMention</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="mb-2">
            <div className="flex items-end gap-3 mb-2">
              <h1 className="text-4xl font-bold">useGithubMention</h1>
              <Badge variant="secondary">Hook</Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              Fetch GitHub metadata for PRs, issues, users, and repos. Use this when you want full
              control over the UI.
            </p>
            <div className="bg-warn-soft/20 border border-border rounded-lg p-4 mt-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-warn-amber mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Note</p>
                  <p className="text-sm text-muted-foreground">
                    This <Link href="/mentions/hooks/useGithubMention" className="underline">useGithubMention</Link> hook provides the data and logic for building a custom mentions interface. If you prefer a ready-made, GitHub-like UI without any custom code, use the <Link href="/mentions/github" className="underline">GithubMention</Link> component instead.
                  </p>
                </div>
              </div>
            </div>
          </div>

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
                      The default install uses a plain, no-cache version of the hook. If you prefer a caching layer, choose the SWR or React Query variant. Installing those variants will add the corresponding dependency (<code>swr</code> or <code>@tanstack/react-query</code>).
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Plain (default, no extra deps)</p>
                <InstallationTabs componentName="use-github-mention-plain" />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">SWR variant</p>
                <InstallationTabs componentName="use-github-mention" />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">React Query variant</p>
                <InstallationTabs componentName="use-github-mention-react-query" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>When To Use</CardTitle>
              <CardDescription>Pick the right tool for the job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 text-sm">
                <div>
                  <p className="font-medium mb-1">Use useGithubMention when…</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>You need fully custom UI</li>
                    <li>You’re building lists or complex states</li>
                    <li>You want Suspense/SWR integration</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Use GithubMention when…</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>You want a ready-made GitHub-like UI</li>
                    <li>You prefer minimal code and quick adoption</li>
                    <li>You need optional server proxy support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>Build your own UI from the hook</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <PreviewTabs title="Inline mention UI" preview={<InlineExample />} code={inlineCode} />
              <PreviewTabs title="Rich card UI" preview={<CardExample />} code={cardCode} />
              <PreviewTabs title="Error and invalid states" preview={<ErrorExample />} code={errorCode} />
              <div className="text-sm text-muted-foreground">
                Note: Use <code>GithubMention</code> for a ready-made GitHub-like mention. Use this
                hook if you need to customize the UI.
              </div>
              <div className="text-xs text-muted-foreground">
                Tip: Examples use the server proxy (useServer) for reliability. Add GITHUB_TOKEN to .env.local to increase rate limits, or omit useServer to fetch directly from GitHub.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API</CardTitle>
              <CardDescription>Hook options and return shape</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-3">
                <p className="font-medium">Options</p>
                <pre className="rounded-md bg-muted p-3 overflow-x-auto text-xs">
{`type UseGithubMentionOptions = {
  useServer?: boolean
  refreshInterval?: number
  revalidateOnFocus?: boolean
  suspense?: boolean
}`}
                </pre>
                <p className="font-medium mt-4">Return</p>
                <pre className="rounded-md bg-muted p-3 overflow-x-auto text-xs">
{`type UseGithubMentionResult = {
  kind: "pull" | "issue" | "user" | "repo" | "unknown"
  data: GithubResource | null
  isLoading: boolean
  error: Error | null // may include .statusCode and .code
  refetch: () => void
  invalidReason?: "EMPTY_URL" | "INVALID_GITHUB_URL"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>React Query and plain fetch variants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="font-medium text-sm">Install variants (CLI)</p>
                <div className="grid gap-2 sm:grid-cols-3 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1">Plain (default)</p>
                    <CopyableCodeBadge text="@ui-components/hooks/use-github-mention-plain" />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">SWR</p>
                    <CopyableCodeBadge text="@ui-components/hooks/use-github-mention" />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">React Query</p>
                    <CopyableCodeBadge text="@ui-components/hooks/use-github-mention-react-query" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">React Query (optional)</p>
                <pre className="rounded-md bg-muted p-3 overflow-x-auto text-xs">
{`import { useGithubMentionQuery } from "@/hooks/use-github-mention-react-query"

function Example() {
  const { data, isLoading, error } = useGithubMentionQuery(
    "https://github.com/vercel/next.js/issues/1",
    { useServer: true }
  )
  // ...
}`}                </pre>
                <div className="text-xs text-muted-foreground">
                  Requires <code>@tanstack/react-query</code> in your app. This repo ships a thin adapter; install the peer dependency in your project.
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">Plain fetch utility</p>
                <pre className="rounded-md bg-muted p-3 overflow-x-auto text-xs">
{`import { getGithubResource } from "@/lib/github/resource"

// In a Server Component
const data = await getGithubResource("https://github.com/vercel/next.js/pull/1", { useServer: true })

// In a Client Component
useEffect(() => {
  let mounted = true
  getGithubResource(url).then(res => mounted && setData(res))
  return () => { mounted = false }
}, [url])`}                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
