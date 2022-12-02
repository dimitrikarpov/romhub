import styles from "../../styles/RomGrid.module.css"

type Props = {
  canFetchNext: boolean
  canFetchPrev: boolean
  currentPage: number
  totalPages: number
  nextPage: () => Promise<void>
  prevPage: () => Promise<void>
}

export const RomGridPaginator: React.FunctionComponent<Props> = ({
  canFetchNext,
  canFetchPrev,
  prevPage,
  nextPage,
  currentPage,
  totalPages,
}) => {
  return (
    <div className={styles.paginationContainer}>
      <button disabled={!canFetchPrev} onClick={prevPage}>
        prev
      </button>

      <span>
        {currentPage} / {totalPages}
      </span>

      <button disabled={!canFetchNext} onClick={nextPage}>
        next
      </button>
    </div>
  )
}
