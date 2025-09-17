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
import { InstallationTabs } from "@/components/internal/installation"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { HookDocsPage, type TocItem, type PropsTableRow } from "@/components/internal/docs"
import { getExampleCode } from "@/lib/serverUtils"

import BulkDataRevalidationExample from "@/examples/docs/hooks/useRevalidate/bulk-data-revalidation"
import FormSubmissionExample from "@/examples/docs/hooks/useRevalidate/form-submission"
import AdminDashboardExample from "@/examples/docs/hooks/useRevalidate/admin-dashboard"
import RealTimeUpdatesExample from "@/examples/docs/hooks/useRevalidate/real-time-updates"
import ErrorRecoveryExample from "@/examples/docs/hooks/useRevalidate/error-recovery"
import ConditionalRevalidationExample from "@/examples/docs/hooks/useRevalidate/conditional-revalidation"

const bulkDataRevalidationCode = getExampleCode("docs/hooks/useRevalidate/bulk-data-revalidation.tsx")
const formSubmissionCode = getExampleCode("docs/hooks/useRevalidate/form-submission.tsx")
const adminDashboardCode = getExampleCode("docs/hooks/useRevalidate/admin-dashboard.tsx")
const realTimeUpdatesCode = getExampleCode("docs/hooks/useRevalidate/real-time-updates.tsx")
const errorRecoveryCode = getExampleCode("docs/hooks/useRevalidate/error-recovery.tsx")
const conditionalRevalidationCode = getExampleCode("docs/hooks/useRevalidate/conditional-revalidation.tsx")

const returnRows: PropsTableRow[] = [
  {
    prop: "revalidate",
    type: "(urls: string[]) => void",
    description: "Triggers SWR revalidation for all cache keys matching the provided URLs.",
    required: true,
  },
]

export default async function UseRevalidateDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "prerequisites", title: "Prerequisites" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "api-returns", title: "Returns" },
    { id: "features", title: "Features" },
  ]

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
              <BreadcrumbPage>useRevalidate</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <HookDocsPage
            toc={toc}
            header={{
              title: "useRevalidate",
              description: "Revalidate SWR cache entries by URL pattern—ideal after mutations or bulk updates.",
              category: "Data · Hook",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("useRevalidate")} />,
            }}
            returns={returnRows}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Install via CLI to copy the hook and associated SWR utilities.
                </p>
              </div>
              <InstallationTabs componentName="useRevalidate" />
            </section>

            <section id="prerequisites" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Prerequisites</h2>
                <p className="text-muted-foreground">
                  Ensure SWR is installed and configured before using this hook.
                </p>
              </div>
              <CodeBlock language="bash">{`npm install swr`}</CodeBlock>
              <CodeBlock language="tsx" filename="_app.tsx">
{`import { SWRConfig } from 'swr'

function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
        revalidateOnFocus: false,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}`}
              </CodeBlock>
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Call <code className="font-mono text-xs">revalidate</code> with URLs or patterns whenever you need to refresh cached data.
                </p>
              </div>
              <CodeBlock language="tsx" filename="usage.tsx">
{`const { revalidate } = useRevalidate()

const handleRefresh = () => {
  revalidate(['/api/users', '/api/posts', '/api/comments'])
}`}
              </CodeBlock>
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Typical revalidation scenarios across dashboards, real-time updates, and error recovery.
                </p>
              </div>
              <PreviewTabs title="Bulk data revalidation" preview={<BulkDataRevalidationExample />} code={bulkDataRevalidationCode} />
              <PreviewTabs title="Form submission" preview={<FormSubmissionExample />} code={formSubmissionCode} />
              <PreviewTabs title="Admin dashboard" preview={<AdminDashboardExample />} code={adminDashboardCode} />
              <PreviewTabs title="Real-time updates" preview={<RealTimeUpdatesExample />} code={realTimeUpdatesCode} />
              <PreviewTabs title="Error recovery" preview={<ErrorRecoveryExample />} code={errorRecoveryCode} />
              <PreviewTabs title="Conditional revalidation" preview={<ConditionalRevalidationExample />} code={conditionalRevalidationCode} />
            </section>

            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <p className="text-muted-foreground">
                  Designed to streamline cache management after mutations.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Batch revalidation for multiple endpoints in one call.</li>
                <li>Works with custom fetchers defined in <code className="font-mono text-xs">SWRConfig</code>.</li>
                <li>Great for admin panels, form workflows, or optimistic updates.</li>
              </ul>
            </section>
          </HookDocsPage>
        </div>
      </div>
    </div>
  )
}
