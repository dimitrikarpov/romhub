import { Button } from "@/components/ui/button/Button"
import { DownloadIcon } from "@/components/ui/icons"
import { downloadRom } from "@/lib/downloadRom"

type Props = {
  name: string | undefined
  file: string | undefined
}

export const DonwloadButton: React.FunctionComponent<Props> = ({
  name,
  file,
}) => {
  if (!file || !name) return null

  return (
    <Button onClick={() => downloadRom(file, name)}>
      <DownloadIcon />
      <span>Download</span>
    </Button>
  )
}
