"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchButton({ className }: { className?: string }) {
  const onClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("command-palette:open"))
    }
  }
  return (
    <Button variant="outline" size="sm" onClick={onClick} className={className}>
      <Search className="h-4 w-4 mr-2" />
      <span className="hidden sm:inline">Search</span>
      <span className="ml-2 text-xs text-muted-foreground">⌘K</span>
    </Button>
  )
}
