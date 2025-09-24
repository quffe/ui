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
import { getExampleCode } from "@/lib/serverUtils"
import {
  DocsLayout,
  PropsTable,
  type TocItem,
  type PropsTableRow,
} from "@/components/internal/docs"

// Example components
import { BasicModalExample } from "@/examples/docs/modal/basic-modal"
import { ConfirmationModalExample } from "@/examples/docs/modal/confirmation-modal"
import { LargeModalExample } from "@/examples/docs/modal/large-modal"

// Raw imports
const basicModalCode = getExampleCode("docs/modal/basic-modal.tsx")
const confirmationModalCode = getExampleCode("docs/modal/confirmation-modal.tsx")
const largeModalCode = getExampleCode("docs/modal/large-modal.tsx")

export default async function ModalDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "props", title: "Props" },
    { id: "features", title: "Features" },
    { id: "accessibility", title: "Accessibility" },
    { id: "guidelines", title: "Design guidelines" },
  ]

  const propsRows: PropsTableRow[] = [
    {
      prop: "open",
      type: "boolean",
      description: "Controls whether the modal is rendered.",
      required: true,
    },
    {
      prop: "onClose",
      type: "() => void",
      description: "Callback fired when the modal requests to close.",
      required: true,
    },
    {
      prop: "title",
      type: "string",
      description: "Optional heading rendered inside the modal shell.",
    },
    {
      prop: "description",
      type: "string",
      description: "Supplemental text displayed under the title.",
    },
    {
      prop: "size",
      type: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full'",
      defaultValue: "'md'",
      description: "Controls the width of the modal dialog.",
    },
    {
      prop: "position",
      type: "'center' | 'top' | 'bottom'",
      defaultValue: "'center'",
      description: "Positions the modal within the viewport.",
    },
    {
      prop: "showCloseButton",
      type: "boolean",
      defaultValue: "true",
      description: "Toggles the top-right close button.",
    },
    {
      prop: "closeOnOutsideClick",
      type: "boolean",
      defaultValue: "true",
      description: "Dismisses the modal when the backdrop is clicked.",
    },
    {
      prop: "closeOnEsc",
      type: "boolean",
      defaultValue: "true",
      description: "Allows users to dismiss the modal with the Escape key.",
    },
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
              <BreadcrumbPage>Modal</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsLayout
            toc={toc}
            header={{
              title: "Modal",
              description:
                "A flexible dialog overlay with focus management, scroll locking, and configurable placement.",
              category: "Overlay · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("modal")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Generate the modal via CLI to wire up the required portal, overlay, and
                  animations.
                </p>
              </div>
              <InstallationTabs componentName="modal" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Start with the basic modal and customise its trigger, size, and actions for your
                  product flow.
                </p>
              </div>
              <PreviewTabs
                preview={<BasicModalExample />}
                code={basicModalCode}
                title="Basic modal"
              />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Explore variations for confirmations, larger layouts, and alternative placements.
                </p>
              </div>
              <div className="space-y-8">
                <PreviewTabs
                  preview={<ConfirmationModalExample />}
                  code={confirmationModalCode}
                  title="Confirmation modal"
                />
                <PreviewTabs
                  preview={<LargeModalExample />}
                  code={largeModalCode}
                  title="Large modal"
                />
              </div>
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  These props configure the modal shell; pass additional content through{" "}
                  <code className="font-mono text-xs">children</code>.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <p className="text-muted-foreground">
                  Opinionated defaults keep the modal accessible and performant out of the box.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Multiple width presets spanning <code className="font-mono text-xs">sm</code>{" "}
                  through <code className="font-mono text-xs">full</code>.
                </li>
                <li>Optional top and bottom anchored layouts for toast-style dialogs.</li>
                <li>Focus trap with initial focus management and ESC dismissal.</li>
                <li>Body scroll lock and inert background while open.</li>
                <li>
                  Accessible labelling via{" "}
                  <code className="font-mono text-xs">aria-labelledby</code> and{" "}
                  <code className="font-mono text-xs">aria-describedby</code>.
                </li>
              </ul>
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  Modals interrupt the page flow, so communicate changes clearly.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Provide focusable controls inside the modal, starting with the primary action.
                </li>
                <li>
                  Map the modal title to <code className="font-mono text-xs">aria-labelledby</code>{" "}
                  and the description to <code className="font-mono text-xs">aria-describedby</code>
                  .
                </li>
                <li>
                  Avoid triggering the modal automatically—always let the user initiate the
                  interaction.
                </li>
              </ul>
            </section>

            <section id="guidelines" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Design guidelines</h2>
                <p className="text-muted-foreground">
                  Keep dialogs focused on a single decision and reduce cognitive load.
                </p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-l-4 border-l-emerald-500 bg-emerald-500/5 p-5">
                  <h3 className="text-sm font-semibold uppercase text-emerald-700">Do</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>Write concise headlines that describe the action being taken.</li>
                    <li>
                      Place primary actions on the right and destructive actions in a danger
                      variant.
                    </li>
                    <li>
                      Autosize content vertically to avoid scrollable inner regions when possible.
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-l-4 border-l-rose-500 bg-rose-500/5 p-5">
                  <h3 className="text-sm font-semibold uppercase text-rose-700">Don’t</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>Use modals for lengthy forms—switch to a dedicated page or drawer.</li>
                    <li>Nest multiple modals; use stepper flows or inline states instead.</li>
                    <li>Hide the dismiss action unless the modal is purely destructive.</li>
                  </ul>
                </div>
              </div>
            </section>
          </DocsLayout>
        </div>
      </div>
    </div>
  )
}
