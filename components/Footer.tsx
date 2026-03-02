import React from 'react'
import { links, social } from '@/navInfo'
import Link from 'next/link'
import Newsletter from './Newsletter'

function Footer() {
  return (
    <footer className="mt-20">
      <div className="w-full bg-gradient-to-r from-primary to-accent text-white py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold">PCInfo News</h2>
              <p className="mt-2 text-sm opacity-90 max-w-md">The most relevant tech news, selected by our team. Stay informed.</p>
              <div className="flex gap-4 mt-4 text-2xl">
                {social.map((s, i) => (
                  <Link key={s.url} href={s.url} aria-label={`social-${i}`} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-transform transform hover:-translate-y-1">
                    <span className="text-white">{s.icon}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-3">Sections</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {links.map((item, i) => (
                  <Link key={item.id} href={`/category/${item.url}`} className="text-sm font-medium bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md text-white transition">{item.title}</Link>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-80">
              <Newsletter />
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-90">© {new Date().getFullYear()} PCInfo News — All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer