import { useEffect, useState } from "react"
import { Button } from "../button/Button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

type Props = {
  skip: number
  setSkip: (skip: number) => void
  total: number | undefined
  pageSize?: number
}

export const Paginator: React.FunctionComponent<Props> = ({
  skip,
  setSkip,
  total = 0,
  pageSize = 10,
}) => {
  const [value, setValue] = useState<number>(1)

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
    if (!canFetchNext(pageSize, skip, total)) return

    setSkip(skip + pageSize)
    setValue(value + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const prevPage = async () => {
    if (!canFetchPrev(pageSize, skip)) return

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

  if (total <= pageSize) return null

  return (
    <div className="flex items-center justify-center text-base/5 font-medium [&>*:not(:last-child)]:mr-3">
      <Button disabled={!canFetchPrev(pageSize, skip)} onClick={prevPage}>
        <ArrowLeftIcon />
      </Button>

      <div>
        <input
          type="number"
          value={String(value)}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          className="w-[50px] rounded-lg border-gray-600 bg-black text-center text-white"
        />{" "}
        / {totalPages}
      </div>

      <Button
        disabled={!canFetchNext(pageSize, skip, total)}
        onClick={nextPage}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  )
}

const canFetchNext = (pageSize: number, skip: number, total: number) => {
  return skip + pageSize <= total
}

const canFetchPrev = (pageSize: number, skip: number) => {
  return skip >= pageSize
}
