import classNames from "classnames"
import styles from "./Button.module.css"

type Props = {
  type?: "button" | "submit"
  variant?: "default" | "transparent-blue" | "blue-blue"
  maxWidth?: boolean
  startIcon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}

export const Button: React.FunctionComponent<Props> = ({
  variant = "default",
  maxWidth = false,
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles["button"], {
        [styles["button--max-width"]]: maxWidth,
        [styles["button--default"]]: variant === "default",
        [styles["button--transparent-blue"]]: variant === "transparent-blue",
        [styles["button--blue-blue"]]: variant === "blue-blue",
      })}
    >
      {children}
    </button>
  )
}
