"use client"

import Link from "next/link"
import { useGithubMention } from "@/hooks/use-github-mention"
import { GitPullRequest, GitMerge } from "lucide-react"

export function InlineExample() {
  const { data, isLoading, error } = useGithubMention("https://github.com/vercel/next.js/issues/5367", { useServer: true })
  if (isLoading) return <div className="h-4 w-64 bg-muted animate-pulse rounded" />
  if (error || !data) return <div className="text-xs text-muted-foreground">Failed to load</div>

  if (data.kind === "issue") {
    const isOpen = data.state === "open"
    const icon = isOpen ? (
      <svg aria-label="Open" role="img" viewBox="0 0 16 16" width="16" height="16" fill="#1f883d" className="inline-block align-text-bottom"><circle cx="8" cy="8" r="6.5" stroke="#1f883d" /></svg>
    ) : (
      <svg aria-label="Closed" role="img" viewBox="0 0 16 16" width="16" height="16" fill="#8250df" className="inline-block align-text-bottom"><path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"></path><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z"></path></svg>
    )
    return (
      <div className="inline-flex items-baseline gap-2">
        <span aria-hidden>{icon}</span>
        <Link href={data.html_url} className="hover:underline text-sm">
          <bdi className="font-medium">{data.title}</bdi>
          <span className="text-muted-foreground"> {repoFromUrl(data.html_url)}#{data.number}</span>
        </Link>
      </div>
    )
  }

  if (data.kind === "pull") {
    const icon = data.merged ? (
      <GitMerge className="size-4 align-text-bottom" style={{ color: "#8250df" }} />
    ) : data.state === "open" ? (
      <GitPullRequest className="size-4 align-text-bottom" style={{ color: "#1f883d" }} />
    ) : (
      <GitPullRequest className="size-4 align-text-bottom" style={{ color: "#cf222e" }} />
    )
    return (
      <div className="inline-flex items-baseline gap-2">
        <span aria-hidden>{icon}</span>
        <Link href={data.html_url} className="hover:underline text-sm">
          <bdi className="font-medium">{data.title}</bdi>
          <span className="text-muted-foreground"> {repoFromUrl(data.html_url)}#{data.number}</span>
        </Link>
      </div>
    )
  }

  return <div className="text-xs text-muted-foreground">Unsupported</div>
}

function repoFromUrl(htmlUrl: string): string {
  try {
    const u = new URL(htmlUrl)
    const p = u.pathname.split("/").filter(Boolean)
    if (p.length >= 2) return `${p[0]}/${p[1]}`
    return htmlUrl
  } catch {
    return htmlUrl
  }
}
