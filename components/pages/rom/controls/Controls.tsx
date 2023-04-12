import { useState } from "react"
import { ControllerDotMark } from "./ControllerDotMark"
import { ControlsTableRow } from "./ControlsTableRow"
import { TControlsConfig } from "./controls-configs"

type Props = {
  config: TControlsConfig
}

export const Controls: React.FunctionComponent<Props> = ({ config }) => {
  const [hovered, setHovered] = useState<string>()

  const highlight = (value: string | undefined) => {
    setHovered(value)
  }

  return (
    <div>
      <div className="relative w-[450px]">
        <img src={config.image} className="w-full" alt="" />

        {config.elements.map(({ name, mark: { top, left } }) => (
          <ControllerDotMark
            name={name}
            top={top}
            left={left}
            highlight={highlight}
            key={name}
          />
        ))}
      </div>

      <table
        cellSpacing="0"
        cellPadding="0"
        className="w-full text-lg [&_td:nth-child(1)]:pl-5 [&_td:nth-child(1)]:text-left [&_td:nth-child(2)]:bg-[rgba(255,255,0,0.274)] [&_td:nth-child(3)]:bg-[rgba(0,174,255,0.274)] [&_td:nth-child(4)]:bg-[rgba(0,255,42,0.274)] [&_td]:w-full [&_td]:px-4 [&_td]:py-2 [&_td]:text-center"
      >
        <thead>
          <tr>
            <td className="rounded-tl-lg rounded-tr-lg border-0 border-b border-dashed border-[#2a2a0f] text-black hover:cursor-default hover:text-white"></td>
            <td className="rounded-tl-lg rounded-tr-lg border-0 border-b border-dashed border-[#2a2a0f] text-black hover:cursor-default hover:text-white">
              keyboard
            </td>
            <td className="rounded-tl-lg rounded-tr-lg border-0 border-b border-dashed border-[#2a2a0f] text-black hover:cursor-default hover:text-white">
              ps
            </td>
            <td className="rounded-tl-lg rounded-tr-lg border-0 border-b border-dashed border-[#2a2a0f] text-black hover:cursor-default hover:text-white">
              xbox
            </td>
          </tr>
        </thead>
        <tbody>
          {config.elements.map(({ name, icons }) => (
            <ControlsTableRow
              name={name}
              hovered={hovered}
              icons={icons}
              key={name}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
