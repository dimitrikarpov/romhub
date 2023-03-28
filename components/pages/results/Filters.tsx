import { useState } from "react"
import classNames from "classnames"
import { Button } from "@/components/ui/button/Button"
import { ThreeSlidersIcon } from "@/components/ui/icons"
import { platforms } from "config"
import { TPlatformSlug } from "@/types/index"
import { useDispatch, useSelector } from "react-redux"
import { selectPlatform, setPlatform } from "./searchSlice"
import styles from "./Filters.module.css"

export const Filters = () => {
  const dispatch = useDispatch()
  const platform = useSelector(selectPlatform)

  const [isVisible, setIsVisible] = useState(false)

  const toggle = () => {
    setIsVisible((value) => !value)
  }

  const select = (shortName: TPlatformSlug | undefined) => {
    dispatch(setPlatform(shortName))
  }

  return (
    <div className={styles["filters-component-container"]}>
      <div
        className={classNames(
          styles["filters-visibility-toggler"],
          isVisible && styles["hide-bottom-border"],
        )}
      >
        <Button variant="transparent-transpared" onClick={toggle}>
          <ThreeSlidersIcon />
          Filters
        </Button>
      </div>

      {isVisible && (
        <div className={styles["filters"]}>
          <div className={styles["filters-group"]}>
            <div className={styles["filter-group-name"]}>platform</div>

            <p
              className={classNames(
                styles["filter-group-entry"],
                !platform && styles["filter-group-entry--selected"],
              )}
              onClick={() => select(undefined)}
            >
              All
            </p>
            {Object.entries(platforms).map(([slug, { name, shortName }]) => (
              <p
                key={shortName}
                onClick={() => select(slug as TPlatformSlug)}
                className={classNames(
                  styles["filter-group-entry"],
                  platform === slug && styles["filter-group-entry--selected"],
                )}
              >
                {name}
              </p>
            ))}
          </div>

          <div className={styles["filters-group"]}>
            <div className={styles["filter-group-name"]}>type</div>
            <p className={styles["filter-group-entry"]}>Rom</p>
            <p className={styles["filter-group-entry"]}>Playlist</p>
          </div>

          <div className={styles["filters-group"]}>
            <div className={styles["filter-group-name"]}>Sort By</div>
            <p className={styles["filter-group-entry"]}>Rating</p>
            <p className={styles["filter-group-entry"]}>Upload date</p>
          </div>
        </div>
      )}
    </div>
  )
}
