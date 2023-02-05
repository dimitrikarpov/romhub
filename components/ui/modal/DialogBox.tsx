import { CrossIcon } from "../icons"
import styles from "./DialogBox.module.css"

type Props = {
  children: React.ReactNode
  title?: string
  close: () => void
}

export const DialogBox: React.FunctionComponent<Props> = ({
  title,
  close,
  children,
}) => {
  return (
    <div className={styles["dialog"]}>
      <header>
        <div>{title}</div>
        <div onClick={close} className={styles["close-btn"]}>
          <CrossIcon />
        </div>
      </header>

      {children}
    </div>
  )
}
