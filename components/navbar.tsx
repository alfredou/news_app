"use client"; 
import Link from "next/link"; 
import React from "react";
import { useState, useEffect } from "react";
import NavMenuPortal from "./navbar_menu";
import {links, social} from "@/navInfo"
import { WeatherTypes } from "@/types";

function Navbar(){
    
    const [showInput, setShowInput] = useState(false)
    const [showPortal, setShowPortal] = useState(false)
    const [showSections, setShowSections] = useState({section: false, indexMenu: 0})

    const [tempInfo, setTempInfo] = useState<WeatherTypes>({
        temp: 0,
        humidity: 0,
        country: '',
        main: '',
        icon: '',
        date: ''
    })

    const urlWeather = "https://api.openweathermap.org/data/2.5/weather?appid=d6e926720c8d149b73f2341eb88e50a8&lang=es&q=santo domingo"
    const iconBaseUrl = `http://openweathermap.org/img/wn/`
    const currentDate = new Date()

    useEffect(()=>{
          fetch(urlWeather).then(res=>res.json()).then(res=>{
           const weatherObj: WeatherTypes = {
               temp: res.main.temp,
               humidity: res.main.humidity,
               country: res.sys.country,
               main: res.weather[0].main,
               icon: `${iconBaseUrl}${res.weather[0].icon}@2x.png`,
               date: currentDate.toLocaleDateString()
           }
               setTempInfo(weatherObj)
        })
    },[])

    useEffect(()=>{
       //console.log(tempInfo)
    },[tempInfo])

    const handleShowInput = ()=>{
        setShowInput(!showInput)
    }
    const handleShowPortal = ()=>{
         setShowPortal(!showPortal)
    }
    const handleShowList = (i:number, e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>)=>{
        if(e.type == "mouseout"){
             setShowSections({section: false, indexMenu: i})
            }
            else if(e.type == "mouseover"){
             setShowSections({section: true, indexMenu: i})
         }
    }

    return (
        <header className="z-30 flex flex-col">
          <div className="p-4 flex justify-around items-center sm:justify-between">
            <span className="text-lg cursor-pointer sm:text-xl md:text-2xl">
                  <svg onClick={handleShowPortal} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            </span>
            <span className="text-xl sm:text-lg font-semibold md:text-xl lg:text-2xl">
                     PcInfo News
            </span>
            <div onClick={handleShowInput}>
                  {!showInput && <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>} 
                 
                  {showInput && <div className="flex gap-2 items-center">
                      <input type="text" className="w-40 border-0 outline-none" placeholder="Search"/>
                            <svg className="cursor-pointer" onClick={handleShowInput} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                 </div>}
            </div>
          </div>
            <nav className="py-4 px-1 flex flex-col-reverse items-center md:flex-row justify-around">
                <div className="flex gap-5 items-center h-5 justify-center">    
                    {links.slice(0,5).map(({url, id, title})=>{
                        return(
                           <Link className="text-sm hover:border-b-4 border-cyan-600 sm:text-sm md:text-md xl:text-xl" href={url} key={id}>{title}</Link>
                        )
                    })}
                </div>
             <div className="px-4 flex gap-x-2 justify-center items-center">
                <span>{tempInfo.date}</span>
                <span>{(tempInfo.temp - 273.15).toFixed(1)}°C</span>
                <span>{tempInfo.humidity}%</span>
                <span>{tempInfo.country}</span>
                <img src={tempInfo.icon} width="40px" alt=""/>
                <span>{tempInfo.main}</span>
             </div>
            </nav>
           <NavMenuPortal handleShowPortal={handleShowPortal} showPortal={showPortal}>
                <div className="flex justify-end mb-10">
                    <svg className="cursor-pointer" onClick={handleShowPortal} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                </div>
                <div className="flex justify-center border-b-2 pb-3 w-full">
                     <h1 className="text-xl sm:text-2xl">PcInfo News</h1>
                </div>
                <h2 className="text-center text-md py-8 sm:text-xl">Sections</h2>
                <div className="mt-20 flex flex-col gap-y-7 items-center justify-center">
                    {links.map((item, i)=>{
                        return(
                         <div key={item.id} className="flex flex-col items-center justify-center w-full">
                            <div className="flex w-full gap-5" id={item.title} onMouseOver={(e)=>handleShowList(i, e)} onMouseOut={(e)=>handleShowList(i,e)}>
                              <Link className={(showSections.section && showSections.indexMenu == i) ? `w-full text-sm border-b-2 text-blue-500 sm:text-md md:text-lg`: 'w-full text-sm border-b-2 sm:text-md md:text-lg'} href={item.url}>{item.title}</Link>                              
                              <svg className={(showSections.section && showSections.indexMenu == i) ? `rotate-90` : ''} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                            </div>
                               
                                    {(showSections.section && showSections.indexMenu == i) && item?.subSections.map((list,index)=>{
                                         return <div key={index} className="p-1 transition ease-in-out delay-150 flex flex-col bg-blue-600/50 w-full" onMouseOver={(e)=>handleShowList(i, e)} onMouseOut={(e)=>handleShowList(i,e)}>
                                                    <Link className="p-0 ml-4 w-full text-md hover:text-white sm:text-md md:text-lg" href={list.url} key={list.url}>{list.title}</Link>
                                                </div>
                                    })}
                         </div>
                        )
                    })}
                </div>
                <div className="flex w-full justify-evenly mt-28 text-xl">
                     <Link href="https://www.facebook.com/" className="hover:-translate-y-1 cursor-pointer">{social[0].facebookIcon}</Link>        
                     <Link href="https://www.twitter.com/" className="hover:-translate-y-1 cursor-pointer">{social[1].twitterIcon}</Link>        
                     <Link href="https://www.instagram.com/" className="hover:-translate-y-1 cursor-pointer">{social[2].instagramIcon}</Link>        
                     <Link href="https://www.youtube.com/" className="hover:-translate-y-1 cursor-pointer">{social[3].youtubeIcon}</Link>        
                     <Link href="https://www.linkedin.com/" className="hover:-translate-y-1 cursor-pointer">{social[4].linkedinIcon}</Link>        
                </div>
            </NavMenuPortal>
        </header>
    )
}

export default Navbar