import styles from "./IconButton.module.css"

type Props = {
  children: React.ReactNode
  onClick?: () => void
}

export const IconButton: React.FunctionComponent<Props> = ({
  children,
  onClick,
}) => {
  return (
    <div className={styles["button"]} onClick={onClick}>
      <div className={styles["icon-box"]}>{children}</div>
    </div>
  )
}
