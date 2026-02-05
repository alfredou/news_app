"use client"
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import {format} from 'date-fns'
import { Comments as CommentsType} from '@/types';
import { getComments } from '../services';


const Comments = ({ slug }: {slug: string}) => {
  const [comments, setComments] = useState<Array<CommentsType>>([]);

  useEffect(() => {
    getComments(slug).then((result) => {
      if(result){
          setComments(result.comments);
      }
    });
  }, [slug]);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-6 font-semibold border-b pb-4 text-primary">{comments.length} Comments</h3>
          <div className="space-y-4 mt-4">
            {comments && comments.map((comment, index) => {
              const initials = comment.name ? comment.name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase() : 'U'
              return (
                <div data-testid={`comments-${index}`} key={index} className="flex gap-4 border-b border-gray-100 pb-4">
                  <div className="flex-none w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">{initials}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-primary">{comment.name}</p>
                        <p className="text-xs text-muted">{format(new Date(comment.createdAt), 'MM/dd/yyyy')}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-gray-800 whitespace-pre-line">{parse(comment.comment)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
