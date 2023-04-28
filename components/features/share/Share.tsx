import { useRef } from "react"
import { useRouter } from "next/router"
import { Button } from "~/components/ui/button/Button"

type Props = {
  type?: "playlist" | "rom"
  id?: string
}

export const Share: React.FunctionComponent<Props> = (props) => {
  const { asPath } = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const path =
    props && props?.type && props?.id ? `/${props.type}/${props.id}` : asPath

  const url = `${process.env.NEXT_PUBLIC_DOMAIN}${path}`

  const onCopy = async () => {
    inputRef?.current?.focus()
    inputRef?.current?.select()

    try {
      await navigator.clipboard.writeText(url)
    } catch (err) {}
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#ffffff1a] bg-[#181818] px-4 py-2">
      <input
        ref={inputRef}
        value={url}
        readOnly
        className="w-[380px] overflow-hidden whitespace-nowrap border-none bg-black text-sm text-[#f1f1f1]"
      />
      <Button variant="blue-blue" onClick={onCopy}>
        COPY
      </Button>
    </div>
  )
}
