import { createContext, Dispatch, SetStateAction } from "react"

type TSearchContext = {
  platform: string
  setPlatform: Dispatch<SetStateAction<string>>
  selectPlatform: (platform: string) => void
  skip: number
  setSkip: Dispatch<SetStateAction<number>>
  titleStartsWith: string | undefined
  setTitleStartsWith: Dispatch<SetStateAction<string | undefined>>
  search: (word?: string) => void
}

export const SearchContext = createContext<TSearchContext>({
  platform: "all",
  setPlatform: () => {},
  selectPlatform: () => {},
  skip: 0,
  setSkip: () => {},
  titleStartsWith: undefined,
  setTitleStartsWith: () => {},
  search: () => {},
})
