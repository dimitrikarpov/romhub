import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/lib/store"

export interface SidebarSlice {
  isSidebarOpen: boolean
}

const initialState: SidebarSlice = {
  isSidebarOpen: false,
}

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
  },
})

export const { toggle } = sidebarSlice.actions

export const selectIsSidebarOpen = (state: RootState) =>
  state.sidebar.isSidebarOpen

export default sidebarSlice.reducer
