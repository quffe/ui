import { promises as fs } from "fs"
import path from "path"

import { NextRequest, NextResponse } from "next/server"

import { getGithubResource, GithubApiError } from "@/lib/github/resource"
import type { GithubResource } from "@/lib/github/types"

type SnapshotContext = {
  resource: GithubResource
  componentName: string
  url: string
}

type SnapshotPayload = {
  code: string
  registryDependencies: string[]
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url")?.trim()
  const baseUrl = req.nextUrl.origin
  const wantsRegistryOnly = searchParams.has("registry")

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 })
  }

  let resource: GithubResource
  try {
    resource = await getGithubResource(url, { useServer: true, baseUrl })
  } catch (error) {
    if (error instanceof GithubApiError) {
      return NextResponse.json(
        { error: error.message, code: error.code ?? "HTTP_ERROR" },
        { status: error.statusCode ?? 500 }
      )
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch GitHub data" },
      { status: 500 }
    )
  }

  const sanitizedResource = sanitizeResource(resource)
  const slug = buildSlug(url, sanitizedResource)
  const componentName = buildComponentName(slug)

  const snapshot = await buildSnapshot({ resource: sanitizedResource, componentName, url })

  const registry = {
    name: `github-mention-${slug}`,
    type: "registry:component",
    category: "Mentions",
    namespace: "@ui-components/mentions",
    description: `Static GitHub Mention snapshot for ${url}`,
    dependencies: [],
    registryDependencies: snapshot.registryDependencies,
    files: [
      {
        type: "registry:component",
        path: `Mentions/Github/${componentName}.tsx`,
        content: snapshot.code,
      },
    ],
    meta: {
      sourceUrl: url,
      resourceKind: sanitizedResource.kind,
      generatedAt: new Date().toISOString(),
    },
  }

  if (wantsRegistryOnly) {
    return NextResponse.json(registry)
  }

  return NextResponse.json({
    resource: sanitizedResource,
    registry,
    code: snapshot.code,
    componentName,
    slug,
  })
}

function sanitizeResource(resource: GithubResource) {
  return JSON.parse(JSON.stringify(resource)) as GithubResource
}

async function buildSnapshot(context: SnapshotContext): Promise<SnapshotPayload> {
  const config = componentConfig[context.resource.kind]
  if (!config) return buildFallbackSnapshot(context)

  const componentSource = await loadComponentSource(config.file)
  const dataLiteral = JSON.stringify(context.resource, null, 2)

  const lines = [
    '"use client"',
    "",
    componentSource.trim(),
    "",
    `export const githubMentionData = ${dataLiteral} as const`,
    "",
    "export type GithubMentionData = typeof githubMentionData",
    "",
    `export function ${context.componentName}() {`,
    `  return <${config.exportName} data={githubMentionData} />`,
    "}",
    "",
  ]

  return {
    code: lines.join("\n"),
    registryDependencies: config.registryDependencies,
  }
}

const componentConfig: Partial<
  Record<
    GithubResource["kind"],
    { file: string; exportName: string; registryDependencies: string[] }
  >
> = {
  pull: {
    file: "components/Mentions/Github/views/pull-mention.tsx",
    exportName: "GithubPullMention",
    registryDependencies: ["tooltip"],
  },
  issue: {
    file: "components/Mentions/Github/views/issue-mention.tsx",
    exportName: "GithubIssueMention",
    registryDependencies: ["tooltip"],
  },
  repo: {
    file: "components/Mentions/Github/views/repo-mention.tsx",
    exportName: "GithubRepoMention",
    registryDependencies: ["avatar", "badge", "tooltip"],
  },
  user: {
    file: "components/Mentions/Github/views/user-mention.tsx",
    exportName: "GithubUserMention",
    registryDependencies: ["avatar", "tooltip"],
  },
}

async function loadComponentSource(relativePath: string) {
  const absolutePath = path.join(process.cwd(), relativePath)
  const raw = await fs.readFile(absolutePath, "utf8")
  return raw.replace(/^"use client"\s*/i, "").trim()
}

function buildFallbackSnapshot({ componentName, resource }: SnapshotContext): SnapshotPayload {
  const dataLiteral = JSON.stringify(resource, null, 2)
  const code = `"use client"

export const githubMentionData = ${dataLiteral} as const

export function ${componentName}() {
  return <div>Unsupported GitHub resource</div>
}
`
  return { code: code.trim(), registryDependencies: [] }
}
function repoFromUrl(htmlUrl: string) {
  try {
    const u = new URL(htmlUrl)
    const segments = u.pathname.split("/").filter(Boolean)
    if (segments.length >= 2) return `${segments[0]}-${segments[1]}`
    return htmlUrl
  } catch {
    return htmlUrl
  }
}

function buildSlug(url: string, resource: GithubResource) {
  const segments: string[] = []

  switch (resource.kind) {
    case "repo":
      segments.push(resource.full_name)
      break
    case "user":
      segments.push(resource.login)
      break
    case "pull":
    case "issue": {
      const repo = repoFromUrl(resource.html_url)
      segments.push(`${repo}-${resource.kind}-${resource.number}`)
      break
    }
    default:
      segments.push(url)
  }

  const slug = slugify(segments.join("-"))
  return slug || "snapshot"
}

function buildComponentName(slug: string) {
  const parts = slug
    .split("-")
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
  const suffix = parts.join("") || "Snapshot"
  const name = `GithubMention${suffix}`
  if (/^[A-Za-z]/.test(name)) return truncate(name, 64)
  return "GithubMentionSnapshot"
}

function truncate(input: string, maxLength: number) {
  return input.length > maxLength ? input.slice(0, maxLength) : input
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
}
