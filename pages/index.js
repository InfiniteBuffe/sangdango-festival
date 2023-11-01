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
      <div className={styles.image_container}>
        <Image
          src="sangdang.jpg"
          width={0}
          height={0}
          style={{
            width: '100%',
            minWidth: '800px',
            maxWidth: '1100px',
            height: 'auto',
            minHeight: '300px',
            '-webkit-user-drag': 'none',
            filter: 'blur(40px) brightness(30%) opacity(80%)'
          }}
          loader={({ src }) => { return `https://cdn.sangdang.kr/${src}` }}
        />
        <div className={styles.main_text}>
          운명처럼 찾아와<br/>당신을 기다린<br /><span id={styles.yongcheon}>2023 용천제</span>
        </div>
      </div>
    </>
  )
}
