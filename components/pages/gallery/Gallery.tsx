import { UiRom } from "@/types/index"
import { GalleryItem } from "./GalleryItem"

type Props = {
  roms: UiRom[] | undefined
}

export const Gallery: React.FunctionComponent<Props> = ({ roms = [] }) => {
  return (
    <div className="mx-auto my-0 grid w-fit grid-cols-[repeat(3,360px)] items-center justify-center gap-5 ">
      {roms.map((rom) => (
        <GalleryItem rom={rom} key={rom.id} />
      ))}
    </div>
  )
}
