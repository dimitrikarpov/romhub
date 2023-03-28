import { configureStore } from "@reduxjs/toolkit"
import sidebarSlice from "@/components/pages/layout/sidebar/sideBarSlice"
import searchSlice from "@/components/pages/results/searchSlice"

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    search: searchSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
