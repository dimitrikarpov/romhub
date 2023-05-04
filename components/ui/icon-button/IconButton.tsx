type Props = {
  children?: React.ReactNode
  tip?: string
  onClick?: () => void
}

export const IconButton: React.FunctionComponent<Props> = ({
  children,
  tip = "",
  onClick,
}) => {
  return (
    <div onClick={onClick} title={tip} className="inline-flex cursor-pointer">
      <div className="w-fit shrink-0 self-baseline rounded-full bg-transparent p-2 transition-colors duration-300 hover:bg-[#ffffff33]">
        {children}
      </div>
    </div>
  )
}
