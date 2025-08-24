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
import { PreviewTabs } from "@/components/ui/preview-tabs"
import { getExampleCode } from "@/lib/serverUtils"

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
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">DateRangePicker</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A comprehensive date range picker with preset options, dual calendar view, and
              flexible selection modes.
            </p>
            <Badge variant="secondary">Input Component</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the component using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="date-range-picker" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <PreviewTabs
                preview={<BasicPickerExample />}
                code={basicPickerCode}
                title="Basic Date Range Picker"
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
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
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Props</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Prop</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Default</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-mono">value</td>
                      <td className="p-2">DateRange | undefined</td>
                      <td className="p-2">undefined</td>
                      <td className="p-2">Selected date range</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onChange</td>
                      <td className="p-2">(range: DateRange | undefined) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Date range change callback</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">placeholder</td>
                      <td className="p-2">string</td>
                      <td className="p-2">&quot;Pick a date range&quot;</td>
                      <td className="p-2">Placeholder text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">minDate</td>
                      <td className="p-2">Date</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Minimum selectable date</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">maxDate</td>
                      <td className="p-2">Date</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Maximum selectable date</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">disabled</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether picker is disabled</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">className</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Additional CSS classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Preset date ranges (Today, Yesterday, Last Week, This Month, etc.)</li>
                <li>Dual calendar view for easy range selection</li>
                <li>Keyboard navigation support</li>
                <li>Date restrictions with min/max dates</li>
                <li>Two-step selection process (from date, then to date)</li>
                <li>Automatic range validation</li>
                <li>Responsive design</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
