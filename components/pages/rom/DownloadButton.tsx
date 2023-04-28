import { Button } from "~/components/ui/button/Button"
import { DownloadIcon } from "~/components/ui/icons"
import { downloadRom } from "~/lib/downloadRom"

type Props = {
  name: string
  file: string
}

export const DonwloadButton: React.FunctionComponent<Props> = ({
  name,
  file,
}) => {
  return (
    <Button onClick={() => downloadRom(file, name)}>
      <DownloadIcon />
      <span>Download</span>
    </Button>
  )
}
