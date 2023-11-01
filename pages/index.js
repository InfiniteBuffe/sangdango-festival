import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/pages/Home/Home.module.css'
import TopSlideBanner from '@/components/TopSlideBanner'
import Snowfall from 'react-snowfall'
import React from "react"
React.useLayoutEffect = React.useEffect

export default function Home() {
  return (
    <>
      <Head>
        <title>2023 상당고 용천제</title>
      </Head>
      <Snowfall
        color='white'
        snowflakeCount={25}
      />
      <TopSlideBanner />
      <Image
        src="sangdang.jpg"
        width={0}
        height={0}
        style={{
          width: '100%',
          minWidth: '800px',
          height: 'auto',
          minHeight: '300px',
          filter: 'blur(40px) brightness(30%) opacity(80%)',
          textAlign: 'center',
          position: 'absolute',
          top: '30px',
          userSelect: 'none',
          '-webkit-user-drag': 'none'
        }}
      loader={({ src }) => { return `https://cdn.sangdang.kr/${src}` }}
      />
    </>
  )
}
