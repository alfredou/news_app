"use client"
import React, { useState, useEffect } from 'react';
import { submitComment } from '../services';

interface InitialFormTypes {
    name: string; 
    email: string; 
    comment?: string;
    storeData: boolean | null; 
}

//combinarlas
type CommentObjTypes = Omit<InitialFormTypes, "storeData"> 

type SlugType = {
  slug: string
}

export type CombinedType = CommentObjTypes & SlugType

const CommentsForm: React.FC<SlugType> = ({ slug }) => {
  const [error, setError] = useState<boolean>(false);
  const [localStorage, setLocalStorage] = useState<null | Storage>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [formData, setFormData] = useState<InitialFormTypes>({ name: '', email: '', comment: '', storeData: false });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData: InitialFormTypes = {
      name: window.localStorage.getItem('name') || '',
      email: window.localStorage.getItem('email') || '',
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email') ? true : null,
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage?.setItem('name', name || '');
      localStorage?.setItem('email', email || '');
    } else {
      localStorage?.removeItem('name');
      localStorage?.removeItem('email');
    }

    submitComment(commentObj).then((res) => {
        if (res.createComment) {
          if (!storeData) {
            formData.name = '';
            formData.email = '';
          }
          formData.comment = '';
          setFormData((prevState) => ({
            ...prevState,
            ...formData,
          }));
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        }
      });
  };

  return (
    <div className="bg-white rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea value={formData.comment} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="comment" placeholder="Comment" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" value={formData.name} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Name" name="name" />
        <input type="email" value={formData.email} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Email" name="email" />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input checked={typeof formData.storeData === "boolean" ? formData?.storeData : false} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" value="true" />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> Save my name, email in this browser for the next time I comment.</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
      <div className="mt-8">
        <button type="button" onClick={handlePostSubmission} className="transition duration-500 ease hover:bg-blue-900 inline-block bg-blue-600 text-lg font-medium rounded-md text-white px-4 py-3 cursor-pointer">Send Comment</button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
      </div>
    </div>
  );
};

export default CommentsForm;
