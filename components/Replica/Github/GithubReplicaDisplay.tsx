"use client"

import type { ComponentProps } from "react"
import type { GithubResource } from "@/lib/github/types"

import { GithubPullReplica } from "./views/pull-replica"
import { GithubIssueReplica } from "./views/issue-replica"
import { GithubUserReplica } from "./views/user-replica"
import { GithubRepoReplica } from "./views/repo-replica"

export type GithubReplicaDisplayProps = {
  resource: GithubResource
  className?: string
  linkProps?: ComponentProps<"a">
}

export function GithubReplicaDisplay({
  resource,
  className,
  linkProps,
}: GithubReplicaDisplayProps) {
  switch (resource.kind) {
    case "pull":
      return <GithubPullReplica data={resource} className={className} linkProps={linkProps} />
    case "issue":
      return <GithubIssueReplica data={resource} className={className} linkProps={linkProps} />
    case "user":
      return <GithubUserReplica data={resource} className={className} linkProps={linkProps} />
    case "repo":
      return <GithubRepoReplica data={resource} className={className} linkProps={linkProps} />
    default:
      return <div className={className}>Unsupported GitHub URL</div>
  }
}
