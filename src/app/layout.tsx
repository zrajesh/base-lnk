"use client"

import { useState } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import UserContext from '@/context/userContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BaseLnk - One link for everything you create, curate, and sell. ',
  description: 'A platform where you can manage all your social media and other links. Get analytics of them and much more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [userData, setUserData] = useState({
    username: "",
    role: "",
    bio: "",
    avatar: "",
    socialMedia: ""
  });

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <UserContext.Provider value={{userData, setUserData}}>
        {children}
        </UserContext.Provider>
      </body>
    </html>
  )
}
