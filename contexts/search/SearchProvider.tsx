import React, { useEffect, useState } from "react"
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

  return (
    <SearchContext.Provider
      value={{
        platform,
        setPlatform,
        skip,
        setSkip,
        titleStartsWith,
        setTitleStartsWith,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
