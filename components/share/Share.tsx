import { useRouter } from "next/router"
import { useRef } from "react"
import { Button } from "../button/Button"
import { DialogBox } from "../dialog/DialogBox"
import styles from "./Share.module.css"

type Props = {
  onClose: () => void
}

export const Share: React.FunctionComponent<Props> = ({ onClose }) => {
  const { asPath } = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/${asPath}`

  const onCopy = async () => {
    inputRef?.current?.focus()
    inputRef?.current?.select()

    try {
      await navigator.clipboard.writeText(url)
    } catch (err) {}
  }

  return (
    <DialogBox title="Share" onClose={onClose}>
      <div className={styles["share-input-box"]}>
        <input ref={inputRef} value={url} readOnly />
        <Button variant="blue-blue" onClick={onCopy}>
          COPY
        </Button>
      </div>
    </DialogBox>
  )
}
