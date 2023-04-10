import { UiPlaylistEntry } from '@/types/index'

type Props = {
  entry: UiPlaylistEntry
}

export const Item: React.FunctionComponent<Props> = ({ entry }) => {
  const image = entry.rom.images[0] || '/assets/placeholder.png'

  return (
    <div className="flex gap-8">
      <a href={`/rom/${entry.rom.id}`} target="_blank">
        <img
          src={image}
          className="aspect-[1.78] w-[246px] rounded-lg object-cover"
          alt={entry.rom.name}
        />
      </a>
      <div>
        <a href={`/rom/${entry.rom.id}`} target="_blank">
          <p className="text-[1.8rem] font-normal leading-[2.6rem] text-[#f1f1f1]">
            {entry.rom.name}
          </p>
        </a>
        <p className="text-[1.2rem] font-normal leading-[1.8rem] text-[#aaaaaa]">
          {entry.assignedAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
