"use client"

import useSWR from "swr"

import { parseGithubUrl } from "@/lib/github/parse-url"
import type { GithubResource, ResourceKind } from "@/lib/github/types"
import { clientEndpointFor, normalizeGithubResource, GithubApiError } from "@/lib/github/resource"

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

async function fetcher(endpoint: string): Promise<GithubResource> {
  const res = await fetch(endpoint, {
    headers: { Accept: "application/vnd.github+json" },
    cache: "force-cache",
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
  // If using our server proxy endpoint, JSON is already normalized
  if (endpoint.startsWith("/api/github/resource")) {
    return json as GithubResource
  }
  return normalizeGithubResource(json)
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
