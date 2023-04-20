import { usePlaylistEntriesQuery } from "@/lib/queries/react/usePlaylistEntriesQuery"

type Props = {
  entry: NonNullable<
    ReturnType<typeof usePlaylistEntriesQuery>["data"]
  >["data"][0]
}

export const Item: React.FunctionComponent<Props> = ({ entry }) => {
  const image = entry.rom.images?.[0] || "/assets/placeholder.png"

  return (
    <div className="flex gap-8">
      <a href={`/rom/${entry.rom.id}`} target="_blank" className="shrink-0">
        <img
          src={image}
          className="aspect-[1.78] w-[246px] rounded-lg object-cover"
          alt={entry.rom.name}
        />
      </a>
      <div>
        <a href={`/rom/${entry.rom.id}`} target="_blank">
          <p className="text-xl font-normal text-[#f1f1f1]">{entry.rom.name}</p>
        </a>
        <p className="text-xs font-normal text-[#aaaaaa]">
          {entry.assignedAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
