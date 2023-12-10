import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
