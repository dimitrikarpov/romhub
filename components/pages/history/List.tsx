import { UiPlaylistEntry } from '@/types/index'
import { Item } from './Item'

type Props = {
  entries: UiPlaylistEntry[]
}

export const List: React.FunctionComponent<Props> = ({ entries }) => {
  return (
    <div className="mx-auto my-0 max-w-[628px] pt-12 [&>*:not(:last-child)]:mb-8">
      <h2 className="mb-2 mt-6 text-[1.6rem] font-light leading-[1.4rem] text-[#f1f1f1]">
        Watch history
      </h2>

      {entries.map((entry) => (
        <Item entry={entry} key={entry.romId} />
      ))}
    </div>
  )
}
