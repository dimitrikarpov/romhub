import React from "react"
import Head from "next/head"
import { Rom } from "../types"
import { prisma } from "../prisma/db"
import { transformRom } from "./api/roms"
import { RomGrid } from "../components/rom-grid/RomGrid"
import layoutStyles from "../styles/Layout.module.css"
import styles from "../styles/Home.module.css"
import { useRomsFetcher } from "../components/useRomsFetcher"
import { RomGridPaginator } from "../components/rom-grid/RomGridPaginator"
import { RomGridControls } from "../components/rom-grid/RomGridControls"
import TopBar from "../components/layout/TopBar"
import SideBar from "../components/layout/SideBar"

export async function getServerSideProps() {
  const initialTotal = await prisma.rom.count()
  const roms = await prisma.rom.findMany({ take: 15 })

  return {
    props: {
      initialRoms: roms.map(transformRom),
      initialTotal,
    },
  }
}

type Props = {
  initialRoms: Rom[]
  initialTotal: number
}

export default function Home({ initialRoms, initialTotal }: Props) {
  const {
    roms,
    canFetchNext,
    canFetchPrev,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
    setPage,
    platform,
    setPlatform,
    setTitleStartsWith,
  } = useRomsFetcher(initialRoms, initialTotal)

  return (
    <div className={layoutStyles.container}>
      <Head>
        <title>RomHub</title>
        <meta name="description" content="Search and Play!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />
      <SideBar />

      <div className={styles.platformsSelectorContainer}>
        <span
          className={[
            styles.platformSelectorItem,
            styles.platformSelectorItemActive,
          ].join(" ")}
        >
          All
        </span>

        <span className={styles.platformSelectorItem}>
          Nintendo Entertainment System
        </span>

        <span className={styles.platformSelectorItem}>Sega Genesis</span>

        <span className={styles.platformSelectorItem}>Super Nintendo</span>
      </div>

      <header className={styles.header}>
        <span>ROM</span>
        <img src="/assets/child-game-svgrepo-com.svg" alt="logo" />
        <span>HUB</span>
      </header>

      <main className={styles.main}>
        <RomGridControls
          platform={platform}
          setPlatform={setPlatform}
          setTitleStartsWith={setTitleStartsWith}
        />
        <RomGrid roms={roms || initialRoms} />
        <RomGridPaginator
          canFetchNext={canFetchNext}
          canFetchPrev={canFetchPrev}
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          setPage={setPage}
        />
      </main>
    </div>
  )
}
