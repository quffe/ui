"use server"

import Link from "next/link"

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
import { AlertCircle } from "lucide-react"
import { InstallationTabs } from "@/components/internal/installation"
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { HookDocsPage, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"
import { getExampleCode } from "@/lib/serverUtils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { InlineExample } from "@/examples/docs/hooks/use-github-mention/inline"
import { CardExample } from "@/examples/docs/hooks/use-github-mention/card"
import { ErrorExample } from "@/examples/docs/hooks/use-github-mention/error"

const inlineCode = getExampleCode("docs/hooks/use-github-mention/inline.tsx")
const cardCode = getExampleCode("docs/hooks/use-github-mention/card.tsx")
const errorCode = getExampleCode("docs/hooks/use-github-mention/error.tsx")

const returnRows: PropsTableRow[] = [
  {
    prop: "kind",
    type: '"pull" | "issue" | "user" | "repo" | "unknown"',
    description: "Resource type inferred from the GitHub URL.",
    required: true,
  },
  {
    prop: "data",
    type: "GithubResource | null",
    description: "Fetched metadata for the resource when available.",
  },
  {
    prop: "isLoading",
    type: "boolean",
    description: "True while the request is pending.",
  },
  {
    prop: "error",
    type: "Error | null",
    description: "Error details if the request fails (includes statusCode when available).",
  },
  {
    prop: "refetch",
    type: "() => void",
    description: "Manual trigger to refetch the resource.",
  },
  {
    prop: "invalidReason",
    type: '"EMPTY_URL" | "INVALID_GITHUB_URL" | undefined',
    description: "Explains why the hook skipped fetching when the URL is invalid.",
  },
]

const optionRows: PropsTableRow[] = [
  {
    prop: "useServer",
    type: "boolean",
    defaultValue: "false",
    description: "Route through /api/github/resource so the request runs on your server with optional auth.",
  },
  { prop: "refreshInterval", type: "number", description: "Auto-refresh interval (ms) when using SWR/React Query variants." },
  { prop: "revalidateOnFocus", type: "boolean", defaultValue: "false", description: "SWR option to refresh when the window regains focus." },
  { prop: "suspense", type: "boolean", description: "Enable Suspense mode for SWR/React Query variants." },
]

const toc: TocItem[] = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "server", title: "Server proxy" },
  { id: "examples", title: "Examples" },
  { id: "options", title: "Options" },
  { id: "api-returns", title: "Returns" },
]

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
        <div className="container mx-auto max-w-5xl space-y-10">
          <HookDocsPage
            toc={toc}
            header={{
              title: "useGithubMention",
              description: "Fetch GitHub metadata for issues, PRs, repos, and users—build the UI you need.",
              category: "Mentions · Hook",
              status: "Stable",
            }}
            returns={returnRows}
          >
            <section id="overview" className="scroll-mt-24 space-y-4">
              <div className="rounded-lg border border-border bg-muted/40 p-5 text-sm">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-warn-amber mt-0.5" />
                  <div>
                    <p className="font-medium">Note</p>
                    <p className="text-muted-foreground">
                      Prefer a ready-made UI? Use the <Link className="underline" href="/mentions/github">GithubMention</Link> component. Need full control? Start here and compose your own markup.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="installation" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Pick the variant that matches your data layer—plain fetch, SWR, or React Query.
                </p>
              </div>
              <Tabs defaultValue="plain" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="plain">Plain</TabsTrigger>
                  <TabsTrigger value="swr">SWR</TabsTrigger>
                  <TabsTrigger value="rq">React Query</TabsTrigger>
                </TabsList>
                <TabsContent value="plain" className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium">Plain (no cache)</p>
                  <InstallationTabs componentName="use-github-mention-plain" />
                </TabsContent>
                <TabsContent value="swr" className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium">SWR variant</p>
                  <InstallationTabs componentName="use-github-mention" />
                </TabsContent>
                <TabsContent value="rq" className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium">React Query variant</p>
                  <InstallationTabs componentName="use-github-mention-react-query" />
                </TabsContent>
              </Tabs>
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Call the hook with a GitHub URL and render the returned metadata however you like. Use the{' '}
                  <code className="font-mono text-xs">useServer</code> flag when you want the request to originate from
                  your backend instead of the browser.
                </p>
              </div>
              <CodeBlock language="tsx" filename="usage.tsx">
{`const { data, isLoading, error } = useGithubMention(url, {
  useServer: process.env.NODE_ENV !== 'development',
})

if (isLoading) return <Skeleton />
if (error || !data) return <ErrorState reason={error?.message} />

return <GithubCard resource={data} />`}
              </CodeBlock>
            </section>

            <section id="server" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Server proxy</h2>
                <p className="text-muted-foreground">
                  Enable <code className="font-mono text-xs">useServer</code> to call the hook through your Next.js API
                  route at <code className="font-mono text-xs">/api/github/resource</code>. This keeps tokens on the server,
                  lets you ship higher rate limits, and plays nicely with incremental cache revalidation.
                </p>
              </div>
              <div className="grid gap-4 rounded-lg border border-border bg-muted/40 p-4 text-sm">
                <div>
                  <p className="font-medium">1. Provide a GitHub token (optional but recommended)</p>
                  <p className="text-muted-foreground">
                    Add <code className="font-mono text-xs">GITHUB_TOKEN</code> or <code className="font-mono text-xs">GH_TOKEN</code> to your
                    <code className="font-mono text-xs">.env.local</code>. The API route attaches it as a bearer token as long as it doesn&apos;t
                    start with <code className="font-mono text-xs">public_</code>.
                  </p>
                </div>
                <div>
                  <p className="font-medium">2. Deploy the API route</p>
                  <p className="text-muted-foreground">
                    When you deploy this app, Next.js hosts <code className="font-mono text-xs">/api/github/resource</code> for you. Consumers of
                    your deployment can only call it from the same origin; cross-origin requests require you to add CORS headers.
                  </p>
                </div>
                <div>
                  <p className="font-medium">3. Opt in from the hook</p>
                  <p className="text-muted-foreground">
                    Pass <code className="font-mono text-xs">useServer: true</code> (or toggle it per environment) so the hook swaps GitHub&apos;s public
                    endpoint for your proxy. The returned payload stays the same because the proxy normalizes the data before sending it back.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Fallback</p>
                  <p className="text-muted-foreground">
                    Leave <code className="font-mono text-xs">useServer</code> undefined to fall back to GitHub&apos;s REST API directly from the client.
                    That path works in purely client-side React apps, but shares the browser&apos;s rate limits and exposes the request origin.
                  </p>
                </div>
              </div>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  A few ways to render the hook’s data.
                </p>
              </div>
              <PreviewTabs title="Inline mention" preview={<InlineExample />} code={inlineCode} />
              <PreviewTabs title="Card layout" preview={<CardExample />} code={cardCode} />
              <PreviewTabs title="Error &amp; invalid states" preview={<ErrorExample />} code={errorCode} />
            </section>

            <section id="options" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Options</h2>
                <p className="text-muted-foreground">
                  Optional configuration available across variants.
                </p>
              </div>
              <PropsTable rows={optionRows} labels={{ prop: "Option" }} />
            </section>
          </HookDocsPage>
        </div>
      </div>
    </div>
  )
}
