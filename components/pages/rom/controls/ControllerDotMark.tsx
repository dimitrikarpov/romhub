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
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className="absolute h-[15px] w-[15px] rounded-full bg-[#52e399] opacity-50 hover:cursor-pointer hover:opacity-70"
    ></div>
  )
}
