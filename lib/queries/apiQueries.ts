import { getRoms } from "./api/getRoms"
import { getUserPlaylists } from "./api/getUserPlaylists"
import { getUserPlaylistsContainsRom } from "./api/getUserPlaylistsContainsRom"
import { getPlaylistById } from "./api/getPlaylistById"
import { deletePlaylistEntryByRom } from "./api/deletePlaylistEntryByRom"
import { createPlaylist } from "./api/createPlaylist"
import { createPlaylistEntry } from "./api/createPlaylistEntry"
import { patchPlaylist } from "./api/patchPlayilst"

export const apiQueries = {
  getRoms,
  getUserPlaylists,
  getUserPlaylistsContainsRom,
  getPlaylistById,
  createPlaylist,
  createPlaylistEntry,
  deletePlaylistEntryByRom,
  patchPlaylist,
}
