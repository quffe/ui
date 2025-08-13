"use client"

import { DataTable } from "@/components/Data/DataTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
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
import { useState } from "react"

// Sample data for demonstration
const sampleData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator" },
]

// Sample columns configuration
const sampleColumns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
]

export default function DataTableDocs() {
  const [data] = useState(sampleData)

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
              <BreadcrumbPage>DataTable</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">DataTable</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A powerful, flexible data table component with sorting, filtering, and pagination
              support.
            </p>
            <Badge variant="secondary">Data Component</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the DataTable component using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="data-table" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <CodeBlock language="typescript">
                  {`import { DataTable } from "@/components/Data/DataTable"`}
                </CodeBlock>
              </div>

              <CodeBlock language="tsx">
                {`<DataTable
  columns={columns}
  data={data}
  pageSize={10}
  onRowClick={(row) => console.log(row)}
/>`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Example</CardTitle>
              <CardDescription>Basic data table with sample data</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={sampleColumns}
                data={data}
                pageSize={5}
                onRowClick={row => alert(`Clicked on ${row.name}`)}
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
                      <td className="p-2 font-mono">columns</td>
                      <td className="p-2">ColumnDef[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Table column definitions</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">data</td>
                      <td className="p-2">TData[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Table data array</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onRowClick</td>
                      <td className="p-2">(row: TData) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when row is clicked</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">pageSize</td>
                      <td className="p-2">number</td>
                      <td className="p-2">25</td>
                      <td className="p-2">Number of rows per page</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">totalCount</td>
                      <td className="p-2">number</td>
                      <td className="p-2">0</td>
                      <td className="p-2">Total number of records</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onPaginationChange</td>
                      <td className="p-2">(pagination) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Pagination change callback</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
