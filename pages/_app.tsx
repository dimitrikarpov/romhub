import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { SessionProvider, SessionProviderProps } from "next-auth/react"
import "../styles/globals.css"
import { LayoutProvider } from "../contexts/layout/LayoutProvider"
import { SearchProvider } from "../contexts/search/SearchProvider"
import { SearchRequestProvider } from "../contexts/search-request/SearchRequestProvider"

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      <SearchProvider>
        <SearchRequestProvider>
          <LayoutProvider>
            {getLayout(<Component {...pageProps} />)}
          </LayoutProvider>
        </SearchRequestProvider>
      </SearchProvider>
    </SessionProvider>
  )
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
