"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { CommandPalette } from "@/components/internal/ui/command-palette"
import { usePathname } from "next/navigation"
import { ReplicaSidebar } from "./ReplicaSidebar"

interface SidebarLayoutProps {
  children: React.ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname()
  const isReplica = pathname?.startsWith("/replica")
  return (
    <SidebarProvider>
      {isReplica ? <ReplicaSidebar /> : <AppSidebar />}
      <main id="content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>
      <CommandPalette />
    </SidebarProvider>
  )
}
