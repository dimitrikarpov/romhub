import { DefaultViewIcon, TheaterModIcon } from "@/components/ui/icons"
import { Dispatch, SetStateAction } from "react"

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
        <span onClick={() => toggle(true)}>
          <TheaterModIcon />
        </span>
      )}
      {isInTheaterMod && (
        <span onClick={() => toggle(false)}>
          <DefaultViewIcon />
        </span>
      )}
    </>
  )
}
