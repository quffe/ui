"use client"

import { GithubMention } from "@/components/Mentions/Github/GithubMention"

export function Example() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {/* User */}
      <GithubMention url="https://github.com/quffe" useServer />

      {/* Repo */}
      <GithubMention url="https://github.com/vercel/next.js" useServer />

      {/* Repo */}
      <GithubMention url="https://github.com/Wan-Video/Wan2.2" useServer />

      {/* PR */}
      <GithubMention url="https://github.com/shadcn-ui/ui/pull/385" useServer />

      {/* Issue Open */}
      <GithubMention url="https://github.com/mathialo/bython/issues/38" useServer />

      {/* Issue Close */}
      <GithubMention url="https://github.com/denoland/deno/issues/30824" useServer />
    </div>
  )
}
