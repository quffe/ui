"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { CommandPalette } from "@/components/internal/ui/command-palette"

interface SidebarLayoutProps {
  children: React.ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main id="content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>
      <CommandPalette />
    </SidebarProvider>
  )
}
