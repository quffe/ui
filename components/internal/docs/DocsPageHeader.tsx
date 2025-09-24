import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"

export interface DocsPageHeaderProps {
  title: string
  description: string
  category: string
  status?: string
  actions?: ReactNode
}

export function DocsPageHeader({
  title,
  description,
  category,
  status,
  actions,
}: DocsPageHeaderProps) {
  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="outline" className="uppercase tracking-wide">
          {category}
        </Badge>
        {status ? <Badge variant="secondary">{status}</Badge> : null}
      </div>
      <div className="space-y-5">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </section>
  )
}
