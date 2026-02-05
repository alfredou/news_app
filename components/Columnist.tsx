import React from 'react'
import Image from 'next/image'
import { Author } from '@/types'

function Columnist({authors}: {authors: Author[]}) {

  return (
    <aside className="bg-white border border-gray-100 rounded-md p-6 mt-6 w-full">
        <h2 className="text-lg font-semibold text-primary mb-4">Columnists</h2>
         {Array.isArray(authors) && authors.length > 0 ? authors.map((author, i)=>(
            <div data-testid={`columnist-${i}`} key={author.name || i} className="flex gap-4 mb-4 items-start p-2 rounded-sm">
                <div className="flex-none w-14 h-14 relative rounded-full overflow-hidden ring-1 ring-gray-200">
                  {author.photo?.url ? (
                    <Image src={author.photo.url} alt={author.name} fill className="object-cover" sizes="56px" loading="lazy"/>
                  ) : (
                    <div className="w-full h-full bg-primary/10" />
                  )}
                </div>
                 <div className="flex-1">
                     <div className="flex items-center gap-3 mb-1">
                       <span className="text-xs font-medium bg-primary/5 text-primary px-2 py-0.5 rounded">{author.category?.name}</span>
                       <h3 className="text-sm font-semibold text-slate-900">{author.name}</h3>
                     </div>
                     <p className="text-sm text-slate-600 leading-snug mt-1" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{author.bio}</p>
                 </div>
            </div>
         )) : <div className="text-sm text-slate-500">Loading...</div>} 
    </aside>
  )
}

export default Columnist