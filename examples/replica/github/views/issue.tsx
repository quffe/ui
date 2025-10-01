"use client"

import { GithubIssueReplica, type GithubIssueReplicaProps } from "@/components/Replica/Github/views"

const issue: GithubIssueReplicaProps["data"] = {
  kind: "issue",
  number: 1721,
  title: "Document GitHub view components",
  html_url: "https://github.com/ui-components/ui/issues/1721",
  state: "open",
  created_at: "2024-03-14T10:12:00Z",
  body: "Tracking docs and registry support for the GitHub Replica view components. See #1700 for the meta issue.",
  comments: 8,
}

export function Example() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <GithubIssueReplica data={issue} />
    </div>
  )
}
