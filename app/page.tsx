//import CryptoInfo from "@/components/CryptoInfo"
import Post from "@/components/Post"
import PostWidget from "@/components/PostWidget"
//import CategorySection from "@/components/CategorySection"
import type { Metadata } from 'next'
import dynamic from 'next/dynamic' // Import the dynamic function

//const PostWidget = dynamic(()=> import('@/components/PostWidget'))
//const Post = dynamic(()=>import('@/components/Post'))
const CryptoInfo = dynamic(()=>import('@/components/CryptoInfo'))
const CategorySection = dynamic(() => import('@/components/CategorySection'))

export const metadata: Metadata= {
  title: 'Homepage',
  description: 'News_app Home page'
}

export default function Home() {
  return (
    <main className=""> 
    <div className="container mx-auto px-2 mb-8 lg:px-0">
       <CryptoInfo/>
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
           <Post/>
        </div>
       <div className="lg:col-span-4 col-span-1 w-80">
           <div className="mt-5 lg:sticky relative top-8">
               <PostWidget categories={[""]} slug=""/>
           </div>
       </div>
       </div>
       <div>
           <CategorySection/>
       </div>
    </div>
  
    </main>
  )
}
