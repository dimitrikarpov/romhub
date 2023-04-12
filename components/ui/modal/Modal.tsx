import React, { ReactNode } from "react"

type Props = {
  children?: ReactNode
  close?: () => void
}

export const Modal: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000b3]">
      <div className="min-w-[210px] rounded-2xl border-none bg-[#212121] text-[#f1f1f1]">
        {children}
      </div>
    </div>
  )
}
