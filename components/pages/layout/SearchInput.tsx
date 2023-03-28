import React, { KeyboardEventHandler, useState } from "react"
import classNames from "classnames"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { ClearIcon, SearchIcon } from "@/components/ui/icons"
import { setSearch } from "@/components/pages/results/searchSlice"
import styles from "./SearchInput.module.css"

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

    if (router.route === "/") {
      router.push({ pathname: "/results", query: { search_query: value } })
    }
  }

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") onSubmit()
    if (event.key === "Escape") onClear()
  }

  return (
    <div className={styles.searchBox}>
      <input
        value={value}
        onChange={onChange}
        placeholder="Search"
        onKeyDown={onKeyDown}
      />
      <button
        className={classNames(styles.searchBoxClearButton, {
          [styles.searchBoxClearButton_hidden]: value === "",
        })}
      >
        <span onClick={onClear}>
          <ClearIcon />
        </span>
      </button>
      <button onClick={onSubmit} className={styles.searchBoxSearchButton}>
        <SearchIcon />
      </button>
    </div>
  )
}
