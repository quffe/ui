"use server"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { getExampleCode } from "@/lib/serverUtils"
import BulkDataRevalidationExample from "@/examples/docs/hooks/useRevalidate/bulk-data-revalidation"
import FormSubmissionExample from "@/examples/docs/hooks/useRevalidate/form-submission"
import AdminDashboardExample from "@/examples/docs/hooks/useRevalidate/admin-dashboard"
import RealTimeUpdatesExample from "@/examples/docs/hooks/useRevalidate/real-time-updates"
import ErrorRecoveryExample from "@/examples/docs/hooks/useRevalidate/error-recovery"
import ConditionalRevalidationExample from "@/examples/docs/hooks/useRevalidate/conditional-revalidation"

const bulkDataRevalidationCode = getExampleCode(
  "docs/hooks/useRevalidate/bulk-data-revalidation.tsx"
)
const formSubmissionCode = getExampleCode("docs/hooks/useRevalidate/form-submission.tsx")
const adminDashboardCode = getExampleCode("docs/hooks/useRevalidate/admin-dashboard.tsx")
const realTimeUpdatesCode = getExampleCode("docs/hooks/useRevalidate/real-time-updates.tsx")
const errorRecoveryCode = getExampleCode("docs/hooks/useRevalidate/error-recovery.tsx")
const conditionalRevalidationCode = getExampleCode(
  "docs/hooks/useRevalidate/conditional-revalidation.tsx"
)

export default async function UseRevalidateDocs() {
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
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useRevalidate</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A SWR integration hook for revalidating cached data by matching URL patterns, perfect
              for refreshing multiple API endpoints.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">React Hook</Badge>
              <Badge variant="outline">SWR</Badge>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the hook using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="useRevalidate" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
              <CardDescription>
                This hook requires SWR to be installed and configured
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="typescript">{`npm install swr`}</CodeBlock>
              <CodeBlock language="tsx">
                {`// Wrap your app with SWR configuration
import { SWRConfig } from &apos;swr&apos;

function MyApp({ Component, pageProps }) {
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
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="typescript">
                {`import useRevalidate from "@/hooks/useRevalidate"`}
              </CodeBlock>
              <CodeBlock language="tsx">
                {`function DataManager() {
  const { revalidate } = useRevalidate()

  const handleRefreshData = () => {
    revalidate([
      &apos;/api/users&apos;,
      &apos;/api/posts&apos;,
      &apos;/api/comments&apos;
    ])
  }

  return (
    <button onClick={handleRefreshData}>
      Refresh All Data
    </button>
  )
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <PreviewTabs
                preview={<BulkDataRevalidationExample />}
                code={bulkDataRevalidationCode}
              />

              <PreviewTabs preview={<FormSubmissionExample />} code={formSubmissionCode} />

              <PreviewTabs preview={<AdminDashboardExample />} code={adminDashboardCode} />

              <PreviewTabs preview={<RealTimeUpdatesExample />} code={realTimeUpdatesCode} />

              <PreviewTabs preview={<ErrorRecoveryExample />} code={errorRecoveryCode} />

              <PreviewTabs
                preview={<ConditionalRevalidationExample />}
                code={conditionalRevalidationCode}
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Parameters</h3>
                  <div className="text-sm">None</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Returns</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Property</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">revalidate</td>
                          <td className="p-2">(urls: string[]) =&gt; void</td>
                          <td className="p-2">Function to revalidate SWR cache entries by URL</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Revalidation Logic</h3>
                  <CodeBlock language="tsx">
                    {`const revalidate = (urls: string[]) => {
  urls.forEach(url => {
    mutate((key: { url: string }) => key.url === url)
  })
}`}
                  </CodeBlock>
                  <p className="text-sm text-muted-foreground mt-2">
                    The hook uses SWR&apos;s mutate function to match cache keys by URL and trigger
                    revalidation.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">SWR Integration</h3>
                  <div className="text-sm space-y-2">
                    <p>This hook works with SWR&apos;s cache key matching system:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>
                        Matches cache entries where the key&apos;s URL property equals the provided
                        URL
                      </li>
                      <li>Triggers revalidation for all matching cache entries</li>
                      <li>Works with SWR&apos;s global mutate function</li>
                      <li>Supports both string keys and object keys with URL properties</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Bulk revalidation of multiple SWR cache entries</li>
                <li>URL-based cache key matching</li>
                <li>Seamless SWR integration</li>
                <li>TypeScript support with type safety</li>
                <li>Lightweight with minimal overhead</li>
                <li>Batch processing of revalidation requests</li>
                <li>Compatible with all SWR features and configurations</li>
                <li>Works with complex cache key structures</li>
                <li>Easy to integrate with existing SWR setups</li>
                <li>Supports conditional and dynamic revalidation</li>
                <li>Error-safe implementation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
              <CardDescription>Common scenarios where this hook is useful</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Data Management</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Post-mutation cache updates</div>
                    <div>• Bulk data refresh operations</div>
                    <div>• Related data synchronization</div>
                    <div>• Cache invalidation after CRUD operations</div>
                    <div>• Dashboard data refresh</div>
                    <div>• Admin panel operations</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Real-time Features</h4>
                  <div className="space-y-1 text-sm">
                    <div>• WebSocket-triggered updates</div>
                    <div>• Server-sent event handling</div>
                    <div>• Push notification responses</div>
                    <div>• Live data synchronization</div>
                    <div>• Collaborative editing updates</div>
                    <div>• Activity feed refresh</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">User Actions</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Form submission handling</div>
                    <div>• User preference updates</div>
                    <div>• Profile modification effects</div>
                    <div>• Content creation/editing</div>
                    <div>• Social interaction updates</div>
                    <div>• Shopping cart changes</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">System Operations</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Error recovery mechanisms</div>
                    <div>• Background sync operations</div>
                    <div>• Scheduled data refresh</div>
                    <div>• Cache warming strategies</div>
                    <div>• Performance optimization</div>
                    <div>• Data consistency maintenance</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
