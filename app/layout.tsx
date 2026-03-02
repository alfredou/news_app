import './globals.css'
import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
//import Footer from '@/components/Footer'
import dynamic from 'next/dynamic' // Import the dynamic function

const Footer = dynamic(()=>import('../components/Footer'))


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
      <body className={`bg-gradient-to-b from-slate-50 to-white text-slate-900 antialiased`}>
        <div id="root" className='min-h-screen'>
           <Navbar/>
           <main className="max-w-7xl mx-auto px-4 md:px-8">{children}</main>
           <Footer/>
        </div>
      </body>
    </html>
  )
}
