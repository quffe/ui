"use client"

import { GithubRepoReplica, type GithubRepoReplicaProps } from "@/components/Replica/Github/views"

const repo: GithubRepoReplicaProps["data"] = {
  kind: "repo",
  id: 1923,
  full_name: "quffeui/ui",
  description: "Accessible GitHub-inspired replica components for docs and demos.",
  html_url: "https://github.com/quffeui/ui",
  visibility: "public",
  language: "TypeScript",
  languageColor: "#3178c6",
  stargazers_count: 4210,
  forks_count: 380,
  pushed_at: "2024-03-10T12:20:00Z",
  owner: {
    login: "quffeui",
    html_url: "https://github.com/quffeui",
    avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
    name: "QuffeUI",
    followers: 1280,
    following: 12,
    location: "Remote",
  },
}

export function Example() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <GithubRepoReplica data={repo} />
    </div>
  )
}
