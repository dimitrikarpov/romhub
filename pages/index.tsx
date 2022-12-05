import React from "react"
import Head from "next/head"
import { Rom } from "../types"
import { prisma } from "../prisma/db"
import { transformRom } from "./api/roms"
import { RomGrid } from "../components/rom-grid/RomGrid"
import styles from "../styles/Home.module.css"
import { useRomsFetcher } from "../components/useRomsFetcher"
import { RomGridPaginator } from "../components/rom-grid/RomGridPaginator"

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
    setPlaformFilter,
  } = useRomsFetcher(initialRoms, initialTotal)

  const onPlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    console.log({ value })

    setPlaformFilter(value === "all" ? undefined : value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <span>ROM</span>
        <img src="/assets/child-game-svgrepo-com.svg" alt="logo" />
        <span>HUB</span>
      </header>

      <main className={styles.main}>
        <div>
          <select onChange={onPlatformChange}>
            <option value="all">all</option>
            <option value="nes">NES </option>
            <option value="md">Sega Genesis</option>
            <option value="sfc">SNES</option>
          </select>
        </div>

        <RomGrid roms={roms || initialRoms} />
        <RomGridPaginator
          canFetchNext={canFetchNext}
          canFetchPrev={canFetchPrev}
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </main>
    </div>
  )
}
