'use client'

import { DateRangePicker } from "@/components/Input/DateRangePicker"
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
import { useState } from "react"
import type { DateRange } from "react-day-picker"

export default function DateRangePickerDocs() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [reportRange, setReportRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  })

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
              A comprehensive date range picker with preset options, dual calendar view, and flexible selection modes.
            </p>
            <Badge variant="secondary">Input Component</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Import the DateRangePicker component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm">import {`{ DateRangePicker }`} from "@/components/Input"</code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import { DateRangePicker } from "@/components/Input/DateRangePicker"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  placeholder="Select date range"
/>`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Basic Date Range Picker</h3>
                <DateRangePicker
                  value={dateRange}
                  onChange={setDateRange}
                  placeholder="Pick a date range"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {dateRange?.from?.toDateString() || 'None'} - {dateRange?.to?.toDateString() || 'None'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Report Date Range (Pre-filled)</h3>
                <DateRangePicker
                  value={reportRange}
                  onChange={setReportRange}
                  placeholder="Report period"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {reportRange?.from?.toDateString() || 'None'} - {reportRange?.to?.toDateString() || 'None'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">With Date Restrictions</h3>
                <DateRangePicker
                  value={undefined}
                  onChange={() => {}}
                  placeholder="Future dates only"
                  minDate={new Date()}
                  maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Disabled State</h3>
                <DateRangePicker
                  value={dateRange}
                  onChange={setDateRange}
                  placeholder="Disabled picker"
                  disabled={true}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Props</CardTitle>
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
                      <td className="p-2">(range: DateRange | undefined) => void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Date range change callback</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">placeholder</td>
                      <td className="p-2">string</td>
                      <td className="p-2">"Pick a date range"</td>
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
              <CardTitle>Features</CardTitle>
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