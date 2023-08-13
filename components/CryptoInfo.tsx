"use client"
import React from 'react'
import Image from 'next/image';
import { ApiResponse, CryptoTypes } from '@/types';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string)=> axios(url).then(res=>{
  if(res.data){
    const resultingArray: CryptoTypes[] = res.data.map((item: ApiResponse): CryptoTypes =>{

        const cryptoObj: CryptoTypes = {
            id: item.id,
            symbol: item.symbol,
            name: item.name,
            image: item.image,
            current_price: item.current_price,
            price_change_percentage_24h: item.price_change_percentage_24h,
            total_volume: item.total_volume
        }

        return cryptoObj
    })
    return resultingArray
  }
}).catch((e: any)=>{
  console.log("Error fetching data:", e)
})

function CryptoInfo() {
     const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false&locale=en"
   
     const {data: cryptos, isLoading, error} = useSWR(url, fetcher)

  return (
    <div className='mx-7 flex border-2 border-gray-400 mt-2 gap-1 overflow-hidden'>
        <div className='animate-crypto duration-10000 flex '>
          {cryptos?.map((item, i)=>{
            return (
                <div key={i} className="ml-20 flex gap-5 justify-center items-center after:content-['|']">
                   <Image src={item.image} width={40} height={40} alt={item.name} loading="eager"/>
                 <h2 className='text-xl'>{item.name}</h2>
                 <span>{item.current_price}</span>
                 <span className={item.price_change_percentage_24h.toString().split('').includes("-") ? "text-red-500" : "text-green-500"}>{item.price_change_percentage_24h}</span>
            </div>
            )})}
        </div>
    </div>
  )
}

export default CryptoInfo