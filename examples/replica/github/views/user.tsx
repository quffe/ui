"use client"

import { GithubUserReplica, type GithubUserReplicaProps } from "@/components/Replica/Github/views"

const user: GithubUserReplicaProps["data"] = {
  kind: "user",
  id: 1345,
  login: "octokit",
  name: "Octo Kit",
  avatar_url: "https://avatars.githubusercontent.com/u/3430433?v=4",
  html_url: "https://github.com/octokit",
  bio: "Tools and SDKs for working with the GitHub API.",
  followers: 15700,
  following: 12,
  location: "GitHub HQ",
}

export function Example() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <GithubUserReplica data={user} />
    </div>
  )
}
