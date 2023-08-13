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
    <div className="cursor-pointer bg-white rounded-lg lg:p-8 pb-12 mb-8 mt-10 shadow-xl max-w-xl">
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image src={postList.featuredImage.url} alt={postList.slug} width={400} height={400} loading="lazy" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
      </div>
      <h1 className="text-center mb-5 font-bold border-b-2 pb-2 text-2xl sm:text-3xl md:text-3xl">{postList.title}</h1>
      <div className="px-4 lg:px-0">
        <div className="flex items-center justify-around w-full border-b-2 pb-2">
          <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
            <Image
              alt={postList.author.name}
              height={30}
              width={30}
              src={postList.author.photo.url}
              loading='lazy'
              className="align-middle rounded-full"
            />
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{postList.author.name}</p>
          </div>
          <div className="font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle">{format(new Date(postList.createdAt), 'MM/dd/yyyy')}</span>
          </div>
       </div>
           <ul className="mt-5 mb-5 pb-5 text-ellipsis"><li>{postList.excerpt}</li></ul> 
      </div>
    </div>
  </Link>
</>
  )
}

export default ListPosts