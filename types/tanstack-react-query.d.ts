declare module "@tanstack/react-query" {
  export type QueryKey = readonly unknown[]
  export type UseQueryResult<TData = unknown, TError = unknown> = {
    data: TData | undefined
    error: TError | null
    isLoading: boolean
    refetch: () => void
  }
  export function useQuery<TData = unknown, TError = unknown>(options: {
    queryKey: QueryKey
    queryFn: () => Promise<TData>
    enabled?: boolean
    staleTime?: number
    suspense?: boolean
  }): UseQueryResult<TData, TError>
}
