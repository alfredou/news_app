import React from 'react'
import { getPosts } from '@/services/index'
import PostCard from './PostCard'
import { Edges } from '@/types'

const getData = async () => {
  const res = await getPosts(5)
  if (res) return res
}

async function Post() {
  const result: Edges[] | undefined = await getData()

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Latest posts</h2>
        <p className="text-sm muted">Selected by our team</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {result && result.map((post, index) => {
          return (
            <div key={post.node.title} className={`transform hover:-translate-y-1 transition ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
              <PostCard post={post} index={index} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Post