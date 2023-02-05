import React, { ReactNode } from "react"
import styles from "./Modal.module.css"

type Props = {
  children?: ReactNode
  close?: () => void
}

export const Modal: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={styles["overlay"]}>
      <div className={styles["container"]}>{children}</div>
    </div>
  )
}
