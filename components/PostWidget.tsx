"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {format} from 'date-fns';
import { getSimilarPosts, getRecentPosts } from '@/services';
import { Post } from '@/types';

const PostWidget = ({ categories, slug }: {categories: string[], slug: string}) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(slug, categories).then((result) => {
        setRelatedPosts(result);
          });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }

  }, [slug]);


  return (
    <div className="bg-white rounded-lg p-8 pb-12 mb-8 grid items-center justify-center">
      <h3 className="text-2xl mb-8 font-semibold border-b pb-4">{slug ? 'Related News' : 'Last News'}</h3>
      {relatedPosts.map((post, index) => (
        <Link href={`/post/${post.slug}`} key={index} className="group flex flex-col items-center w-full mb-8">
          <div className="flex-none w-full">
            <Image
              alt={post.title}
              height="100"
              width="150"
              unoptimized
              className="align-middle"
              src={post.featuredImage.url}
              loading='lazy'
            />
          </div>
          <div className="flex-grow ml-4 border-b-2 pb-5 w-full">
            <p className="text-left text-gray-500 font-xs">{format(new Date(post.createdAt), 'MM/dd/yyyy')}</p>
            <h2 className="text-md w-44 font-bold group-hover:text-blue-600" key={index}>{post.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostWidget;
