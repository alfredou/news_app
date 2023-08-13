"use client"
import React, {useState, useEffect, useCallback, useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCategoryPost } from '@/services'
import { Edges } from '@/types'

function PostListCategory({slug}: {slug: string}) {
   const [categoryPost, setCategoryPost] = useState<Edges[]>([])
  
  const observer: React.MutableRefObject<IntersectionObserver | undefined> = useRef();

  const lastBookElementRef = useCallback((node: Element | null)=>{
    //if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries=>{
        if(entries[0].isIntersecting){
            getCategoryPost(slug, 3).then(res=> setCategoryPost(res.posts))
            if(node) observer.current?.unobserve(node); // Stop observing the element once it becomes visible
        }
    })
    if(node) observer.current.observe(node)
}, [slug])
 
  return (
    <div className='flex gap-4 flex-wrap justify-center' ref={lastBookElementRef}>
      {categoryPost.map((item)=>{
        return ( <>
             <Link href={`/post/${item.node.slug}`} className='grid gap-3 mb-5 w-60 border-2 rounded' key={item.node.slug}>
                   <Image className="rounded w-full h-40" src={item.node.featuredImage.url} width={200} height={230} alt={item.node.slug} loading='lazy'></Image>
                   <h1 className="font-semibold text-md w-fit p-2">{item.node.title}</h1>
                   <h2 className="p-1 text-sm">{item.node.categories[0].name}</h2>
             </Link>
        </>)
      })}
    </div>
  )
}

export default PostListCategory
