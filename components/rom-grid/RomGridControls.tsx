import React, { useRef } from "react"
import styles from "../../styles/RomGrid.module.css"

type Props = {
  onPlatformChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onSearch: (value: string | undefined) => void
}

export const RomGridControls: React.FunctionComponent<Props> = ({
  onPlatformChange,
  onSearch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onSearch(value === "" ? undefined : value)
  }

  const onSearchClear = (e: React.SyntheticEvent) => {
    inputRef!.current!.value = ""
    onSearch(undefined)
  }

  return (
    <div className={styles.controlsContainer}>
      <label className={styles.controlsContainerPlatform}>
        Platform
        <select onChange={onPlatformChange}>
          <option value="all">----</option>
          <option value="nes">NES </option>
          <option value="md">Sega Genesis</option>
          <option value="sfc">SNES</option>
        </select>
        <div className={styles.constrolsContainerSearchBox}>
          <div className={styles.constrolsContainerSearchIconSearch}>
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="search...."
            onChange={onSearchChange}
            ref={inputRef}
          />
          <div
            className={styles.controlsContainerCloseBox}
            onClick={onSearchClear}
          >
            <CrossIcon />
          </div>
        </div>
      </label>
    </div>
  )
}

const SearchIcon = () => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 487.95 487.95"
  >
    <path
      d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
			c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
			c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
    />
  </svg>
)

const CrossIcon = () => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 20L4 4.00003M20 4L4.00002 20"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
)
