import React from 'react'
import { links, social } from '@/navInfo'
import Link from 'next/link'

function Footer() {
  return (
    <div className='bg-cyan-600/50 text-center py-4 w-full mt-40 p-8 flex flex-col gap-12'>
          <div className=''>
              <h2 className='text-3xl'>PCInfo news</h2>
              <div className='text-2xl flex justify-center mt-10 sm:justify-center gap-8'>
                     <Link href="https://www.facebook.com/" className="hover:-translate-y-1 cursor-pointer">{social[0].facebookIcon}</Link>        
                     <Link href="https://www.twitter.com/" className="hover:-translate-y-1 cursor-pointer">{social[1].twitterIcon}</Link>        
                     <Link href="https://www.instagram.com/" className="hover:-translate-y-1 cursor-pointer">{social[2].instagramIcon}</Link>        
                     <Link href="https://www.youtube.com/" className="hover:-translate-y-1 cursor-pointer">{social[3].youtubeIcon}</Link>        
                     <Link href="https://www.linkedin.com/" className="hover:-translate-y-1 cursor-pointer">{social[4].linkedinIcon}</Link>        
              </div>
          </div>
          <h2 className='text-2xl font-bold'>Sections</h2>
          <div className="mt-5 grid gap-3 grid-cols-2 md:grid-cols-3 xl:justify-center">
                    {links.map((item, i)=>{
                     return <div className='grid gap-4 w-full'>
                           <Link className="text-xl font-bold hover:text-white" href={item.url} key={i}>{item.title}</Link>
                           <div className='flex flex-col gap-2'>
                                    {item.subSections.map((subsection, index)=>{
                                        return <Link href={subsection.url} key={index}>{subsection.title}</Link>
                                     })}
                            </div>
                        </div>
                    })} 
          </div>
          <div className='flex flex-col gap-7 pb-5'>
               <h2 className='text-2xl font-bold'>Newsletter</h2>
               <div className='flex flex-col justify-center items-center gap-5'>
                        <div className='flex gap-3'>
                                <input className="p-2 w-40 border-none outline-none" type="text" placeholder='nombre'/>
                                <input className="p-2 w-40 border-none outline-none" type="text" placeholder='apellido'/>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-5'>
                            <input className="p-2 w-[333px] border-none outline-none" type="email" placeholder='correo'/>
                            <button className='w-[200px] p-3 text-xl bg-slate-700 rounded-md hover:bg-slate-800 text-white'>Subscribe</button>
                        </div> 
               </div>

          </div>
    </div>
  )
}

export default Footer