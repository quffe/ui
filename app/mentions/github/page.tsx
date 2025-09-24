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
import { GithubMention } from "@/components/Mentions/Github/GithubMention"
import { getExampleCode } from "@/lib/serverUtils"
import { DocsPage, PropsTable, type PropsTableRow, type TocItem } from "@/components/internal/docs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Example as BasicExample } from "@/examples/mentions/github/basic"
import { Example as StatesExample } from "@/examples/mentions/github/states"
import { Example as HookLayoutExample } from "@/examples/mentions/github/render"

const basicCode = getExampleCode("mentions/github/basic.tsx")
const statesCode = getExampleCode("mentions/github/states.tsx")
const hookLayoutCode = getExampleCode("mentions/github/render.tsx")

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

const toc: TocItem[] = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "demos", title: "Demos" },
  { id: "props", title: "Props" },
  { id: "server-proxy", title: "Server proxy" },
]

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
        <div className="container mx-auto max-w-5xl space-y-10">
          <DocsPage
            toc={toc}
            header={{
              title: "GitHub Mention",
              description:
                "Compact metadata card for GitHub issues, pull requests, repositories, and users.",
              category: "Mentions · Component",
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
                <Link className="underline" href="/mentions/github">
                  GithubMention
                </Link>{" "}
                component mirrors GitHub’s UI. Need something more custom? Start from the{" "}
                <Link className="underline" href="/mentions/hooks/useGithubMention">
                  useGithubMention
                </Link>{" "}
                hook instead.
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
                  <InstallationTabs componentName="github-mention" />
                </TabsContent>
                <TabsContent
                  value="swr"
                  className="space-y-3 rounded-lg border border-border bg-muted/40 p-4"
                >
                  <p className="text-sm font-medium">SWR variant</p>
                  <InstallationTabs componentName="github-mention-swr" />
                </TabsContent>
                <TabsContent
                  value="rq"
                  className="space-y-3 rounded-lg border border-border bg-muted/40 p-4"
                >
                  <p className="text-sm font-medium">React Query variant</p>
                  <InstallationTabs componentName="github-mention-react-query" />
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
              <GithubMention url="https://github.com/vercel/next.js" useServer />
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
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
