"use client"

import * as React from "react"
import { useEffect } from "react"
import Link from "next/link"

import { useGithubMention } from "@/hooks/use-github-mention"
import { parseGithubUrl } from "@/lib/github/parse-url"
import type { GithubResource } from "@/lib/github/types"
import { cn } from "@/lib/utils"
import { getGithubLanguageColor } from "@/lib/github/language-colors"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import {
  GitPullRequest,
  GitMerge,
  GitFork,
  MapPin,
  Star,
  Users,
  UserPlus,
  CircleDot,
  CircleCheck,
  Book,
} from "lucide-react"

type GithubMentionProps = {
  url: string
  useServer?: boolean
  className?: string
  linkProps?: React.ComponentProps<"a">
  onError?: (error: Error) => void
}

export function GithubMention({
  url,
  useServer,
  className,
  linkProps,
  onError,
}: GithubMentionProps) {
  const { data, isLoading, error, refetch } = useGithubMention(url, { useServer })

  useEffect(() => {
    if (error) onError?.(error)
  }, [error, onError])

  if (isLoading) return <GithubMentionSkeleton className={className} />
  if (error || !data)
    return (
      <GithubMentionError
        url={url}
        onRetry={refetch}
        className={className}
        error={error ?? undefined}
      />
    )

  const content = renderContent(data, linkProps)
  const tooltip = renderTooltipContent(data)

  if (!tooltip) return <div className={className}>{content}</div>

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={className}>{content}</div>
      </TooltipTrigger>
      <TooltipContent
        sideOffset={12}
        align="start"
        className="max-w-lg border border-border bg-popover p-5 text-popover-foreground shadow-lg"
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
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

function GithubMentionError({
  url,
  onRetry,
  className,
  error,
}: {
  url: string
  onRetry: () => void
  className?: string
  error?: Error
}) {
  const parsed = parseGithubUrl(url)
  const anyErr = error as unknown as
    | { statusCode?: number; code?: string; message?: string }
    | undefined
  return (
    <div className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span className="text-xs text-muted-foreground">Could not load</span>
      <span className="text-xs truncate max-w-[24rem] text-muted-foreground">
        {parsed.kind !== "unknown" ? url : "Invalid GitHub URL"}
      </span>
      <Button
        size="sm"
        variant="outline"
        onClick={onRetry}
        aria-label="Retry loading GitHub data"
        title={anyErr?.message}
      >
        Retry
      </Button>
      {error ? (
        <span className="text-[11px] text-muted-foreground">
          {anyErr?.statusCode ? `HTTP ${anyErr.statusCode}` : null}
          {anyErr?.code ? ` (${anyErr.code})` : null}
          {anyErr?.statusCode || anyErr?.code ? ": " : null}
          {error.message}
          {anyErr?.code === "RATE_LIMITED"
            ? " – add GITHUB_TOKEN and/or useServer for higher limits"
            : null}
        </span>
      ) : null}
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

function renderTooltipContent(data: GithubResource): React.ReactNode {
  switch (data.kind) {
    case "pull":
      return <PullTooltip data={data} />
    case "issue":
      return <IssueTooltip data={data} />
    case "user":
      return <UserTooltip data={data} />
    case "repo":
      return <RepoTooltip data={data} />
    default:
      return null
  }
}

type MinimalUser = {
  id?: number
  login: string
  html_url: string
  avatar_url?: string | null
  name?: string | null
  bio?: string | null
  followers?: number
  following?: number
  location?: string | null
}

function toUserResource(user: MinimalUser): Extract<GithubResource, { kind: "user" }> {
  return {
    kind: "user",
    id: user.id ?? 0,
    login: user.login,
    name: user.name ?? null,
    avatar_url: user.avatar_url ?? null,
    html_url: user.html_url,
    bio: user.bio ?? null,
    followers: user.followers,
    following: user.following,
    location: user.location ?? null,
  }
}

function UserHoverLink({
  user,
  className,
  ariaLabel,
  children,
  disableTooltip,
}: {
  user: MinimalUser
  className?: string
  ariaLabel?: string
  children?: React.ReactNode
  disableTooltip?: boolean
}) {
  const label = ariaLabel ?? `Open ${user.login} on GitHub`
  const content = children ?? user.login

  if (disableTooltip)
    return (
      <Link href={user.html_url} className={className} aria-label={label}>
        {content}
      </Link>
    )

  const resource = toUserResource(user)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={user.html_url} className={className} aria-label={label}>
          {content}
        </Link>
      </TooltipTrigger>
      <TooltipContent
        sideOffset={8}
        align="start"
        className="max-w-sm border border-border bg-popover p-2.5 text-popover-foreground shadow-lg"
      >
        <UserTooltip data={resource} />
      </TooltipContent>
    </Tooltip>
  )
}

function PullContent({
  data,
  linkProps,
}: {
  data: Extract<GithubResource, { kind: "pull" }>
  linkProps?: React.ComponentProps<"a">
}) {
  const status = data.merged ? "merged" : data.draft ? "draft" : data.state
  const meta = getStatusMeta("pull", status)
  const repo = data.base?.repo?.full_name ?? repoFromUrl(data.html_url)
  const aria = `Open PR #${data.number} in ${repo}`

  return (
    <div className="inline-flex items-baseline gap-2">
      <span className="inline-flex items-center" aria-hidden>
        {meta.icon}
      </span>
      <Link
        href={data.html_url}
        className="hover:underline text-sm"
        aria-label={aria}
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
}

function IssueContent({
  data,
  linkProps,
}: {
  data: Extract<GithubResource, { kind: "issue" }>
  linkProps?: React.ComponentProps<"a">
}) {
  const status = data.state
  const meta = getStatusMeta("issue", status)
  const repo = repoFromUrl(data.html_url)
  const aria = `Open issue #${data.number} in ${repo}`

  return (
    <div className="inline-flex items-baseline gap-2">
      <span className="inline-flex items-center" aria-hidden>
        {meta.icon}
      </span>
      <Link
        href={data.html_url}
        className="hover:underline text-sm"
        aria-label={aria}
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
}

function UserContent({
  data,
  linkProps,
}: {
  data: Extract<GithubResource, { kind: "user" }>
  linkProps?: React.ComponentProps<"a">
}) {
  const aria = `Open GitHub profile for ${data.login}`
  return (
    <div className="inline-flex items-baseline gap-2">
      <Avatar className="size-4">
        <AvatarImage src={data.avatar_url ?? undefined} alt={`${data.login} avatar`} />
        <AvatarFallback aria-hidden>{data.login?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <Link
        href={data.html_url}
        className="hover:underline text-sm"
        aria-label={aria}
        {...linkProps}
      >
        <bdi className="font-medium">{data.name ?? data.login}</bdi>
        <span className="text-muted-foreground"> @{data.login}</span>
      </Link>
    </div>
  )
}

function RepoContent({
  data,
  linkProps,
}: {
  data: Extract<GithubResource, { kind: "repo" }>
  linkProps?: React.ComponentProps<"a">
}) {
  const aria = `Open repository ${data.full_name}`
  const ownerUser = data.owner
    ? {
        id: data.owner.id,
        login: data.owner.login,
        html_url: data.owner.html_url,
        avatar_url: data.owner.avatar_url,
      }
    : null

  return (
    <div className="inline-flex items-center gap-2">
      {ownerUser ? (
        <UserHoverLink
          user={ownerUser}
          ariaLabel={`Open GitHub profile for ${ownerUser.login}`}
          className="inline-flex"
        >
          <Avatar className="size-4">
            <AvatarImage
              src={ownerUser.avatar_url ?? undefined}
              alt={`${ownerUser.login} avatar`}
            />
            <AvatarFallback aria-hidden>{ownerUser.login.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </UserHoverLink>
      ) : null}
      <Link
        href={data.html_url}
        className="hover:underline text-sm"
        aria-label={aria}
        {...linkProps}
      >
        <bdi className="font-medium">{data.full_name}</bdi>
      </Link>
    </div>
  )
}

function PullTooltip({ data }: { data: Extract<GithubResource, { kind: "pull" }> }) {
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
  const status = data.merged ? "merged" : data.draft ? "draft" : data.state
  const statusMeta = getStatusMeta("pull", status)
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

function formatOnDate(input?: string | null) {
  if (!input) return null
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return null
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
  if (date.getFullYear() !== now.getFullYear()) options.year = "numeric"
  return `on ${date.toLocaleDateString(undefined, options)}`
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

  if (lastIndex < snippet.length) {
    nodes.push(snippet.slice(lastIndex))
  }

  return nodes
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
  fullLabel: string | null | undefined
}) {
  const displayOwner = owner ?? label

  return (
    <span className="group/branch-label relative inline-flex">
      <Badge className="flex gap-0 bg-blue-950/40 p-1" aria-label={fullLabel ?? label}>
        <span className="text-blue-500">{displayOwner}</span>
        {branch ? <span className="text-muted-foreground">:{branch}</span> : null}
      </Badge>
      {fullLabel ? (
        <span
          role="tooltip"
          aria-hidden
          className="pointer-events-none absolute left-0 top-full z-50 mt-1 hidden whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs font-mono text-popover-foreground shadow-lg group-hover/branch-label:block group-focus-visible/branch-label:block"
        >
          {fullLabel}
        </span>
      ) : null}
    </span>
  )
}

function getRepoBranchLabel(repoFullName?: string | null, ref?: string | null) {
  const repo = repoFullName?.trim()
  const branch = ref?.trim()
  if (!repo && !branch) return null
  return repo && branch ? `${repo}:${branch}` : (repo ?? branch)
}

function formatRepoBranchLabel(repoFullName?: string | null, ref?: string | null) {
  const length = 23
  const label = getRepoBranchLabel(repoFullName, ref)
  if (!label) return null
  if (label.length <= length) return label
  return label.slice(0, length - 1) + "..."
}

function IssueTooltip({ data }: { data: Extract<GithubResource, { kind: "issue" }> }) {
  const repo = repoFromUrl(data.html_url)
  const statusMeta = getStatusMeta("issue", data.state)
  const labels = (data.labels ?? []).slice(0, 3)
  const extraLabels = (data.labels?.length ?? 0) - labels.length
  const createdLabel = formatOnDate(data.created_at)
  const description = renderBodySnippet(data.body ?? null, repo)
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

  return (
    <div className="flex min-w-sm max-w-lg flex-col gap-1.5 text-sm">
      <div className="flex items-baseline gap-1 text-muted-foreground">
        <Link
          href={`https://github.com/${repo}`}
          className="truncate text-xs font-medium hover:text-blue-500 underline"
        >
          {repo}
        </Link>
        {createdLabel ? <span className="whitespace-nowrap text-xs">{createdLabel}</span> : null}
      </div>
      <div className="flex gap-2 space-y-0.5">
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
          </div>
        </div>
      </div>
    </div>
  )
}

function UserTooltip({ data }: { data: Extract<GithubResource, { kind: "user" }> }) {
  return (
    <div className="flex min-w-[220px] max-w-xs flex-col gap-1.5 text-sm">
      <div className="flex items-center gap-2.5">
        <Avatar className="size-10">
          <AvatarImage src={data.avatar_url ?? undefined} alt={`${data.login} avatar`} />
          <AvatarFallback aria-hidden>{data.login?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <Link
            href={data.html_url}
            className="text-sm font-semibold text-foreground leading-snug hover:underline"
          >
            {data.login}
          </Link>
          {data.name ? <p className="text-xs text-muted-foreground">{data.name}</p> : null}
        </div>
      </div>
      {data.bio ? <p className="text-sm leading-snug text-muted-foreground">{data.bio}</p> : null}
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {typeof data.followers === "number" ? (
          <span className="inline-flex items-center gap-1">
            <Users className="size-3" />
            {formatNumber(data.followers)} followers
          </span>
        ) : null}
        {typeof data.following === "number" ? (
          <span className="inline-flex items-center gap-1">
            <UserPlus className="size-3" />
            {formatNumber(data.following)} following
          </span>
        ) : null}
        {data.location ? (
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3" />
            {data.location}
          </span>
        ) : null}
      </div>
    </div>
  )
}

function RepoTooltip({ data }: { data: Extract<GithubResource, { kind: "repo" }> }) {
  const visibilityLabel = getRepoVisibilityLabel(data)
  const primaryLanguage = typeof data.language === "string" ? data.language : null
  const normalizedLanguageColor =
    typeof data.languageColor === "string" && data.languageColor.trim() ? data.languageColor : null
  const fallbackLanguageColor = primaryLanguage ? getGithubLanguageColor(primaryLanguage) : null
  const languageColor = normalizedLanguageColor ?? fallbackLanguageColor
  const updatedRelative = formatRelativeTime(data.pushed_at ?? data.updated_at)

  return (
    <div className="flex min-w-[220px] max-w-sm flex-col gap-3.5 text-sm">
      <div className="flex items-center gap-2">
        <Book className="size-4 text-muted-foreground" />
        <Link
          href={data.html_url}
          className="font-semibold text-foreground leading-snug hover:underline"
        >
          {data.full_name}
        </Link>
        {visibilityLabel ? (
          <Badge
            variant="outline"
            className="text-muted-foreground border-muted-foreground/40 rounded-3xl"
          >
            {visibilityLabel}
          </Badge>
        ) : null}
      </div>

      {data.description ? (
        <p className="text-sm leading-snug text-muted-foreground ml-0.5">{data.description}</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {primaryLanguage ? (
          <span className="inline-flex items-center gap-1">
            <div
              className={cn(
                "rounded-full size-3 border border-border/40",
                languageColor ? "" : "bg-accent"
              )}
              style={
                languageColor
                  ? { backgroundColor: languageColor, borderColor: languageColor }
                  : undefined
              }
              aria-hidden
            />
            {primaryLanguage}
          </span>
        ) : null}
        {typeof data.stargazers_count === "number" ? (
          <span className="inline-flex items-center gap-1">
            <Star className="size-3" />
            {formatNumber(data.stargazers_count)}
          </span>
        ) : null}
        {typeof data.forks_count === "number" ? (
          <span className="inline-flex items-center gap-1">
            <GitFork className="size-3" />
            {formatNumber(data.forks_count)}
          </span>
        ) : null}
        {updatedRelative ? <span>Updated {updatedRelative}</span> : null}
      </div>
    </div>
  )
}

function getStatusMeta(kind: "pull" | "issue", status: string) {
  const base = "inline-flex items-center gap-1 rounded-full text-white"
  const iconClass = "size-4 align-text-bottom"
  if (kind === "pull") {
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
  // issue
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

function formatDate(input: string) {
  try {
    return new Date(input).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return input
  }
}

function formatNumber(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value)
}

function getRepoVisibilityLabel(data: Extract<GithubResource, { kind: "repo" }>) {
  if (typeof data.visibility === "string" && data.visibility.trim()) {
    return toTitleCase(data.visibility)
  }
  if (typeof data.private === "boolean") {
    return data.private ? "Private" : "Public"
  }
  return null
}

function toTitleCase(input: string) {
  const normalized = input.replace(/[-_]+/g, " ").trim()
  if (!normalized) return input
  return normalized
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

function formatRelativeTime(input?: string | null) {
  if (!input) return null
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return null

  const now = Date.now()
  const diffSeconds = Math.round((date.getTime() - now) / 1000)
  if (diffSeconds === 0) return "just now"

  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })
  const divisions: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, unit: "second" },
    { amount: 60, unit: "minute" },
    { amount: 24, unit: "hour" },
    { amount: 7, unit: "day" },
    { amount: 4.34524, unit: "week" },
    { amount: 12, unit: "month" },
    { amount: Number.POSITIVE_INFINITY, unit: "year" },
  ]

  let duration = diffSeconds
  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.unit)
    }
    duration /= division.amount
  }

  return null
}

export default GithubMention
