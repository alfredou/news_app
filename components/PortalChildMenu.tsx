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
                                <div className="w-full h-full p-6 bg-white/95 backdrop-blur-sm shadow-lg text-slate-900 flex flex-col">
                                    <div className="flex justify-end mb-2">
                                        <div className="rounded-full p-1 hover:bg-slate-100 transition" title="Close">
                                            <svg className="cursor-pointer h-6 w-6 text-slate-700" onClick={handleShowPortal} xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512" aria-hidden="true"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                                        </div>
                                    </div>

                                    <div className="flex justify-center border-b-2 pb-3 w-full mb-4">
                                             <Link href='/' onClick={handleShowPortal} className="text-2xl font-bold text-primary">PcInfo News</Link>
                                    </div>

                                    <h2 className="text-center text-lg py-2 text-muted font-medium">Sections</h2>

                                    <nav className="mt-4 flex-1 overflow-auto">
                                        {links.map((link, i)=>{
                                                return(
                                                 <div data-testid={`link-${i}`} key={link.title} className="w-full">
                                                        <Link onClick={handleShowPortal} className={`block w-full text-left text-md font-semibold py-3 px-3 rounded hover:bg-primary/5 hover:text-primary transition`} href={`/category/${link.url}`}>{link.title}</Link>
                                                 </div>
                                                )
                                        })}
                                    </nav>

                                    <div className="flex w-full justify-center mt-6 gap-4 text-xl">
                                            {social.map((links, i)=>{
                                                    return <Link data-testid={`social-${i}`} key={i} href={links.url} className="text-primary/80 hover:text-primary transition">{links.icon}</Link>
                                            })}                    
                                    </div>
                                </div>
                 </>
  )
}

export default PortalChildMenu