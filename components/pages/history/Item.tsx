import { Playlist, PlaylistEntry } from "@prisma/client"
import Link from "next/link"
import { UiRom } from "~/types/index"

type Props = {
  entry: PlaylistEntry & { rom: UiRom; playlist: Playlist }
}

export const Item: React.FunctionComponent<Props> = ({ entry }) => {
  const image = entry.rom.images?.[0] || "/assets/placeholder.png"

  return (
    <div className="flex gap-8">
      <Link href={`/rom/${entry.rom.id}`} className="shrink-0">
        <img
          src={image}
          className="aspect-[1.78] w-[246px] rounded-lg object-cover"
          alt={entry.rom.name}
        />
      </Link>
      <div>
        <Link href={`/rom/${entry.rom.id}`}>
          <p className="text-xl font-normal text-[#f1f1f1]">{entry.rom.name}</p>
        </Link>
        <p className="text-xs font-normal text-[#aaaaaa]">
          {entry.assignedAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
