import { deletePlaylistEntryByRom } from "./api/deletePlaylistEntryByRom"
import { createPlaylist } from "./api/createPlaylist"
import { createPlaylistEntry } from "./api/createPlaylistEntry"
import { findUserPlaylists } from "./api/findUserPlaylists"
import { findUserPlaylistsContainsRom } from "./api/findUserPlaylistsContainsRom"

export const apiQueries = {
  findUserPlaylists: findUserPlaylists,
  createPlaylist: createPlaylist,
  createPlaylistEntry: createPlaylistEntry,
  deletePlaylistEntryByRom: deletePlaylistEntryByRom,
  findUserPlaylistsContainsRom: findUserPlaylistsContainsRom,
}
