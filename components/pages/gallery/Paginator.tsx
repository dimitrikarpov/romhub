import React, { useContext, useEffect, useState } from "react"
import { SearchContext } from "@/contexts/search/SearchContext"
import styles from "./Paginator.module.css"

type Props = {
  skip: number
  total: number | undefined
}

const pageSize = 15

export const Paginator: React.FunctionComponent<Props> = ({
  skip,
  total = 0,
}) => {
  const [value, setValue] = useState<number>(1)
  const { setSkip } = useContext(SearchContext)

  const totalPages = Math.ceil(total / pageSize)

  useEffect(() => {
    if (skip === 0) {
      setValue(1)
    }
  }, [skip])

  const setPage = (page: number) => {
    if (page > totalPages || page <= 0) return

    setSkip(page * pageSize)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const nextPage = async () => {
    if (!canFetchNext(total, skip)) return

    setSkip(skip + pageSize)
    setValue(value + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const prevPage = async () => {
    if (!canFetchPrev(skip)) return

    setSkip(skip - pageSize)
    setValue(value - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)

    if (value > totalPages || value <= 0) return

    setValue(value)
  }

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return

    setPage(value)
  }

  return (
    <div className={styles.paginator}>
      <button disabled={!canFetchPrev(skip)} onClick={prevPage}>
        prev
      </button>

      <span>
        <input
          type="number"
          value={String(value)}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
        />{" "}
        / {totalPages}
      </span>

      <button disabled={!canFetchNext(total, skip)} onClick={nextPage}>
        next
      </button>
    </div>
  )
}

const canFetchNext = (total: number, skip: number) => {
  return skip + pageSize <= total
}

const canFetchPrev = (skip: number) => {
  return skip >= pageSize
}
