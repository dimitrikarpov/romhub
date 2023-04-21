import { IconButton } from "~/components/ui/icon-button/IconButton"
import { PencilIcon } from "~/components/ui/icons"

type Props = {
  text: string
  editable: boolean
  toggleToEdit: () => void
}

export const DescriptionView: React.FunctionComponent<Props> = ({
  text,
  editable,
  toggleToEdit,
}) => {
  return (
    <div className="flex h-10 items-center justify-between">
      <div className="text-sm font-bold leading-[2.375rem] ">{text}</div>
      {editable && <IconButton icon={PencilIcon} onClick={toggleToEdit} />}
    </div>
  )
}
