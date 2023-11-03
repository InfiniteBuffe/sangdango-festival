import BottomNav from '@/components/BottomNav'
import TopSlideBanner from '@/components/TopSlideBanner'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function App({ Component, pageProps }) {

  const router = useRouter()

  let currentPath = (router.pathname).split('/')[1]

  if (currentPath == '') { currentPath = 'home' }
  
  return (
    <>
      <Component {...pageProps} />
      <BottomNav tab={currentPath} />
      <TopSlideBanner />
    </>
  )
}
