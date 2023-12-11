import type { Metadata } from 'next'
import './globals.css'
import { lato, raleway } from '../styles/fonts'
import NavBar from './components/NavBar/NavBar'

export const metadata: Metadata = {
  title: "Today I'm Grateful For",
  description: "A heartfelt diary note-taking web app. Capture moments, big or small, that inspire gratitude in your daily life. Express your thoughts, relive cherished memories, and celebrate the beauty of each day.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-background text-text'>
      <body>
        <NavBar/>
        {children}
      </body>
    </html>
  )
}
