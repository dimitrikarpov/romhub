import { getRoms } from "./api/getRoms"
import { getUserPlaylists } from "./api/getUserPlaylists"
import { getUserPlaylistsContainsRom } from "./api/getUserPlaylistsContainsRom"
import { getPlaylistById } from "./api/getPlaylistById"
import { deletePlaylistEntryByRom } from "./api/deletePlaylistEntryByRom"
import { createPlaylist } from "./api/createPlaylist"
import { createPlaylistEntry } from "./api/createPlaylistEntry"
import { patchPlaylist } from "./api/patchPlayilst"
import { getPlaylistsEntries } from "./api/getPlaylistsEntries"
import { deletePlaylist } from "./api/deletePlaylist"

export const apiQueries = {
  getRoms,
  getUserPlaylists,
  getUserPlaylistsContainsRom,
  getPlaylistsEntries,
  getPlaylistById,
  createPlaylist,
  createPlaylistEntry,
  deletePlaylistEntryByRom,
  deletePlaylist,
  patchPlaylist,
}
