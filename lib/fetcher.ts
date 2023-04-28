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
  } catch (e) {}
}

const defaultFetchOptions = {
  refetchOnWindowFocus: false,
  retry: false,
  refetchOnMount: false,
}

export const useFetch = <TFetcher extends { params: {}; data: any }>(
  fetch: {
    url: string
    search?: TSearchParams<TFetcher["params"]>
    options?: RequestInit
  },
  options?: UseQueryOptions<TFetcher["data"]>,
) => {
  return useQuery<TFetcher["data"]>({
    queryKey: createKey(fetch.url, fetch.search),
    queryFn: () =>
      fetcher(combineFetchUrl(fetch.url, fetch.search), fetch.options),
    ...defaultFetchOptions,
    ...options,
  })
}

export const useGenericMutation = <TFetcher extends { params: {}; data: any }>(
  fetch: {
    url: string
    search?: TSearchParams<TFetcher["params"]>
    options?: RequestInit
  },
  options?: {
    invalidateQueries?: Parameters<QueryClient["invalidateQueries"]>
    onSuccess?: (data: TFetcher["data"]) => void
  },
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (mutate: {
      url?: string
      search?: TSearchParams<TFetcher["params"]>
      options?: RequestInit
    }) =>
      fetcher(
        combineFetchUrl(mutate.url || fetch.url, {
          ...fetch.search,
          ...mutate.search,
        }),
        { ...fetch.options, ...mutate.options },
      ),
    onSuccess: (data: TFetcher["data"]) => {
      options &&
        options.invalidateQueries &&
        queryClient.invalidateQueries(options.invalidateQueries)

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
