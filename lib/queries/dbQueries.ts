import { createPlaylist } from "./db/createPlaylist"
import { createPlaylistEntry } from "./db/createPlaylistEntry"
import { deletePlaylistEntryByRom } from "./db/deletePlaylistEntryByRom"
import { getPlaylistById } from "./db/getPlaylistById"
import { getPlaylistsEntries } from "./db/getPlaylistsEntries"
import { getUserPlaylists } from "./db/getUserPlaylists"
import { getUserPlaylistsContainsRom } from "./db/getUserPlaylistsContainsRom"
import { getRoms } from "./db/getRoms"

export const dbQueries = {
  getRoms,
  getUserPlaylists,
  getUserPlaylistsContainsRom,
  getPlaylistsEntries,
  getPlaylistById,
  createPlaylist,
  createPlaylistEntry,
  deletePlaylistEntryByRom,
}
