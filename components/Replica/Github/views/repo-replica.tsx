"use client"

import Link from "next/link"
import type { ComponentProps } from "react"
import { Book, GitFork, Star, MapPin, Users, UserPlus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type GithubRepoResource = {
  kind: "repo"
  id: number
  full_name: string
  description?: string | null
  html_url: string
  visibility?: string | null
  private?: boolean
  language?: string | null
  languageColor?: string | null
  stargazers_count?: number | null
  forks_count?: number | null
  pushed_at?: string | null
  updated_at?: string | null
  owner?: {
    id?: number
    login: string
    avatar_url?: string | null
    html_url: string
    name?: string | null
    bio?: string | null
    followers?: number | null
    following?: number | null
    location?: string | null
  } | null
}

type GithubUserResource = {
  kind: "user"
  id: number
  login: string
  name?: string | null
  avatar_url?: string | null
  html_url: string
  bio?: string | null
  followers?: number | null
  following?: number | null
  location?: string | null
}

function cn(...classes: (string | null | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

export type GithubRepoReplicaProps = {
  data: GithubRepoResource
  className?: string
  linkProps?: ComponentProps<"a">
}

export function GithubRepoReplica({ data, className, linkProps }: GithubRepoReplicaProps) {
  const ownerUser = data.owner
    ? {
        id: data.owner.id,
        login: data.owner.login,
        html_url: data.owner.html_url,
        avatar_url: data.owner.avatar_url,
      }
    : null

  const content = (
    <div className={cn("inline-flex items-center gap-2", className)}>
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
        aria-label={`Open repository ${data.full_name}`}
        {...linkProps}
      >
        <bdi className="font-medium">{data.full_name}</bdi>
      </Link>
    </div>
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent
        sideOffset={12}
        align="start"
        className="flex min-w-[220px] max-w-sm flex-col gap-3.5 text-sm"
      >
        <div className="flex items-center gap-2">
          <Book className="size-4 text-muted-foreground" />
          <Link
            href={data.html_url}
            className="font-semibold text-foreground leading-snug hover:underline"
          >
            {data.full_name}
          </Link>
          {getRepoVisibilityLabel(data) ? (
            <Badge
              variant="outline"
              className="text-muted-foreground border-muted-foreground/40 rounded-3xl"
            >
              {getRepoVisibilityLabel(data)}
            </Badge>
          ) : null}
        </div>

        {data.description ? (
          <p className="text-sm leading-snug text-muted-foreground ml-0.5">{data.description}</p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {renderLanguageBadge(data)}
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
          {formatRelativeTime(data.pushed_at ?? data.updated_at) ? (
            <span>Updated {formatRelativeTime(data.pushed_at ?? data.updated_at)}</span>
          ) : null}
        </div>
      </TooltipContent>
    </Tooltip>
  )
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

function UserHoverLink({
  user,
  className,
  ariaLabel,
  children,
}: {
  user: MinimalUser
  className?: string
  ariaLabel?: string
  children?: React.ReactNode
}) {
  const label = ariaLabel ?? `Open ${user.login} on GitHub`
  const content = children ?? user.login

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
        <UserTooltip
          data={{
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
          }}
        />
      </TooltipContent>
    </Tooltip>
  )
}

function UserTooltip({ data }: { data: GithubUserResource }) {
  return (
    <div className="flex min-w-[260px] max-w-sm flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage src={data.avatar_url ?? undefined} alt={`${data.login} avatar`} />
          <AvatarFallback>{data.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <Link href={data.html_url} className="text-lg font-semibold hover:underline">
            {data.name ?? data.login}
          </Link>
          <p className="text-sm text-muted-foreground">@{data.login}</p>
        </div>
      </div>

      {data.bio ? <p className="text-sm text-muted-foreground">{data.bio}</p> : null}

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
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

function renderLanguageBadge(data: GithubRepoResource) {
  const primaryLanguage = typeof data.language === "string" ? data.language : null
  const languageColor =
    typeof data.languageColor === "string" && data.languageColor.trim() ? data.languageColor : null

  if (!primaryLanguage) return null

  return (
    <span className="inline-flex items-center gap-1">
      <div
        className={cn(
          "rounded-full size-3 border border-border/40",
          languageColor ? "" : "bg-accent"
        )}
        style={
          languageColor ? { backgroundColor: languageColor, borderColor: languageColor } : undefined
        }
        aria-hidden
      />
      {primaryLanguage}
    </span>
  )
}

function getRepoVisibilityLabel(data: GithubRepoResource) {
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

function formatNumber(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value)
}
