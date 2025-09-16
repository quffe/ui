"use client"

import { GithubMention } from "@/components/Mentions/Github/GithubMention"

export function Example() {
  return (
    <div className="space-y-3">
      <GithubMention
        url="https://github.com/vercel/next.js/pull/123"
        useServer
        render={data => {
          const chip = (
            <span className="rounded bg-muted px-2 py-0.5">{data.kind.toUpperCase()}</span>
          )
          switch (data.kind) {
            case "pull":
              return (
                <span className="inline-flex items-center gap-2 text-sm">
                  {chip}
                  <a href={data.html_url} className="underline">
                    {data.title}
                  </a>
                </span>
              )
            case "issue":
              return (
                <span className="inline-flex items-center gap-2 text-sm">
                  {chip}
                  <a href={data.html_url} className="underline">
                    {data.title}
                  </a>
                </span>
              )
            case "repo":
              return (
                <span className="inline-flex items-center gap-2 text-sm">
                  {chip}
                  <a href={data.html_url} className="underline">
                    {data.full_name}
                  </a>
                </span>
              )
            case "user":
              return (
                <span className="inline-flex items-center gap-2 text-sm">
                  {chip}
                  <a href={data.html_url} className="underline">
                    {data.name ?? data.login}
                  </a>
                </span>
              )
          }
        }}
        linkProps={{ target: "_blank", rel: "noopener noreferrer" }}
      />
    </div>
  )
}
