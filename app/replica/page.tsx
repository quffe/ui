import Link from "next/link"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/internal/ui/code-block"

const highlights = [
  {
    title: "GitHub-native UI",
    description:
      "Pre-built replicas for pull requests, issues, repositories, and users that mirror GitHub’s layout, states, and color cues.",
  },
  {
    title: "Flexible data sources",
    description:
      "Render with a simple URL, hydrate from the Replica API, or feed your own normalized data for complete custom flows.",
  },
  {
    title: "Drop-in theming",
    description:
      "Built with Shadcn primitives, Tailwind tokens, and dark mode support so the replicas inherit your design system automatically.",
  },
]

const dataModes = [
  {
    label: "Client",
    description:
      "Ideal for dashboards and marketing sites. Fetches GitHub metadata directly in the browser with smart caching and loading states.",
  },
  {
    label: "Server",
    description:
      "Proxy through the QuffeUI Replica API route to keep tokens server-side and hydrate replicas with normalized payloads.",
  },
  {
    label: "Static",
    description:
      "Ship snapshot data for demos or product tours by passing a pre-generated object that matches the Replica schema.",
  },
]

const experiences = [
  {
    title: "Pull Request",
    blurb: "Status timelines, reviewers, and merge readiness at a glance.",
  },
  {
    title: "Issue",
    blurb: "Surface labels, activity, and comment counts with GitHub parity.",
  },
  {
    title: "Repository",
    blurb: "Showcase stars, forks, primary language, and release cadence.",
  },
  {
    title: "User",
    blurb: "Display avatar, bio, follower metrics, and social links in-line.",
  },
]

export default function ReplicaIntroductionPage() {
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Replica</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Replica</h1>
            <p className="text-muted-foreground">
              Opinionated GitHub-inspired experiences for product tours, dashboards, and docs.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What is Replica?</CardTitle>
              <CardDescription>
                Drop-in UI experiences that visualize GitHub data with zero pixel tweaking.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Replica packages the most common GitHub touchpoints—pull requests, issues, repos, and
                user profiles—into polished components that you can embed anywhere. Each component is
                built on QuffeUI primitives, making them accessible, theme-aware, and easy to compose
                alongside the rest of your design system.
              </p>
              <p>
                Use Replica components to power changelog highlights, product onboarding flows,
                internal tooling, or documentation callouts without rebuilding the GitHub UI from
                scratch.
              </p>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-xl font-semibold mb-4">Why teams choose Replica</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map(highlight => (
                <Card key={highlight.title}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {highlight.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Quick start</CardTitle>
              <CardDescription>
                Install the bundle, fetch GitHub metadata, and render your first replica.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm text-muted-foreground">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">1. Install the Replica kit</h3>
                <CodeBlock language="bash" showCopyButton={true}>
                  pnpm dlx shadcn@latest add @quffeui/replica/github-replica
                </CodeBlock>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">2. Render a pull request</h3>
                <CodeBlock language="tsx" showCopyButton={true}>
                  {`import { GithubReplica } from "@/components/Replica/Github/GithubReplica"

export function Example() {
  return (
    <GithubReplica
      url="https://github.com/quffeui/ui/pull/482"
      useServer
    />
  )
}`}
                </CodeBlock>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">3. Configure tokens (optional)</h3>
                <p>
                  Add a `GITHUB_TOKEN` to your `.env.local` to increase API limits. The Replica API
                  route automatically rotates through multiple tokens when provided.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available experiences</CardTitle>
              <CardDescription>Fine-tuned layouts for the most important GitHub entities.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {experiences.map(experience => (
                <div key={experience.title} className="rounded-lg border border-dashed border-border p-4">
                  <h3 className="font-semibold text-foreground">{experience.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{experience.blurb}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data delivery modes</CardTitle>
              <CardDescription>Choose the transport layer that fits your surface area.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dataModes.map(mode => (
                <div key={mode.label} className="flex flex-col gap-2 rounded-lg border border-border p-4">
                  <Badge className="w-fit" variant="outline">
                    {mode.label}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{mode.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Where to go next</CardTitle>
              <CardDescription>Extend Replica to match your product story.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Jump into the <Link href="/replica/generator" className="text-primary underline">Replica generator</Link> to build rich embeds for documentation or onboarding flows.
              </p>
              <p>
                Explore the <Link href="/replica/github" className="text-primary underline">GitHub Replica docs</Link> for component-specific props, layout overrides, and advanced data examples.
              </p>
              <p>
                Need a custom entity? Compose with the exported view primitives under
                {" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                  @/components/Replica/Github/views
                </code>{" "}
                to ship a branded experience quickly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
