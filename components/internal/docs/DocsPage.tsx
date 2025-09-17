import type { ReactNode } from "react"

import { DocsLayout, type TocItem } from "./DocsLayout"
import type { DocsPageHeaderProps } from "./DocsPageHeader"

interface DocsPageProps {
  header: DocsPageHeaderProps
  toc?: TocItem[]
  children: ReactNode
  className?: string
}

export function DocsPage({ header, toc, children, className }: DocsPageProps) {
  return <DocsLayout header={header} toc={toc} className={className}>{children}</DocsLayout>
}
