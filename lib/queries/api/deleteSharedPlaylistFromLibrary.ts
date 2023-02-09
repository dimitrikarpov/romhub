export const deleteSharedPlaylistFromLibrary = ({
  playlistId,
}: {
  playlistId: string
}) => {
  return fetch(`/api/playlists/library/${playlistId}`, {
    method: "DELETE",
  })
}
