import React, { KeyboardEventHandler, useContext, useState } from "react"
import classNames from "classnames"
import { useRouter } from "next/router"
// import { SearchContext } from "@/contexts/search/SearchContext"
import { ClearIcon, SearchIcon } from "@/components/ui/icons"
import styles from "./SearchInput.module.css"

export const SearchInput = () => {
  const router = useRouter()

  console.log({ router })

  const [value, setValue] = useState<string>(
    () => router.query.search_query as string,
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setValue(value)
  }

  const onClear = () => {
    setValue("")

    // if (titleStartsWith !== "") {
    //   router.route !== "/" ? router.push("/").then(() => search()) : search()
    // }
  }

  const onSubmit = () => {
    // router.route !== "/"
    //   ? router.push("/").then(() => search(value))
    //   : search(value)
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
