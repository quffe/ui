"use client"

import { useEffect, type ComponentProps } from "react"

import { useGithubReplica } from "@/hooks/use-github-replica"
import { parseGithubUrl } from "@/lib/github/parse-url"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { GithubReplicaDisplay } from "./GithubReplicaDisplay"

type GithubReplicaProps = {
  url: string
  useServer?: boolean
  className?: string
  linkProps?: ComponentProps<"a">
  onError?: (error: Error) => void
}

export function GithubReplica({
  url,
  useServer,
  className,
  linkProps,
  onError,
}: GithubReplicaProps) {
  const { data, isLoading, error, refetch } = useGithubReplica(url, { useServer })

  useEffect(() => {
    if (error) onError?.(error)
  }, [error, onError])

  if (isLoading) return <GithubReplicaSkeleton className={className} />
  if (error || !data)
    return (
      <GithubReplicaError
        url={url}
        onRetry={refetch}
        className={className}
        error={error ?? undefined}
      />
    )

  return <GithubReplicaDisplay resource={data} className={className} linkProps={linkProps} />
}

function GithubReplicaSkeleton({ className }: { className?: string }) {
  return (
    <div className={`inline-flex items-baseline gap-2 ${className ?? ""}`} aria-busy="true">
      <Skeleton className="h-4 w-4 rounded-full" />
      <div className="flex items-baseline gap-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  )
}

function GithubReplicaError({
  url,
  onRetry,
  className,
  error,
}: {
  url: string
  onRetry: () => void
  className?: string
  error?: Error
}) {
  const parsed = parseGithubUrl(url)
  const anyErr = error as unknown as
    | { statusCode?: number; code?: string; message?: string }
    | undefined
  return (
    <div className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span className="text-xs text-muted-foreground">Could not load</span>
      <span className="text-xs truncate max-w-[24rem] text-muted-foreground">
        {parsed.kind !== "unknown" ? url : "Invalid GitHub URL"}
      </span>
      <Button
        size="sm"
        variant="outline"
        onClick={onRetry}
        aria-label="Retry loading GitHub data"
        title={anyErr?.message}
      >
        Retry
      </Button>
      {error ? (
        <span className="text-[11px] text-muted-foreground">
          {anyErr?.statusCode ? `HTTP ${anyErr.statusCode}` : null}
          {anyErr?.code ? ` (${anyErr.code})` : null}
          {anyErr?.statusCode || anyErr?.code ? ": " : null}
          {error.message}
          {anyErr?.code === "RATE_LIMITED"
            ? " – add GITHUB_TOKEN and/or useServer for higher limits"
            : null}
        </span>
      ) : null}
    </div>
  )
}

export default GithubReplica
