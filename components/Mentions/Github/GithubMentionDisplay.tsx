"use client"

import type { ComponentProps } from "react"
import type { GithubResource } from "@/lib/github/types"

import { GithubPullMention } from "./views/pull-mention"
import { GithubIssueMention } from "./views/issue-mention"
import { GithubUserMention } from "./views/user-mention"
import { GithubRepoMention } from "./views/repo-mention"

export type GithubMentionDisplayProps = {
  resource: GithubResource
  className?: string
  linkProps?: ComponentProps<"a">
}

export function GithubMentionDisplay({
  resource,
  className,
  linkProps,
}: GithubMentionDisplayProps) {
  switch (resource.kind) {
    case "pull":
      return <GithubPullMention data={resource} className={className} linkProps={linkProps} />
    case "issue":
      return <GithubIssueMention data={resource} className={className} linkProps={linkProps} />
    case "user":
      return <GithubUserMention data={resource} className={className} linkProps={linkProps} />
    case "repo":
      return <GithubRepoMention data={resource} className={className} linkProps={linkProps} />
    default:
      return <div className={className}>Unsupported GitHub URL</div>
  }
}
