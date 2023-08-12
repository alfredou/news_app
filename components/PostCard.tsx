import React from 'react'
import { Edges } from '@/types'
import Image from 'next/image'
import { format } from 'date-fns'
import Link from 'next/link'

function PostCard({post, index}: {post: Edges, index: number}) {

  return (
    <Link href={`/post/${post.node.slug}`} style={{backgroundImage: (index === 0 && post.node.featuredImage.url) ? `url(${post.node.featuredImage.url})` : ``, backgroundSize: 'cover'}} className={index === 0 ? 'group m-7 h-96 p-1 rounded inline-grid gap-2 cursor-pointer shadow-lg md:row-span-2 md:h-[862px] md:w-[320px] xl:w-[380px]': `group m-7 w-min p-1 rounded inline-grid gap-2 cursor-pointer shadow-lg`}>
          <Image className={index === 0 ? `hidden rounded cover w-full h-52 group-hover:opacity-80 max-w-md` : `rounded cover w-full h-52 group-hover:opacity-80 max-w-sm`} src={index===0 ? "" : post.node.featuredImage.url} alt={post.node.title} width={200} height={200} loading="lazy"/>
          <div className={index === 0 ? 'p-1 flex flex-col text-white items-center justify-center text-center' : 'p-1 flex flex-col'}>
             <h1 className='text-md opacity-75 font-bold'>{post.node.categories[0]?.name}</h1>
             <h1 className='text-3xl w-72 font-bold group-hover:text-cyan-600'>{post.node.title}</h1>
          </div>
          <div className='pb-5 flex gap-2 items-end justify-between'>
            <div className='flex gap-2 items-center'>
             <Image src={post.node.author.photo.url} width={40} height={40} alt={post.node.author.id} loading='lazy'/>
             <h3 className={index === 0 ? 'text-white group-hover:text-cyan-600' : ''}>{post.node.author.name}</h3>
            </div>
                <span className={index === 0 ? 'text-white opacity-75' : ''}>{format(new Date(post.node.createdAt), 'MM/dd/yyyy')}</span>
          </div>
    </Link>
  )
}

export default PostCard