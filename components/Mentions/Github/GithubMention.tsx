"use client"

import * as React from "react"
import { useEffect } from "react"
import Link from "next/link"

import { useGithubMention } from "@/hooks/use-github-mention"
import { parseGithubUrl } from "@/lib/github/parse-url"
import type { GithubResource } from "@/lib/github/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { GitPullRequest, GitMerge } from "lucide-react"

type GithubMentionProps = {
  url: string
  useServer?: boolean
  className?: string
  linkProps?: React.ComponentProps<"a">
  render?: (data: GithubResource) => React.ReactNode
  onError?: (error: Error) => void
}

export function GithubMention({ url, useServer, className, linkProps, render, onError }: GithubMentionProps) {
  const { data, isLoading, error, refetch } = useGithubMention(url, { useServer })

  useEffect(() => {
    if (error) onError?.(error)
  }, [error, onError])

  if (isLoading) return <GithubMentionSkeleton className={className} />
  if (error || !data)
    return <GithubMentionError url={url} onRetry={refetch} className={className} errorMessage={error?.message} />

  if (render) return <div className={className}>{render(data)}</div>
  return <div className={className}>{renderContent(data, linkProps)}</div>
}

function GithubMentionSkeleton({ className }: { className?: string }) {
  return (
    <div className={`inline-flex items-baseline gap-2 ${className ?? ""}`} aria-busy="true">
      <Skeleton className="h-4 w-4 rounded-full" />
      <div className="flex items-baseline gap-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  )
}

function GithubMentionError({ url, onRetry, className, errorMessage }: { url: string; onRetry: () => void; className?: string; errorMessage?: string }) {
  const parsed = parseGithubUrl(url)
  return (
    <div className={`inline-flex items-center gap-2 ${className ?? ""}`}> 
      <span className="text-xs text-muted-foreground">Could not load</span>
      <span className="text-xs truncate max-w-[24rem] text-muted-foreground">{parsed.kind !== "unknown" ? url : "Invalid GitHub URL"}</span>
      <Button size="sm" variant="outline" onClick={onRetry} aria-label="Retry loading GitHub data" title={errorMessage}>
        Retry
      </Button>
    </div>
  )
}

function renderContent(data: GithubResource, linkProps?: React.ComponentProps<"a">) {
  switch (data.kind) {
    case "pull":
      return <PullContent data={data} linkProps={linkProps} />
    case "issue":
      return <IssueContent data={data} linkProps={linkProps} />
    case "user":
      return <UserContent data={data} linkProps={linkProps} />
    case "repo":
      return <RepoContent data={data} linkProps={linkProps} />
    default:
      return <p className="text-sm">Unsupported GitHub URL</p>
  }
}

function PullContent({ data, linkProps }: { data: Extract<GithubResource, { kind: "pull" }>; linkProps?: React.ComponentProps<"a"> }) {
  const status = data.merged ? "merged" : data.draft ? "draft" : data.state
  const meta = getStatusMeta("pull", status)
  const repo = data.base?.repo?.full_name ?? repoFromUrl(data.html_url)
  const aria = `Open PR #${data.number} in ${repo}`

  return (
    <div className="inline-flex items-baseline gap-2">
      <span className="inline-flex items-center" aria-hidden>
        {meta.icon}
      </span>
      <Link href={data.html_url} className="hover:underline text-sm" aria-label={aria} {...linkProps}>
        <bdi className="font-medium">{data.title}</bdi>
        <span className="text-muted-foreground"> {repo}#{data.number}</span>
      </Link>
    </div>
  )
}

function IssueContent({ data, linkProps }: { data: Extract<GithubResource, { kind: "issue" }>; linkProps?: React.ComponentProps<"a"> }) {
  const status = data.state
  const meta = getStatusMeta("issue", status)
  const repo = repoFromUrl(data.html_url)
  const aria = `Open issue #${data.number} in ${repo}`

  return (
    <div className="inline-flex items-baseline gap-2">
      <span className="inline-flex items-center" aria-hidden>
        {meta.icon}
      </span>
      <Link href={data.html_url} className="hover:underline text-sm" aria-label={aria} {...linkProps}>
        <bdi className="font-medium">{data.title}</bdi>
        <span className="text-muted-foreground"> {repo}#{data.number}</span>
      </Link>
    </div>
  )
}

function UserContent({ data, linkProps }: { data: Extract<GithubResource, { kind: "user" }>; linkProps?: React.ComponentProps<"a"> }) {
  const aria = `Open GitHub profile for ${data.login}`
  return (
    <div className="inline-flex items-baseline gap-2">
      <Avatar className="size-4">
        <AvatarImage src={data.avatar_url ?? undefined} alt={`${data.login} avatar`} />
        <AvatarFallback aria-hidden>{data.login?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <Link href={data.html_url} className="hover:underline text-sm" aria-label={aria} {...linkProps}>
        <bdi className="font-medium">{data.name ?? data.login}</bdi>
        <span className="text-muted-foreground"> @{data.login}</span>
      </Link>
    </div>
  )
}

function RepoContent({ data, linkProps }: { data: Extract<GithubResource, { kind: "repo" }>; linkProps?: React.ComponentProps<"a"> }) {
  const aria = `Open repository ${data.full_name}`
  return (
    <div className="inline-flex items-baseline gap-2">
      <Link href={data.html_url} className="hover:underline text-sm" aria-label={aria} {...linkProps}>
        <bdi className="font-medium">{data.full_name}</bdi>
      </Link>
    </div>
  )
}

function getStatusMeta(kind: "pull" | "issue", status: string) {
  const base = "inline-flex items-center gap-1 rounded-full text-white"
  const iconClass = "size-4 align-text-bottom"
  if (kind === "pull") {
    if (status === "merged") return { label: "Merged", className: `${base}`, icon: <GitMerge className={iconClass} style={{ color: "#8250df" }} /> }
    if (status === "draft") return { label: "Draft", className: `${base}`, icon: <GitPullRequest className={iconClass} style={{ color: "#6e7781" }} /> }
    if (status === "open") return { label: "Open", className: `${base}`, icon: <GitPullRequest className={iconClass} style={{ color: "#1f883d" }} /> }
    return { label: "Closed", className: `${base}`, icon: <GitPullRequest className={iconClass} style={{ color: "#cf222e" }} /> }
  }
  // issue
  if (status === "open") return { label: "Open", className: `${base}`, icon: <svg aria-label="Open" role="img" viewBox="0 0 16 16" width="16" height="16" fill="#1f883d" className="inline-block align-text-bottom"><circle cx="8" cy="8" r="6.5" stroke="#1f883d" /></svg> }
  // Closed issue icon (check circle) with GitHub path
  return {
    label: "Closed",
    className: `${base}`,
    icon: (
      <svg focusable="false" aria-label="Closed" role="img" viewBox="0 0 16 16" width="16" height="16" fill="#8250df" className="inline-block align-text-bottom">
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

export default GithubMention
