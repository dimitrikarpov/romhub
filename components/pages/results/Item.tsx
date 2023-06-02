import Link from "next/link"
import { UiRom } from "~/types/index"

type Props = {
  rom: UiRom
}

export const Item: React.FunctionComponent<Props> = ({ rom }) => {
  const image = rom.images[0] || "/assets/placeholder.png"

  return (
    <div className="flex gap-8">
      <Link href={`/rom/${rom.id}`}>
        <img
          src={image}
          alt={rom.name}
          className="aspect-[1.78] w-[246px] rounded-lg object-cover"
        />
      </Link>

      <div>
        <Link href={`/rom/${rom.id}`}>
          <p className="text-lg font-normal leading-7 text-[#f1f1f1]">
            {rom.name}
          </p>
        </Link>
        <p className="text-xs font-normal leading-4 text-[#aaaaaa]">
          {rom.platform}
        </p>
      </div>
    </div>
  )
}
