import React from 'react'
import { getCategories, getCategoryPost } from '@/services'
import { Categories } from '@/types'
import ListPosts from '@/components/ListPosts'
import Columnist from '@/components/Columnist'
import { links } from '@/navInfo'
import { getAuthors } from '@/services'
/*
export async function generateMetadata({params}: {params: {slug: string}}){
  try{
    if(!params){
      return {
      title: "Not Found",
      description: "The page you are looking for does not exist"
      }
    }
    return {
      title: params?.slug,
      description: `This is the description for ${params?.slug}`
    }
  }catch(e){
    console.log(e)
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist"
    }
  }
}
*/
export async function generateStaticParams(){
  //const categories = await getCategories();
  return links.map(({url})=>({params: {url}}))
}
export const dynamicParams = true

async function getPostByCategory(slug: string){
  const data = await getCategoryPost(slug, 5)
  return data
} 

async function getAuthorsData(){
  const data = await getAuthors()
  return data 
} 

async function CategoryPost({params}: {params: Categories}) {
    const post = await getPostByCategory(params.slug)
    const authors = await getAuthorsData()

   return (
      <div className='container mx-auto px-10 mb-8'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                   <div className='col-span-1 lg:col-span-7'>
                         {post.map((posts, i)=>(
                          <>
                             <ListPosts key={i} postList={posts.node}/>
                          </>
                         ))}
                   </div>
                   <div className='col-span-1 lg:col-span-4'>
                         <div className='relative lg:sticky top-8'>
                              <Columnist authors={authors}/>
                         </div>
                   </div>
           </div>
   </div>
  )
}
export default CategoryPost

