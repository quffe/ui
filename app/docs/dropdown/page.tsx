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
import { DocsPage, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"
import { getExampleCode } from "@/lib/serverUtils"

import { BasicDropdownExample } from "@/examples/docs/dropdown/basic-dropdown"
import { SearchableDropdownExample } from "@/examples/docs/dropdown/searchable-dropdown"
import { DisabledStateExample } from "@/examples/docs/dropdown/disabled-state"

const basicDropdownCode = getExampleCode("docs/dropdown/basic-dropdown.tsx")
const searchableDropdownCode = getExampleCode("docs/dropdown/searchable-dropdown.tsx")
const disabledStateCode = getExampleCode("docs/dropdown/disabled-state.tsx")

export default async function DropdownDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "examples", title: "Examples" },
    { id: "props", title: "Props" },
    { id: "features", title: "Features" },
  ]

  const propsRows: PropsTableRow[] = [
    {
      prop: "value",
      type: "string",
      description: "Controlled value for the currently selected option.",
    },
    {
      prop: "options",
      type: "DropdownOption[]",
      description: "Collection of items rendered inside the list.",
      required: true,
    },
    {
      prop: "onChange",
      type: "(value: string) => void",
      description: "Invoked when the user confirms a new selection.",
    },
    {
      prop: "placeholder",
      type: "string",
      defaultValue: "Select an option...",
      description: "Helper copy when no option is selected.",
    },
    {
      prop: "searchable",
      type: "boolean",
      defaultValue: "false",
      description: "Enables the inline filter input for large datasets.",
    },
    {
      prop: "className",
      type: "string",
      description: "Utility classes merged onto the trigger element.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Prevents interaction and dims the trigger.",
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
              <BreadcrumbPage>Dropdown</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "Dropdown",
              description:
                "A searchable dropdown built from Command and Popover primitives with full keyboard support.",
              category: "Navigation · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("dropdown")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Scaffold the dropdown via CLI to copy the Command + Popover wiring.
                </p>
              </div>
              <InstallationTabs componentName="dropdown" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Pair the dropdown trigger with your data model and optional search input.
                </p>
              </div>
              <PreviewTabs
                preview={<BasicDropdownExample />}
                code={basicDropdownCode}
                title="Basic Dropdown"
              />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Showcase advanced filtering and disabled list states.
                </p>
              </div>
              <PreviewTabs
                preview={<SearchableDropdownExample />}
                code={searchableDropdownCode}
                title="Searchable Dropdown"
              />
              <PreviewTabs
                preview={<DisabledStateExample />}
                code={disabledStateCode}
                title="Disabled State"
              />
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  Compose the dropdown using these core props; additional trigger props are
                  forwarded.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <p className="text-muted-foreground">
                  Built for discoverability with strong accessibility defaults.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Command palette filtering with fuzzy matching.</li>
                <li>Popover positioning that adapts to viewport edges.</li>
                <li>Optional keyboard shortcuts for opening and navigation.</li>
                <li>Disabled options and empty state messaging out of the box.</li>
                <li>ARIA-compliant roles so screen readers announce context.</li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
