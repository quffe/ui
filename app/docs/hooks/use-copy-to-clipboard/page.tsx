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
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"

// Example components
import { BasicUsageExample } from "@/examples/docs/use-copy-to-clipboard/basic-usage"
import { WithCallbacksExample } from "@/examples/docs/use-copy-to-clipboard/with-callbacks"
import { CodeCopyExample } from "@/examples/docs/use-copy-to-clipboard/code-copy"
import { getExampleCode } from "@/lib/serverUtils"

// Raw imports
const basicUsageCode = getExampleCode("docs/use-copy-to-clipboard/basic-usage.tsx")
const withCallbacksCode = getExampleCode("docs/use-copy-to-clipboard/with-callbacks.tsx")
const codeCopyCode = getExampleCode("docs/use-copy-to-clipboard/code-copy.tsx")

export default async function UseCopyToClipboardDocs() {
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
              <BreadcrumbPage>useCopyToClipboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">useCopyToClipboard</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A comprehensive hook for copying text to clipboard with modern API support, fallbacks,
              and state management.
            </p>
            <Badge variant="secondary">React Hook</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the hook using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="use-copy-to-clipboard" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <PreviewTabs
                title="Basic Copy Button"
                preview={<BasicUsageExample />}
                code={basicUsageCode}
              />

              <PreviewTabs
                title="Copy Code with Button"
                preview={<CodeCopyExample />}
                code={codeCopyCode}
              />

              <PreviewTabs
                title="With Success Callback"
                preview={<WithCallbacksExample />}
                code={withCallbacksCode}
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
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Parameter</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Default</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-mono">options</td>
                          <td className="p-2">UseCopyToClipboardOptions</td>
                          <td className="p-2">{`{}`}</td>
                          <td className="p-2">Configuration options</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">options.onSuccess</td>
                          <td className="p-2">{`(text: string) => void`}</td>
                          <td className="p-2">-</td>
                          <td className="p-2">Called on successful copy</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">options.onError</td>
                          <td className="p-2">{`(error: Error) => void`}</td>
                          <td className="p-2">-</td>
                          <td className="p-2">Called on copy error</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">options.timeout</td>
                          <td className="p-2">number</td>
                          <td className="p-2">2000</td>
                          <td className="p-2">Success state timeout in ms</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">options.showToast</td>
                          <td className="p-2">boolean</td>
                          <td className="p-2">false</td>
                          <td className="p-2">Show default toast notifications</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                          <td className="p-2 font-mono">copy</td>
                          <td className="p-2">{`(text: string, label?: string) => Promise<boolean>`}</td>
                          <td className="p-2">Function to copy text to clipboard</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">copied</td>
                          <td className="p-2">boolean</td>
                          <td className="p-2">Whether the copy operation was successful</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">error</td>
                          <td className="p-2">Error | null</td>
                          <td className="p-2">Any error that occurred during copying</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-mono">isLoading</td>
                          <td className="p-2">boolean</td>
                          <td className="p-2">Whether a copy operation is in progress</td>
                        </tr>
                      </tbody>
                    </table>
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
                <li>Modern Clipboard API with automatic fallback</li>
                <li>Comprehensive error handling and reporting</li>
                <li>Loading and success state management</li>
                <li>Customizable success timeout</li>
                <li>Toast notification support (Sonner integration)</li>
                <li>Success and error callbacks</li>
                <li>TypeScript support with full type safety</li>
                <li>Automatic cleanup on unmount</li>
                <li>Secure context detection</li>
                <li>Label support for better UX</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Browser Support</CardTitle>
              <CardDescription>Clipboard API support and fallbacks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Modern Clipboard API</h4>
                  <div className="space-y-1 text-sm">
                    <div>✅ Chrome 66+</div>
                    <div>✅ Firefox 63+</div>
                    <div>✅ Safari 13.1+</div>
                    <div>✅ Edge 79+</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Fallback Support</h4>
                  <div className="space-y-1 text-sm">
                    <div>✅ All browsers with document.execCommand</div>
                    <div>✅ Non-secure contexts (HTTP)</div>
                    <div>✅ Older browser versions</div>
                    <div>⚠️ User interaction required</div>
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
