import React from 'react'
import Link from 'next/link'
import { links } from '@/navInfo'
import { social } from '@/navInfo'

type handleShow = {
    handleShowPortal: (e: React.MouseEvent<HTMLAnchorElement | SVGSVGElement>)=>void
}

function PortalChildMenu({handleShowPortal}: handleShow) {
  return (
         <>
                <div className="flex justify-end mb-10">
                    <svg className="cursor-pointer" onClick={handleShowPortal} xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                </div>
                <div className="flex justify-center border-b-2 pb-3 w-full">
                     <Link href='/' onClick={handleShowPortal} className="text-xl font-semibold sm:text-2xl">PcInfo News</Link>
                </div>
                <h2 className="text-center text-md py-8 sm:text-xl">Sections</h2>
                <div className="mt-10 flex flex-col gap-y-7 items-center justify-center md:mt-0">
                    {links.map((link, i)=>{
                        return(
                         <div data-testid={`link-${i}`} key={link.title} className="flex flex-col items-center justify-center w-full">
                            <div className="flex w-full gap-5" id={link.title}>
                              <Link onClick={handleShowPortal} className={`w-full text-md border-b-2 font-bold hover:text-blue-500 sm:text-md`} href={`/category/${link.url}`}>{link.title}</Link>                              
                            </div>
                         </div>
                        )
                    })}
                </div>
                <div className="flex w-full justify-evenly mt-28 text-xl">
                    {social.map((links, i)=>{
                        return <Link data-testid={`social-${i}`} key={i} href={links.url} className="hover:-translate-y-1 cursor-pointer">{links.icon}</Link>        
                    })}                    
                </div>
         </>
  )
}

export default PortalChildMenu