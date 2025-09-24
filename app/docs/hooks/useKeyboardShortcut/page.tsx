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
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import {
  HookDocsPage,
  PropsTable,
  type TocItem,
  type PropsTableRow,
} from "@/components/internal/docs"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { KeyboardShortcutProvider } from "@/hooks/useKeyboardShortcut"
import { KeyboardShortcutOverlay } from "@/components/internal/ui/keyboard-shortcut-tooltip"
import { getExampleCode } from "@/lib/serverUtils"

import { BasicUsageExample } from "@/examples/docs/hooks/useKeyboardShortcut/basic-usage"
import { ElementShortcutsExample } from "@/examples/docs/hooks/useKeyboardShortcut/element-shortcuts"
import { LiveDemoExample } from "@/examples/docs/hooks/useKeyboardShortcut/live-demo"
import { GlobalShortcutsExample } from "@/examples/docs/hooks/useKeyboardShortcut/global-shortcuts"
import { FormNavigationExample } from "@/examples/docs/hooks/useKeyboardShortcut/form-navigation"
import { ModalShortcutsExample } from "@/examples/docs/hooks/useKeyboardShortcut/modal-shortcuts"
import { TableNavigationExample } from "@/examples/docs/hooks/useKeyboardShortcut/table-navigation"
import { TextEditorExample } from "@/examples/docs/hooks/useKeyboardShortcut/text-editor"

const basicUsageCode = getExampleCode("docs/hooks/useKeyboardShortcut/basic-usage.tsx")
const elementShortcutsCode = getExampleCode("docs/hooks/useKeyboardShortcut/element-shortcuts.tsx")
const liveDemoCode = getExampleCode("docs/hooks/useKeyboardShortcut/live-demo.tsx")
const globalShortcutsCode = getExampleCode("docs/hooks/useKeyboardShortcut/global-shortcuts.tsx")
const formNavigationCode = getExampleCode("docs/hooks/useKeyboardShortcut/form-navigation.tsx")
const modalShortcutsCode = getExampleCode("docs/hooks/useKeyboardShortcut/modal-shortcuts.tsx")
const tableNavigationCode = getExampleCode("docs/hooks/useKeyboardShortcut/table-navigation.tsx")
const textEditorCode = getExampleCode("docs/hooks/useKeyboardShortcut/text-editor.tsx")

const parameters: PropsTableRow[] = [
  {
    prop: "shortcut",
    type: "KeyboardShortcut",
    description: "Configuration describing the key combination and metadata.",
    required: true,
  },
  {
    prop: "callback",
    type: "(event: KeyboardEvent) => void",
    description: "Handler invoked when the shortcut matches.",
    required: true,
  },
  {
    prop: "options",
    type: "ShortcutOptions",
    description: "Optional controls such as enabled state, preventDefault, and element scope.",
  },
]

const shortcutInterfaceRows: PropsTableRow[] = [
  { prop: "id", type: "string", description: "Unique identifier for the shortcut." },
  {
    prop: "keys",
    type: "string",
    description: "Key combination in human readable format (e.g. 'cmd+k').",
    required: true,
  },
  { prop: "description", type: "string", description: "Text shown in the overlay tooltip." },
  { prop: "group", type: "string", description: "Optional group label for overlay sections." },
]

const optionsRows: PropsTableRow[] = [
  {
    prop: "enabled",
    type: "boolean",
    defaultValue: "true",
    description: "Toggle the shortcut without un-registering it.",
  },
  {
    prop: "preventDefault",
    type: "boolean",
    defaultValue: "true",
    description: "Whether to call event.preventDefault when triggered.",
  },
  {
    prop: "element",
    type: "HTMLElement | null",
    description: "Restrict listening to a specific DOM element instead of window.",
  },
  {
    prop: "showInOverlay",
    type: "boolean",
    defaultValue: "true",
    description: "Include shortcut in the keyboard overlay.",
  },
]

export default async function UseKeyboardShortcutDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "api-parameters", title: "useKeyboardShortcut" },
    { id: "keyboard-shortcut", title: "KeyboardShortcut" },
    { id: "shortcut-options", title: "ShortcutOptions" },
    { id: "features", title: "Features" },
  ]

  return (
    <KeyboardShortcutProvider>
      <KeyboardShortcutOverlay />
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
                <BreadcrumbPage>useKeyboardShortcut</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 p-4">
          <div className="container mx-auto max-w-5xl">
            <HookDocsPage
              toc={toc}
              header={{
                title: "useKeyboardShortcut",
                description:
                  "Register global or scoped keyboard shortcuts with tooltip overlays and accessibility in mind.",
                category: "Navigation · Hook",
                status: "Stable",
                actions: (
                  <CopyableCodeBadge text={config.getNamespacePath("useKeyboardShortcut")} />
                ),
              }}
              parameters={parameters}
            >
              <section id="installation" className="scroll-mt-24 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                  <p className="text-muted-foreground">
                    Install via CLI to copy the hook, overlay provider, and tooltip components.
                  </p>
                </div>
                <InstallationTabs componentName="useKeyboardShortcut" />
              </section>

              <section id="usage" className="scroll-mt-24 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                  <p className="text-muted-foreground">
                    Wrap your app in{" "}
                    <code className="font-mono text-xs">KeyboardShortcutProvider</code> once, then
                    register shortcuts inside components.
                  </p>
                </div>
                <CodeBlock language="tsx" filename="usage.tsx">
                  {`useKeyboardShortcut(
  { id: "focus-search", keys: "cmd+k", description: "Focus search" },
  event => {
    event.preventDefault()
    searchInputRef.current?.focus()
  }
)`}
                </CodeBlock>
              </section>

              <section id="examples" className="scroll-mt-24 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                  <p className="text-muted-foreground">
                    Global shortcuts, scoped elements, and productivity patterns.
                  </p>
                </div>
                <PreviewTabs
                  title="Basic global shortcuts"
                  preview={<BasicUsageExample />}
                  code={basicUsageCode}
                />
                <PreviewTabs
                  title="Element-based shortcuts"
                  preview={<ElementShortcutsExample />}
                  code={elementShortcutsCode}
                />
                <PreviewTabs
                  title="Interactive live demo"
                  preview={<LiveDemoExample />}
                  code={liveDemoCode}
                />
                <PreviewTabs
                  title="Application shortcuts"
                  preview={<GlobalShortcutsExample />}
                  code={globalShortcutsCode}
                />
                <PreviewTabs
                  title="Form navigation"
                  preview={<FormNavigationExample />}
                  code={formNavigationCode}
                />
                <PreviewTabs
                  title="Modal controls"
                  preview={<ModalShortcutsExample />}
                  code={modalShortcutsCode}
                />
                <PreviewTabs
                  title="Table navigation"
                  preview={<TableNavigationExample />}
                  code={tableNavigationCode}
                />
                <PreviewTabs
                  title="Text editor commands"
                  preview={<TextEditorExample />}
                  code={textEditorCode}
                />
              </section>

              <section id="keyboard-shortcut" className="scroll-mt-24 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">KeyboardShortcut</h2>
                  <p className="text-muted-foreground">
                    Define the key combination and metadata displayed in overlays.
                  </p>
                </div>
                <PropsTable rows={shortcutInterfaceRows} labels={{ prop: "Property" }} />
              </section>

              <section id="shortcut-options" className="scroll-mt-24 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">ShortcutOptions</h2>
                  <p className="text-muted-foreground">
                    Configure runtime behaviour without un-registering the shortcut.
                  </p>
                </div>
                <PropsTable rows={optionsRows} labels={{ prop: "Option" }} />
              </section>

              <section id="features" className="scroll-mt-24 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                  <p className="text-muted-foreground">
                    Why this shortcut system scales across complex apps.
                  </p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>Global provider manages keymaps and exposes an overlay.</li>
                  <li>Scope shortcuts to specific elements when needed.</li>
                  <li>Optional tooltip overlay renders grouped shortcuts for discoverability.</li>
                  <li>SSR-safe registration with automatic cleanup on unmount.</li>
                </ul>
              </section>
            </HookDocsPage>
          </div>
        </div>
      </div>
    </KeyboardShortcutProvider>
  )
}
