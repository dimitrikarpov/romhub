import sanitize from "sanitize-filename"
import { saveAs } from "file-saver"
import { filename } from "~/lib/filename"

export const downloadRom = (url: string, name: string) => {
  const extension = filename.getExtension(url)
  const newFilename = sanitize(`${name}.${extension}`)

  fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => {
      saveAs(blob, newFilename)
    })
}
