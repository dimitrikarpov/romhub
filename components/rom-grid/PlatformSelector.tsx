import styles from "../../styles/Home.module.css"

export const PlatformSelector = () => {
  return (
    <div className={styles.platformsSelectorContainer}>
      <span
        className={[
          styles.platformSelectorItem,
          styles.platformSelectorItemActive,
        ].join(" ")}
      >
        All
      </span>

      <span className={styles.platformSelectorItem}>
        Nintendo Entertainment System
      </span>

      <span className={styles.platformSelectorItem}>Sega Genesis</span>

      <span className={styles.platformSelectorItem}>Super Nintendo</span>
    </div>
  )
}
