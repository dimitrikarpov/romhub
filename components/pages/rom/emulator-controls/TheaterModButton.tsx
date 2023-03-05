import { Dispatch, SetStateAction } from "react"
import { DefaultViewIcon, TheaterModIcon } from "@/components/ui/icons"
import styles from "../EmulatorComponent.module.css"

type Props = {
  isInTheaterMod: boolean
  toggle: Dispatch<SetStateAction<boolean>>
}

export const TheaterModButton: React.FunctionComponent<Props> = ({
  isInTheaterMod,
  toggle,
}) => {
  return (
    <>
      {!isInTheaterMod && (
        <span
          onClick={() => toggle(true)}
          title="Theater mode"
          className={styles["controls-icon"]}
        >
          <TheaterModIcon />
        </span>
      )}
      {isInTheaterMod && (
        <span
          onClick={() => toggle(false)}
          title="Default view"
          className={styles["controls-icon"]}
        >
          <DefaultViewIcon />
        </span>
      )}
    </>
  )
}
