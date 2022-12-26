import { createContext, Dispatch, SetStateAction } from "react"
import { Rom } from "../../types"

type TSearchRequestContext = {
  roms: Rom[]
  setRoms: Dispatch<SetStateAction<Rom[]>>
  total: number
  setTotal: Dispatch<SetStateAction<number>>
}

export const SearchRequestContext = createContext<TSearchRequestContext>({
  roms: [],
  setRoms: () => {},
  total: 0,
  setTotal: () => {},
})
