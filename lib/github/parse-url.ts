import type { ResourceKind } from "@/lib/github/types"

export type ParsedGithubUrl =
  | { kind: "pull"; owner: string; repo: string; number: number }
  | { kind: "issue"; owner: string; repo: string; number: number }
  | { kind: "repo"; owner: string; repo: string }
  | { kind: "user"; username: string }
  | { kind: "unknown" }

export function parseGithubUrl(input: string): ParsedGithubUrl {
  try {
    const url = new URL(input)
    if (url.hostname !== "github.com") return { kind: "unknown" }

    const parts = url.pathname.replace(/\/+$/, "").split("/").filter(Boolean)

    // /owner -> user profile
    if (parts.length === 1) {
      return { kind: "user", username: parts[0] }
    }

    // /owner/repo -> repo
    if (parts.length === 2) {
      const [owner, repo] = parts
      return { kind: "repo", owner, repo }
    }

    // /owner/repo/pull/123
    // /owner/repo/pulls/123 (rare canonicalization)
    if (parts.length >= 4 && (parts[2] === "pull" || parts[2] === "pulls")) {
      const [owner, repo, , num] = parts
      const n = Number(num)
      if (Number.isFinite(n)) return { kind: "pull", owner, repo, number: n }
    }

    // /owner/repo/issues/123 or /owner/repo/issue/123
    if (parts.length >= 4 && (parts[2] === "issues" || parts[2] === "issue")) {
      const [owner, repo, , num] = parts
      const n = Number(num)
      if (Number.isFinite(n)) return { kind: "issue", owner, repo, number: n }
    }

    return { kind: "unknown" }
  } catch {
    return { kind: "unknown" }
  }
}

export function kindFromParsed(parsed: ParsedGithubUrl): ResourceKind {
  return parsed.kind
}
