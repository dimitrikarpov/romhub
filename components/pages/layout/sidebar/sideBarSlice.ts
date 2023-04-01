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
          state.isSidebarOpen = true
        } else {
          state.sidebarVariant = "mini"
          state.isSidebarOpen = false
        }
      }

      if (action.payload === "drawer") {
        if (
          state.sidebarVariant === undefined ||
          state.sidebarVariant === "drawer"
        ) {
          state.isSidebarOpen = !state.isSidebarOpen
        }
      }
    },
    setVariant: (
      state,
      action: PayloadAction<SidebarSlice["sidebarVariant"]>,
    ) => {
      state.sidebarVariant = action.payload
    },
    resetSidebar: (state) => {
      state.isSidebarOpen = false
      state.sidebarVariant = undefined
    },
  },
})

export const { toggle, setVariant, resetSidebar } = sidebarSlice.actions

export const selectIsSidebarOpen = (state: RootState) =>
  state.sidebar.isSidebarOpen
export const selectSidebarVariant = (state: RootState) =>
  state.sidebar.sidebarVariant

export default sidebarSlice.reducer
