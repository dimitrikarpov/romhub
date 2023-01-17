import styles from "./IconButton.module.css"

type Props = {
  icon: React.ElementType
  onClick?: () => void
}

export const IconButton: React.FunctionComponent<Props> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <div className={styles["button"]} onClick={onClick}>
      <div className={styles["icon-circle"]}>
        <div className={styles["icon-box"]}>
          <Icon />
        </div>
      </div>
    </div>
  )
}
