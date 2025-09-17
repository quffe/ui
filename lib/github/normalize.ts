import type { GithubResource } from "@/lib/github/types"

export function normalizeGithubResource(data: unknown): GithubResource {
  if (typeof data !== "object" || data == null) throw new Error("Unsupported GitHub response shape")
  const obj = data as Record<string, unknown>

  if ("kind" in obj && "html_url" in obj) {
    return obj as GithubResource
  }

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
