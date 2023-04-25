import { UseQueryOptions, useQuery } from "react-query"
import superjson from "superjson"

export const fetcher = async (url: string, options?: RequestInit) => {
  const result = await fetch(url, options)
  const json = await result.json()
  const parsedSuperjson = superjson.parse(json)

  return parsedSuperjson ? parsedSuperjson : json
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
    ...options,
  })

  return context
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
