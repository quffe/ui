"use client"

import Link from "next/link"
import { useGithubReplica } from "@/hooks/use-github-replica"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GitMerge, GitPullRequest } from "lucide-react"

export function CardExample() {
  const { data, isLoading, error } = useGithubReplica("https://github.com/vercel/next.js/pull/1", {
    useServer: true,
  })
  if (isLoading) return <div className="h-28 w-full bg-muted animate-pulse rounded" />
  if (error || !data || (data.kind !== "pull" && data.kind !== "issue"))
    return <div className="text-xs text-muted-foreground">Failed to load</div>

  const isPR = data.kind === "pull"
  const status = isPR ? (data.merged ? "merged" : data.draft ? "draft" : data.state) : data.state
  const meta = getStatusMeta(isPR ? "pull" : "issue", status)

  return (
    <Card className="max-w-2xl">
      <CardContent className="p-4 flex items-start gap-3">
        <Avatar>
          <AvatarImage src={data.user.avatar_url ?? undefined} alt={`${data.user.login} avatar`} />
          <AvatarFallback>{data.user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Badge
              className={`gap-1 px-2 py-0.5 text-[11px] font-medium border-0 ${meta.className}`}
            >
              {meta.icon}
              {meta.label}
            </Badge>
            <Link href={data.html_url} className="hover:underline text-sm font-medium line-clamp-1">
              {data.title}
            </Link>
          </div>
          <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-2 text-[12px]">
            <span>
              {repoFromUrl(data.html_url)}#{data.number}
            </span>
            <Separator className="mx-1 h-3 w-px" />
            <span>
              by{" "}
              <Link href={data.user.html_url} className="hover:underline">
                {data.user.login}
              </Link>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getStatusMeta(kind: "pull" | "issue", status: string) {
  const iconClass = "size-4 align-text-bottom"
  if (kind === "pull") {
    if (status === "merged")
      return {
        label: "Merged",
        className: "",
        icon: <GitMerge className={iconClass} style={{ color: "#8250df" }} />,
      }
    if (status === "draft")
      return {
        label: "Draft",
        className: "",
        icon: <GitPullRequest className={iconClass} style={{ color: "#6e7781" }} />,
      }
    if (status === "open")
      return {
        label: "Open",
        className: "",
        icon: <GitPullRequest className={iconClass} style={{ color: "#1f883d" }} />,
      }
    return {
      label: "Closed",
      className: "",
      icon: <GitPullRequest className={iconClass} style={{ color: "#cf222e" }} />,
    }
  }
  if (status === "open")
    return {
      label: "Open",
      className: "",
      icon: (
        <svg
          aria-label="Open"
          role="img"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="#1f883d"
          className="inline-block align-text-bottom"
        >
          <circle cx="8" cy="8" r="6.5" stroke="#1f883d" />
        </svg>
      ),
    }
  return {
    label: "Closed",
    className: "",
    icon: (
      <svg
        aria-label="Closed"
        role="img"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="#8250df"
        className="inline-block align-text-bottom"
      >
        <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"></path>
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z"></path>
      </svg>
    ),
  }
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
