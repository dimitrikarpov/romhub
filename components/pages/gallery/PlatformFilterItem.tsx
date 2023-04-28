import { TPlatformSlug } from "~/types/index"
import clsx from "clsx"

type Props = {
  value: TPlatformSlug | undefined
  title: string
  isActive: boolean
  onChange: (value: TPlatformSlug | undefined) => void
}

export const PlatformFilterItem: React.FunctionComponent<Props> = ({
  isActive,
  onChange,
  value,
  title,
}) => {
  return (
    <span
      onClick={() => onChange(value)}
      className={clsx(
        "min-w-fit cursor-pointer rounded-md px-3 py-1 text-sm tracking-wide",
        !isActive && "bg-[#ffffff1a] text-white",
        isActive && "bg-white text-black",
      )}
    >
      {title}
    </span>
  )
}
