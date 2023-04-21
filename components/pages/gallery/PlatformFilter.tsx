import { platforms } from "config/index"
import { TPlatformSlug } from "~/types/index"
import { PlatformFilterItem } from "./PlatformFilterItem"

type Props = {
  value: TPlatformSlug | undefined
  onChange: (value: TPlatformSlug | undefined) => void
}

export const PlatformFilter: React.FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex h-14 items-center gap-3 bg-[#0f0f0f] px-2 py-0">
      <PlatformFilterItem
        value={undefined}
        title="All"
        isActive={value === undefined}
        onChange={onChange}
      />

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
