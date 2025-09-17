import { Children, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { DocsPageHeader, type DocsPageHeaderProps } from "./DocsPageHeader"

export interface TocItem {
  id: string
  title: string
}

interface DocsLayoutProps {
  toc?: TocItem[]
  header?: DocsPageHeaderProps
  children: ReactNode
  className?: string
}

export function DocsLayout({ toc, header, children, className }: DocsLayoutProps) {
  const content = Children.toArray(children)

  return (
    <div
      className={cn(
        "flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16",
        className
      )}
    >
      <div className="space-y-12">
        {header ? <DocsPageHeader {...header} /> : null}
        {content}
      </div>
      {toc?.length ? (
        <aside className="hidden lg:block">
          <div className="sticky top-8 w-64">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              On this page
            </p>
            <nav aria-label="Table of contents" className="space-y-2 text-sm">
              {toc.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block rounded-md px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      ) : null}
    </div>
  )
}
