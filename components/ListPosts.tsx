import React from 'react'
import { PostData } from '@/types'
import {format} from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

type newPostData = Omit<PostData, "content">

function ListPosts({postList}:{ postList: newPostData}) {
  return (
    <>
  <Link href={`/post/${postList.slug}`}>
    <div className="cursor-pointer bg-white rounded-lg lg:p-6 pb-8 mb-8 mt-10 shadow-xl max-w-xl hover:shadow-2xl transition-shadow duration-200">
      <div className="relative overflow-hidden mb-4 h-56 sm:h-72 lg:h-80 rounded-lg">
        <Image src={postList.featuredImage.url} alt={postList.slug} fill sizes="(max-width: 768px) 100vw, 400px" loading="lazy" className="object-cover shadow-md rounded-lg" />
      </div>
      <h2 className="text-center mb-3 font-extrabold text-2xl sm:text-3xl text-primary leading-tight">{postList.title}</h2>
      <div className="px-4 lg:px-0">
        <div className="flex items-center justify-between w-full border-b-2 pb-3 mb-4">
          <div className="flex items-center">
            <Image
              alt={postList.author.name}
              height={36}
              width={36}
              src={postList.author.photo.url}
              loading='lazy'
              className="rounded-full"
            />
            <p className="text-sm text-slate-800 ml-3 font-medium">{postList.author.name}</p>
          </div>
          <div className="text-sm text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle">{format(new Date(postList.createdAt), 'MM/dd/yyyy')}</span>
          </div>
       </div>
           <p className="mt-2 mb-2 text-gray-800" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{postList.excerpt}</p>
      </div>
    </div>
  </Link>
</>
  )
}

export default ListPosts