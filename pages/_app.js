import BottomNav from '@/components/BottomNav'
import TopSlideBanner from '@/components/TopSlideBanner'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {

  const router = useRouter()

  let currentPath = (router.pathname).split('/')[1]

  if (currentPath == '') { currentPath = 'home' }

  return (
    <>
      <Toaster position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '30px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <Component {...pageProps} />
      <BottomNav tab={currentPath} />
      <TopSlideBanner />
    </>
  )
}
