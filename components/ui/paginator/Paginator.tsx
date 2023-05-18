import { Pagination } from "react-headless-pagination"
import clsx from "clsx"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

type Props = {
  /* total entries */
  total?: number
  /* current skip (entries) */
  skip: number
  /* page size (entries) */
  take: number

  onChange: (newSkip: number) => void
}

export const Paginator: React.FunctionComponent<Props> = ({
  total,
  skip,
  take,
  onChange,
}) => {
  if (!total) return null

  const currentPage = skip / take
  const totalPages = Math.ceil(total / take)

  const handlePageChange = (newPageNumber: number) => {
    onChange(newPageNumber * take)
  }

  return (
    <Pagination
      currentPage={currentPage}
      setCurrentPage={handlePageChange}
      totalPages={totalPages}
      className="flex h-10 w-full select-none items-center text-sm"
      truncableText="..."
      truncableClassName="w-10 px-0.5 text-center"
      edgePageCount={1}
      middlePagesSiblingCount={2}
    >
      <Pagination.PrevButton
        as={<button />}
        className={clsx(
          "mr-2 flex items-center text-gray-500 hover:text-gray-600 dark:hover:text-gray-200",
          {
            "cursor-pointer": currentPage !== 0,
            "opacity-50": currentPage === 0,
          },
        )}
      >
        <ArrowLeftIcon />
      </Pagination.PrevButton>

      <nav className="flex flex-grow justify-center">
        <ul className="flex items-center">
          <Pagination.PageButton
            activeClassName="bg-primary-50 dark:bg-opacity-0 text-primary-600 dark:text-white"
            inactiveClassName="text-gray-500"
            className={
              "hover:text-primary-600 focus:text-primary-600 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full focus:font-bold focus:outline-none"
            }
          />
        </ul>
      </nav>

      <Pagination.NextButton
        as={<button />}
        className={clsx(
          "mr-2 flex items-center text-gray-500 hover:text-gray-600 dark:hover:text-gray-200",
          {
            "cursor-pointer": currentPage !== totalPages - 1,
            "opacity-50": currentPage === totalPages - 1,
          },
        )}
      >
        <ArrowRightIcon />
      </Pagination.NextButton>
    </Pagination>
  )
}
