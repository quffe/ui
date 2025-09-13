"use client"

import useSWR from "swr"

import { parseGithubUrl } from "@/lib/github/parse-url"
import type { GithubResource, ResourceKind } from "@/lib/github/types"

type UseGithubMentionOptions = {
  useServer?: boolean
  refreshInterval?: number
  revalidateOnFocus?: boolean
  suspense?: boolean
}

export type UseGithubMentionResult = {
  kind: ResourceKind
  data: GithubResource | null
  isLoading: boolean
  error: Error | null
  refetch: () => void
  invalidReason?: "EMPTY_URL" | "INVALID_GITHUB_URL"
}

function clientEndpointFor(url: string, useServer?: boolean): string | null {
  const parsed = parseGithubUrl(url)
  if (parsed.kind === "unknown") return null

  if (useServer) {
    const params = new URLSearchParams({ url })
    return `/api/github/resource?${params.toString()}`
  }

  switch (parsed.kind) {
    case "pull":
      return `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/pulls/${parsed.number}`
    case "issue":
      return `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/issues/${parsed.number}`
    case "user":
      return `https://api.github.com/users/${parsed.username}`
    case "repo":
      return `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`
    default:
      return null
  }
}

class GithubApiError extends Error {
  statusCode?: number
  code?: "RATE_LIMITED" | "HTTP_ERROR"
  constructor(message: string, statusCode?: number, code?: "RATE_LIMITED" | "HTTP_ERROR") {
    super(message)
    this.name = "GithubApiError"
    this.statusCode = statusCode
    this.code = code
  }
}

async function fetcher(url: string, opts?: { signal?: AbortSignal }): Promise<GithubResource> {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    cache: "force-cache",
    signal: opts?.signal,
  })
  if (!res.ok) {
    const rateRemaining = res.headers.get("x-ratelimit-remaining")
    const isRateLimited = res.status === 403 && rateRemaining === "0"
    throw new GithubApiError(
      `GitHub request failed: ${res.status}`,
      res.status,
      isRateLimited ? "RATE_LIMITED" : "HTTP_ERROR",
    )
  }
  const json = (await res.json()) as unknown
  return normalizeGithubResource(json)
}

function normalizeGithubResource(data: unknown): GithubResource {
  if (typeof data !== "object" || data == null) throw new Error("Unsupported GitHub response shape")
  const obj = data as Record<string, unknown>

  if ("merged_at" in obj || "draft" in obj) {
    const user = obj.user as Record<string, unknown> | undefined
    return {
      kind: "pull",
      id: obj.id as number,
      number: obj.number as number,
      state: (obj.state as string) === "open" ? "open" : "closed",
      merged: Boolean(obj.merged_at),
      draft: Boolean(obj.draft),
      title: obj.title as string,
      user: {
        login: user?.login as string,
        avatar_url: (user?.avatar_url as string) ?? null,
        html_url: user?.html_url as string,
      },
      created_at: obj.created_at as string,
      html_url: obj.html_url as string,
      labels: Array.isArray(obj.labels)
        ? (obj.labels as unknown[]).map(l => {
            const o = l as Record<string, unknown>
            return { id: o.id as number, name: String(o.name), color: typeof o.color === "string" ? o.color : undefined }
          })
        : undefined,
      base: obj.base as { repo?: { full_name?: string } },
    }
  }

  if ("title" in obj && "comments" in obj && "user" in obj && !("merged_at" in obj)) {
    const user = obj.user as Record<string, unknown> | undefined
    return {
      kind: "issue",
      id: obj.id as number,
      number: obj.number as number,
      state: (obj.state as string) === "open" ? "open" : "closed",
      title: obj.title as string,
      user: {
        login: user?.login as string,
        avatar_url: (user?.avatar_url as string) ?? null,
        html_url: user?.html_url as string,
      },
      created_at: obj.created_at as string,
      html_url: obj.html_url as string,
      comments: obj.comments as number,
      labels: Array.isArray(obj.labels)
        ? (obj.labels as unknown[]).map(l => {
            const o = l as Record<string, unknown>
            return { id: o.id as number, name: String(o.name), color: typeof o.color === "string" ? o.color : undefined }
          })
        : undefined,
    }
  }

  if ("login" in obj) {
    return {
      kind: "user",
      id: obj.id as number,
      login: obj.login as string,
      name: (obj.name as string) ?? null,
      avatar_url: (obj.avatar_url as string) ?? null,
      html_url: obj.html_url as string,
      bio: (obj.bio as string) ?? null,
      followers: obj.followers as number,
      following: obj.following as number,
      location: (obj.location as string) ?? null,
    }
  }

  if ("full_name" in obj) {
    return {
      kind: "repo",
      id: obj.id as number,
      name: obj.name as string,
      full_name: obj.full_name as string,
      description: (obj.description as string) ?? null,
      html_url: obj.html_url as string,
      stargazers_count: obj.stargazers_count as number,
      forks_count: obj.forks_count as number,
      open_issues_count: obj.open_issues_count as number,
    }
  }

  throw new Error("Unsupported GitHub response shape")
}

export function useGithubMention(url: string, opts: UseGithubMentionOptions = {}): UseGithubMentionResult {
  const trimmed = (url ?? "").trim()
  const invalidReason = !trimmed
    ? ("EMPTY_URL" as const)
    : parseGithubUrl(trimmed).kind === "unknown"
    ? ("INVALID_GITHUB_URL" as const)
    : undefined

  const endpoint = invalidReason ? null : clientEndpointFor(trimmed, opts.useServer)
  const { data, error, isLoading, mutate } = useSWR<GithubResource>(endpoint, endpoint ? fetcher : null, {
    revalidateOnFocus: opts.revalidateOnFocus ?? false,
    refreshInterval: opts.refreshInterval ?? 7 * 60 * 1000,
    suspense: opts.suspense,
  })

  const parsed = parseGithubUrl(trimmed)
  const kind: ResourceKind = parsed.kind

  return {
    kind,
    data: data ?? null,
    isLoading: Boolean(isLoading) && !error,
    error: error ?? null,
    refetch: () => mutate(),
    invalidReason,
  }
}
