import { Dispatch, SetStateAction, useState } from "react"
import classNames from "classnames"
import { Button } from "@/components/ui/button/Button"
import { ThreeSlidersIcon } from "@/components/ui/icons"
import styles from "./Filters.module.css"
import { platforms } from "config"
import { TPlatformSlug } from "@/types/index"

type Props = {
  platform: TPlatformSlug | undefined
  setPlatform: Dispatch<SetStateAction<TPlatformSlug | undefined>>
}

export const Filters: React.FunctionComponent<Props> = ({
  platform,
  setPlatform,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  const toggle = () => {
    setIsVisible((value) => !value)
  }

  const select = (shortName: TPlatformSlug | undefined) => {
    setPlatform(shortName)
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
            <div className={styles["filter-group-name"]}>Sort By</div>
            <p className={styles["filter-group-entry"]}>Rating</p>
            <p className={styles["filter-group-entry"]}>Upload date</p>
          </div>
        </div>
      )}
    </div>
  )
}
