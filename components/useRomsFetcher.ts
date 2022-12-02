import { useState } from "react"
import { Rom } from "../types"

const pageSize = 15

const canFetchNext = (total: number, skip: number) => {
  return skip + pageSize <= total
}

const canFetchPrev = (skip: number) => {
  return skip - pageSize >= 0
}

export const useRomsFetcher = (initialRoms: Rom[], total: number) => {
  const [roms, setRoms] = useState<Rom[]>(initialRoms)
  const [skip, setSkip] = useState(0)

  const fetchRoms = async (skip: number) => {
    const response = await fetch(
      "/api/roms" +
        "?" +
        new URLSearchParams({ skip: String(skip), take: String(pageSize) }),
    )

    const data = await response.json()
    setSkip(skip)
    setRoms(data.data)
  }

  const nextPage = async () => {
    if (!canFetchNext(total, skip)) return

    await fetchRoms(skip + pageSize)
  }

  const prevPage = async () => {
    if (!canFetchPrev(skip)) return

    await fetchRoms(skip - pageSize)
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
  }
}
