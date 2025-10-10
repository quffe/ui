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
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { InstallationTabs } from "@/components/internal/installation"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"
import { GithubReplica } from "@/components/Replica/Github/GithubReplica"
import { getExampleCode } from "@/lib/serverUtils"
import { DocsPage, PropsTable, type PropsTableRow, type TocItem } from "@/components/internal/docs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/internal/ui/code-block"

import { Example as BasicExample } from "@/examples/replica/github/basic"
import { Example as StatesExample } from "@/examples/replica/github/states"
import { Example as HookLayoutExample } from "@/examples/replica/github/render"

const basicCode = getExampleCode("replica/github/basic.tsx")
const statesCode = getExampleCode("replica/github/states.tsx")
const hookLayoutCode = getExampleCode("replica/github/render.tsx")

const componentPropsRows: PropsTableRow[] = [
  {
    prop: "url",
    type: "string",
    description: "GitHub issue, PR, repository, or user URL to display.",
    required: true,
  },
  {
    prop: "useServer",
    type: "boolean",
    defaultValue: "false",
    description:
      "Route through /api/github/resource so the request runs on your server with optional auth.",
  },
  {
    prop: "className",
    type: "string",
    description: "Extra classes merged onto the root card.",
  },
  {
    prop: "linkProps",
    type: "React.ComponentProps<'a'>",
    description: "Forwarded anchor props for the resource link (e.g., target, rel).",
  },
  {
    prop: "onError",
    type: "(error: Error) => void",
    description: "Callback fired when fetching metadata fails.",
  },
]

const pullResourceRows: PropsTableRow[] = [
  {
    prop: "number",
    type: "number",
    description: "Pull request number displayed in the header and tooltip.",
  },
  {
    prop: "state",
    type: "'open' | 'closed'",
    description: "Open or closed state used for badges and icon colouring.",
  },
  {
    prop: "merged",
    type: "boolean",
    description: "Indicates whether the pull request is merged.",
  },
  {
    prop: "title",
    type: "string",
    description: "Human-readable pull request title rendered in the card.",
  },
  {
    prop: "labels",
    type: "LabelMeta[]",
    description: "Normalized labels with id, name, and colour information.",
  },
  {
    prop: "base.repo.full_name",
    type: "string | null",
    description: "Target repository full name used for context in the tooltip.",
  },
  {
    prop: "head.ref",
    type: "string | null",
    description: "Source branch for the pull request surfaced in the tooltip.",
  },
]

const issueResourceRows: PropsTableRow[] = [
  {
    prop: "number",
    type: "number",
    description: "Issue number displayed alongside the repository owner/name.",
  },
  {
    prop: "state",
    type: "'open' | 'closed'",
    description: "Status that controls the icon and colour treatments.",
  },
  {
    prop: "title",
    type: "string",
    description: "Issue title shown both inline and in the tooltip heading.",
  },
  {
    prop: "body",
    type: "string | null",
    description: "Markdown body snippet extracted for tooltip preview text.",
  },
  {
    prop: "comments",
    type: "number | undefined",
    description: "Comment count used to render metadata inside the tooltip.",
  },
  {
    prop: "labels",
    type: "LabelMeta[] | undefined",
    description: "Issue labels normalised for consistent colouring.",
  },
]

const repoResourceRows: PropsTableRow[] = [
  {
    prop: "full_name",
    type: "string",
    description: "Repository owner/name combination displayed as the title.",
  },
  {
    prop: "description",
    type: "string | null",
    description: "Repository description shown as supporting text in the tooltip.",
  },
  {
    prop: "stargazers_count",
    type: "number | undefined",
    description: "Star count surfaced as inline metadata.",
  },
  {
    prop: "forks_count",
    type: "number | undefined",
    description: "Fork count available for additional stats renderers.",
  },
  {
    prop: "language",
    type: "string | null",
    description: "Primary language label paired with an optional colour swatch.",
  },
  {
    prop: "pushed_at",
    type: "string | null",
    description: "Timestamp used to display recency in the tooltip.",
  },
]

const userResourceRows: PropsTableRow[] = [
  {
    prop: "login",
    type: "string",
    description: "GitHub username displayed in the card and tooltip header.",
  },
  {
    prop: "name",
    type: "string | null",
    description: "Optional display name rendered when available.",
  },
  {
    prop: "avatar_url",
    type: "string | null",
    description: "Avatar URL used for the preview badge and tooltip.",
  },
  {
    prop: "bio",
    type: "string | null",
    description: "Profile bio text shown in the tooltip body.",
  },
  {
    prop: "followers",
    type: "number | undefined",
    description: "Follower count normalised for stat displays.",
  },
  {
    prop: "location",
    type: "string | null",
    description: "Optional location field available for custom layouts.",
  },
]

const toc: TocItem[] = [
  { id: "overview", title: "Overview" },
  { id: "quickstart", title: "Quickstart" },
  { id: "installation", title: "Installation" },
  { id: "server-proxy", title: "Server proxy" },
  { id: "supported-urls", title: "Supported URLs" },
  { id: "demos", title: "Demos" },
  { id: "props", title: "Props" },
  { id: "data-contract", title: "Data contract" },
  { id: "customizing", title: "Customize the experience" },
]

const quickstartCode = `import { GithubReplica } from "@/components/Replica/Github/GithubReplica"

export function GithubCard() {
  return (
    <GithubReplica
      url="https://github.com/vercel/next.js/pull/61000"
      useServer
    />
  )
}
`

const customizeCode = `import { GithubRepoReplica } from "@/components/Replica/Github/views"
import { GithubReplicaDisplay } from "@/components/Replica/Github/GithubReplicaDisplay"
import { useGithubReplica } from "@/hooks/use-github-replica"

export function RepoHeadline({ url }: { url: string }) {
  const { data, isLoading, error } = useGithubReplica(url, { useServer: true })

  if (isLoading) return <span>Loading...</span>
  if (error || !data) return null

  if (data.kind === "repo") {
    return <GithubRepoReplica data={data} linkProps={{ target: "_blank" }} />
  }

  return <GithubReplicaDisplay resource={data} />
}
`

export default async function GithubReplicaPage() {
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
              <BreadcrumbLink href="/replica">Replica</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>GitHub Replica</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl space-y-10">
          <DocsPage
            toc={toc}
            header={{
              title: "GitHub Replica",
              description:
                "Compact metadata card for GitHub issues, pull requests, repositories, and users.",
              category: "Replica · Component",
              status: "Stable",
            }}
          >
            <section id="overview" className="scroll-mt-24 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge>Accessible</Badge>
                <Badge variant="secondary">Cache-ready</Badge>
                <Badge variant="outline">Shadcn primitives</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                The ready-made{" "}
                <Link className="underline" href="/replica/github">
                  GithubReplica
                </Link>{" "}
                component mirrors GitHub’s UI. Need something more custom? Start from the{" "}
                <Link className="underline" href="/replica/hooks/useGithubReplica">
                  useGithubReplica
                </Link>{" "}
                hook instead.
              </p>
            </section>

            <section id="quickstart" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Quickstart</h2>
                <p className="text-muted-foreground">
                  Drop the component anywhere in your UI, pass a GitHub URL, and enable{" "}
                  <code className="font-mono text-xs">useServer</code> when you have the proxy route
                  deployed for higher rate limits.
                </p>
              </div>
              <CodeBlock language="tsx" filename="components/GithubCard.tsx">
                {quickstartCode}
              </CodeBlock>
              <p className="text-sm text-muted-foreground">
                The component handles loading, errors, and hover previews automatically. Use the{" "}
                <code className="font-mono text-xs">onError</code> callback to hook into failures or
                fall back to a custom layout.
              </p>
            </section>

            <section className="scroll-mt-24 space-y-4" id="note">
              <div className="flex rounded-lg border border-border bg-muted/40 p-5 text-sm">
                <AlertCircle className="mr-3 mt-1 h-5 w-5 text-warn-amber" />
                <div>
                  <p className="font-medium">Note</p>
                  <p className="text-muted-foreground">
                    This component ships with smart defaults—URL detection, loading states, and
                    hover tooltips that surface extra metadata. Use the hook for bespoke layouts.
                  </p>
                </div>
              </div>
            </section>

            <section id="installation" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Pick the variant that matches your data layer: plain fetch, SWR, or React Query.
                </p>
              </div>
              <Tabs defaultValue="plain" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="plain">Plain</TabsTrigger>
                  <TabsTrigger value="swr">SWR</TabsTrigger>
                  <TabsTrigger value="rq">React Query</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="plain"
                  className="space-y-3 rounded-lg border border-border bg-muted/40 p-4"
                >
                  <p className="text-sm font-medium">Plain (no cache)</p>
                  <InstallationTabs componentName="github-replica" />
                </TabsContent>
                <TabsContent
                  value="swr"
                  className="space-y-3 rounded-lg border border-border bg-muted/40 p-4"
                >
                  <p className="text-sm font-medium">SWR variant</p>
                  <InstallationTabs componentName="github-replica-swr" />
                </TabsContent>
                <TabsContent
                  value="rq"
                  className="space-y-3 rounded-lg border border-border bg-muted/40 p-4"
                >
                  <p className="text-sm font-medium">React Query variant</p>
                  <InstallationTabs componentName="github-replica-react-query" />
                </TabsContent>
              </Tabs>
            </section>

            <section id="server-proxy" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Server proxy (optional)</h2>
                <p className="text-muted-foreground">
                  Enable <code className="font-mono text-xs">useServer</code> to call the component
                  through your Next.js API route at{" "}
                  <code className="font-mono text-xs">/api/github/resource</code>. This keeps access
                  tokens on the server, raises rate limits, and serves cached responses via
                  incremental revalidation.
                </p>
              </div>
              <GithubReplica url="https://github.com/vercel/next.js" useServer />
              <div className="grid gap-4 md:grid-cols-1">
                <div className="overflow-x-auto">
                  <CodeBlock language="bash" filename=".env.local">
                    {`GITHUB_TOKEN=ghp_your_token_here`}
                  </CodeBlock>
                </div>
                <div className="overflow-x-auto">
                  <CodeBlock language="bash" filename="verify.sh">
                    {`curl \
  -H "Authorization: token $GITHUB_TOKEN" \
  "http://localhost:3000/api/github/resource?url=https://github.com/vercel/next.js"`}
                  </CodeBlock>
                </div>
              </div>
              <div className="grid gap-4 rounded-lg border border-border bg-muted/40 p-4 text-sm">
                <div>
                  <p className="font-medium">
                    1. Provide a GitHub token (optional but recommended)
                  </p>
                  <p className="text-muted-foreground">
                    Add <code className="font-mono text-xs">GITHUB_TOKEN</code> or{" "}
                    <code className="font-mono text-xs">GH_TOKEN</code> to your
                    <code className="font-mono text-xs">.env.local</code>. The proxy attaches it as
                    a bearer token when the value doesn&apos;t start with
                    <code className="font-mono text-xs">public_</code>.
                  </p>
                </div>
                <div>
                  <p className="font-medium">2. Deploy the API route</p>
                  <p className="text-muted-foreground">
                    Deploying this app hosts{" "}
                    <code className="font-mono text-xs">/api/github/resource</code> alongside your
                    UI. Browsers can call it from the same origin only unless you add custom CORS
                    headers for other domains.
                  </p>
                </div>
                <div>
                  <p className="font-medium">3. Opt in per environment</p>
                  <p className="text-muted-foreground">
                    Pass <code className="font-mono text-xs">useServer: true</code> (or
                    conditionally toggle it) so the component forwards requests to the proxy. The
                    component still receives normalized data from the hook powering it and renders
                    the same UI.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Fallback</p>
                  <p className="text-muted-foreground">
                    Omit <code className="font-mono text-xs">useServer</code> to fall back to
                    GitHub&apos;s REST API directly from the client. This works in static hosting or
                    pure React setups, but rate limits match the viewer&apos;s IP and the requests
                    run in their browser.
                  </p>
                </div>
              </div>
            </section>

            <section id="supported-urls" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Supported URLs</h2>
                <p className="text-muted-foreground">
                  The replica parses the URL with{" "}
                  <code className="font-mono text-xs">parseGithubUrl</code> and gracefully handles
                  invalid input before any network request fires.
                </p>
              </div>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li>
                  <code className="font-mono text-xs">https://github.com/org/repo/pull/123</code> —
                  Pull requests with hover tooltips showing branch info, labels, and merge status.
                </li>
                <li>
                  <code className="font-mono text-xs">https://github.com/org/repo/issues/456</code>{" "}
                  — Issues with body snippets, labels, and comment counts.
                </li>
                <li>
                  <code className="font-mono text-xs">https://github.com/org/repo</code> —
                  Repositories with stars, forks, language, and recency metadata.
                </li>
                <li>
                  <code className="font-mono text-xs">https://github.com/octocat</code> — User
                  profiles with avatars, bios, and follower counts.
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                When the URL is empty or malformed, the hook surfaces an{" "}
                <code className="font-mono text-xs">invalidReason</code> and the component renders
                the built-in error state. Use the <code className="font-mono text-xs">onError</code>{" "}
                callback to capture precise API failures (including rate limiting) and roll your own
                recovery UX.
              </p>
            </section>

            <section id="demos" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Demos</h2>
                <p className="text-muted-foreground">
                  Live previews covering default styling, loading/error states, and how to hand off
                  to the hook for full control.
                </p>
              </div>
              <PreviewTabs title="Basic demo" preview={<BasicExample />} code={basicCode} />
              <PreviewTabs
                title="States &amp; error handling"
                preview={<StatesExample />}
                code={statesCode}
              />
              <PreviewTabs
                title="Hook-based custom layout"
                preview={<HookLayoutExample />}
                code={hookLayoutCode}
              />
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  Configure the card using these props; any additional anchor props pass through via{" "}
                  <code className="font-mono text-xs">linkProps</code>.
                </p>
              </div>
              <PropsTable rows={componentPropsRows} />
              <p className="text-xs text-muted-foreground">
                Tip: Open links in a new tab with{" "}
                <code>{"{ target: '_blank', rel: 'noopener noreferrer' }"}</code> via{" "}
                <code className="font-mono text-xs">linkProps</code>.
              </p>
            </section>

            <section id="data-contract" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Data contract</h2>
                <p className="text-muted-foreground">
                  <code className="font-mono text-xs">useGithubReplica</code> returns a typed{" "}
                  <code className="font-mono text-xs">GithubResource</code> union so you can plug
                  the data into bespoke layouts without guessing field names.
                </p>
              </div>
              <CodeBlock language="ts" filename="@/lib/github/types.ts">
                {`import type { GithubResource } from "@/lib/github/types"`}
              </CodeBlock>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight">Pull requests</h3>
                  <PropsTable rows={pullResourceRows} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight">Issues</h3>
                  <PropsTable rows={issueResourceRows} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight">Repositories</h3>
                  <PropsTable rows={repoResourceRows} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight">Users</h3>
                  <PropsTable rows={userResourceRows} />
                </div>
              </div>
            </section>

            <section id="customizing" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Customize the experience</h2>
                <p className="text-muted-foreground">
                  Import view components directly from{" "}
                  <code className="font-mono text-xs">@/components/Replica/Github/views</code> to
                  reuse GitHub-styled building blocks. Combine them with
                  <code className="font-mono text-xs">GithubReplicaDisplay</code> or the hook to
                  swap layouts per resource type.
                </p>
              </div>
              <CodeBlock language="tsx" filename="components/RepoHeadline.tsx">
                {customizeCode}
              </CodeBlock>
              <p className="text-sm text-muted-foreground">
                For deeper control, explore the dedicated{" "}
                <Link className="underline" href="/replica/github/views">
                  GitHub view components
                </Link>{" "}
                documentation. If you only need to intercept failures, use the{" "}
                <code className="font-mono text-xs">onError</code> prop to expose retry UIs,
                logging, or rate-limit messaging while keeping the default card design.
              </p>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
