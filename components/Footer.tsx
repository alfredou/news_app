import React from 'react'
import { links, social } from '@/navInfo'
import Link from 'next/link'
import Newsletter from './Newsletter'

function Footer() {
  return (
    <div className='bg-cyan-600/50 text-center py-4 w-full mt-40 p-8 flex flex-col gap-12'>
          <div className=''>
              <h2 className='text-3xl'>PCInfo news</h2>
              <div className='text-2xl flex justify-center mt-10 sm:justify-center gap-8'>
                   {social.map((links, i)=>{
                        return <Link data-testid={`social-${i}`} key={i} href={links.url} className="hover:-translate-y-1 cursor-pointer">{links.icon}</Link>        
                    })}
              </div>
          </div>
          <h2 className='text-2xl font-bold'>Sections</h2>
          <div className="container mx-auto mt-5 grid gap-3 max-w-4xl grid-cols-2 md:grid-cols-3 xl:justify-center">
                    {links.map((item, i)=>{
                     return <div data-testid={`link-${i}`} className='grid gap-4 w-full' key={i}>
                           <Link className="text-xl font-semibold hover:text-white" href={`/category/${item.url}`}>{item.title}</Link>
                        </div>
                    })} 
          </div>
          <Newsletter/>
    </div>
  )
}

export default Footer