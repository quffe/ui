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
import { DocsPage, type TocItem } from "@/components/internal/docs"

import { Example as BasicExample } from "@/examples/mentions/github/basic"
import { Example as StatesExample } from "@/examples/mentions/github/states"
import { Example as RenderExample } from "@/examples/mentions/github/render"

const basicCode = getExampleCode("mentions/github/basic.tsx")
const statesCode = getExampleCode("mentions/github/states.tsx")
const renderCode = getExampleCode("mentions/github/render.tsx")

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
        <div className="container mx-auto max-w-5xl space-y-8">
          <DocsPage
            toc={toc}
            header={{
              title: "GitHub Mention",
              description: "Compact metadata card for GitHub issues, pull requests, repositories, and users.",
              category: "Mentions · Component",
              status: "Stable",
              actions: <Link className="text-sm text-primary" href="https://github.com">GitHub</Link>,
            }}
          >
            <section id="overview" className="scroll-mt-24 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge>Accessible</Badge>
                <Badge variant="secondary">Cache-ready</Badge>
                <Badge variant="outline">Shadcn primitives</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                The ready-made <Link className="underline" href="/mentions/github">GithubMention</Link> component mirrors GitHub’s UI. Need something more custom? Start from the <Link className="underline" href="/mentions/hooks/useGithubMention">useGithubMention</Link> hook instead.
              </p>
            </section>

            <section className="scroll-mt-24 space-y-4" id="note">
              <div className="flex rounded-lg border border-border bg-muted/40 p-4 text-sm">
                <AlertCircle className="mr-3 mt-1 h-5 w-5 text-warn-amber" />
                <div>
                  <p className="font-medium">Note</p>
                  <p className="text-muted-foreground">
                    This component ships with smart defaults—URL detection, loading states, and a tooltip overlay. Use the hook for bespoke layouts.
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
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Plain (no cache)</p>
                  <InstallationTabs componentName="github-mention" />
                </div>
                <div>
                  <p className="text-sm font-medium">SWR variant</p>
                  <InstallationTabs componentName="github-mention-swr" />
                </div>
                <div>
                  <p className="text-sm font-medium">React Query variant</p>
                  <InstallationTabs componentName="github-mention-react-query" />
                </div>
              </div>
            </section>

            <section id="demos" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Demos</h2>
                <p className="text-muted-foreground">
                  Live previews covering default styling, loading/error states, and custom render logic.
                </p>
              </div>
              <PreviewTabs title="Basic demo" preview={<BasicExample />} code={basicCode} />
              <PreviewTabs title="States &amp; error handling" preview={<StatesExample />} code={statesCode} />
              <PreviewTabs title="Custom render" preview={<RenderExample />} code={renderCode} />
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  Control rendering and behaviour by passing the following props.
                </p>
              </div>
              <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs">
{`type GithubMentionProps = {
  url: string
  useServer?: boolean
  className?: string
  linkProps?: React.ComponentProps<'a'>
  render?: (data: GithubResource) => React.ReactNode
  onError?: (error: Error) => void
}`}
              </pre>
              <p className="text-xs text-muted-foreground">
                Tip: Pass <code>{"{ target: '_blank', rel: 'noopener noreferrer' }"}</code> to open GitHub links in new tabs.
              </p>
            </section>

            <section id="server-proxy" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Server proxy (optional)</h2>
                <p className="text-muted-foreground">
                  Use the included proxy route to raise rate limits and hide tokens.
                </p>
              </div>
              <GithubMention url="https://github.com/vercel/next.js" useServer />
              <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                Set <code>GITHUB_TOKEN</code> in <code>.env.local</code> to increase rate limits. Remove <code>useServer</code> to call GitHub directly when tokens aren&apos;t available.
              </div>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
