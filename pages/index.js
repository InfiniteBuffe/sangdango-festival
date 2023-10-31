import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/pages/Home/Home.module.css'
import TopSlideBanner from '@/components/TopSlideBanner'

export default function Home() {
  return (
    <>
      <Head>
        <title>2023 상당고 용천제</title>
      </Head>
      <TopSlideBanner />
    </>
  )
}
