"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import { Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react"

export function TableNavigationExample() {
  const mockData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Editor" },
  ]

  const [selectedRow, setSelectedRow] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState(mockData)
  const [editingId, setEditingId] = useState<number | null>(null)
  const itemsPerPage = 3

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const visibleData = data.slice(startIndex, startIndex + itemsPerPage)

  // Row navigation
  useKeyboardShortcut(
    {
      id: "next-row",
      keys: "down",
      description: "Select next row",
      category: "Table",
    },
    () => setSelectedRow(prev => Math.min(prev + 1, visibleData.length - 1))
  )

  useKeyboardShortcut(
    {
      id: "prev-row",
      keys: "up",
      description: "Select previous row",
      category: "Table",
    },
    () => setSelectedRow(prev => Math.max(prev - 1, 0))
  )

  // Page navigation
  useKeyboardShortcut(
    {
      id: "next-page",
      keys: "ctrl+right",
      description: "Next page",
      category: "Table",
    },
    () => {
      if (currentPage < totalPages) {
        setCurrentPage(prev => prev + 1)
        setSelectedRow(0)
      }
    }
  )

  useKeyboardShortcut(
    {
      id: "prev-page",
      keys: "ctrl+left",
      description: "Previous page",
      category: "Table",
    },
    () => {
      if (currentPage > 1) {
        setCurrentPage(prev => prev - 1)
        setSelectedRow(0)
      }
    }
  )

  // Row actions
  useKeyboardShortcut(
    {
      id: "edit-row",
      keys: "enter",
      description: "Edit selected row",
      category: "Table",
    },
    () => {
      const item = visibleData[selectedRow]
      if (item) {
        setEditingId(item.id)
        setTimeout(() => setEditingId(null), 2000)
      }
    }
  )

  useKeyboardShortcut(
    {
      id: "delete-row",
      keys: "delete",
      description: "Delete selected row",
      category: "Table",
    },
    () => {
      const item = visibleData[selectedRow]
      if (item) {
        setData(prev => prev.filter(d => d.id !== item.id))
        setSelectedRow(prev => Math.max(0, Math.min(prev, visibleData.length - 2)))
      }
    }
  )

  // First and last row
  useKeyboardShortcut(
    {
      id: "first-row",
      keys: "home",
      description: "Select first row",
      category: "Table",
    },
    () => setSelectedRow(0)
  )

  useKeyboardShortcut(
    {
      id: "last-row",
      keys: "end",
      description: "Select last row",
      category: "Table",
    },
    () => setSelectedRow(visibleData.length - 1)
  )

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">User Management Table</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Selected Row: {selectedRow + 1}</span>
          {editingId && <Badge variant="secondary">Editing ID: {editingId}</Badge>}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 text-sm font-medium">Name</th>
              <th className="text-left p-3 text-sm font-medium">Email</th>
              <th className="text-left p-3 text-sm font-medium">Role</th>
              <th className="text-left p-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-t transition-colors ${
                  index === selectedRow ? "bg-secondary/10 border-primary" : "hover:bg-muted/50"
                } ${editingId === item.id ? "bg-warn-soft/10 border-warn-soft/30" : ""}`}
              >
                <td className="p-3 text-sm">{item.name}</td>
                <td className="p-3 text-sm">{item.email}</td>
                <td className="p-3 text-sm">
                  <Badge variant="outline">{item.role}</Badge>
                </td>
                <td className="p-3 text-sm">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(item.id)
                        setTimeout(() => setEditingId(null), 2000)
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setData(prev => prev.filter(d => d.id !== item.id))
                        setSelectedRow(prev => Math.max(0, Math.min(prev, visibleData.length - 2)))
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(prev => prev - 1)
                setSelectedRow(0)
              }
            }}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(prev => prev + 1)
                setSelectedRow(0)
              }
            }}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
        <div className="font-medium mb-2">Table Navigation Shortcuts:</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">↑</kbd> /{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">↓</kbd> = Navigate rows
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">←</kbd> /{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">→</kbd> = Navigate pages
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Enter</kbd> = Edit row
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Delete</kbd> = Delete row
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Home</kbd> = First row
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">End</kbd> = Last row
          </div>
        </div>
      </div>
    </div>
  )
}
