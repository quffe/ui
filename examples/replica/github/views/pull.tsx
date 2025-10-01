"use client"

import { GithubPullReplica, type GithubPullReplicaProps } from "@/components/Replica/Github/views"

const pull: GithubPullReplicaProps["data"] = {
  kind: "pull",
  number: 482,
  title: "Add GitHub view documentation",
  html_url: "https://github.com/ui-components/ui/pull/482",
  state: "open",
  draft: false,
  created_at: "2024-02-01T09:00:00Z",
  updated_at: "2024-03-15T08:30:00Z",
  base: { repo: { full_name: "ui-components/ui" }, ref: "main" },
  head: { repo: { full_name: "ui-components/ui" }, ref: "docs/github-views" },
  user: { login: "octocat" },
  body: "## Summary\n- document GitHub view components\n- add registry entries\n\nFixes #1721.",
}

export function Example() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <GithubPullReplica data={pull} />
    </div>
  )
}
