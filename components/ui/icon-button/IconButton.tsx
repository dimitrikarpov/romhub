import styles from "./IconButton.module.css"

type Props = {
  icon: React.ElementType
  tip?: string
  onClick?: () => void
}

export const IconButton: React.FunctionComponent<Props> = ({
  icon: Icon,
  tip = "",
  onClick,
}) => {
  return (
    <div className={styles["button"]} onClick={onClick} title={tip}>
      <div className={styles["icon-circle"]}>
        <div className={styles["icon-box"]}>
          <Icon />
        </div>
      </div>
    </div>
  )
}
