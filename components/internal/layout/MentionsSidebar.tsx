"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Home, LayoutList } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function MentionsSidebar() {
  const pathname = usePathname()
  const isMentions = pathname?.startsWith("/mentions")

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <FileText className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Mentions</span>
              <span className="text-xs">Documentation</span>
            </div>
          </div>
        </div>

        {/* Section switcher */}
        <div className="px-2 pb-2">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/components"
              className={`inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm ${isMentions ? "bg-background" : "bg-sidebar-primary text-sidebar-primary-foreground"}`}
            >
              Components
            </Link>
            <Link
              href="/mentions"
              className={`inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm ${isMentions ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-background"}`}
            >
              Mentions
            </Link>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/mentions"}>
                  <Link href="/mentions">
                    <Home className="size-4" />
                    <span>Introduction</span>
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/mentions/github"}>
                  <Link href="/mentions/github">
                    <LayoutList className="size-4" />
                    <span>GitHub Mention</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Hooks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/mentions/hooks/useGithubMention"}
                >
                  <Link href="/mentions/hooks/useGithubMention">
                    <LayoutList className="size-4" />
                    <span>useGithubMention</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
