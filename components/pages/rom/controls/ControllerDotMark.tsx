import styles from "./Controls.module.css"

type Props = {
  top?: string
  left?: string
  name: string
  highlight: (value: string | undefined) => void
}

export const ControllerDotMark: React.FunctionComponent<Props> = ({
  top,
  left,
  name,
  highlight,
}) => {
  const style = {
    ...(top && { top: `${top}px` }),
    ...(left && { left: `${left}px` }),
  }

  const onMouseOver = () => {
    highlight(name)
  }

  const onMouseOut = () => {
    highlight(undefined)
  }

  return (
    <div
      style={style}
      className={styles["controller-dot-mark"]}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    ></div>
  )
}
