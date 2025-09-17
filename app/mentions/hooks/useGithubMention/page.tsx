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
  { prop: "useServer", type: "boolean", defaultValue: "false", description: "Proxy requests through the server route to raise rate limits." },
  { prop: "refreshInterval", type: "number", description: "Auto-refresh interval (ms) when using SWR/React Query variants." },
  { prop: "revalidateOnFocus", type: "boolean", defaultValue: "true", description: "SWR option to refresh when the window regains focus." },
  { prop: "suspense", type: "boolean", description: "Enable Suspense mode for SWR/React Query variants." },
]

const toc: TocItem[] = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
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
        <div className="container mx-auto max-w-5xl">
          <HookDocsPage
            toc={toc}
            header={{
              title: "useGithubMention",
              description: "Fetch GitHub metadata for issues, PRs, repos, and users—build the UI you need.",
              category: "Mentions · Hook",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("useGithubMention")} />,
            }}
            returns={returnRows}
          >
            <section id="overview" className="scroll-mt-24 space-y-4">
              <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
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
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Plain</p>
                  <InstallationTabs componentName="use-github-mention-plain" />
                </div>
                <div>
                  <p className="text-sm font-medium">SWR variant</p>
                  <InstallationTabs componentName="use-github-mention" />
                </div>
                <div>
                  <p className="text-sm font-medium">React Query variant</p>
                  <InstallationTabs componentName="use-github-mention-react-query" />
                </div>
              </div>
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Call the hook with a GitHub URL and render the returned metadata however you like.
                </p>
              </div>
              <CodeBlock language="tsx" filename="usage.tsx">
{`const { data, isLoading, error } = useGithubMention({
  url,
  useServer: true,
})

if (isLoading) return <Skeleton />
if (error || !data) return <ErrorState reason={error?.message} />

return <GithubCard resource={data} />`}
              </CodeBlock>
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
