import React from 'react'
import { getPosts } from '@/services/index'
import PostCard from './PostCard'
import { Edges } from '@/types'

const getData = async ()=>{
     const res = await getPosts()
     return res
}

async function Post() {
    const result: Edges[] = await getData() 
  return (
    <div className='mt-8 grid gap-3 justify-center flex-wrap md:grid-cols-custom grid-rows-2'>
        {result?.map((post,index)=>{
          return(
            <>
               <PostCard key={index} post={post} index={index}/>
            </>
          )  
        })}
    </div>
  )
}

export default Post