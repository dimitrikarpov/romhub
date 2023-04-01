import { configureStore } from "@reduxjs/toolkit"
import sidebarSlice from "@/components/pages/layout/sidebar/sideBarSlice"
import searchSlice from "@/components/pages/results/searchSlice"

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    search: searchSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
