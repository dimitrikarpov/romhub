import { Dispatch, SetStateAction } from "react"
import { DefaultViewIcon, TheaterModIcon } from "@/components/ui/icons"

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
        <span onClick={() => toggle(true)} title="Theater mode">
          <TheaterModIcon />
        </span>
      )}
      {isInTheaterMod && (
        <span onClick={() => toggle(false)} title="Default view">
          <DefaultViewIcon />
        </span>
      )}
    </>
  )
}
