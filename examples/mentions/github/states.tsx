"use client"

import { GithubMention } from "@/components/Mentions/Github/GithubMention"

export function Example() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {/* PR Open (example; state may change over time) */}
      <GithubMention url="https://github.com/vercel/next.js/pull/123" />

      {/* PR Draft (example; if changes, the badge will reflect) */}
      <GithubMention url="https://github.com/vercel/next.js/pull/12345" />

      {/* PR Merged (stable once merged) */}
      <GithubMention url="https://github.com/vercel/next.js/pull/1" />

      {/* Issue Closed (example; shows comments count) */}
      <GithubMention url="https://github.com/vercel/next.js/issues/1" />

      {/* Error state (invalid URL) */}
      <GithubMention url="https://github.com/this/does/not/exist/issue/99999999" />
    </div>
  )
}
