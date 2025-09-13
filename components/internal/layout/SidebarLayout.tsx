"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { CommandPalette } from "@/components/internal/ui/command-palette"
import { usePathname } from "next/navigation"
import { MentionsSidebar } from "./MentionsSidebar"

interface SidebarLayoutProps {
  children: React.ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname()
  const isMentions = pathname?.startsWith("/mentions")
  return (
    <SidebarProvider>
      {isMentions ? <MentionsSidebar /> : <AppSidebar />}
      <main id="content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>
      <CommandPalette />
    </SidebarProvider>
  )
}
