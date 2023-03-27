import { ParsedUrlQuery } from "querystring"

export const getSearchParams = (query: ParsedUrlQuery) => {
  const { search_query, platform } = query

  return {
    search_query,
    platform,
  }
}
