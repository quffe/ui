"use client"

import Link from "next/link"
import type { ComponentProps } from "react"
import { Users, UserPlus, MapPin } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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

export type GithubUserReplicaProps = {
  data: GithubUserResource
  className?: string
  linkProps?: ComponentProps<"a">
}

export function GithubUserReplica({ data, className, linkProps }: GithubUserReplicaProps) {
  const content = (
    <div className={cn("inline-flex items-baseline gap-2", className)}>
      <Avatar className="size-4">
        <AvatarImage src={data.avatar_url ?? undefined} alt={`${data.login} avatar`} />
        <AvatarFallback aria-hidden>{data.login?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <Link
        href={data.html_url}
        className="hover:underline text-sm"
        aria-label={`Open GitHub profile for ${data.login}`}
        {...linkProps}
      >
        <bdi className="font-medium">{data.name ?? data.login}</bdi>
        <span className="text-muted-foreground"> @{data.login}</span>
      </Link>
    </div>
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent
        sideOffset={12}
        align="start"
        className="flex min-w-[260px] max-w-sm flex-col gap-4 border border-border bg-popover p-5 text-popover-foreground shadow-lg"
      >
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
      </TooltipContent>
    </Tooltip>
  )
}

function formatNumber(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value)
}
