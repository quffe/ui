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
              <CardDescription>Install the hook via the shadcn namespace</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="use-github-mention" />
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
        </div>
      </div>
    </div>
  )
}
