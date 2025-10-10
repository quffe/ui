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
import { DocsPage, type TocItem } from "@/components/internal/docs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { getExampleCode } from "@/lib/serverUtils"

import { Example as IssueViewExample } from "@/examples/replica/github/views/issue"
import { Example as PullViewExample } from "@/examples/replica/github/views/pull"
import { Example as RepoViewExample } from "@/examples/replica/github/views/repo"
import { Example as UserViewExample } from "@/examples/replica/github/views/user"

const issueViewCode = getExampleCode("replica/github/views/issue.tsx")
const pullViewCode = getExampleCode("replica/github/views/pull.tsx")
const repoViewCode = getExampleCode("replica/github/views/repo.tsx")
const userViewCode = getExampleCode("replica/github/views/user.tsx")

const composeCode = `import {
  GithubIssueReplica,
  GithubRepoReplica,
} from "@/components/Replica/Github/views"
import { GithubReplicaDisplay } from "@/components/Replica/Github/GithubReplicaDisplay"
import type { GithubResource } from "@/lib/github/types"

export function GithubSummary({ resource }: { resource: GithubResource }) {
  if (resource.kind === "issue") {
    return <GithubIssueReplica data={resource} />
  }

  if (resource.kind === "repo") {
    return <GithubRepoReplica data={resource} />
  }

  return <GithubReplicaDisplay resource={resource} />
}
`

const toc: TocItem[] = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "issue-view", title: "Issue view" },
  { id: "pull-view", title: "Pull request view" },
  { id: "repo-view", title: "Repository view" },
  { id: "user-view", title: "User view" },
  { id: "compose", title: "Compose with other components" },
]

export default async function GithubViewsPage() {
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
              <BreadcrumbLink href="/replica/github">GitHub Replica</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>GitHub views</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl space-y-10">
          <DocsPage
            toc={toc}
            header={{
              title: "GitHub views",
              description:
                "Present GitHub metadata exactly how you want it with granular view components.",
              category: "Replica · Component",
              status: "Stable",
            }}
          >
            <section id="overview" className="scroll-mt-24 space-y-4">
              <p className="text-sm text-muted-foreground">
                Each view mirrors part of GitHub&apos;s UI - pull requests, issues, repositories,
                and user profiles - without fetching data itself. Pair them with
                <Link className="underline" href="/replica/github">
                  GithubReplica
                </Link>
                ,{" "}
                <Link className="underline" href="/replica/hooks/useGithubReplica">
                  useGithubReplica
                </Link>
                , or your own backend responses.
              </p>
            </section>

            <section id="installation" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install only the views you need. Each component is tree-shakeable and relies on
                  the shared tooltip primitive.
                </p>
              </div>
              <Tabs defaultValue="issue" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="issue">Issue</TabsTrigger>
                  <TabsTrigger value="pull">Pull</TabsTrigger>
                  <TabsTrigger value="repo">Repository</TabsTrigger>
                  <TabsTrigger value="user">User</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="issue"
                  className="space-y-3 rounded-lg border border-border bg-muted/40 p-4"
                >
                  <p className="text-sm font-medium">Issue view</p>
                  <InstallationTabs componentName="github-issue-replica" />
                </TabsContent>
                <TabsContent
                  value="pull"
                  className="space-y-3 rounded-lg border border-border bg-muted/40 p-4"
                >
                  <p className="text-sm font-medium">Pull request view</p>
                  <InstallationTabs componentName="github-pull-replica" />
                </TabsContent>
                <TabsContent
                  value="repo"
                  className="space-y-3 rounded-lg border border-border bg-muted/40 p-4"
                >
                  <p className="text-sm font-medium">Repository view</p>
                  <InstallationTabs componentName="github-repo-replica" />
                </TabsContent>
                <TabsContent
                  value="user"
                  className="space-y-3 rounded-lg border border-border bg-muted/40 p-4"
                >
                  <p className="text-sm font-medium">User view</p>
                  <InstallationTabs componentName="github-user-replica" />
                </TabsContent>
              </Tabs>
            </section>

            <section id="issue-view" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Issue view</h2>
                <p className="text-muted-foreground">
                  Highlights issue state, title, body snippet, and comment count with familiar
                  GitHub styling.
                </p>
              </div>
              <PreviewTabs
                title="GithubIssueReplica"
                preview={<IssueViewExample />}
                code={issueViewCode}
              />
            </section>

            <section id="pull-view" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Pull request view</h2>
                <p className="text-muted-foreground">
                  Surface PR status, branch context, and recent history - perfect for changelogs and
                  deployment dashboards.
                </p>
              </div>
              <PreviewTabs
                title="GithubPullReplica"
                preview={<PullViewExample />}
                code={pullViewCode}
              />
            </section>

            <section id="repo-view" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Repository view</h2>
                <p className="text-muted-foreground">
                  Show repo metadata - stars, forks, language, visibility - with optional owner
                  preview on hover.
                </p>
              </div>
              <PreviewTabs
                title="GithubRepoReplica"
                preview={<RepoViewExample />}
                code={repoViewCode}
              />
            </section>

            <section id="user-view" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">User view</h2>
                <p className="text-muted-foreground">
                  Display profile avatars, bios, followers, and locations for contributors and
                  authors.
                </p>
              </div>
              <PreviewTabs
                title="GithubUserReplica"
                preview={<UserViewExample />}
                code={userViewCode}
              />
            </section>

            <section id="compose" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Compose with other components
                </h2>
                <p className="text-muted-foreground">
                  Mix-and-match views with{" "}
                  <code className="font-mono text-xs">GithubReplicaDisplay</code> or your own cards.
                  Use the normalized <code className="font-mono text-xs">GithubResource</code> union
                  to switch on the resource kind.
                </p>
              </div>
              <CodeBlock language="tsx" filename="components/GithubSummary.tsx">
                {composeCode}
              </CodeBlock>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
