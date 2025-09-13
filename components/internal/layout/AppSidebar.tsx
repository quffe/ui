"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { FileText, Home, Download, BookOpen, Search, SquareStack } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"
import { components, hooks } from "@/components/internal/layout/nav-data"
import { SearchButton } from "@/components/internal/ui/search-button"

// Data for components and hooks moved to nav-data for reuse (e.g., CommandPalette)

export function AppSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = React.useState("")
  const isMentions = pathname?.startsWith("/mentions")

  const filteredComponents = components.filter(
    component =>
      component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredHooks = hooks.filter(
    hook =>
      hook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hook.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group components by category
  type ComponentItem = (typeof components)[number]
  const groupedComponents = filteredComponents.reduce(
    (acc, component) => {
      const category = component.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(component)
      return acc
    },
    {} as Record<string, ComponentItem[]>
  )

  // Group hooks by category
  type HookItem = (typeof hooks)[number]
  const groupedHooks = filteredHooks.reduce(
    (acc, hook) => {
      const category = hook.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(hook)
      return acc
    },
    {} as Record<string, HookItem[]>
  )

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <FileText className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">UI Components</span>
            <span className="text-xs">Documentation</span>
          </div>
        </div>

        {/* Section switcher */}
        <div className="px-2 pb-2">
          <div className="grid grid-cols-2 gap-2">
            <Link href="/components" className={`inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm ${isMentions ? "bg-background" : "bg-sidebar-primary text-sidebar-primary-foreground"}`}>
              Components
            </Link>
            <Link href="/mentions" className={`inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm ${isMentions ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-background"}`}>
              Mentions
            </Link>
          </div>
        </div>

        <form className="px-2">
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search components
              </Label>
              <SidebarInput
                id="search"
                placeholder="Search components & hooks..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
        <div className="px-2 pb-2">
          <SearchButton className="w-full" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <Home className="size-4" />
                    <span>Introduction</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/installation"}>
                  <Link href="/installation">
                    <Download className="size-4" />
                    <span>Installation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/components"}>
                  <Link href="/components">
                    <SquareStack className="size-4" />
                    <span>All Components</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/hooks"}>
                  <Link href="/hooks">
                    <BookOpen className="size-4" />
                    <span>React Hooks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel>{category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {categoryComponents.map(component => (
                  <SidebarMenuItem key={component.title}>
                    <SidebarMenuButton asChild isActive={pathname === component.url}>
                      <Link href={component.url}>
                        <component.icon className="size-4" />
                        <span>{component.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {Object.entries(groupedHooks).map(([category, categoryHooks]) => (
          <SidebarGroup key={`hooks-${category}`}>
            <SidebarGroupLabel>{category} Hooks</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {categoryHooks.map(hook => (
                  <SidebarMenuItem key={hook.title}>
                    <SidebarMenuButton asChild isActive={pathname === hook.url}>
                      <Link href={hook.url}>
                        <hook.icon className="size-4" />
                        <span>{hook.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {searchQuery && filteredComponents.length === 0 && filteredHooks.length === 0 && (
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="px-2 py-4 text-sm text-muted-foreground">
                No components or hooks found for &quot;{searchQuery}&quot;
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
