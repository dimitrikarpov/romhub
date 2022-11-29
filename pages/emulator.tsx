import { PrismaClient } from "@prisma/client"
import { EmulatorComponent } from "../components/emulator/EmulatorComponent"
import { useRomDownloader } from "../components/emulator/useRomDownloader"
import { GetServerSideProps } from "next"
import { Rom } from "../types"
import { transformRom } from "./api/roms"
import styles from "../styles/Emulator.module.css"

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id

  const emptyProps = { props: { rom: undefined } }

  if (!id) return emptyProps

  const rom = await prisma.rom.findUnique({
    where: { id: String(context.query.id) },
  })

  if (!rom) return emptyProps

  return { props: { rom: transformRom(rom) } }
}

type Props = { rom: Rom | undefined }

export default function Emulator({ rom }: Props) {
  const { rom: buffer } = useRomDownloader(rom?.file)
  const coreUrl =
    "https://cdn.statically.io/gh/dimitrikarpov/holy-retroarch@master/cores/fceumm_libretro.js"

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageTopBar}>
        <a href="/" className={styles.pageBackArrow}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 40 40"
            enable-background="new 0 0 40 40"
          >
            <g>
              <g>
                <g>
                  <path
                    fill="#231815"
                    d="M22,26.5c-0.1,0-0.3,0-0.4-0.1l-4.6-4.6c-0.5-0.5-0.7-1.1-0.7-1.8s0.3-1.3,0.7-1.8l4.6-4.6
				c0.2-0.2,0.5-0.2,0.7,0s0.2,0.5,0,0.7l-4.6,4.6c-0.6,0.6-0.6,1.5,0,2.1l4.6,4.6c0.2,0.2,0.2,0.5,0,0.7
				C22.3,26.5,22.1,26.5,22,26.5z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </a>

        <p>{rom?.title}</p>

        <div>
          <a href={rom?.file}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 40 40"
              enable-background="new 0 0 40 40"
            >
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <path
                          fill="#231815"
                          d="M20,22c-0.1,0-0.3,0-0.4-0.1l-3-3c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l2.6,2.6l2.6-2.6
						c0.2-0.2,0.5-0.2,0.7,0s0.2,0.5,0,0.7l-3,3C20.3,22,20.1,22,20,22z"
                        />
                      </g>
                      <g>
                        <path
                          fill="#231815"
                          d="M20,21.5c-0.3,0-0.5-0.2-0.5-0.5v-8c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v8
						C20.5,21.3,20.3,21.5,20,21.5z"
                        />
                      </g>
                    </g>
                    <g>
                      <path
                        fill="#231815"
                        d="M25,27.5H15c-1.4,0-2.5-1.1-2.5-2.5v-2c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v2c0,0.8,0.7,1.5,1.5,1.5
					h10c0.8,0,1.5-0.7,1.5-1.5v-2c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v2C27.5,26.4,26.4,27.5,25,27.5z"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </a>

          <a href="#">
            <svg
              version="1.1"
              id="图层_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 40 40"
              enable-background="new 0 0 40 40"
            >
              <g>
                <g>
                  <path
                    d="M20,27.3c-0.1,0-0.2,0-0.3,0c-0.9-0.2-4.1-1.2-6.6-5.1c-1.2-1.8-1.1-4.2,0.3-5.8c0.9-1,2.2-1.6,3.5-1.6
			c1.1,0,2.2,0.4,3.1,1.1c0.9-0.7,1.9-1.1,3.1-1.1c1.4,0,2.6,0.6,3.5,1.6c1.4,1.5,1.5,3.9,0.3,5.8c-2.5,3.9-5.7,4.9-6.6,5.1
			C20.2,27.2,20.1,27.3,20,27.3z M16.9,15.7c-1.1,0-2.1,0.5-2.8,1.3c-1.1,1.2-1.2,3.1-0.2,4.6c2.3,3.6,5.2,4.5,6,4.7l0.1,0
			c0,0,0.1,0,0.1,0c0.8-0.2,3.7-1.1,6-4.7c0.9-1.5,0.9-3.4-0.2-4.6c-0.7-0.8-1.7-1.3-2.8-1.3c-1,0-1.9,0.4-2.6,1.1
			c0,0-0.1,0.1-0.1,0.1c-0.2,0.2-0.5,0.2-0.7,0c0,0-0.1-0.1-0.1-0.1C18.9,16.1,17.9,15.7,16.9,15.7z"
                  />
                </g>
              </g>
            </svg>
          </a>
        </div>
      </div>

      {buffer && coreUrl && rom && (
        <EmulatorComponent
          coreUrl={String(coreUrl)}
          romBuffer={buffer}
          rom={rom}
        />
      )}

      <div className={styles.pageRomMeta}>
        {rom?.description && <p>{rom.description}</p>}
      </div>
    </div>
  )
}

/*
http://localhost:3000/emulator?romUrl=http://localhost:3000/api/storage/Excitebike.nes&coreUrl=https://cdn.statically.io/gh/dimitrikarpov/holy-retroarch@master/cores/fceumm_libretro.js
*/
