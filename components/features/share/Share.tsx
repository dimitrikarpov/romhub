import { useRef } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button/Button"
import styles from "./Share.module.css"

type Props = {}

// TODO: add url prop

export const Share: React.FunctionComponent<Props> = () => {
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
    <div className={styles["share-input-box"]}>
      <input ref={inputRef} value={url} readOnly />
      <Button variant="blue-blue" onClick={onCopy}>
        COPY
      </Button>
    </div>
  )
}
