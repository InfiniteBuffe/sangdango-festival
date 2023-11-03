import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/pages/Home/Home.module.css'
import Snowfall from 'react-snowfall'
import React from "react"
import Box from '@/components/Box'
import BoxButton from '@/components/BoxButton'
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
            WebkitUserDrag: 'none',
            filter: 'blur(40px) brightness(30%) opacity(80%)'
          }}
          loader={({ src }) => { return `https://cdn.sangdang.kr/${src}` }}
        />
        <div className={styles.main_text}>
          <span style={{color:'rgba(255,255,255,0.8)'}}>운명처럼 찾아와<br/>당신을 기다린</span><br /><span style={{fontWeight:'700'}} id={styles.yongcheon}>2023 용천제</span>
        </div>
      </div>
      <Box>
          <div className={styles.button_text}>테스트 테스트 테스트</div>
          <BoxButton
            text='테스트'
            color='blue'
          />
      </Box>
    </>
  )
}
