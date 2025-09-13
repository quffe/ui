import { NextRequest, NextResponse } from "next/server"
import { parseGithubUrl } from "@/lib/github/parse-url"

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
  const sanitized = sanitize(data)

  const res = NextResponse.json(sanitized, { status: 200 })
  const etag = ghRes.headers.get("etag")
  if (etag) res.headers.set("etag", etag)
  return res
}

function sanitize(data: unknown): unknown {
  if (data == null || typeof data !== "object") return data

  if ("merged_at" in data || "draft" in data) {
    // PR
    const obj = data as Record<string, unknown>
    const user = obj.user as Record<string, unknown> | undefined
    const base = obj.base as { repo?: { full_name?: string } } | undefined
    const labelsRaw = obj.labels as unknown
    return {
      kind: "pull",
      id: obj.id,
      number: obj.number,
      state: obj.state,
      merged_at: obj.merged_at,
      draft: obj.draft,
      title: obj.title,
      user: { login: user?.login as string, avatar_url: (user?.avatar_url as string) ?? null, html_url: user?.html_url as string },
      created_at: obj.created_at,
      html_url: obj.html_url,
      labels: Array.isArray(labelsRaw)
        ? (labelsRaw as unknown[]).map(l => {
            const o = l as Record<string, unknown>
            return { id: o.id as number, name: String(o.name), color: typeof o.color === "string" ? o.color : undefined }
          })
        : undefined,
      base: { repo: { full_name: base?.repo?.full_name } },
    }
  }

  if ("title" in data && "comments" in data) {
    // Issue
    const obj = data as Record<string, unknown>
    const user = obj.user as Record<string, unknown> | undefined
    const labelsRaw = obj.labels as unknown
    return {
      kind: "issue",
      id: obj.id,
      number: obj.number,
      state: obj.state,
      title: obj.title,
      user: { login: user?.login as string, avatar_url: (user?.avatar_url as string) ?? null, html_url: user?.html_url as string },
      created_at: obj.created_at,
      html_url: obj.html_url,
      comments: obj.comments,
      labels: Array.isArray(labelsRaw)
        ? (labelsRaw as unknown[]).map(l => {
            const o = l as Record<string, unknown>
            return { id: o.id as number, name: String(o.name), color: typeof o.color === "string" ? o.color : undefined }
          })
        : undefined,
    }
  }

  if ("login" in data) {
    // User
    const obj = data as Record<string, unknown>
    return {
      kind: "user",
      id: obj.id,
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

  if ("full_name" in data) {
    // Repo
    const obj = data as Record<string, unknown>
    return {
      kind: "repo",
      id: obj.id,
      name: obj.name as string,
      full_name: obj.full_name as string,
      description: (obj.description as string) ?? null,
      html_url: obj.html_url as string,
      stargazers_count: obj.stargazers_count as number,
      forks_count: obj.forks_count as number,
      open_issues_count: obj.open_issues_count as number,
    }
  }

  return data
}
