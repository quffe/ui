import { parseGithubUrl } from "@/lib/github/parse-url"
import type { GithubResource } from "@/lib/github/types"
import { normalizeGithubResource } from "@/lib/github/normalize"

export class GithubApiError extends Error {
  statusCode?: number
  code?: "RATE_LIMITED" | "HTTP_ERROR"
  constructor(message: string, statusCode?: number, code?: "RATE_LIMITED" | "HTTP_ERROR") {
    super(message)
    this.name = "GithubApiError"
    this.statusCode = statusCode
    this.code = code
  }
}

export function clientEndpointFor(url: string, useServer?: boolean): string | null {
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

type GetGithubResourceOptions = {
  useServer?: boolean
  signal?: AbortSignal
  baseUrl?: string
}

export async function getGithubResource(
  url: string,
  opts: GetGithubResourceOptions = {}
): Promise<GithubResource> {
  const endpoint = clientEndpointFor(url, opts.useServer)
  if (!endpoint) throw new Error("Invalid GitHub URL")

  let target = endpoint
  if (endpoint.startsWith("/") && typeof window === "undefined") {
    const resolvedBase = resolveBaseUrl(opts.baseUrl)
    if (!resolvedBase) {
      throw new Error(
        "getGithubResource: pass opts.baseUrl when calling with useServer=true on the server."
      )
    }
    target = new URL(endpoint, resolvedBase).toString()
  }

  const res = await fetch(target, {
    headers: { Accept: "application/vnd.github+json" },
    cache: "force-cache",
    signal: opts.signal,
  })
  if (!res.ok) {
    const rateRemaining = res.headers.get("x-ratelimit-remaining")
    const isRateLimited = res.status === 403 && rateRemaining === "0"
    throw new GithubApiError(
      `GitHub request failed: ${res.status}`,
      res.status,
      isRateLimited ? "RATE_LIMITED" : "HTTP_ERROR"
    )
  }
  const json = (await res.json()) as unknown
  return normalizeGithubResource(json)
}

function resolveBaseUrl(explicit?: string | null) {
  const candidates = [
    explicit,
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.APP_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ]

  for (const candidate of candidates) {
    if (!candidate) continue
    const normalized =
      candidate.startsWith("http://") || candidate.startsWith("https://")
        ? candidate
        : `https://${candidate}`
    try {
      const url = new URL(normalized)
      return url.origin
    } catch {
      continue
    }
  }

  return null
}
