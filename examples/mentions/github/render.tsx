"use client"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useGithubMention } from "@/hooks/use-github-mention"

function CustomMention({ url }: { url: string }) {
  const { data, isLoading, error } = useGithubMention(url, { useServer: true })

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-4 w-48" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="text-sm text-muted-foreground">
        Could not load GitHub metadata ({error?.message ?? "unknown error"})
      </div>
    )
  }

  const chip = <Badge variant="outline">{data.kind.toUpperCase()}</Badge>

  switch (data.kind) {
    case "pull":
      return (
        <div className="flex items-center gap-3 text-sm">
          {chip}
          <Link href={data.html_url} className="underline">
            #{data.number} {data.title}
          </Link>
        </div>
      )
    case "issue":
      return (
        <div className="flex items-center gap-3 text-sm">
          {chip}
          <Link href={data.html_url} className="underline">
            #{data.number} {data.title}
          </Link>
        </div>
      )
    case "repo":
      return (
        <div className="flex items-center gap-3 text-sm">
          {chip}
          <Link href={data.html_url} className="underline">
            {data.full_name}
          </Link>
        </div>
      )
    case "user":
      return (
        <div className="flex items-center gap-3 text-sm">
          {chip}
          <Link href={data.html_url} className="underline">
            {data.name ?? data.login}
          </Link>
        </div>
      )
    default:
      return <div className="text-sm text-muted-foreground">Unsupported GitHub resource</div>
  }
}

export function Example() {
  return (
    <div className="space-y-3">
      <CustomMention url="https://github.com/shadcn-ui/ui/issues/1" />
    </div>
  )
}
