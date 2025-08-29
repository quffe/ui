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
import { KeyboardShortcutProvider } from "@/hooks/useKeyboardShortcut"
import { KeyboardShortcutOverlay } from "@/components/internal/ui/keyboard-shortcut-tooltip"
import { getExampleCode } from "@/lib/serverUtils"

// Example components
import { BasicUsageExample } from "@/examples/docs/hooks/useKeyboardShortcut/basic-usage"
import { ElementShortcutsExample } from "@/examples/docs/hooks/useKeyboardShortcut/element-shortcuts"
import { LiveDemoExample } from "@/examples/docs/hooks/useKeyboardShortcut/live-demo"
import { GlobalShortcutsExample } from "@/examples/docs/hooks/useKeyboardShortcut/global-shortcuts"
import { FormNavigationExample } from "@/examples/docs/hooks/useKeyboardShortcut/form-navigation"
import { ModalShortcutsExample } from "@/examples/docs/hooks/useKeyboardShortcut/modal-shortcuts"
import { TableNavigationExample } from "@/examples/docs/hooks/useKeyboardShortcut/table-navigation"
import { TextEditorExample } from "@/examples/docs/hooks/useKeyboardShortcut/text-editor"

// Raw imports
const basicUsageCode = getExampleCode("docs/hooks/useKeyboardShortcut/basic-usage.tsx")
const elementShortcutsCode = getExampleCode("docs/hooks/useKeyboardShortcut/element-shortcuts.tsx")
const liveDemoCode = getExampleCode("docs/hooks/useKeyboardShortcut/live-demo.tsx")
const globalShortcutsCode = getExampleCode("docs/hooks/useKeyboardShortcut/global-shortcuts.tsx")
const formNavigationCode = getExampleCode("docs/hooks/useKeyboardShortcut/form-navigation.tsx")
const modalShortcutsCode = getExampleCode("docs/hooks/useKeyboardShortcut/modal-shortcuts.tsx")
const tableNavigationCode = getExampleCode("docs/hooks/useKeyboardShortcut/table-navigation.tsx")
const textEditorCode = getExampleCode("docs/hooks/useKeyboardShortcut/text-editor.tsx")

export default async function UseKeyboardShortcutDocs() {
  return (
    <KeyboardShortcutProvider>
      <div className="flex flex-col">
        <KeyboardShortcutOverlay />

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
                <BreadcrumbPage>useKeyboardShortcut</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">useKeyboardShortcut</h1>
              <p className="text-lg text-muted-foreground mb-4">
                A comprehensive keyboard shortcut system with global keymap, tooltip overlay, and
                mouseless navigation for modern web applications.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary">React Hook</Badge>
                <Badge variant="outline">Accessibility</Badge>
                <Badge variant="outline">Navigation</Badge>
                <Badge variant="outline">Global State</Badge>
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
                <InstallationTabs componentName="useKeyboardShortcut" />
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Examples</CardTitle>
                <CardDescription>
                  Interactive examples demonstrating various keyboard shortcut patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <PreviewTabs
                  title="Basic Global Shortcuts"
                  preview={<BasicUsageExample />}
                  code={basicUsageCode}
                />

                <PreviewTabs
                  title="Element-Based Shortcuts"
                  preview={<ElementShortcutsExample />}
                  code={elementShortcutsCode}
                />

                <PreviewTabs
                  title="Interactive Live Demo"
                  preview={<LiveDemoExample />}
                  code={liveDemoCode}
                />

                <PreviewTabs
                  title="Global Application Shortcuts"
                  preview={<GlobalShortcutsExample />}
                  code={globalShortcutsCode}
                />

                <PreviewTabs
                  title="Form Navigation Shortcuts"
                  preview={<FormNavigationExample />}
                  code={formNavigationCode}
                />

                <PreviewTabs
                  title="Modal and Dialog Shortcuts"
                  preview={<ModalShortcutsExample />}
                  code={modalShortcutsCode}
                />

                <PreviewTabs
                  title="Data Table Navigation"
                  preview={<TableNavigationExample />}
                  code={tableNavigationCode}
                />

                <PreviewTabs
                  title="Text Editor Shortcuts"
                  preview={<TextEditorExample />}
                  code={textEditorCode}
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
                    <h3 className="font-semibold mb-3">useKeyboardShortcut</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Register a global keyboard shortcut with optional configuration.
                    </p>

                    <h4 className="font-medium mb-2">Parameters</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Parameter</th>
                            <th className="text-left p-2">Type</th>
                            <th className="text-left p-2">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-mono">shortcut</td>
                            <td className="p-2">KeyboardShortcut</td>
                            <td className="p-2">Shortcut configuration object</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-mono">callback</td>
                            <td className="p-2">(event: KeyboardEvent) =&gt; void</td>
                            <td className="p-2">Function to execute when shortcut is triggered</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-mono">options</td>
                            <td className="p-2">ShortcutOptions</td>
                            <td className="p-2">
                              Optional configuration (enabled, preventDefault, etc.)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className="font-medium mb-2 mt-4">KeyboardShortcut Interface</h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`interface KeyboardShortcut {
  id: string                    // Unique identifier
  keys: string                  // Key combination (e.g., "ctrl+k", "shift+?")
  description: string           // Human-readable description
  category?: string             // Group shortcuts by category
  enabled?: boolean             // Whether shortcut is active
  priority?: number             // Priority for conflicting shortcuts
}`}</code>
                    </pre>

                    <h4 className="font-medium mb-2 mt-4">Returns</h4>
                    <div className="text-sm">void</div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">useKeyboardShortcutElement</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Register a keyboard shortcut and associate it with a DOM element for tooltip
                      display.
                    </p>

                    <h4 className="font-medium mb-2">Parameters</h4>
                    <div className="text-sm">Same as useKeyboardShortcut</div>

                    <h4 className="font-medium mb-2 mt-4">Returns</h4>
                    <div className="text-sm">
                      React.RefObject&lt;T&gt; - Ref to attach to the target element
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Key Combination Format</h3>
                    <div className="space-y-2 text-sm">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Modifier Keys</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            <code>ctrl</code> - Control key (⌘ on Mac)
                          </li>
                          <li>
                            <code>alt</code> - Alt key (⌥ on Mac)
                          </li>
                          <li>
                            <code>shift</code> - Shift key
                          </li>
                        </ul>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Special Keys</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            <code>space</code> - Space bar
                          </li>
                          <li>
                            <code>enter</code> - Enter key
                          </li>
                          <li>
                            <code>escape</code> - Escape key
                          </li>
                          <li>
                            <code>tab</code> - Tab key
                          </li>
                          <li>
                            <code>up</code>, <code>down</code>, <code>left</code>,{" "}
                            <code>right</code> - Arrow keys
                          </li>
                          <li>
                            <code>f1</code>, <code>f2</code>, etc. - Function keys
                          </li>
                        </ul>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Examples</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            <code>&quot;ctrl+k&quot;</code> - Control + K
                          </li>
                          <li>
                            <code>&quot;shift+?&quot;</code> - Shift + ?
                          </li>
                          <li>
                            <code>&quot;alt+enter&quot;</code> - Alt + Enter
                          </li>
                          <li>
                            <code>&quot;ctrl+shift+d&quot;</code> - Control + Shift + D
                          </li>
                        </ul>
                      </div>
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
                  <li>Global keyboard shortcut registration and management</li>
                  <li>Element-based shortcuts with visual tooltips</li>
                  <li>Automatic tooltip overlay system (Shift+? to toggle)</li>
                  <li>Shortcut categorization and help system</li>
                  <li>Priority-based conflict resolution</li>
                  <li>Enable/disable shortcuts dynamically</li>
                  <li>TypeScript support with full type safety</li>
                  <li>SSR-safe implementation</li>
                  <li>Comprehensive key combination support</li>
                  <li>Accessibility-focused design</li>
                  <li>Memory efficient with automatic cleanup</li>
                  <li>React Strict Mode compatible</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
                <CardDescription>Common scenarios where this hook system excels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Application Navigation</h4>
                    <div className="space-y-1 text-sm">
                      <div>• Global search (Ctrl+K)</div>
                      <div>• Page navigation (G+H for home)</div>
                      <div>• Modal/dialog controls</div>
                      <div>• Sidebar and menu toggles</div>
                      <div>• Quick actions and commands</div>
                      <div>• Breadcrumb navigation</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Content Management</h4>
                    <div className="space-y-1 text-sm">
                      <div>• Text editor shortcuts</div>
                      <div>• Data table navigation</div>
                      <div>• Form field focusing</div>
                      <div>• CRUD operation shortcuts</div>
                      <div>• Bulk action triggers</div>
                      <div>• Filter and sort controls</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Accessibility</h4>
                    <div className="space-y-1 text-sm">
                      <div>• Mouseless navigation</div>
                      <div>• Screen reader compatibility</div>
                      <div>• Power user workflows</div>
                      <div>• Keyboard-only operation</div>
                      <div>• Focus management</div>
                      <div>• Help and discovery systems</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Developer Tools</h4>
                    <div className="space-y-1 text-sm">
                      <div>• IDE-like shortcuts</div>
                      <div>• Debug panel toggles</div>
                      <div>• Console commands</div>
                      <div>• Code formatting shortcuts</div>
                      <div>• File browser navigation</div>
                      <div>• Terminal integration</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </KeyboardShortcutProvider>
  )
}
