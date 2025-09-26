"use client"

import * as React from "react"
import type { ComponentProps } from "react"
import Link from "next/link"
import { GitPullRequest, GitMerge } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type GithubPullResource = {
  kind: "pull"
  number: number
  title: string
  html_url: string
  state: "open" | "closed"
  merged?: boolean
  draft?: boolean
  body?: string | null
  updated_at?: string | null
  created_at: string
  base?: { repo?: { full_name?: string | null }; ref?: string | null }
  head?: { repo?: { full_name?: string | null }; ref?: string | null }
  user: { login: string }
}

function cn(...classes: (string | null | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

export type GithubPullMentionProps = {
  data: GithubPullResource
  className?: string
  linkProps?: ComponentProps<"a">
}

export function GithubPullMention({ data, className, linkProps }: GithubPullMentionProps) {
  const repo = data.base?.repo?.full_name ?? repoFromUrl(data.html_url)
  const content = (
    <div className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="inline-flex items-center" aria-hidden>
        {getPullStatusMeta(data.merged ? "merged" : data.draft ? "draft" : data.state).icon}
      </span>
      <Link
        href={data.html_url}
        className="hover:underline text-sm"
        aria-label={`Open PR #${data.number} in ${repo}`}
        {...linkProps}
      >
        <bdi className="font-medium">{data.title}</bdi>
        <span className="text-muted-foreground">
          {" "}
          {repo}#{data.number}
        </span>
      </Link>
    </div>
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent
        sideOffset={12}
        align="start"
        className="max-w-lg border border-border bg-popover p-5 text-popover-foreground shadow-lg"
      >
        <PullTooltip data={data} />
      </TooltipContent>
    </Tooltip>
  )
}

function PullTooltip({ data }: { data: GithubPullResource }) {
  const repo = data.base?.repo?.full_name ?? repoFromUrl(data.html_url)
  const createdLabel = formatOnDate(data.updated_at ?? data.created_at)
  const description = renderBodySnippet(data.body ?? null, repo)
  const baseRepo = data.base?.repo?.full_name ?? repo
  const repoNameSegment = repo?.split("/")?.[1]
  const headRepo =
    data.head?.repo?.full_name ??
    (data.user.login && repoNameSegment ? `${data.user.login}/${repoNameSegment}` : null)

  const baseLabelFull = getRepoBranchLabel(baseRepo, data.base?.ref ?? null)
  const headLabelFull = getRepoBranchLabel(headRepo, data.head?.ref ?? null)
  const baseLabel = formatRepoBranchLabel(baseRepo, data.base?.ref ?? null)
  const headLabel = formatRepoBranchLabel(headRepo, data.head?.ref ?? null)
  const statusMeta = getPullStatusMeta(data.merged ? "merged" : data.draft ? "draft" : data.state)
  const originalStatusClass =
    typeof statusMeta.icon.props?.className === "string" ? statusMeta.icon.props.className : ""
  const cleanedStatusClass = originalStatusClass
    .split(" ")
    .filter(cls => cls && !/^size-/.test(cls))
    .join(" ")
  const statusIcon = React.cloneElement(statusMeta.icon, {
    className: cn("mt-0.5 size-5 shrink-0", cleanedStatusClass),
    "aria-hidden": true,
  })
  const [baseOwner, ...baseBranchParts] = baseLabel?.split(":") ?? []
  const baseBranch = baseBranchParts.length ? baseBranchParts.join(":") : null
  const [headOwner, ...headBranchParts] = headLabel?.split(":") ?? []
  const headBranch = headBranchParts.length ? headBranchParts.join(":") : null

  return (
    <div className="grid min-w-sm max-w-lg gap-3 text-sm text-foreground">
      <div className="flex items-baseline gap-1 text-muted-foreground">
        <Link
          href={`https://github.com/${repo}`}
          className="truncate text-xs font-medium hover:text-blue-500 underline"
        >
          {repo}
        </Link>
        {createdLabel ? <span className="whitespace-nowrap text-xs">{createdLabel}</span> : null}
      </div>

      <div className="flex items-start gap-2">
        {statusIcon}
        <div className="flex flex-col gap-3">
          <div className="min-w-0 space-y-1">
            <Link
              href={data.html_url}
              className="block font-semibold group leading-snug text-white hover:text-blue-500"
            >
              {data.title}
              <span className="font-normal text-muted-foreground group-hover:text-blue-500">
                {" "}
                #{data.number}
              </span>
            </Link>
          </div>

          {description}

          {baseLabel || headLabel ? (
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {baseLabel ? (
                <BranchLabelBadge
                  owner={baseOwner || null}
                  branch={baseBranch || null}
                  label={baseLabel}
                  fullLabel={baseLabelFull}
                />
              ) : null}
              {baseLabel && headLabel ? (
                <span className="text-[#8b949e]" aria-hidden>
                  ←
                </span>
              ) : null}
              {headLabel ? (
                <BranchLabelBadge
                  owner={headOwner || null}
                  branch={headBranch || null}
                  label={headLabel}
                  fullLabel={headLabelFull}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function BranchLabelBadge({
  owner,
  branch,
  label,
  fullLabel,
}: {
  owner: string | null
  branch: string | null
  label: string
  fullLabel: string | null
}) {
  const href = branch ? getBranchUrl(owner, branch) : null
  if (!href)
    return <span className="rounded-full border border-border px-2 py-0.5 text-xs">{label}</span>

  return (
    <Link
      href={href}
      className="rounded-full border border-border px-2 py-0.5 text-xs hover:border-blue-500 hover:text-blue-500"
      aria-label={fullLabel ?? undefined}
    >
      {label}
    </Link>
  )
}

function renderBodySnippet(body: string | null, repo: string | null): React.ReactNode {
  if (!body) return null
  const stripped = stripMarkdown(body)
  if (!stripped) return null
  const snippet = truncateSnippet(stripped, 180)
  const parts = linkifyIssueReferences(snippet, repo)
  return <p className="whitespace-pre-wrap text-sm leading-snug text-[#8b949e]">{parts}</p>
}

function stripMarkdown(input: string) {
  return input
    .replace(/\r\n/g, "\n")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/^[ \t]+|[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function truncateSnippet(input: string, maxLength: number) {
  if (input.length <= maxLength) return input
  return `${input.slice(0, maxLength).trimEnd()}…`
}

function linkifyIssueReferences(snippet: string, repo: string | null): React.ReactNode[] {
  const regex = /#(\d+)/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0

  for (const match of snippet.matchAll(regex)) {
    const ref = match[0]
    const number = match[1]
    const index = match.index ?? 0
    if (index > lastIndex) nodes.push(snippet.slice(lastIndex, index))
    if (repo) {
      nodes.push(
        <Link
          key={`${repo}-${number}-${index}`}
          href={`https://github.com/${repo}/pull/${number}`}
          className="text-[#58a6ff] hover:underline"
        >
          {ref}
        </Link>
      )
    } else {
      nodes.push(ref)
    }
    lastIndex = index + ref.length
  }

  if (lastIndex < snippet.length) nodes.push(snippet.slice(lastIndex))

  return nodes
}

function getBranchUrl(owner: string | null, branch: string | null) {
  if (!owner || !branch) return null
  return `https://github.com/${owner}/tree/${branch}`
}

function getRepoBranchLabel(repo: string | null, ref: string | null) {
  if (!repo || !ref) return null
  return `${repo}:${ref}`
}

function formatRepoBranchLabel(repo: string | null, ref: string | null) {
  if (!repo || !ref) return null
  const repoName = repo.split("/")[1] ?? repo
  return `${repoName}:${ref}`
}

function getPullStatusMeta(status: "merged" | "draft" | "open" | "closed") {
  const base = "inline-flex items-center gap-1 rounded-full text-white"
  const iconClass = "size-4 align-text-bottom"
  if (status === "merged")
    return {
      label: "Merged",
      className: `${base}`,
      icon: <GitMerge className={iconClass} style={{ color: "#8250df" }} />,
    }
  if (status === "draft")
    return {
      label: "Draft",
      className: `${base}`,
      icon: <GitPullRequest className={iconClass} style={{ color: "#6e7781" }} />,
    }
  if (status === "open")
    return {
      label: "Open",
      className: `${base}`,
      icon: <GitPullRequest className={iconClass} style={{ color: "#1f883d" }} />,
    }
  return {
    label: "Closed",
    className: `${base}`,
    icon: <GitPullRequest className={iconClass} style={{ color: "#cf222e" }} />,
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

function formatOnDate(input?: string | null) {
  if (!input) return null
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return null
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
  if (date.getFullYear() !== now.getFullYear()) options.year = "numeric"
  return `on ${date.toLocaleDateString(undefined, options)}`
}
