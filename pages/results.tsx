import { ReactElement, useState } from "react"
import { NextPageWithLayout } from "./_app"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Layout } from "@/components/pages/layout/Layout"
import { dbQueries } from "@/lib/queries/dbQueries"
import { Filters } from "@/components/pages/results/Filters"
import { TPlatformSlug } from "@/types/index"

const Results: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData }) => {
  const [platform, setPlatform] = useState<TPlatformSlug>()

  return (
    <>
      <Filters platform={platform} setPlatform={setPlatform} />
    </>
  )
}

Results.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Results

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search_query } = context.query

  if (!search_query) {
    return {
      notFound: true,
    }
  }

  const initialData = await dbQueries.getRoms({})

  return {
    props: {
      initialData,
      search_query: search_query as string,
    },
  }
}
