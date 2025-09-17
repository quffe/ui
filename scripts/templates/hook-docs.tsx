"use server"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { InstallationTabs } from "@/components/internal/installation"
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { HookDocsPage, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"

import ExampleOne from "@/examples/docs/hooks/HOOK_ID/example-one"
import ExampleTwo from "@/examples/docs/hooks/HOOK_ID/example-two"
import { getExampleCode } from "@/lib/serverUtils"

const exampleOneCode = getExampleCode("docs/hooks/HOOK_ID/example-one.tsx")
const exampleTwoCode = getExampleCode("docs/hooks/HOOK_ID/example-two.tsx")

interface HookDocConfig {
  header: {
    title: string
    description: string
    category: string
    status?: string
  }
  toc: TocItem[]
  parameters?: PropsTableRow[]
  returns?: PropsTableRow[]
}

export function renderHookDoc({ header, toc, parameters, returns }: HookDocConfig) {
  return (
    <HookDocsPage
      toc={toc}
      header={{
        ...header,
        actions: <CopyableCodeBadge text={config.getNamespacePath(header.title)} />,
      }}
      parameters={parameters}
      returns={returns}
    >
      {/* sections go here */}
    </HookDocsPage>
  )
}
