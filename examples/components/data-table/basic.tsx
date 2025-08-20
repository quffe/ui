import { DataTable } from "@/components/Data/DataTable"

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-01-14",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
    lastLogin: "2024-01-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2024-01-16",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-01-13",
  },
]

const columns = [
  { accessorKey: "name", header: "Name", enableSorting: true },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role", enableSorting: true },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "lastLogin", header: "Last Login", enableSorting: true },
]

export function Example() {
  return (
    <DataTable
      data={data}
      columns={columns}
      onRowClick={row => console.log("Row clicked:", row)}
      singleAction={true}
      pageSize={3}
      pageIndex={1}
      totalCount={5}
      onPaginationChange={pagination => console.log("Pagination changed:", pagination)}
    />
  )
}
