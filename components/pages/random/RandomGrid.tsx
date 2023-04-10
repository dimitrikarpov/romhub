import { UiRom } from '@/types/index'
import { RandomGridItem } from './RandomGridItem'

type Props = {
  roms: UiRom[]
}

export const RandomGrid: React.FunctionComponent<Props> = ({ roms }) => {
  return (
    <div className="pt-16">
      <div className="mx-auto my-0 grid w-fit grid-cols-3 grid-rows-2 gap-10">
        {roms.map((rom) => (
          <RandomGridItem rom={rom} key={rom.id} />
        ))}
      </div>
    </div>
  )
}
