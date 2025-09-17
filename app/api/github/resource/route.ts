import { NextRequest, NextResponse } from "next/server"
import { parseGithubUrl } from "@/lib/github/parse-url"
import { normalizeGithubResource } from "@/lib/github/normalize"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN /* avoid using public */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url")
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 })

  const parsed = parseGithubUrl(url)
  if (parsed.kind === "unknown") return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 })

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

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ui-components/gh-resource",
  }
  if (GITHUB_TOKEN && !String(GITHUB_TOKEN).startsWith("public_")) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`
  }

  const ifNoneMatch = req.headers.get("if-none-match")
  if (ifNoneMatch) headers["If-None-Match"] = ifNoneMatch

  const ghRes = await fetch(endpoint, {
    headers,
    next: { revalidate: 300 },
  })

  if (ghRes.status === 304) {
    return new NextResponse(null, { status: 304 })
  }

  if (!ghRes.ok) {
    return NextResponse.json({ error: `GitHub error ${ghRes.status}` }, { status: ghRes.status })
  }

  const data = (await ghRes.json()) as unknown
  const normalized = normalizeGithubResource(data)

  const res = NextResponse.json(normalized, { status: 200 })
  const etag = ghRes.headers.get("etag")
  if (etag) res.headers.set("etag", etag)
  return res
}

// normalization handled via normalizeGithubResource
