import type { GithubResource } from "@/lib/github/types"
import { getGithubLanguageColor } from "@/lib/github/language-colors"

export function normalizeGithubResource(data: unknown): GithubResource {
  if (typeof data !== "object" || data == null) throw new Error("Unsupported GitHub response shape")
  const obj = data as Record<string, unknown>

  if ("kind" in obj && "html_url" in obj) {
    return obj as GithubResource
  }

  if ("merged_at" in obj || "draft" in obj) {
    const user = obj.user as Record<string, unknown> | undefined
    const base = obj.base as Record<string, unknown> | undefined
    const head = obj.head as Record<string, unknown> | undefined

    const normalizeRepo = (repo: Record<string, unknown> | undefined) => {
      if (!repo) return undefined
      const fullName = repo["full_name"]
      if (typeof fullName === "string") return { full_name: fullName }
      if (fullName === null) return { full_name: null }
      return undefined
    }

    return {
      ...obj,
      kind: "pull",
      id: obj.id as number,
      number: obj.number as number,
      state: (obj.state as string) === "open" ? "open" : "closed",
      merged: Boolean(obj.merged_at),
      draft: Boolean(obj.draft),
      title: obj.title as string,
      body:
        typeof obj.body === "string" ? (obj.body as string) : obj.body === null ? null : undefined,
      user: {
        id: typeof user?.id === "number" ? (user.id as number) : undefined,
        login: user?.login as string,
        avatar_url: (user?.avatar_url as string) ?? null,
        html_url: user?.html_url as string,
      },
      created_at: obj.created_at as string,
      updated_at:
        typeof obj.updated_at === "string"
          ? (obj.updated_at as string)
          : obj.updated_at instanceof Date
            ? (obj.updated_at as Date).toISOString()
            : undefined,
      html_url: obj.html_url as string,
      labels: Array.isArray(obj.labels)
        ? (obj.labels as unknown[]).map(l => {
            const o = l as Record<string, unknown>
            return {
              id: o.id as number,
              name: String(o.name),
              color: typeof o.color === "string" ? o.color : undefined,
            }
          })
        : undefined,
      base: base
        ? {
            ref:
              typeof base.ref === "string"
                ? (base.ref as string)
                : base.ref === null
                  ? null
                  : undefined,
            repo: normalizeRepo(base.repo as Record<string, unknown> | undefined),
          }
        : undefined,
      head: head
        ? {
            ref:
              typeof head.ref === "string"
                ? (head.ref as string)
                : head.ref === null
                  ? null
                  : undefined,
            repo: normalizeRepo(head.repo as Record<string, unknown> | undefined),
          }
        : undefined,
    }
  }

  if ("title" in obj && "comments" in obj && "user" in obj && !("merged_at" in obj)) {
    const user = obj.user as Record<string, unknown> | undefined
    return {
      ...obj,
      kind: "issue",
      id: obj.id as number,
      number: obj.number as number,
      state: (obj.state as string) === "open" ? "open" : "closed",
      title: obj.title as string,
      user: {
        id: typeof user?.id === "number" ? (user.id as number) : undefined,
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
            return {
              id: o.id as number,
              name: String(o.name),
              color: typeof o.color === "string" ? o.color : undefined,
            }
          })
        : undefined,
    }
  }

  if ("login" in obj) {
    return {
      ...obj,
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
    const owner = obj.owner as Record<string, unknown> | undefined
    const ownerLogin = typeof owner?.login === "string" ? (owner.login as string) : undefined
    const fallbackOwnerUrl = ownerLogin ? `https://github.com/${ownerLogin}` : undefined
    const visibility =
      typeof obj.visibility === "string"
        ? (obj.visibility as string)
        : typeof obj.private === "boolean"
          ? obj.private
            ? "private"
            : "public"
          : null

    const language =
      typeof obj.language === "string"
        ? (obj.language as string)
        : obj.language === null
          ? null
          : undefined

    const languageColor =
      typeof language === "string"
        ? getGithubLanguageColor(language)
        : language === null
          ? null
          : undefined

    const pushedAt =
      typeof obj.pushed_at === "string"
        ? (obj.pushed_at as string)
        : obj.pushed_at instanceof Date
          ? (obj.pushed_at as Date).toISOString()
          : null

    const updatedAt =
      typeof obj.updated_at === "string"
        ? (obj.updated_at as string)
        : obj.updated_at instanceof Date
          ? (obj.updated_at as Date).toISOString()
          : null

    return {
      ...obj,
      kind: "repo",
      id: obj.id as number,
      name: obj.name as string,
      full_name: obj.full_name as string,
      description: (obj.description as string) ?? null,
      html_url: obj.html_url as string,
      stargazers_count: obj.stargazers_count as number,
      forks_count: obj.forks_count as number,
      open_issues_count: obj.open_issues_count as number,
      visibility,
      private: typeof obj.private === "boolean" ? Boolean(obj.private) : undefined,
      language,
      languageColor,
      pushed_at: pushedAt,
      updated_at: updatedAt,
      owner: owner
        ? {
            id: typeof owner.id === "number" ? (owner.id as number) : undefined,
            login: ownerLogin ?? String(owner?.login ?? ""),
            avatar_url: (owner?.avatar_url as string) ?? null,
            html_url: (owner?.html_url as string) ?? fallbackOwnerUrl ?? (obj.html_url as string),
          }
        : {
            login: String(obj.full_name).split("/")?.[0] ?? "",
            html_url: fallbackOwnerUrl ?? (obj.html_url as string),
            avatar_url: null,
          },
    }
  }

  throw new Error("Unsupported GitHub response shape")
}
