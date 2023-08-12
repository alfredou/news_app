"use client"
import React from 'react'
import { WeatherTypes } from '@/types'
import useSWR from 'swr'
import axios from 'axios'
import Image from 'next/image'

const fetcher = (urlWeather: string)=>{
    const currentDate = new Date()
    return axios(urlWeather).then(res=>{
        if(res.data){
           const iconBaseUrl: string = `http://openweathermap.org/img/wn/`
           const weatherObj: WeatherTypes[] = [{
               temp: res.data.main.temp,
               humidity: res.data.main.humidity,
               country: res.data.sys.country,
               main: res.data.weather[0].main,
               icon: `${iconBaseUrl}${res.data.weather[0].icon}@2x.png`,
               date: currentDate.toLocaleDateString()
            }]
        return weatherObj
    }
 })}

function TempState() {
    const urlWeather = "https://api.openweathermap.org/data/2.5/weather?appid=d6e926720c8d149b73f2341eb88e50a8&lang=es&q=santo domingo"
    const {data: tempInfo, isLoading, error} = useSWR(urlWeather, fetcher)    
    
    return (
       <>
            {tempInfo?.map((item)=>{
              return <div key={item.country} className="px-4 flex gap-x-2 justify-center items-center"> 
                           <span>{item.date}</span>
                           <span>{(item.temp - 273.15).toFixed(1)}°C</span>
                           <span>{item.humidity}%</span>
                           <span>{item.country}</span>
                           <Image src={item.icon} width={40} height={40} alt={item?.country} loading="lazy"/>
                           <span>{item.main}</span>   
                      </div>
            })}               
       </>
  )
}

export default TempState