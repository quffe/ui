import { NextRequest, NextResponse } from "next/server"
import { parseGithubUrl } from "@/lib/github/parse-url"
import { normalizeGithubResource } from "@/lib/github/normalize"

const RETRYABLE_STATUS_CODES = new Set([401, 403, 429])

function resolveGithubTokens(): string[] {
  const candidates = [
    process.env.GITHUB_TOKEN,
    process.env.GITHUB_TOKEN_ORG,
    process.env.GH_TOKEN,
  ]
  const publicToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  if (publicToken) candidates.push(publicToken) /* avoid using public tokens unless necessary */

  const tokens: string[] = []
  const seen = new Set<string>()

  for (const candidate of candidates) {
    if (!candidate) continue
    const token = candidate.trim()
    if (!token || token.startsWith("public_")) continue
    if (seen.has(token)) continue
    seen.add(token)
    tokens.push(token)
  }

  return tokens
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url")
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 })

  const parsed = parseGithubUrl(url)
  if (parsed.kind === "unknown")
    return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 })

  let endpoint: string
  switch (parsed.kind) {
    case "pull":
      endpoint = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/pulls/${parsed.number}`
      break
    case "issue":
      endpoint = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/issues/${parsed.number}`
      break
    case "user":
      endpoint = `https://api.github.com/users/${parsed.username}`
      break
    case "repo":
      endpoint = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`
      break
    default:
      return NextResponse.json({ error: "Unsupported kind" }, { status: 400 })
  }

  const ifNoneMatch = req.headers.get("if-none-match")

  const baseHeaders: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ui-components/gh-resource",
  }

  if (ifNoneMatch) baseHeaders["If-None-Match"] = ifNoneMatch

  const tokens = resolveGithubTokens()
  let ghRes: Response | null = null
  let errorPayload: { message?: string } | null = null

  for (const token of tokens) {
    const res = await fetch(endpoint, {
      headers: { ...baseHeaders, Authorization: `Bearer ${token}` },
      next: { revalidate: 300 },
    })
    ghRes = res

    if (res.status === 304) {
      return new NextResponse(null, { status: 304 })
    }

    if (res.ok) {
      errorPayload = null
      break
    }

    if (RETRYABLE_STATUS_CODES.has(res.status)) {
      errorPayload = (await res.clone().json().catch(() => null)) as { message?: string } | null
      continue
    }

    errorPayload = (await res.clone().json().catch(() => null)) as { message?: string } | null
    break
  }

  const shouldAttemptAnonymous =
    !ghRes || (!ghRes.ok && RETRYABLE_STATUS_CODES.has(ghRes.status))

  if (shouldAttemptAnonymous) {
    const res = await fetch(endpoint, {
      headers: baseHeaders,
      next: { revalidate: 300 },
    })
    ghRes = res

    if (res.status === 304) {
      return new NextResponse(null, { status: 304 })
    }

    if (!res.ok) {
      errorPayload = (await res.clone().json().catch(() => null)) as { message?: string } | null
    } else {
      errorPayload = null
    }
  }

  if (!ghRes) {
    return NextResponse.json({ error: "GitHub request failed" }, { status: 500 })
  }

  if (ghRes.status === 304) {
    return new NextResponse(null, { status: 304 })
  }

  if (!ghRes.ok) {
    const message =
      errorPayload?.message && errorPayload.message.trim().length
        ? errorPayload.message
        : `GitHub error ${ghRes.status}`
    return NextResponse.json({ error: message }, { status: ghRes.status })
  }

  const data = (await ghRes.json()) as unknown
  const normalized = normalizeGithubResource(data)

  const res = NextResponse.json(normalized, { status: 200 })
  const etag = ghRes.headers.get("etag")
  if (etag) res.headers.set("etag", etag)
  return res
}

// normalization handled via normalizeGithubResource
