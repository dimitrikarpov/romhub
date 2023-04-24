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
    // search?: Record<string, string>
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

const combineFetchUrl = (url: string, search?: {}) => {
  return search ? [url, new URLSearchParams(search)].join("?") : url
}

// const createKey = (url: string, search?: Record<string, string>) => {
//   return search ? [url, search] : url
// }

const createKey = (url: string, search?: {}) => {
  return search ? [url, search] : url
}

////////////////////////////////////////////////////////////////

// type A = { a: string; b: TSearchParams<{ aa: string; bb?: number }> }

// let a: A

// a.b.aa = 7

// type TSearchParams<T> = T extends { [key: string]: string }
//   ? {
//       [K in keyof T]?: T[K]
//     }
//   : T

type TSearchParams<T extends {}> = {
  [K in keyof T]?: T[K]
} & { [key: string]: string }
