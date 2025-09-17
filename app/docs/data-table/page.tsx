"use client"

import { DataTable } from "@/components/Data/DataTable"
import { CodeBlock } from "@/components/internal/ui/code-block"
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
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { DocsPage, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"

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
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "example", title: "Example" },
    { id: "props", title: "Props" },
  ]

  const propsRows: PropsTableRow[] = [
    {
      prop: "columns",
      type: "ColumnDef<TData, TValue>[]",
      description: "Column definitions passed to @tanstack/react-table.",
      required: true,
    },
    {
      prop: "data",
      type: "TData[]",
      description: "Array of records rendered in each row.",
      required: true,
    },
    {
      prop: "onRowClick",
      type: "(row: TData) => void",
      description: "Optional callback fired when a row is clicked.",
    },
    {
      prop: "singleAction",
      type: "boolean",
      defaultValue: "false",
      description: "Enables focus/keyboard handling for selectable rows.",
    },
    {
      prop: "pageSize",
      type: "number",
      defaultValue: "25",
      description: "Rows to render per page when pagination is enabled.",
    },
    {
      prop: "pageIndex",
      type: "number",
      defaultValue: "1",
      description: "Current page index (1-based) when controlling pagination.",
    },
    {
      prop: "totalCount",
      type: "number",
      defaultValue: "0",
      description: "Total records used to calculate page counts.",
    },
    {
      prop: "onPaginationChange",
      type: "(pagination: PaginationArg) => void",
      description: "Callback invoked when the user changes pages.",
    },
    {
      prop: "hidePagination",
      type: "boolean",
      defaultValue: "false",
      description: "Hides the footer controls for compact tables such as docs.",
    },
  ]

  const data = sampleData

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
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "DataTable",
              description:
                "A flexible data grid with sorting, filtering, and pagination built on @tanstack/react-table.",
              category: "Data · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("data-table")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Generate the table via CLI to include the required column helpers and styling tokens.
                </p>
              </div>
              <InstallationTabs componentName="data-table" />
            </section>

            <section id="usage" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="text-muted-foreground">
                  Define your column schema first, then pass both columns and data into the component.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CodeBlock language="tsx" filename="components/Data/DataTable.tsx">
{`import { DataTable } from "@/components/Data/DataTable"`}
                </CodeBlock>
                <CodeBlock language="tsx" filename="example.tsx">
{`<DataTable
  columns={columns}
  data={data}
  pageSize={10}
  onRowClick={row => console.log(row)}
/>`}
                </CodeBlock>
              </div>
            </section>

            <section id="example" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Example</h2>
                <p className="text-muted-foreground">
                  This live example demonstrates interactive sorting, pagination, and row selection hooks.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <DataTable
                  columns={sampleColumns}
                  data={data}
                  pageSize={5}
                  onRowClick={row => alert(`Clicked on ${row.name}`)}
                />
              </div>
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  The table exposes a thin wrapper around TanStack Table so you can adopt advanced patterns gradually.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
