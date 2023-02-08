export const deletePlaylist = ({ playlistId }: { playlistId: string }) => {
  return fetch(`/api/playlists/${playlistId}`, { method: "DELETE" })
}
