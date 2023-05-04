import { Button } from "~/components/ui/button/Button"
import { downloadRom } from "~/lib/downloadRom"
import { DownloadIcon } from "lucide-react"

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
