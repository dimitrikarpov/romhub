import { createPlaylist } from "./db/createPlaylist"
import { createPlaylistEntry } from "./db/createPlaylistEntry"
import { deletePlaylistEntryByRom } from "./db/deletePlaylistEntryByRom"
import { fetchPlaylistById } from "./db/fetchPlaylistById"
import { fetchPlaylistsEntries } from "./db/fetchPlaylistsEntries"
import { findUserPlaylists } from "./db/findUserPlaylists"
import { findUserPlaylistsContainsRom } from "./db/findUserPlaylistsContainsRom"
import { getRoms } from "./db/getRoms"

export const dbQueries = {
  getRoms,
  fetchPlaylistById,
  createPlaylist,
  findUserPlaylists,
  findUserPlaylistsContainsRom,
  fetchPlaylistsEntries,
  createPlaylistEntry,
  deletePlaylistEntryByRom,
}
