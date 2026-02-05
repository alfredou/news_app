import React from 'react'
import { getCategories, getCategoryPost } from '@/services'
import { Categories } from '@/types'
import ListPosts from '@/components/ListPosts'
import Columnist from '@/components/Columnist'
import { links } from '@/navInfo'
import CategoryPostList from '@/components/CategoryPostList'

export async function generateMetadata({params}: {params: Promise<{slug: string}> | {slug: string}}){
  try{
    const { slug } = (await params) as { slug: string }
    if(!slug){
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist"
      }
    }
    return {
      title: slug,
      description: `This is the description for ${slug}`
    }
  }catch(e){
    console.log(e)
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist"
    }
  }
}


export async function generateStaticParams(){
  //const categories = await getCategories();
  return links.map(({url})=>({slug: url}))
}
export const dynamicParams = true

async function getPostByCategory(slug: string){
  const data = await getCategoryPost(slug, 5)
  return data
} 

async function CategoryPost({params}: {params: Promise<Categories> | Categories}) {
  const { slug } = (await params) as Categories
  const post = await getPostByCategory(slug)
  //{posts: result.postsConnection.edges, authors: result.authors};

  return (
      <div className='container mx-auto px-5 mb-8 md:px-10'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                   <div className='col-span-1 lg:col-span-6'>
                           <CategoryPostList post={post.posts}/>
                   </div>
                   <div className='col-span-1 lg:col-span-4'>
                     <div className='relative lg:sticky top-8 lg:ml-0 w-full px-4'>
                      <div className="w-full max-w-full">
                        <Columnist authors={post.authors}/>
                      </div>
                     </div>
                   </div>
           </div>
   </div>
  )
}
export default CategoryPost

