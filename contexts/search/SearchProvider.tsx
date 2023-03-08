import React, { useState } from "react"
import { SearchContext } from "./SearchContext"

type Props = {
  children?: React.ReactNode
}

export const SearchProvider: React.FunctionComponent<Props> = ({
  children,
}) => {
  const [platform, setPlatform] = useState<string>("all")
  const [skip, setSkip] = useState(0)
  const [titleStartsWith, setTitleStartsWith] = useState<string>()

  const selectPlatform = (platform: string) => {
    setSkip(0)
    setTitleStartsWith(undefined)
    setPlatform(platform)
  }

  const search = (word?: string) => {
    setSkip(0)
    setPlatform("all")
    setTitleStartsWith(word)
  }

  return (
    <SearchContext.Provider
      value={{
        platform,
        setPlatform,
        selectPlatform,
        skip,
        setSkip,
        titleStartsWith,
        setTitleStartsWith,
        search,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

/*

platform changed => if skip === 0 then fetch, if skip !== 0 then setSkip(0) and fetch()

platform changed => reset skip and fetch

search changed => reset skip and platform and fetch


*/
