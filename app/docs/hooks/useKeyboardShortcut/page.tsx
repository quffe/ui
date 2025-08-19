"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { CodeBlock } from "@/components/ui/code-block"
import { useState } from "react"
import {
  useKeyboardShortcut,
  useKeyboardShortcutElement,
  KeyboardShortcutProvider,
} from "@/hooks/useKeyboardShortcut"
import {
  KeyboardShortcutOverlay,
  KeyboardShortcutHelp,
} from "@/components/ui/keyboard-shortcut-tooltip"

// Demo components
function DemoCounter() {
  const [count, setCount] = useState(0)
  const [showHelp, setShowHelp] = useState(false)

  // Global shortcuts
  useKeyboardShortcut(
    {
      id: "increment-counter",
      keys: "ctrl+plus",
      description: "Increment counter",
      category: "Counter",
    },
    () => setCount(prev => prev + 1)
  )

  useKeyboardShortcut(
    {
      id: "decrement-counter",
      keys: "ctrl+minus",
      description: "Decrement counter",
      category: "Counter",
    },
    () => setCount(prev => prev - 1)
  )

  useKeyboardShortcut(
    {
      id: "reset-counter",
      keys: "ctrl+0",
      description: "Reset counter to zero",
      category: "Counter",
    },
    () => setCount(0)
  )

  // Element-based shortcuts
  const incrementRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "increment-btn",
      keys: "i",
      description: "Increment counter (button)",
      category: "Counter",
    },
    () => setCount(prev => prev + 1)
  )

  const decrementRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "decrement-btn",
      keys: "d",
      description: "Decrement counter (button)",
      category: "Counter",
    },
    () => setCount(prev => prev - 1)
  )

  const resetRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "reset-btn",
      keys: "r",
      description: "Reset counter (button)",
      category: "Counter",
    },
    () => setCount(0)
  )

  const helpRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "show-help",
      keys: "h",
      description: "Show keyboard shortcuts help",
      category: "Help",
    },
    () => setShowHelp(true)
  )

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold mb-2">Counter: {count}</div>
        <div className="text-sm text-muted-foreground mb-4">
          Try the keyboard shortcuts! Press Shift+? to see all shortcuts.
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <Button ref={incrementRef} onClick={() => setCount(prev => prev + 1)}>
          Increment (I)
        </Button>
        <Button ref={decrementRef} onClick={() => setCount(prev => prev - 1)} variant="outline">
          Decrement (D)
        </Button>
        <Button ref={resetRef} onClick={() => setCount(0)} variant="destructive">
          Reset (R)
        </Button>
        <Button ref={helpRef} onClick={() => setShowHelp(true)} variant="secondary">
          Help (H)
        </Button>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">+</kbd> = Increment
        </div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">-</kbd> = Decrement
        </div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">0</kbd> = Reset
        </div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">I</kbd> /{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">D</kbd> /{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">R</kbd> /{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">H</kbd> = Button shortcuts
        </div>
      </div>

      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <KeyboardShortcutHelp onClose={() => setShowHelp(false)} />
        </div>
      )}
    </div>
  )
}

export default function UseKeyboardShortcutDocs() {
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
                <CardTitle className="text-2xl font-bold">Setup</CardTitle>
                <CardDescription>Wrap your app with the KeyboardShortcutProvider</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="tsx">
                  {`import { KeyboardShortcutProvider } from "@/hooks/useKeyboardShortcut"
import { KeyboardShortcutOverlay } from "@/components/ui/keyboard-shortcut-tooltip"

function App() {
  return (
    <KeyboardShortcutProvider>
      <YourAppContent />
      <KeyboardShortcutOverlay />
    </KeyboardShortcutProvider>
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
                <div className="mb-4">
                  <CodeBlock language="typescript">
                    {`import { 
  useKeyboardShortcut, 
  useKeyboardShortcutElement,
  useKeyboardShortcutContext 
} from "@/hooks/useKeyboardShortcut"`}
                  </CodeBlock>
                </div>

                <CodeBlock language="tsx">
                  {`// Basic global shortcut
function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)

  useKeyboardShortcut(
    {
      id: 'open-search',
      keys: 'ctrl+k',
      description: 'Open search modal',
      category: 'Navigation'
    },
    () => setIsOpen(true)
  )

  return isOpen ? <Modal>Search content</Modal> : null
}

// Element-based shortcut with tooltip
function NavigationButton() {
  const router = useRouter()
  
  const buttonRef = useKeyboardShortcutElement(
    {
      id: 'nav-home',
      keys: 'g h',
      description: 'Go to home page',
      category: 'Navigation'
    },
    () => router.push('/')
  )

  return <button ref={buttonRef}>Home</button>
}`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Live Demo</CardTitle>
                <CardDescription>
                  Interactive example with global and element-based shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DemoCounter />
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Global Application Shortcuts</h3>
                  <CodeBlock language="tsx">
                    {`function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  // Global search
  useKeyboardShortcut(
    {
      id: 'global-search',
      keys: 'ctrl+k',
      description: 'Open global search',
      category: 'Navigation'
    },
    () => setSearchOpen(true)
  )

  // Toggle sidebar
  useKeyboardShortcut(
    {
      id: 'toggle-sidebar',
      keys: 'ctrl+b',
      description: 'Toggle sidebar',
      category: 'Layout'
    },
    () => setSidebarOpen(prev => !prev)
  )

  // Quick navigation
  useKeyboardShortcut(
    {
      id: 'go-home',
      keys: 'g h',
      description: 'Go to home page',
      category: 'Navigation'
    },
    () => router.push('/')
  )

  useKeyboardShortcut(
    {
      id: 'go-settings',
      keys: 'g s',
      description: 'Go to settings',
      category: 'Navigation'
    },
    () => router.push('/settings')
  )

  return (
    <div>
      <Sidebar open={sidebarOpen} />
      <MainContent />
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  )
}`}
                  </CodeBlock>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Form Navigation</h3>
                  <CodeBlock language="tsx">
                    {`function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Quick field focus shortcuts
  const nameRef = useKeyboardShortcutElement(
    {
      id: 'focus-name',
      keys: 'alt+n',
      description: 'Focus name field',
      category: 'Form'
    },
    () => nameRef.current?.focus()
  )

  const emailRef = useKeyboardShortcutElement(
    {
      id: 'focus-email',
      keys: 'alt+e',
      description: 'Focus email field',
      category: 'Form'
    },
    () => emailRef.current?.focus()
  )

  const messageRef = useKeyboardShortcutElement(
    {
      id: 'focus-message',
      keys: 'alt+m',
      description: 'Focus message field',
      category: 'Form'
    },
    () => messageRef.current?.focus()
  )

  // Submit form
  useKeyboardShortcut(
    {
      id: 'submit-form',
      keys: 'ctrl+enter',
      description: 'Submit form',
      category: 'Form'
    },
    () => handleSubmit()
  )

  return (
    <form>
      <input
        ref={nameRef}
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Name (Alt+N to focus)"
      />
      <input
        ref={emailRef}
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email (Alt+E to focus)"
      />
      <textarea
        ref={messageRef}
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        placeholder="Message (Alt+M to focus)"
      />
      <button type="submit">Submit (Ctrl+Enter)</button>
    </form>
  )
}`}
                  </CodeBlock>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Modal and Dialog Shortcuts</h3>
                  <CodeBlock language="tsx">
                    {`function SettingsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  // Close modal with Escape
  useKeyboardShortcut(
    {
      id: 'close-modal',
      keys: 'escape',
      description: 'Close modal',
      category: 'Modal'
    },
    () => onClose(),
    { enabled: isOpen }
  )

  // Save settings
  useKeyboardShortcut(
    {
      id: 'save-settings',
      keys: 'ctrl+s',
      description: 'Save settings',
      category: 'Modal'
    },
    () => saveSettings(),
    { enabled: isOpen }
  )

  // Tab navigation within modal
  const cancelRef = useKeyboardShortcutElement(
    {
      id: 'cancel-action',
      keys: 'alt+c',
      description: 'Cancel action',
      category: 'Modal'
    },
    () => onClose(),
    { enabled: isOpen }
  )

  const saveRef = useKeyboardShortcutElement(
    {
      id: 'save-action',
      keys: 'alt+s',
      description: 'Save action',
      category: 'Modal'
    },
    () => saveSettings(),
    { enabled: isOpen }
  )

  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Settings</h2>
        {/* Settings form */}
        <div className="modal-actions">
          <button ref={cancelRef} onClick={onClose}>
            Cancel (Alt+C)
          </button>
          <button ref={saveRef} onClick={saveSettings}>
            Save (Alt+S)
          </button>
        </div>
      </div>
    </div>
  )
}`}
                  </CodeBlock>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Data Table Navigation</h3>
                  <CodeBlock language="tsx">
                    {`function DataTable({ data }: { data: any[] }) {
  const [selectedRow, setSelectedRow] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Row navigation
  useKeyboardShortcut(
    {
      id: 'next-row',
      keys: 'down',
      description: 'Select next row',
      category: 'Table'
    },
    () => setSelectedRow(prev => Math.min(prev + 1, data.length - 1))
  )

  useKeyboardShortcut(
    {
      id: 'prev-row',
      keys: 'up',
      description: 'Select previous row',
      category: 'Table'
    },
    () => setSelectedRow(prev => Math.max(prev - 1, 0))
  )

  // Page navigation
  useKeyboardShortcut(
    {
      id: 'next-page',
      keys: 'ctrl+right',
      description: 'Next page',
      category: 'Table'
    },
    () => setCurrentPage(prev => prev + 1)
  )

  useKeyboardShortcut(
    {
      id: 'prev-page',
      keys: 'ctrl+left',
      description: 'Previous page',
      category: 'Table'
    },
    () => setCurrentPage(prev => Math.max(prev - 1, 1))
  )

  // Row actions
  useKeyboardShortcut(
    {
      id: 'edit-row',
      keys: 'enter',
      description: 'Edit selected row',
      category: 'Table'
    },
    () => editRow(selectedRow)
  )

  useKeyboardShortcut(
    {
      id: 'delete-row',
      keys: 'delete',
      description: 'Delete selected row',
      category: 'Table'
    },
    () => deleteRow(selectedRow)
  )

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={item.id}
              className={index === selectedRow ? 'selected' : ''}
            >
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => editRow(index)}>Edit</button>
                <button onClick={() => deleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="pagination">
        <span>Page {currentPage}</span>
      </div>
    </div>
  )
}`}
                  </CodeBlock>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Text Editor Shortcuts</h3>
                  <CodeBlock language="tsx">
                    {`function TextEditor() {
  const [content, setContent] = useState('')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  // Text formatting
  useKeyboardShortcut(
    {
      id: 'bold-text',
      keys: 'ctrl+b',
      description: 'Toggle bold text',
      category: 'Editor'
    },
    () => setIsBold(prev => !prev)
  )

  useKeyboardShortcut(
    {
      id: 'italic-text',
      keys: 'ctrl+i',
      description: 'Toggle italic text',
      category: 'Editor'
    },
    () => setIsItalic(prev => !prev)
  )

  // Save document
  useKeyboardShortcut(
    {
      id: 'save-document',
      keys: 'ctrl+s',
      description: 'Save document',
      category: 'Editor'
    },
    () => saveDocument(content)
  )

  // Find and replace
  useKeyboardShortcut(
    {
      id: 'find-text',
      keys: 'ctrl+f',
      description: 'Find in document',
      category: 'Editor'
    },
    () => openFindDialog()
  )

  useKeyboardShortcut(
    {
      id: 'replace-text',
      keys: 'ctrl+h',
      description: 'Find and replace',
      category: 'Editor'
    },
    () => openReplaceDialog()
  )

  // Undo/Redo
  useKeyboardShortcut(
    {
      id: 'undo',
      keys: 'ctrl+z',
      description: 'Undo last action',
      category: 'Editor'
    },
    () => undo()
  )

  useKeyboardShortcut(
    {
      id: 'redo',
      keys: 'ctrl+y',
      description: 'Redo last action',
      category: 'Editor'
    },
    () => redo()
  )

  return (
    <div className="editor">
      <div className="toolbar">
        <button 
          className={isBold ? 'active' : ''}
          onClick={() => setIsBold(!isBold)}
        >
          Bold (Ctrl+B)
        </button>
        <button 
          className={isItalic ? 'active' : ''}
          onClick={() => setIsItalic(!isItalic)}
        >
          Italic (Ctrl+I)
        </button>
        <button onClick={() => saveDocument(content)}>
          Save (Ctrl+S)
        </button>
      </div>
      
      <textarea
        ref={editorRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={cn(
          'editor-content',
          isBold && 'font-bold',
          isItalic && 'italic'
        )}
        placeholder="Start typing... Use Ctrl+B for bold, Ctrl+I for italic"
      />
    </div>
  )
}`}
                  </CodeBlock>
                </div>
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
                    <CodeBlock language="typescript">
                      {`interface KeyboardShortcut {
  id: string                    // Unique identifier
  keys: string                  // Key combination (e.g., &quot;ctrl+k&quot;, &quot;shift+?&quot;)
  description: string           // Human-readable description
  category?: string             // Group shortcuts by category
  enabled?: boolean             // Whether shortcut is active
  priority?: number             // Priority for conflicting shortcuts
}`}
                    </CodeBlock>

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
