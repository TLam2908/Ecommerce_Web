import React from 'react'
import { Urbanist } from 'next/font/google'
const font = Urbanist({ subsets: ['latin'] })

import Footer from '@/components/main/Footer'
import HomeNavBar from '@/components/main/HomeNavBar'

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className={`${font.className} bg-white text-black h-full`}>
        <div>
            <HomeNavBar/>
            {children}
            <Footer/>
        </div>
    </section>
  )
}

export default MainLayout