export const deletePlaylistEntryByRom = ({
  playlistId,
  romId,
}: {
  playlistId: string
  romId: string
}) => {
  return fetch(
    [
      "/api/playlists/entries/delete-by-rom-id",
      new URLSearchParams({ playlistId, romId }),
    ].join("?"),
    { method: "DELETE" },
  )
}
