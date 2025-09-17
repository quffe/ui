"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import type { ReactNode } from "react"

import { DataTable } from "@/components/Data/DataTable"
import { Badge } from "@/components/ui/badge"

export interface PropsTableRow {
  prop: string
  type: ReactNode
  defaultValue?: ReactNode | null
  description: ReactNode
  required?: boolean
}

interface PropsTableProps {
  rows: PropsTableRow[]
  labels?: {
    prop?: string
    type?: string
    defaultValue?: string
    description?: string
  }
}

export function PropsTable({ rows, labels }: PropsTableProps) {
  const columns = React.useMemo<ColumnDef<PropsTableRow>[]>(
    () => [
      {
        accessorKey: "prop",
        header: labels?.prop ?? "Prop",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <code className="font-mono text-sm text-foreground">{row.original.prop}</code>
            {row.original.required ? (
              <Badge
                variant="outline"
                className="text-xs uppercase border-destructive/40 bg-destructive/10 text-destructive"
              >
                Required
              </Badge>
            ) : null}
          </div>
        ),
      },
      {
        accessorKey: "type",
        header: labels?.type ?? "Type",
        cell: ({ row }) => {
          const value = row.original.type
          return typeof value === "string" ? (
            <code className="font-mono text-xs text-muted-foreground">{value}</code>
          ) : (
            <span className="text-xs text-muted-foreground">{value}</span>
          )
        },
      },
      {
        accessorKey: "defaultValue",
        header: labels?.defaultValue ?? "Default",
        cell: ({ row }) => {
          const value = row.original.defaultValue
          if (value === undefined || value === null || value === "") {
            return <span className="font-mono text-xs text-muted-foreground">—</span>
          }
          return typeof value === "string" ? (
            <code className="font-mono text-xs text-muted-foreground">{value}</code>
          ) : (
            <span className="text-xs text-muted-foreground">{value}</span>
          )
        },
      },
      {
        accessorKey: "description",
        header: labels?.description ?? "Description",
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground">{row.original.description}</div>
        ),
      },
    ],
    [labels]
  )

  return <DataTable columns={columns} data={rows} hidePagination pageSize={rows.length || 5} />
}
