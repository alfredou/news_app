"use client"
import React, {useState} from 'react'
import { WeatherTypes } from '@/types'
import useSWR from 'swr'
import axios from 'axios'
import Image from 'next/image'
import GeoLocation from './Geolocation'
import { LocationData } from '@/types'

const fetcher = (urlWeather: string)=>{
    const currentDate = new Date()
    return axios(urlWeather).then(res=>{
        if(res.data){
           const iconBaseUrl: string | undefined = process.env.NEXT_PUBLIC_ICONBASEURL
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
    const [location, setLocation] = useState<LocationData | null>(null);

    const urlWeather = `${process.env.NEXT_PUBLIC_URLWEATHER}&lang=es&q=${location && location.city || 'santo domingo'}`;

    const newUrlWeather = urlWeather 
    const {data: tempInfo, isLoading, error} = useSWR(newUrlWeather, fetcher)    

    const handleLocationUpdate = (locationData: LocationData) => {
        setLocation(locationData);
      };
    
    return (
       <>
            <GeoLocation onLocationUpdate={handleLocationUpdate} />

            {tempInfo?.map((item)=>{
              return <div key={item.country} className="text-sm px-4 flex gap-x-2 justify-center items-center"> 
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