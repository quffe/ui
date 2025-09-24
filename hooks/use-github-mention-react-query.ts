"use client"

import { parseGithubUrl } from "@/lib/github/parse-url"
import type { GithubResource, ResourceKind } from "@/lib/github/types"
import { clientEndpointFor, getGithubResource } from "@/lib/github/resource"
import { useQuery } from "@tanstack/react-query"

type UseGithubMentionQueryOptions = {
  useServer?: boolean
  staleTime?: number
  suspense?: boolean
}

export type UseGithubMentionQueryResult = {
  kind: ResourceKind
  data: GithubResource | null
  isLoading: boolean
  error: Error | null
  refetch: () => void
  invalidReason?: "EMPTY_URL" | "INVALID_GITHUB_URL"
}

export function useGithubMentionQuery(
  url: string,
  opts: UseGithubMentionQueryOptions = {}
): UseGithubMentionQueryResult {
  const trimmed = (url ?? "").trim()
  const invalidReason = !trimmed
    ? ("EMPTY_URL" as const)
    : parseGithubUrl(trimmed).kind === "unknown"
      ? ("INVALID_GITHUB_URL" as const)
      : undefined

  const endpoint = invalidReason ? null : clientEndpointFor(trimmed, opts.useServer)

  const query = useQuery<GithubResource>({
    queryKey: ["github-resource", endpoint],
    queryFn: () => getGithubResource(trimmed, { useServer: opts.useServer }),
    enabled: Boolean(endpoint),
    staleTime: opts.staleTime ?? 5 * 60 * 1000,
    suspense: opts.suspense,
  })

  const parsed = parseGithubUrl(trimmed)
  const kind: ResourceKind = parsed.kind

  return {
    kind,
    data: query.data ?? null,
    isLoading: query.isLoading,
    error: (query.error as Error | null) ?? null,
    refetch: () => query.refetch(),
    invalidReason,
  }
}
