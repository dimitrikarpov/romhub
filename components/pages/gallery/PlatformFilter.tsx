import cn from "classnames"
import { useContext } from "react"
import { SearchContext } from "@/contexts/search/SearchContext"
import styles from "./PlatformFilter.module.css"

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

type TPlatforms = {
  [slug: string]: { name: string }
}

const platforms: TPlatforms = {
  nes: { name: "Nintendo Entertainment System" },
  md: { name: "Sega Genesis" },
  snes: { name: "Super Nintendo Entertainment System" },
}
