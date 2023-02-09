export const saveSharedPlaylistToLibrary = ({
  playlistId,
}: {
  playlistId: string
}) => {
  return fetch(`/api/playlists/library/${playlistId}`, {
    method: "POST",
  })
}
