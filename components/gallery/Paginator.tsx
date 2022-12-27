import React, { useContext, useEffect, useState } from "react"
import { SearchContext } from "../../contexts/search/SearchContext"
import styles from "../../styles/RomGrid.module.css"

type Props = {
  skip: number
  total: number
}

const pageSize = 15

export const Paginator: React.FunctionComponent<Props> = ({
  skip,
  total = 0,
}) => {
  console.log({ skip, total })

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
  }

  const nextPage = async () => {
    if (!canFetchNext(total, skip)) return

    setSkip(skip + pageSize)
    setValue(value + 1)
  }

  const prevPage = async () => {
    if (!canFetchPrev(skip)) return

    setSkip(skip - pageSize)
    setValue(value - 1)
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
    <div className={styles.paginationContainer}>
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
