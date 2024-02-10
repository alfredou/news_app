import React, { useEffect } from 'react'
import { getCategories, getPosts } from '@/services'
import { Categories } from '@/types'
import PostListCategory from './PostListCategory'
import Link from 'next/link'
import { links } from '@/navInfo'


function CategorySection () {

    return (
    <>
          {Array.isArray(links) && links.map((link, i)=>{
            return (<div className='grid gap-5 mt-20 items-center justify-center' key={i}>
                      <h1 className='font-bold text-3xl text-blue-500 mb-4 text-center'>{link.title}</h1>
                       <PostListCategory slug={link.url}/>
                      <Link className='inline-flex ml-20 justify-center bg-blue-500 text-white p-3 w-40 rounded text-center items-center font-bold hover:bg-blue-700' href={`/category/${link.url}`}>Show More</Link>
                   </div>)
          })}
    </>
  )
}

export default CategorySection


