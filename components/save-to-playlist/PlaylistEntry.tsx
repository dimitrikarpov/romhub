import {
  CheckboxBlankIcon,
  CheckboxCheckedIcon,
  GlobeIcon,
  LockIcon,
} from "@/components/icons"
import classNames from "classnames"
import styles from "./save-to-playlist.module.css"

type Props = {
  title: string
  isChecked: boolean
  isPublic: boolean
}

export const PlaylistEntry: React.FunctionComponent<Props> = ({
  title,
  isChecked,
  isPublic,
}) => {
  return (
    <div className={styles["item"]}>
      <div
        className={classNames(styles["item-checkbox"], {
          [styles["item-checkbox--checked"]]: isChecked,
        })}
      >
        {isChecked ? <CheckboxCheckedIcon /> : <CheckboxBlankIcon />}
      </div>
      <div>{title}</div>
      <div className={styles["item-visibility"]}>
        {isPublic ? <GlobeIcon /> : <LockIcon />}
      </div>
    </div>
  )
}
