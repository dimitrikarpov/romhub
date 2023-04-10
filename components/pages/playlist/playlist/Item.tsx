import { UiPlaylistEntry } from "@/types/index"
import { ItemMenu } from "./ItemMenu"
import { platforms } from "config/index"

type Props = {
  entry: UiPlaylistEntry
}

export const Item: React.FunctionComponent<Props> = ({ entry }) => {
  return (
    <>
      <div className="flex justify-between gap-4 rounded-xl px-2 py-4 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.2)]">
        <div className="basis-[10rem]">
          <a href={`/rom/${entry.rom.id}`} target="_blank">
            <img
              src={entry.rom.images?.[0] || "/assets/placeholder.png"}
              className="aspect-[1.78] w-[10rem] rounded-lg object-cover"
            />
          </a>
        </div>

        <div className="basis-full">
          <div className="mb-2 text-base font-medium leading-6 text-[#f1f1f1]">
            <a href={`/rom/${entry.rom.id}`} target="_blank">
              {entry.rom.name}
            </a>
          </div>
          <div className="text-xs font-normal uppercase leading-5 text-[#aaaaaa]">
            {platforms[entry.rom.platform].shortName}
          </div>
        </div>

        <div className="basis-[content] self-center">
          <ItemMenu entry={entry} />
        </div>
      </div>
    </>
  )
}
