"use client"

import { GithubMention } from "@/components/Mentions/Github/GithubMention"

export function Example() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {/* User */}
      <GithubMention url="https://github.com/vercel" />

      {/* Repo */}
      <GithubMention url="https://github.com/vercel/next.js" />

      {/* PR */}
      <GithubMention url="https://github.com/vercel/next.js/pull/123" />

      {/* Issue */}
      <GithubMention url="https://github.com/vercel/next.js/issues/1" />
    </div>
  )
}
