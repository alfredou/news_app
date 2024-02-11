import React from 'react'
import Image from 'next/image'
import { Author } from '@/types'

function Columnist({authors}: {authors: Author[]}) {

  return (
    <div className="shadow-md p-2 mt-3 min-w-max">
        <h1 className="border-b-2 text-2xl mb-2 font-semibold">Columnists</h1>
         {authors.length > 0 ? authors.map((author, i)=>(
            <div data-testid={`columnist-${i}`} key={i} className="flex gap-3 mb-2 mt-5">
                <div className="flex justify-center items-center object-cover">
                  <Image className="rounded-full w-14 h-14" src={author.photo.url} width={55} height={50} alt={author.name} loading="lazy"/>
                </div>
                 <div>
                     <h2 className="font-semibold text-lg">{author.category.name.toUpperCase()}</h2>
                     <h2 className="text-lg font-semibold">{author.name}</h2>
                     <h3 className="text-md">{author.bio}</h3>
                 </div>
            </div>
         )) : "loading"} 
    </div>
  )
}

export default Columnist