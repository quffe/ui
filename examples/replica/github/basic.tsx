"use client"

import { GithubReplica } from "@/components/Replica/Github/GithubReplica"

export function Example() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {/* User */}
      <GithubReplica url="https://github.com/shadcn" useServer />

      {/* User */}
      <GithubReplica url="https://github.com/quffe" useServer />

      {/* Repo */}
      <GithubReplica url="https://github.com/vercel/next.js" useServer />

      {/* PR */}
      <GithubReplica url="https://github.com/shadcn-ui/ui/pull/385" useServer />

      {/* Issue Open */}
      <GithubReplica url="https://github.com/mathialo/bython/issues/38" useServer />

      {/* Issue Close */}
      <GithubReplica url="https://github.com/denoland/deno/issues/30824" useServer />
    </div>
  )
}
