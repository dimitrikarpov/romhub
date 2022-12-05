import { useEffect, useState } from "react"
import { Rom } from "../types"

const pageSize = 15

const createWhereContainseQueryString = (key: string, value: string) => {
  return JSON.stringify({ [key]: { contains: value } })
}

const createWhereStartsWithQueryString = (key: string, value: string) => {
  return JSON.stringify({ [key]: { startsWith: value } })
}

const canFetchNext = (total: number, skip: number) => {
  return skip + pageSize <= total
}

const canFetchPrev = (skip: number) => {
  return skip >= pageSize
}

export const useRomsFetcher = (initialRoms: Rom[], initialTotal: number) => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [roms, setRoms] = useState<Rom[]>(initialRoms)
  const [total, setTotal] = useState(initialTotal)
  const [skip, setSkip] = useState(0)
  const [platform, setPlatform] = useState<string>("all")
  const [titleStartsWith, setTitleStartsWith] = useState<string>()

  const fetchRoms = async () => {
    const response = await fetch(
      "/api/roms" +
        "?" +
        new URLSearchParams({
          skip: String(skip),
          take: String(pageSize),
          ...(platform !== "all" && {
            where: createWhereContainseQueryString("tags", platform),
          }),
          ...(titleStartsWith && {
            where: createWhereStartsWithQueryString("title", titleStartsWith),
          }),
        }),
    )

    const data = await response.json()
    setRoms(data.data)
    setTotal(data.total)
  }

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  useEffect(() => {
    if (isFirstRender) return

    fetchRoms()
  }, [skip])

  useEffect(() => {
    if (isFirstRender) return

    if (skip === 0) {
      fetchRoms()

      return
    }

    if (skip !== 0) {
      setSkip(0)
      fetchRoms()

      return
    }
  }, [platform])

  useEffect(() => {
    if (isFirstRender) return

    setSkip(0)
    setPlatform("all")
    fetchRoms()
  }, [titleStartsWith])

  const nextPage = async () => {
    if (!canFetchNext(total, skip)) return

    setSkip(skip + pageSize)
  }

  const prevPage = async () => {
    if (!canFetchPrev(skip)) return

    setSkip(skip - pageSize)
  }

  const currentPage = skip / pageSize + 1
  const totalPages = Math.ceil(total / pageSize) + 1

  return {
    roms,
    total,
    canFetchNext: canFetchNext(total, skip),
    canFetchPrev: canFetchPrev(skip),
    nextPage,
    prevPage,
    currentPage,
    totalPages,
    setPlatform,
    setTitleStartsWith,
  }
}
