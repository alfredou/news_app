"use client"
import React, {useState, useEffect, useCallback, useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCategoryPost } from '@/services'
import { Edges } from '@/types'

function PostListCategory({slug}: {slug: string}) {
   const [categoryPost, setCategoryPost] = useState<Edges[]>([])
  
  const observer = useRef<IntersectionObserver | null>(null);

  const lastBookElementRef = useCallback((node: Element | null)=>{
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries=>{
        if(entries[0].isIntersecting){
            getCategoryPost(slug, 3).then(res=> {
              setCategoryPost(res.posts)
            })
            if(node) observer.current?.unobserve(node); // Stop observing
        }
    })
    if(node) observer.current.observe(node)
}, [slug])
 

  return (
    <div className='flex gap-6 flex-wrap justify-center' ref={lastBookElementRef}>
      {categoryPost.map((item)=>{
        return (
          <Link href={`/post/${item.node.slug}`} key={item.node.slug} className='group block w-60 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200'>
            <div className='relative w-full h-40 bg-slate-100'>
              <Image src={item.node.featuredImage.url} alt={item.node.slug} fill className='object-cover' sizes='200px' loading='lazy' />
            </div>

            <div className='p-3'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded'>{item.node.categories[0]?.name}</span>
              </div>

              <h3 className='text-sm font-semibold text-slate-900 group-hover:text-primary leading-tight' style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{item.node.title}</h3>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default PostListCategory
