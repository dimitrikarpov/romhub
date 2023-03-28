import cn from "classnames"
import { TPlatformSlug } from "@/types/index"
import styles from "./PlatformFilter.module.css"

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
      className={cn(styles.platformSelectorItem, {
        [styles.platformSelectorItemActive]: isActive,
      })}
      onClick={() => onChange(value)}
    >
      {title}
    </span>
  )
}
