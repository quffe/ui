import type { ReactNode } from "react"

import { DocsPage, type TocItem } from "./DocsPage"
import { PropsTable, type PropsTableRow } from "./PropsTable"

interface HookDocsPageProps {
  header: Parameters<typeof DocsPage>[0]["header"]
  toc: TocItem[]
  parameters?: PropsTableRow[]
  returns?: PropsTableRow[]
  children: ReactNode
}

export function HookDocsPage({ header, toc, parameters, returns, children }: HookDocsPageProps) {
  return (
    <DocsPage header={header} toc={toc}>
      {children}
      {parameters?.length ? (
        <section id="api-parameters" className="scroll-mt-24 space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Parameters</h2>
          </div>
          <PropsTable rows={parameters} labels={{ prop: "Parameter" }} />
        </section>
      ) : null}
      {returns?.length ? (
        <section id="api-returns" className="scroll-mt-24 space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Returns</h2>
          </div>
          <PropsTable rows={returns} labels={{ prop: "Property" }} />
        </section>
      ) : null}
    </DocsPage>
  )
}
