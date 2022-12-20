import cn from "classnames"
import styles from "./PlatformFilter.module.css"

type Props = {
  active: string
  setPlatform: (value: string) => void
}

export const PlatformFilter: React.FunctionComponent<Props> = ({
  active,
  setPlatform,
}) => {
  const items = { all: { name: "All" }, ...platforms }

  return (
    <div className={styles.platformsSelectorContainer}>
      {Object.entries(items).map(([slug, { name }]) => (
        <span
          className={cn(styles.platformSelectorItem, {
            [styles.platformSelectorItemActive]: active === slug,
          })}
          onClick={() => setPlatform(slug)}
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
