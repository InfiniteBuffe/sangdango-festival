import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/pages/Home/Home.module.css'
import Snowfall from 'react-snowfall'
import React, { useEffect, useState } from "react"
import Box from '@/components/Box'
import BoxButton from '@/components/BoxButton'
import YouTube from 'react-youtube'
import ReactPlayer from 'react-player'
import Countdown from 'react-countdown'
React.useLayoutEffect = React.useEffect

export default function Home() {

  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isCountdownReady, setIsCountdownReady] = useState(false)

  useEffect(() => {
    setIsVideoReady(true)
    setIsCountdownReady(true)
  }, [])

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) { return 'D-DAY' }
    else { return <span>{days}일 {hours}시간 {minutes}분 {seconds}초</span> }
  }

  return (
    <>
      <Head>
        <title>2023 상당고 용천제</title>
      </Head>
      <Snowfall
        color='white'
        snowflakeCount={25}
      />
      <div className={styles.title_text}>
        2023<br />YONG-CHEON<br /><span id={styles.festival}>FESTIVAL✨</span>
      </div>
      <div className={styles.video_container}>
        {/* <Image
          src="sangdang.jpg"
          width={0}
          height={0}
          style={{
            width: '100%',
            minWidth: '800px',
            // maxWidth: '1100px',
            height: 'auto',
            minHeight: '300px',
            WebkitUserDrag: 'none',
            filter: 'blur(0px) brightness(30%) opacity(80%)',
            objectFit: 'cover'
          }}
          className={styles.image_shadow}
          loader={({ src }) => { return `https://cdn.sangdang.kr/${src}` }}
        /> */}
        {/* <video
          autoPlay={true}
          loop={true}
          width={'100%'}
          height={'100%'}
          muted={true}
          playsInline={true}
          className={styles.video}
        >
          <source src="https://cdn.sangdang.kr/sangdango_intro_festival.mp4" type='video/mp4' />
        </video> */}
        {isVideoReady && (
          <ReactPlayer
            url='https://cdn.sangdang.kr/sangdango_intro/sangdango_intro.m3u8'
            muted={true}
            controls={false}
            loop={true}
            playing={true}
            className={styles.video}
            width={'100%'}
            height={'100%'}
            playsinline={true}
            autoPlay={true}
          />
        )}
        {/* <div className={styles.main_text}>
          <span style={{color:'rgba(255,255,255,0.8)'}}>운명처럼 다가와<br/>당신을 기다린</span><br /><span id={styles.yongcheon}>2023 용천제</span>
        </div> */}
      </div>
      {/* <Box>
          <div className={styles.button_text}>테스트 테스트 테스트</div>
          <BoxButton
            text='테스트'
            color='blue'
          />
      </Box> */}
      {isCountdownReady && (
        <div className={styles.countdown}>
          <p id={styles.countdown_text}>우리가 만나기까지</p>
          <Countdown
            date={new Date(2023, 11, 21)}
            renderer={renderer}
          />
        </div>
      )}
    </>
  )
}
