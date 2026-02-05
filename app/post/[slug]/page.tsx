import { getPostDetails, getPosts } from '@/services'
import { notFound } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { Categories } from '@/types'
import PostDetail from '@/components/PostDetail'
import Author from '@/components/Author'
import PostWidget from '@/components/PostWidget'
//import Comments from '@/components/Comments'
//import CommentsForm from '@/components/CommentsForm'
import dynamic from 'next/dynamic' // Import the dynamic function


const Comments = dynamic(()=>import('@/components/Comments'))
const CommentsForm = dynamic(()=>import('@/components/CommentsForm'))

export async function generateMetadata({params}: {params: Promise<{slug: string}> | {slug: string}}){
     try{
          const { slug } = (await params) as { slug: string }
          const post = await getPostInfo(slug)
          if(!post)
            return {
              title: "Not found",
              description: "The page you are looking for does not exist"
            };

          return {
            title: post.title,
            description: post.excerpt,
            alternates: {
              canonical: `/post/${post.slug}`
            }
          };
     }catch(e){
      console.log(e)
         return {
             title: "Not found",
             description: "The page you are looking for does not exist"
            };
     }
}

export async function generateStaticParams(){
  const posts = await getPosts();
  return posts.map(({node: {slug}})=>({slug})) //paths formato por defecto ej: {slug: 'learn'}
}
export const dynamicParams = true //fallback

const getPostInfo = async (slug: string) =>{
  const data = await getPostDetails(slug)
   return data
}

async function PostDetails({params}: {params: Promise<Categories> | Categories}) {
  const { slug } = (await params) as Categories
  const post = await getPostInfo(slug) 
  if (!post) {
    notFound()
  }
  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
              <div className="mb-3 mt-7">
                <div className="flex items-center gap-3 mb-3">
                  <Link href={'/'} className="text-sm text-muted hover:text-primary">Inicio</Link>
                  <span className="text-sm text-muted">/</span>
                  <div className="flex items-center gap-2">
                    {post.categories.map((c)=> (
                      <span key={c.slug} className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded">{c.name}</span>
                    ))}
                  </div>
                </div>
              </div>
               <PostDetail post={post}/>
               <Author author={post.author} />
               <CommentsForm slug={post.slug} />
               <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
               <div className="relative lg:sticky top-8">
                  <PostWidget slug={post.slug} categories={post.categories.map((category)=> category.slug)}/>
               </div>
          </div>
        </div>
      </div>       
    </>
  )
}

export default PostDetails
