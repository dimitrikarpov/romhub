import {
  QueryClient,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query"
import superjson from "superjson"

const fetcher = async (url: string, options?: RequestInit) => {
  const result = await fetch(url, options)

  try {
    const json = await result.json()
    const parsedSuperjson = superjson.parse(json)

    return parsedSuperjson ? parsedSuperjson : json
  } catch (e) {
    console.log("not a JSON", result.body)
  }
}

const defaultFetchOptions = {
  staleTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false,
  retry: false,
  refetchOnMount: false,
}

export const useFetch = <TData, TParams extends {} = {}>(
  fetch: {
    url: string
    search?: TSearchParams<TParams>
    options?: RequestInit
  },
  options?: UseQueryOptions<TData>,
) => {
  const context = useQuery<TData>({
    queryKey: createKey(fetch.url, fetch.search),
    queryFn: () =>
      fetcher(combineFetchUrl(fetch.url, fetch.search), fetch.options),
    ...defaultFetchOptions,
    ...options,
  })

  return context
}

export const useGenericMutation = <TData, TParams extends {} = {}>(
  fetch: {
    url: string
    search?: TSearchParams<TParams>
    options?: RequestInit
  },
  options?: {
    invalidateQueries?: Parameters<QueryClient["invalidateQueries"]>
    onSuccess?: (data: TData) => void
  },
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (mutate: {
      url?: string
      search?: TSearchParams<TParams>
      options?: RequestInit
    }) =>
      fetcher(
        combineFetchUrl(mutate.url || fetch.url, {
          ...fetch.search,
          ...mutate.search,
        }),
        { ...fetch.options, ...mutate.options },
      ),
    onSuccess: (data: TData) => {
      options &&
        options.invalidateQueries &&
        queryClient.invalidateQueries(options.invalidateQueries)

      // queryClient.invalidateQueries({ predicate: (query) => true })

      options?.onSuccess?.(data)
    },
  })
}

const combineFetchUrl = (url: string, search?: { [key: string]: any }) => {
  if (!search) return url

  for (const prop in search) {
    if (typeof search[prop] === "object") {
      search[prop] = JSON.stringify(search[prop])
    }
  }

  return [url, new URLSearchParams(search)].join("?")
}

const createKey = (url: string, search?: {}) => {
  return search ? [url, search] : url
}

type TSearchParams<T extends {}> = {
  [K in keyof T]?: T[K]
} & { [key: string]: any }
