import React from 'react'
// removed i18n helper usage to keep static texts
import { getCategories, getPosts } from '@/services'
import { Categories } from '@/types'
import PostListCategory from './PostListCategory'
import Link from 'next/link'
import { links } from '@/navInfo'


function CategorySection () {

    return (
    <>
          {Array.isArray(links) && links.map((link, i)=>{
            return (<div className='grid gap-5 mt-20 items-center justify-center' key={link.id}>
                   <h1 className='font-bold text-3xl text-primary mb-4 text-center'>{link.title}</h1>
                    <PostListCategory slug={link.url}/>
                        <Link className='inline-flex ml-20 justify-center bg-primary text-white p-3 w-40 rounded text-center items-center font-bold hover:bg-primary/90 group' href={`/category/${link.url}`}>
                          <span className='pointer-events-none whitespace-nowrap text-white transition-colors duration-150'>Mostrar más</span>
                          <span className='ml-2 inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none' aria-hidden>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                 </div>)
          })}
    </>
  )
}

export default CategorySection


