import { useState } from "react"

type Props = {
  isReady: boolean
  onClick: () => void
}

export const StartButton: React.FunctionComponent<Props> = ({
  isReady,
  onClick,
}) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    onClick()
  }

  if (clicked) return null

  return (
    <button onClick={handleClick} disabled={!isReady}>
      start!
    </button>
  )
}
