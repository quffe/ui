"use client"

import { useGithubMention } from "@/hooks/use-github-mention"

export function ErrorExample() {
  const { data, error, isLoading, invalidReason } = useGithubMention("not-a-github-url")

  if (invalidReason) {
    return <div className="text-sm text-muted-foreground">Invalid: {invalidReason}</div>
  }

  if (isLoading) return <div className="text-sm">Loading…</div>

  if (error) {
    const anyErr = error as any
    return (
      <div className="text-sm">
        Error: {error.message}
        {anyErr?.code ? <span className="text-muted-foreground"> ({anyErr.code})</span> : null}
      </div>
    )
  }

  return <div className="text-sm">Loaded: {data?.kind}</div>
}
