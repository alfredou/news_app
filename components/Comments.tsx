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
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length}
            {' '}
            Comments
          </h3>
            {comments && comments.map((comment, index) => (
              <div data-testid={`comments-${index}`} key={index} className="border-b border-gray-100 mb-4 pb-4">
                <p className="mb-4">
                  <span className="font-semibold">{comment.name}</span>
                  {' '}
                  on
                  {' '}
                  {format(new Date(comment.createdAt), 'MM/dd/yyyy')}
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.comment)}</p>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Comments;
