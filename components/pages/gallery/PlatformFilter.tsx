import { platforms } from "config/index"
import { TPlatformSlug } from "~/types/index"
import { PlatformFilterItem } from "./PlatformFilterItem"

type Props = {
  value: TPlatformSlug
  onChange: (value: TPlatformSlug) => void
}

export const PlatformFilter: React.FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex h-14 items-center gap-3 bg-[#0f0f0f] px-2 py-0">
      {Object.entries(platforms).map(([slug, { name }]) => (
        <PlatformFilterItem
          value={slug as TPlatformSlug}
          title={name}
          isActive={slug === value}
          onChange={onChange}
          key={slug}
        />
      ))}
    </div>
  )
}
