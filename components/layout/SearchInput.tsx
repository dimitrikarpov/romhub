import classNames from "classnames"
import React, { useContext, useRef, useState } from "react"
import { SearchContext } from "../../contexts/search/SearchContext"
import { ClearIcon, SearchIcon } from "../icons"
import styles from "./SearchInput.module.css"

export const SearchInput = () => {
  const { titleStartsWith, setTitleStartsWith } = useContext(SearchContext)

  const [value, setValue] = useState<string>("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setValue(value)
  }

  const onClear = () => {
    setValue("")

    if (titleStartsWith !== "") setTitleStartsWith(undefined)
  }

  const onSubmit = () => {
    setTitleStartsWith(value)
  }

  return (
    <div className={styles.searchBox}>
      <input value={value} onChange={onChange} placeholder="Search" />
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
