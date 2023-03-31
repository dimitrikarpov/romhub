import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/lib/store"

export interface SidebarSlice {
  isSidebarOpen: boolean
  sidebarVariant: "full" | "mini" | "drawer" | undefined
}

const initialState: SidebarSlice = {
  isSidebarOpen: false,
  sidebarVariant: undefined,
}

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    setVariant: (
      state,
      action: PayloadAction<SidebarSlice["sidebarVariant"]>,
    ) => {
      state.sidebarVariant = action.payload
    },
  },
})

export const { toggle, setVariant } = sidebarSlice.actions

export const selectIsSidebarOpen = (state: RootState) =>
  state.sidebar.isSidebarOpen
export const selectSidebarVariant = (state: RootState) =>
  state.sidebar.sidebarVariant

export default sidebarSlice.reducer
