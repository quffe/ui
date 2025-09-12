"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Search } from "lucide-react"
import { components, hooks } from "@/components/internal/layout/nav-data"

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    const onOpenEvent = () => setOpen(true)
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("command-palette:open", onOpenEvent as EventListener)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0 overflow-hidden bg-popover">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <Command className="w-full">
          <div className="flex items-center gap-2 px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <CommandInput placeholder="Search docs, components, hooks…" />
          </div>
          <CommandList className="max-h-[60vh] overflow-y-auto">
            <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
              No results found.
            </CommandEmpty>
            <CommandGroup heading="Components">
              {components.map(item => (
                <CommandItem
                  key={item.url}
                  value={`${item.title} ${item.description}`}
                  onSelect={() => {
                    router.push(item.url)
                    setOpen(false)
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Hooks">
              {hooks.map(item => (
                <CommandItem
                  key={item.url}
                  value={`${item.title} ${item.description}`}
                  onSelect={() => {
                    router.push(item.url)
                    setOpen(false)
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
