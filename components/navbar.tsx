"use client"; 
import Link from "next/link"; 
import { links } from "@/navInfo";
import React from "react";
import { useState, useEffect } from "react";
import NavMenuPortal from "./NavbarMenu";
import {social} from "@/navInfo"
import { getCategories } from "@/services";
import { Categories } from "@/types";
import TempState from "./TempState";
import Burger from "./Burger";
import PortalChildMenu from "./PortalChildMenu";

export default function Navbar(){
    
    const [showInput, setShowInput] = useState(false)
    const [showPortal, setShowPortal] = useState(false)
    //const [showSections, setShowSections] = useState({section: false, indexMenu: 0})
   /* const [categories, setCategories] = useState<Categories[]>([])

    useEffect(()=>{
          getCategories().then((newCategories)=>{
                setCategories(newCategories)
          })
    },[])
*/
    const handleShowInput = ()=>{
        setShowInput(!showInput)
    }
    const handleShowPortal = ()=>{
         setShowPortal(!showPortal)
    }
    

    return (
                <header className="z-40 sticky top-0 backdrop-blur-sm bg-white/60 border-b border-gray-100">
                    <div className="p-4 flex justify-between items-center max-w-7xl mx-auto">
            <Burger handleShowPortal={handleShowPortal}/>
            <Link href='/' aria-label="PcInfo News home" className="text-xl sm:text-lg font-semibold md:text-xl lg:text-2xl text-primary">
                     PcInfo News
            </Link>
                        <div onClick={handleShowInput} className="ml-4">
                  {/*{!showInput && <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>} 
                 
                  {showInput && <div className="flex gap-2 items-center">
                      <input type="text" className="w-40 border-0 outline-none" placeholder="Search"/>
                            <svg className="cursor-pointer" onClick={handleShowInput} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                 </div>}*/}
                        </div>
                    </div>
                        <nav role="navigation" aria-label="Main navigation" className="py-2 px-4 max-w-7xl mx-auto flex flex-col-reverse items-center md:flex-row justify-between">
                                <div className="flex flex-wrap gap-6 items-center justify-center">    
                    {links.slice(0,5).map((link, i)=>{
                        return(
                             <Link data-testid={`link-${i}`} className="font-semibold text-sm text-slate-700 hover:text-primary transition-colors px-2 py-1 rounded" href={`/category/${link.url}`} key={link.url}>{link.title}</Link>
                        )
                    })}
                </div>
                <TempState/>
            </nav>
            <NavMenuPortal handleShowPortal={handleShowPortal} showPortal={showPortal}>
                <PortalChildMenu handleShowPortal={handleShowPortal}/>
            </NavMenuPortal>
        </header>
    )
}

