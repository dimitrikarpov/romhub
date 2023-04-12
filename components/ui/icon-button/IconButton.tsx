type Props = {
  icon: React.ElementType
  tip?: string
  onClick?: () => void
}

export const IconButton: React.FunctionComponent<Props> = ({
  icon: Icon,
  tip = "",
  onClick,
}) => {
  return (
    <div onClick={onClick} title={tip} className="inline-flex cursor-pointer">
      <div className="c-svg-w c-svg-24 w-fit self-baseline rounded-full bg-transparent p-2 transition-colors duration-300 hover:bg-[#ffffff33]">
        <Icon />
      </div>
    </div>
  )
}
