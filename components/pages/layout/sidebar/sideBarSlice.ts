import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/lib/store"

export interface SidebarSlice {
  isDrawerOpen: boolean
  sidebarVariant: "full" | "mini" | "drawer" | undefined
}

const initialState: SidebarSlice = {
  isDrawerOpen: false,
  sidebarVariant: undefined,
}

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<SidebarSlice["sidebarVariant"]>) => {
      if (action.payload === "full") {
        if (
          state.sidebarVariant === undefined ||
          state.sidebarVariant === "full"
        ) {
          state.sidebarVariant = "mini"
        } else {
          state.sidebarVariant = "full"
        }
      }

      if (action.payload === "mini") {
        if (
          state.sidebarVariant === undefined ||
          state.sidebarVariant === "mini"
        ) {
          state.sidebarVariant = "drawer"
          state.isDrawerOpen = true
        } else {
          state.sidebarVariant = "mini"
          state.isDrawerOpen = false
        }
      }

      if (action.payload === "drawer") {
        if (
          state.sidebarVariant === undefined ||
          state.sidebarVariant === "drawer"
        ) {
          state.isDrawerOpen = !state.isDrawerOpen
        }
      }
    },
    resetSidebar: (state) => {
      state.isDrawerOpen = false
      state.sidebarVariant = undefined
    },
  },
})

export const { toggle, resetSidebar } = sidebarSlice.actions

export const selectisDrawerOpen = (state: RootState) =>
  state.sidebar.isDrawerOpen
export const selectSidebarVariant = (state: RootState) =>
  state.sidebar.sidebarVariant

export default sidebarSlice.reducer
