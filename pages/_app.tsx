import { SessionProvider, SessionProviderProps } from "next-auth/react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { LayoutProvider } from "../contexts/layout/LayoutProvider"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <LayoutProvider>
        <Component {...pageProps} />
      </LayoutProvider>
    </SessionProvider>
  )
}
