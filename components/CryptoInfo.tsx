"use client"
import React from 'react'
import { t, getLocaleFromPath } from '@/lib/intl'
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

  const {data, isLoading, error} = useSWR(process.env.NEXT_PUBLIC_CRYPTOINFO_URL, fetcher)

  const formatPrice = (p?: number) => p == null ? '-' : p.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
  const formatPct = (v?: number) => v == null ? '-' : `${v.toFixed(2)}%`

  return (
    <aside className='bg-white border border-gray-100 rounded-md mt-2 w-full overflow-x-auto'>
      {error && <div className="text-sm text-red-500">{t('crypto.error', typeof window !== 'undefined' ? getLocaleFromPath() : 'es')}</div>}
      {isLoading && <div className="text-sm text-slate-500">{t('crypto.loading', typeof window !== 'undefined' ? getLocaleFromPath() : 'es')}</div>}

      <div className='animate-crypto duration-10000 flex gap-6 items-center'>
        {data && data.length > 0 ? data.map((item, i)=>{
          const negative = (item.price_change_percentage_24h ?? 0) < 0
          return (
            <div data-testid={`crypto-${i}`} key={item.id || i} className="flex items-center gap-3 min-w-[220px] px-4 py-2">
                 <div className="flex-none w-9 h-9 relative rounded-full overflow-hidden">
                   <Image src={item.image} width={30} height={30} alt={item.name} loading="eager" className="object-cover" />
                 </div>
                 <div className="flex-1">
                   <div className="flex items-baseline gap-3">
                     <h3 className='text-sm font-medium text-slate-900'>{item.name}</h3>
                     <span className="text-xs text-slate-500">{formatPrice(item.current_price)}</span>
                   </div>
                  <div className="text-xs mt-1">
                   <span className={negative ? 'text-red-500 font-medium' : 'text-green-500 font-medium'}>{formatPct(item.price_change_percentage_24h)}</span>
                   <span className="text-xs text-slate-400 ml-2">{t('crypto.volume', typeof window !== 'undefined' ? getLocaleFromPath() : 'es')} {Number(item.total_volume).toLocaleString()}</span>
                 </div>
                 </div>
            </div>
          )
        }) : null}
      </div>
    </aside>
  )
}

export default CryptoInfo