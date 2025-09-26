"use client"

import * as React from "react"
import type { ComponentProps } from "react"
import Link from "next/link"
import { CircleDot, CircleCheck } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type GithubIssueResource = {
  kind: "issue"
  number: number
  title: string
  html_url: string
  state: "open" | "closed"
  created_at: string
  body?: string | null
  comments?: number | null
}

function cn(...classes: (string | null | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

export type GithubIssueMentionProps = {
  data: GithubIssueResource
  className?: string
  linkProps?: ComponentProps<"a">
}

export function GithubIssueMention({ data, className, linkProps }: GithubIssueMentionProps) {
  const content = (
    <div className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="inline-flex items-center" aria-hidden>
        {getIssueStatusMeta(data.state).icon}
      </span>
      <Link
        href={data.html_url}
        className="hover:underline text-sm"
        aria-label={`Open issue #${data.number} in ${repoFromUrl(data.html_url)}`}
        {...linkProps}
      >
        <bdi className="font-medium">{data.title}</bdi>
        <span className="text-muted-foreground">
          {" "}
          {repoFromUrl(data.html_url)}#{data.number}
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
        className="grid min-w-sm max-w-lg gap-3 text-sm text-foreground"
      >
        <div className="flex items-baseline gap-1 text-muted-foreground">
          <Link
            href={`https://github.com/${repoFromUrl(data.html_url)}`}
            className="truncate text-xs font-medium hover:text-blue-500 underline"
          >
            {repoFromUrl(data.html_url)}
          </Link>
          {formatOnDate(data.created_at) ? (
            <span className="whitespace-nowrap text-xs">{formatOnDate(data.created_at)}</span>
          ) : null}
        </div>

        <div className="flex items-start gap-2">
          <span className="mt-0.5" aria-hidden>
            {React.cloneElement(getIssueStatusMeta(data.state).icon, {
              className: cn("size-5", getIssueStatusMeta(data.state).icon.props?.className ?? ""),
            })}
          </span>
          <div className="flex flex-col gap-3">
            <div className="min-w-0 space-y-1">
              <Link
                href={data.html_url}
                className="block font-semibold leading-snug text-white hover:text-blue-500"
              >
                {data.title}
                <span className="font-normal text-muted-foreground"> #{data.number}</span>
              </Link>
            </div>

            {renderBodySnippet(data.body ?? null, repoFromUrl(data.html_url))}

            {typeof data.comments === "number" ? (
              <div className="text-xs text-muted-foreground">
                {formatNumber(data.comments)} comment{data.comments === 1 ? "" : "s"}
              </div>
            ) : null}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
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

function formatNumber(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value)
}

function getIssueStatusMeta(status: "open" | "closed") {
  const base = "inline-flex items-center gap-1 rounded-full text-white"
  const iconClass = "size-4 align-text-bottom"
  if (status === "open")
    return {
      label: "Open",
      className: `${base}`,
      icon: <CircleDot className={iconClass} style={{ color: "#1f883d" }} />,
    }
  return {
    label: "Closed",
    className: `${base}`,
    icon: <CircleCheck className={iconClass} style={{ color: "#8250df" }} />,
  }
}
