import AwardSection from '@components/sections/AwardSection'
import type { NextPage } from 'next'
import Head from 'next/head'
//
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Vinicius Silva | Full Stack Developer</title>
        <meta name="description" content="Career of Vinicius Silva | Full Stack Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AwardSection />
    </div>
  )
}

export default Home
