"use client"

import { GithubMention } from "@/components/Mentions/Github/GithubMention"

export function Example() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {/* User */}
      <GithubMention url="https://github.com/vercel" useServer />

      {/* Repo */}
      <GithubMention url="https://github.com/vercel/next.js" useServer />

      {/* PR */}
      <GithubMention url="https://github.com/vercel/next.js/pull/1" useServer />

      {/* Issue */}
      <GithubMention url="https://github.com/mathialo/bython/issues/38" useServer />
    </div>
  )
}
