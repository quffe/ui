"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { FileText, Home, Type, Lock, AlignLeft, ChevronDown, CheckSquare, Circle, Upload, Search } from 'lucide-react'

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
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"

const components = [
  {
    title: "Input",
    url: "/docs/input",
    icon: Type,
    description: "Basic text input field"
  },
  {
    title: "Password Input",
    url: "/docs/password-input",
    icon: Lock,
    description: "Password input with toggle"
  },
  {
    title: "Textarea",
    url: "/docs/textarea",
    icon: AlignLeft,
    description: "Multi-line text input"
  },
  {
    title: "Select",
    url: "/docs/select",
    icon: ChevronDown,
    description: "Dropdown select component"
  },
  {
    title: "Checkbox",
    url: "/docs/checkbox",
    icon: CheckSquare,
    description: "Checkbox with label"
  },
  {
    title: "Radio Group",
    url: "/docs/radio-group",
    icon: Circle,
    description: "Radio button group"
  },
  {
    title: "File Input",
    url: "/docs/file-input",
    icon: Upload,
    description: "File upload component"
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredComponents = components.filter(component =>
    component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <FileText className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Form Components</span>
            <span className="text-xs">Documentation</span>
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
                placeholder="Search components..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <Home className="size-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredComponents.map((component) => (
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

        {searchQuery && filteredComponents.length === 0 && (
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="px-2 py-4 text-sm text-muted-foreground">
                No components found for "{searchQuery}"
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
