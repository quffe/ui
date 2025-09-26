"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Loader2, Wand2 } from "lucide-react"

import { GithubMentionDisplay } from "@/components/Mentions/Github/GithubMentionDisplay"
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { CodeBlock } from "@/components/internal/ui/code-block"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { GithubResource } from "@/lib/github/types"

const EXAMPLE_URLS = [
  "https://github.com/vercel/next.js",
  "https://github.com/shadcn-ui/ui",
  "https://github.com/vercel/next.js/pull/67816",
  "https://github.com/vercel/next.js/issues/56783",
]

type GeneratorResponse = {
  resource: GithubResource
  code: string
  componentName: string
  slug: string
  registry: unknown
}

export function GeneratorClient() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resource, setResource] = useState<GithubResource | null>(null)
  const [code, setCode] = useState<string>("")
  const [componentName, setComponentName] = useState<string>("")
  const [slug, setSlug] = useState<string>("")
  const [requestedUrl, setRequestedUrl] = useState<string>("")
  const [origin, setOrigin] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
    }
  }, [])

  const cliCommand = useMemo(() => {
    if (!origin || !requestedUrl) return ""
    const params = new URLSearchParams({ url: requestedUrl, registry: "1" })
    return `npx shadcn@latest add ${origin}/api/mentions/generator?${params.toString()}`
  }, [origin, requestedUrl])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) {
      setError("Paste a GitHub URL to generate a snapshot")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ url: trimmed })
      const response = await fetch(`/api/mentions/generator?${params.toString()}`)
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error ?? "Request failed")
      }

      const json = (await response.json()) as GeneratorResponse
      setResource(json.resource)
      setCode(json.code)
      setComponentName(json.componentName)
      setSlug(json.slug)
      setRequestedUrl(trimmed)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error")
      setResource(null)
      setCode("")
      setComponentName("")
      setSlug("")
      setRequestedUrl("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Wand2 className="size-5" /> Snapshot Generator
          </CardTitle>
          <CardDescription>
            Paste any GitHub repository, issue, pull request, or user profile and we&apos;ll
            generate a static JSX snapshot of the GithubMention output you can ship without runtime
            fetching.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="github-url">GitHub URL</Label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="github-url"
                  value={input}
                  placeholder="https://github.com/vercel/next.js"
                  onChange={event => setInput(event.target.value)}
                  disabled={loading}
                  autoComplete="off"
                  inputMode="url"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" /> Generating
                    </span>
                  ) : (
                    "Generate snapshot"
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Supports issues, PRs, repos, and user profiles. Try one of these: {EXAMPLE_URLS[0]}.
              </p>
            </div>
          </form>

          {error ? (
            <Alert variant="destructive">
              <AlertTitle>Couldn&apos;t generate snapshot</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          {resource ? (
            <Card className="border-dashed">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="uppercase tracking-wide text-xs">
                    {resource.kind}
                  </Badge>
                  <CardTitle className="text-lg font-semibold">{componentName}</CardTitle>
                </div>
                <CardDescription className="space-y-1 text-sm">
                  <p className="truncate">Source: {requestedUrl}</p>
                  <p className="text-muted-foreground">File: Mentions/Github/{componentName}.tsx</p>
                  {slug ? (
                    <p className="text-muted-foreground">Registry slug: github-mention-{slug}</p>
                  ) : null}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cliCommand ? (
                  <div className="space-y-2">
                    <span className="text-xs font-medium uppercase text-muted-foreground">
                      Install via shadcn CLI
                    </span>
                    <CodeBlock language="bash" filename="shadcn">
                      {cliCommand}
                    </CodeBlock>
                  </div>
                ) : null}
                <div className="space-y-2">
                  <span className="text-xs font-medium uppercase text-muted-foreground">
                    Preview
                  </span>
                  <PreviewTabs
                    title="GithubMention snapshot"
                    preview={<GithubMentionDisplay resource={resource} className="text-sm" />}
                    code={code}
                    language="tsx"
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base">Waiting for input</CardTitle>
                <CardDescription className="text-sm">
                  Paste a GitHub URL above to render a live preview and generated JSX.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2">
                  {EXAMPLE_URLS.map(example => (
                    <Button
                      key={example}
                      variant="outline"
                      className="justify-start"
                      type="button"
                      onClick={() => setInput(example)}
                      disabled={loading}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
