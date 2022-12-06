import React, { useEffect, useState } from "react"
import styles from "../../styles/RomGrid.module.css"

type Props = {
  canFetchNext: boolean
  canFetchPrev: boolean
  currentPage: number
  totalPages: number
  nextPage: () => Promise<void>
  prevPage: () => Promise<void>
  setPage: (page: number) => void
}

export const RomGridPaginator: React.FunctionComponent<Props> = ({
  canFetchNext,
  canFetchPrev,
  prevPage,
  nextPage,
  setPage,
  currentPage,
  totalPages,
}) => {
  const [value, setValue] = useState<number>(currentPage)

  useEffect(() => {
    if (currentPage === value) return

    setValue(currentPage)
  }, [currentPage])

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
      <button disabled={!canFetchPrev} onClick={prevPage}>
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

      <button disabled={!canFetchNext} onClick={nextPage}>
        next
      </button>
    </div>
  )
}
