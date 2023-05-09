import { downloadRom } from "~/lib/downloadRom"
import { DownloadIcon } from "lucide-react"
import { YTButton } from "~/components/ui/button/YTButton"

type Props = {
  name: string
  file: string
}

export const DonwloadButton: React.FunctionComponent<Props> = ({
  name,
  file,
}) => {
  return (
    <YTButton onClick={() => downloadRom(file, name)}>
      <DownloadIcon />
      <span>Download</span>
    </YTButton>
  )
}
