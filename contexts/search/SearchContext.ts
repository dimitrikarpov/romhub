import { createContext, Dispatch, SetStateAction } from "react"

type TSearchContext = {
  platform: string
  setPlatform: Dispatch<SetStateAction<string>>
  skip: number
  setSkip: Dispatch<SetStateAction<number>>
  titleStartsWith: string | undefined
  setTitleStartsWith: Dispatch<SetStateAction<string | undefined>>
}

export const SearchContext = createContext<TSearchContext>({
  platform: "all",
  setPlatform: () => {},
  skip: 0,
  setSkip: () => {},
  titleStartsWith: undefined,
  setTitleStartsWith: () => {},
})
