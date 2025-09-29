"use client"

import { GithubReplica } from "@/components/Replica/Github/GithubReplica"

export function Example() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {/* PR Open (example; state may change over time) */}
      <GithubReplica url="https://github.com/vercel/next.js/pull/123" useServer />

      {/* PR Draft (example; if changes, the badge will reflect) */}
      <GithubReplica url="https://github.com/vercel/next.js/pull/12345" useServer />

      {/* PR Merged (stable once merged) */}
      <GithubReplica url="https://github.com/vercel/next.js/pull/1" useServer />

      {/* Issue Closed (example; shows comments count) */}
      <GithubReplica url="https://github.com/vercel/next.js/issues/1" useServer />

      {/* Error state (invalid URL) */}
      <GithubReplica url="https://github.com/this/does/not/exist/issue/99999999" useServer />
    </div>
  )
}
