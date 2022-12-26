import React, { useEffect, useState } from "react"
import { Rom } from "../../types"
import { SearchRequestContext } from "./SearchRequestContext"

type Props = {
  children?: React.ReactNode
}

export const SearchRequestProvider: React.FunctionComponent<Props> = ({
  children,
}) => {
  const [roms, setRoms] = useState<Rom[]>([])
  const [total, setTotal] = useState(0)

  return (
    <SearchRequestContext.Provider value={{ roms, setRoms, total, setTotal }}>
      {children}
    </SearchRequestContext.Provider>
  )
}
