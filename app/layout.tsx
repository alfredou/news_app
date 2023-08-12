import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
//import Footer from '@/components/Footer'
import dynamic from 'next/dynamic' // Import the dynamic function

const Footer = dynamic(()=>import('@/components/Footer'))


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000/"),
  title: {
    default: 'PcInfoNews',
    template: '%s | PcInfoNews'
  },
  description: 'My site description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root" className='h-screen'>
           <Navbar/>
           {children}
           <Footer/>
        </div>
      </body>
    </html>
  )
}
