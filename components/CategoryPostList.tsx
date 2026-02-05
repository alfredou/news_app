import React from 'react'
import ListPosts from './ListPosts'
import { Edges } from '@/types'

function CategoryPostList({post}: {post: Edges[]}) {
  return (
       <>
                 {post.map((posts, i)=>(
                             <ListPosts key={i} postList={posts.node}/>
                 ))}
       </>
  )
}

export default CategoryPostList