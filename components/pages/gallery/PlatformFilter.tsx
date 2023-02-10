import cn from "classnames"
import { useContext } from "react"
import { SearchContext } from "@/contexts/search/SearchContext"
import styles from "./PlatformFilter.module.css"
import { platforms } from "pages/_app"

export const PlatformFilter: React.FunctionComponent = () => {
  const { platform, selectPlatform } = useContext(SearchContext)

  const items = { all: { name: "All" }, ...platforms }

  return (
    <div className={styles.platformsSelectorContainer}>
      {Object.entries(items).map(([slug, { name }]) => (
        <span
          className={cn(styles.platformSelectorItem, {
            [styles.platformSelectorItemActive]: platform === slug,
          })}
          onClick={() => selectPlatform(slug)}
          key={slug}
        >
          {name}
        </span>
      ))}
    </div>
  )
}
