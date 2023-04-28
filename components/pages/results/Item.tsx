import { UiRom } from "~/types/index"

type Props = {
  rom: UiRom
}

export const Item: React.FunctionComponent<Props> = ({ rom }) => {
  const image = rom.images[0] || "/assets/placeholder.png"

  return (
    <div className="flex gap-8">
      <a href={`/rom/${rom.id}`} target="_blank">
        <img
          src={image}
          alt={rom.name}
          className="aspect-[1.78] w-[246px] rounded-lg object-cover"
        />
      </a>

      <div>
        <a href={`/rom/${rom.id}`} target="_blank">
          <p className="text-lg font-normal leading-7 text-[#f1f1f1]">
            {rom.name}
          </p>
        </a>
        <p className="text-xs font-normal leading-4 text-[#aaaaaa]">
          {rom.platform}
        </p>
      </div>
    </div>
  )
}
