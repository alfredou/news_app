import React from 'react'
import { getPosts } from '@/services/index'
import PostCard from './PostCard'
import { Edges } from '@/types'

const getData = async ()=>{
     const res = await getPosts(5)
     if(res) return res
    }
    
async function Post() {
      const result: Edges[] | undefined = await getData() 
   
  return (
    <div className='grid gap-3 gap-x-9 justify-center flex-wrap md:grid-cols-custom grid-rows-2'>
        {result && result.map((post,index)=>{
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