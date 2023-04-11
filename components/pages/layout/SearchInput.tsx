import { setSearch } from "@/components/pages/results/searchSlice"
import { ClearIcon, SearchIcon } from "@/components/ui/icons"
import clsx from "clsx"
import { useRouter } from "next/router"
import React, { KeyboardEventHandler, useState } from "react"
import { useDispatch } from "react-redux"

export const SearchInput = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [value, setValue] = useState<string>(
    () => router.query.search_query as string,
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setValue(value)
  }

  const onClear = () => {
    setValue("")
  }

  const onSubmit = () => {
    if (!Boolean(value.trim())) return

    dispatch(setSearch(value.trim()))

    if (router.route !== "/results") {
      router.push({ pathname: "/results", query: { search_query: value } })
    }
  }

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") onSubmit()
    if (event.key === "Escape") onClear()
  }

  return (
    <div className="relative flex h-10 items-center">
      <input
        value={value}
        onChange={onChange}
        placeholder="Search"
        onKeyDown={onKeyDown}
        className="ml-8 h-10 rounded-bl-full rounded-tl-full border border-[#878787bf] bg-[hsl(0,0%,7%)] py-0 pl-4 pr-1 text-base leading-6 text-[#ffffffe0] focus:border-[#1c62b9] focus:outline-[#1c62b9] focus-visible:outline-none"
      />
      <button
        className={clsx(
          "child-svg-24-w absolute right-[62px] top-[7px] block cursor-pointer border-none bg-[#121212] hover:rounded-full hover:bg-[#ffffff1a]",
          value === "" && "hidden",
        )}
      >
        <span onClick={onClear}>
          <ClearIcon />
        </span>
      </button>
      <button
        onClick={onSubmit}
        className="child-svg-24-w cursor-pointer rounded-br-full rounded-tr-full border border-l-0 border-[#878787bf] bg-[#ffffff1f] py-[7px] pl-4 pr-5"
      >
        <SearchIcon />
      </button>
    </div>
  )
}
