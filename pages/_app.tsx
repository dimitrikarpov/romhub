import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { SessionProvider, SessionProviderProps } from "next-auth/react"
import "../styles/globals.css"
import { LayoutProvider } from "../contexts/layout/LayoutProvider"

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      <LayoutProvider>{getLayout(<Component {...pageProps} />)}</LayoutProvider>
    </SessionProvider>
  )
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
