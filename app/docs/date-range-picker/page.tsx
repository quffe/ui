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
import { DocsPage, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"

// Example components
import { BasicPickerExample } from "@/examples/docs/date-range-picker/basic-picker"
import { PrefilledPickerExample } from "@/examples/docs/date-range-picker/prefilled-picker"
import { RestrictedPickerExample } from "@/examples/docs/date-range-picker/restricted-picker"
import { DisabledPickerExample } from "@/examples/docs/date-range-picker/disabled-picker"

// Raw imports
const basicPickerCode = getExampleCode("docs/date-range-picker/basic-picker.tsx")
const prefilledPickerCode = getExampleCode("docs/date-range-picker/prefilled-picker.tsx")
const restrictedPickerCode = getExampleCode("docs/date-range-picker/restricted-picker.tsx")
const disabledPickerCode = getExampleCode("docs/date-range-picker/disabled-picker.tsx")

export default async function DateRangePickerDocs() {
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
      type: "DateRange | undefined",
      defaultValue: "undefined",
      description: "Controlled value representing the current start and end date.",
    },
    {
      prop: "onChange",
      type: "(range: DateRange | undefined) => void",
      description: "Fires whenever the user updates the range selection.",
    },
    {
      prop: "placeholder",
      type: "string",
      defaultValue: "Pick a date range",
      description: "Helper text displayed when no range is selected.",
    },
    {
      prop: "minDate",
      type: "Date",
      description: "Disables dates that fall before the provided boundary.",
    },
    {
      prop: "maxDate",
      type: "Date",
      description: "Disables dates that fall after the provided boundary.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Toggles the component into a non-interactive state.",
    },
    {
      prop: "className",
      type: "string",
      description: "Additional utility classes applied to the container.",
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
              <BreadcrumbPage>DateRangePicker</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "DateRangePicker",
              description:
                "A comprehensive date range picker with presets, dual calendars, and flexible selection modes.",
              category: "Form · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("date-range-picker")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Generate the picker via CLI to ensure date-fns helpers and styles are copied over.
                </p>
              </div>
              <InstallationTabs componentName="date-range-picker" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Start from the basic picker then layer presets, restrictions, or custom footers.
                </p>
              </div>
              <PreviewTabs
                preview={<BasicPickerExample />}
                code={basicPickerCode}
                title="Basic Date Range Picker"
              />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Explore preset ranges, min/max restrictions, and fully disabled states.
                </p>
              </div>
              <PreviewTabs
                preview={<PrefilledPickerExample />}
                code={prefilledPickerCode}
                title="Pre-filled Date Range"
              />
              <PreviewTabs
                preview={<RestrictedPickerExample />}
                code={restrictedPickerCode}
                title="With Date Restrictions"
              />
              <PreviewTabs
                preview={<DisabledPickerExample />}
                code={disabledPickerCode}
                title="Disabled State"
              />
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  These props cover the most common configuration points; additional calendar props can be passed through.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
                <p className="text-muted-foreground">
                  Built for product workflows that need clarity around ranges and availability.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Preset date ranges (Today, Yesterday, Last Week, This Month, etc.).</li>
                <li>Dual calendar layout for fast start/end selection.</li>
                <li>Keyboard navigation across inputs and calendar grid.</li>
                <li>Guardrails via <code className="font-mono text-xs">minDate</code> and <code className="font-mono text-xs">maxDate</code>.</li>
                <li>Guided two-step selection with instant range validation.</li>
                <li>Responsive design that adapts to narrow viewports.</li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
