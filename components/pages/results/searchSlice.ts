import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { TPlatformSlug } from "@/types/index"
import { RootState } from "@/lib/store"

export interface SearchSlice {
  search: string | undefined
  platform: TPlatformSlug | undefined
  skip: number
}

const initialState: SearchSlice = {
  search: undefined,
  platform: undefined,
  skip: 0,
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<SearchSlice["search"]>) => {
      state.search = action.payload
    },
    setPlatform: (state, action: PayloadAction<SearchSlice["platform"]>) => {
      state.platform = action.payload
    },
    setSkip: (state, action: PayloadAction<SearchSlice["skip"]>) => {
      state.skip = action.payload
    },
    reset: (state) => {
      state.search = initialState.search
      state.platform = initialState.platform
      state.skip = initialState.skip
    },
  },
})

export const { setSearch, setPlatform, setSkip, reset } = searchSlice.actions

export const selectPlatform = (state: RootState) => state.search.platform
export const selectSkip = (state: RootState) => state.search.skip
export const selectSearch = (state: RootState) => state.search.search

export default searchSlice.reducer
