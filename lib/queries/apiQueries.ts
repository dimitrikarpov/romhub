import { getRoms } from "./api/getRoms"
import { getUserPlaylists } from "./api/getUserPlaylists"
import { deletePlaylistEntryByRom } from "./api/deletePlaylistEntryByRom"
import { createPlaylist } from "./api/createPlaylist"
import { createPlaylistEntry } from "./api/createPlaylistEntry"
import { getUserPlaylistsContainsRom } from "./api/getUserPlaylistsContainsRom"
import { patchPlaylist } from "./api/patchPlayilst"

export const apiQueries = {
  getRoms,
  getUserPlaylists,
  getUserPlaylistsContainsRom,
  createPlaylist,
  createPlaylistEntry,
  deletePlaylistEntryByRom,
  patchPlaylist,
}
