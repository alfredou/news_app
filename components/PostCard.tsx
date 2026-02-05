import React from 'react'
import { Edges } from '@/types'
import Image from 'next/image'
import { format } from 'date-fns'
import Link from 'next/link'

function PostCard({post, index}: {post: Edges, index: number}) {

  const imageAspect = index === 0 ? 'aspect-[4/3]' : 'aspect-[16/9]'

  return (
    <Link data-testid={`post-${index}`} href={`/post/${post.node.slug}`} className={`group relative block rounded-lg overflow-hidden shadow-lg bg-white h-full flex flex-col ${index===0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>

      {index === 0 && (
        <>
          <div className="absolute inset-0 z-0">
            {post.node.featuredImage?.url ? (
              <Image src={post.node.featuredImage.url} alt={post.node.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw"/>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30" />
            )}
          </div>

          <div className="absolute inset-0 z-10 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent backdrop-blur-sm" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div className="w-full text-white">
                <span className="inline-block text-xs font-semibold bg-primary/20 text-primary px-2 py-1 rounded">{post.node.categories[0]?.name}</span>
                <h2 className="mt-3 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg tracking-tight -translate-y-1 lg:-translate-y-3 text-primary">{post.node.title}</h2>
              </div>

              <div className="w-full">
                {post.node.excerpt && (
                  <p className="mt-3 text-sm text-white opacity-95 max-w-2xl" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{post.node.excerpt}</p>
                )}
                <div className="mt-4 flex items-center gap-3">
                  <Image src={post.node.author.photo.url} width={40} height={40} alt={post.node.author.id} className="rounded-full ring-2 ring-white/40"/>
                  <div className="text-sm text-white">{post.node.author.name} · <time className="text-xs muted">{format(new Date(post.node.createdAt), 'MM/dd/yyyy')}</time></div>
                </div>
              </div>
            </div>
          </div>

          <div className={`w-full ${imageAspect} bg-transparent`} />
        </>
      )}

      {index !== 0 && (
        <div className={`relative w-full ${imageAspect} bg-slate-100 z-0`}>
          {post.node.featuredImage?.url ? (
            <Image src={post.node.featuredImage.url} alt={post.node.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw"/>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4M3 11h18" />
              </svg>
            </div>
          )}
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {index !== 0 && (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-primary/90 bg-primary/10 px-2 py-1 rounded">{post.node.categories[0]?.name}</span>
                <time className="text-xs muted">{format(new Date(post.node.createdAt), 'MM/dd/yyyy')}</time>
              </div>

              <h3 className="text-lg font-semibold leading-tight text-slate-900 mb-3 group-hover:text-primary">{post.node.title}</h3>
            </>
          )}
        </div>

        <div className="flex items-center justify-end mt-4">
          <div className="text-sm muted">Leer</div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard