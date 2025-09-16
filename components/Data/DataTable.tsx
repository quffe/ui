"use client"

import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
  type PaginationState,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

export type PaginationArg = { pageIndex: number; pageSize: number }
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
  singleAction?: boolean
  pageSize?: number
  pageIndex?: number
  totalCount?: number
  onPaginationChange?: (pagination: PaginationArg) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  singleAction = false,
  pageSize = 25,
  pageIndex = 1,
  totalCount = 0,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: Math.max(pageIndex - 1, 0),
    pageSize,
  })

  React.useEffect(() => {
    setPagination({ pageIndex: Math.max(pageIndex - 1, 0), pageSize })
  }, [pageIndex, pageSize])

  const renderPageNumbers = () => {
    if (!onPaginationChange) return null

    const totalPages = Math.ceil(totalCount / pageSize)
    const currentPage = Math.min(pageIndex, totalPages || 1)
    const pages = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            type="button"
            onClick={() => onPaginationChange({ pageIndex: i, pageSize })}
            disabled={currentPage === i}
            aria-label={`Go to page ${i}`}
            aria-current={currentPage === i ? "page" : undefined}
          >
            {i}
          </Button>
        )
      }
      return pages
    }

    pages.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        type="button"
        onClick={() => onPaginationChange({ pageIndex: 1, pageSize })}
        disabled={currentPage === 1}
        aria-label="Go to page 1"
        aria-current={currentPage === 1 ? "page" : undefined}
      >
        1
      </Button>
    )

    let start = Math.max(2, currentPage - 2)
    let end = Math.min(totalPages - 1, currentPage + 2)

    if (end - start < 4) {
      if (start === 2) {
        end = Math.min(totalPages - 1, start + 4)
      } else {
        start = Math.max(2, end - 4)
      }
    }

    if (start > 2) {
      pages.push(
        <span key="ellipsis-start" aria-hidden className="flex h-8 w-8 items-center justify-center">
          <MoreHorizontal className="h-4 w-4" />
        </span>
      )
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          type="button"
          onClick={() => onPaginationChange({ pageIndex: i, pageSize })}
          disabled={currentPage === i}
          aria-label={`Go to page ${i}`}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i}
        </Button>
      )
    }

    if (end < totalPages - 1) {
      pages.push(
        <span key="ellipsis-end" aria-hidden className="flex h-8 w-8 items-center justify-center">
          <MoreHorizontal className="h-4 w-4" />
        </span>
      )
    }

    if (totalPages > 1) {
      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          type="button"
          onClick={() => onPaginationChange({ pageIndex: totalPages, pageSize })}
          disabled={currentPage === totalPages}
          aria-label={`Go to page ${totalPages}`}
          aria-current={currentPage === totalPages ? "page" : undefined}
        >
          {totalPages}
        </Button>
      )
    }

    return pages
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: !!onPaginationChange,
    pageCount: onPaginationChange ? Math.ceil(totalCount / pageSize) : -1,
    onPaginationChange: onPaginationChange
      ? (updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
          const newPagination = typeof updater === "function" ? updater(pagination) : updater
          setPagination(newPagination)
          onPaginationChange({
            pageIndex: newPagination.pageIndex + 1,
            pageSize: newPagination.pageSize,
          })
        }
      : setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  })

  return (
    <div className="rounded-md border w-full">
      <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        header.id.includes("actions")
                          ? "sticky right-0 bg-background shadow-sm"
                          : ""
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => {
                const isSelectable = singleAction && onRowClick

                const handleRowKeyDown = isSelectable
                  ? (event: React.KeyboardEvent<HTMLTableRowElement>) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        onRowClick?.(row.original)
                      }
                    }
                  : undefined

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    data-clickable={isSelectable ? "true" : undefined}
                    className={cn(isSelectable ? "cursor-pointer hover:bg-muted/50" : "")}
                    onClick={isSelectable ? () => onRowClick?.(row.original) : undefined}
                    tabIndex={isSelectable ? 0 : undefined}
                    onKeyDown={handleRowKeyDown}
                    aria-label={
                      isSelectable ? `Select row ${row.index + 1}` : undefined
                    }
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className={
                          cell.column.id.includes("actions")
                          ? "sticky right-0 bg-background shadow-sm"
                          : ""
                      }
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      <div className="flex items-center justify-between space-x-2 p-4 border-t">
        <div className="text-sm text-muted-foreground">
          {onPaginationChange && totalCount > 0 && (
            <span aria-live="polite">
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
              {Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalCount)} of{" "}
              {totalCount} results
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            type="button"
            aria-label="Go to previous page"
            onClick={() => table.previousPage()}
            disabled={onPaginationChange ? pageIndex === 1 : !table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {onPaginationChange && renderPageNumbers()}
          <Button
            variant="outline"
            size="sm"
            type="button"
            aria-label="Go to next page"
            onClick={() => table.nextPage()}
            disabled={
              onPaginationChange ? pageIndex * pageSize >= totalCount : !table.getCanNextPage()
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
