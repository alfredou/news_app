"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {format} from 'date-fns';
import { getSimilarPosts, getRecentPosts } from '@/services';
import { Post } from '@/types';

const PostWidget = ({ categories, slug }: {categories: string[], slug: string}) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  const getSimilarP = async ()=>{
    const postSimilar = await getSimilarPosts(slug, categories)
    if(postSimilar){
      setRelatedPosts(postSimilar.posts)
    }
  }
  const getRecentP = async ()=>{
    const postRecent = await getRecentPosts()
    if(postRecent){
      setRelatedPosts(postRecent.posts)
    }
  }

  useEffect(() => {
    if (slug) {
      getSimilarP()
    } else {
      getRecentP()
    }

  }, [slug]);


  return (
    <aside className="bg-white rounded-lg p-6 pb-8 mb-8 shadow-sm">
      <h3 className="text-2xl mb-6 font-semibold border-b pb-4">{slug ? 'Related News' : 'Last News'}</h3>
      <div className="space-y-4">
        {relatedPosts.length !== 0 && relatedPosts.map((post, index) => (
          <Link href={`/post/${post.slug}`} key={index} className="group block rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4 p-3">
              <div className="flex-none w-28 h-20 relative rounded-md overflow-hidden bg-slate-100">
                <Image
                  alt={post.title}
                  src={post.featuredImage.url}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 200px"
                  unoptimized
                />
              </div>

              <div className="flex-1">
                <p className="text-xs text-muted mb-1">{format(new Date(post.createdAt), 'MM/dd/yyyy')}</p>
                <h4 className="text-sm font-semibold text-slate-900 group-hover:text-primary leading-tight" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{post.title}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default PostWidget;
