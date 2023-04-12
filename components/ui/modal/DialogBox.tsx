import { CrossIcon } from "../icons"

type Props = {
  children: React.ReactNode
  title?: string
  close: () => void
}

export const DialogBox: React.FunctionComponent<Props> = ({
  title,
  close,
  children,
}) => {
  return (
    <div className="flex flex-col text-sm font-normal [&>*]:px-2 [&>*]:py-2">
      <header className="flex items-center justify-between text-base/6">
        <div>{title}</div>
        <div onClick={close} className="c-svg-24 c-svg-w cursor-pointer">
          <CrossIcon />
        </div>
      </header>

      {children}
    </div>
  )
}
