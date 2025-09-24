export type ResourceKind = "pull" | "issue" | "user" | "repo" | "unknown"

export type UserMeta = {
  kind: "user"
  id: number
  login: string
  name?: string | null
  avatar_url?: string | null
  html_url: string
  bio?: string | null
  followers?: number
  following?: number
  location?: string | null
}

export type LabelMeta = {
  id: number
  name: string
  color?: string
}

export type PullMeta = {
  kind: "pull"
  id: number
  number: number
  state: "open" | "closed"
  merged: boolean
  draft: boolean
  title: string
  body?: string | null
  user: {
    id?: number
    login: string
    avatar_url?: string | null
    html_url: string
  }
  created_at: string
  updated_at?: string | null
  html_url: string
  labels?: LabelMeta[]
  base?: {
    ref?: string | null
    repo?: { full_name?: string | null }
  }
  head?: {
    ref?: string | null
    repo?: { full_name?: string | null }
  }
}

export type IssueMeta = {
  kind: "issue"
  id: number
  number: number
  state: "open" | "closed"
  title: string
  body?: string | null
  user: {
    id?: number
    login: string
    avatar_url?: string | null
    html_url: string
  }
  created_at: string
  html_url: string
  comments?: number
  labels?: LabelMeta[]
}

export type RepoMeta = {
  kind: "repo"
  id: number
  name: string
  full_name: string
  description?: string | null
  html_url: string
  stargazers_count?: number
  forks_count?: number
  open_issues_count?: number
  visibility?: string | null
  private?: boolean
  language?: string | null
  languageColor?: string | null
  pushed_at?: string | null
  updated_at?: string | null
  owner: {
    id?: number
    login: string
    avatar_url?: string | null
    html_url: string
  }
}

export type GithubResource = PullMeta | IssueMeta | UserMeta | RepoMeta
