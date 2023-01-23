import { CrossIcon } from "../icons"
import styles from "./DialogBox.module.css"

type Props = {
  title?: string
  onClose: () => void
  children: React.ReactNode
}

export const DialogBox: React.FunctionComponent<Props> = ({
  title,
  onClose,
  children,
}) => {
  return (
    <div className={styles["save-dialog"]}>
      <header>
        <div>{title}</div>
        <div onClick={onClose} className={styles["close-btn"]}>
          <CrossIcon />
        </div>
      </header>

      {children}
    </div>
  )
}
