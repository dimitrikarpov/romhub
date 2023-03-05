import sanitize from "sanitize-filename"
import { saveAs } from "file-saver"
import { filename } from "@/lib/filename"
import { Button } from "@/components/ui/button/Button"
import { DownloadIcon } from "@/components/ui/icons"

type Props = {
  name: string | undefined
  file: string | undefined
}

export const DonwloadButton: React.FunctionComponent<Props> = ({
  name,
  file,
}) => {
  if (!file || !name) return null

  const download = () => {
    const extension = filename.getExtension(file)
    const newFilename = sanitize(`${name}.${extension}`)

    fetch(file)
      .then((resp) => resp.blob())
      .then((blob) => {
        saveAs(blob, newFilename)
      })
  }

  return (
    <Button onClick={download}>
      <DownloadIcon />
      <span>Download</span>
    </Button>
  )
}
