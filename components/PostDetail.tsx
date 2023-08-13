import React from 'react';
import {format} from 'date-fns';
import { ChildrenItem, PostDetailsTypes } from '@/types';
import Link from 'next/link';
import {social} from "@/navInfo"
import Image from 'next/image';

interface ObjText {
    bold?: string,
    italic?: string,
    underline?: string,
    title?: string,
    text: string,
    height?: number | `${number}` | undefined,
    width?: number | `${number}` | undefined,
    src?: string
}

type TextTypes = Array<string> | string | React.ReactNode

type PickedObjTextTypes = Pick<ObjText, "title" | "height" | "width" | "src">;

type ObjTypes = ObjText | ChildrenItem & PickedObjTextTypes

const isObjText = (obj: ObjText | ChildrenItem): obj is ObjText => {
  return 'bold' in obj || 'italic' in obj || 'underline' in obj;
};

const isTextType = (text: TextTypes) =>{
    if(typeof text === "string"){
        return text
    }else if(Array.isArray(text)){
      return text
    }else{
      return text
    }
}

const PostDetail = ({ post }: PostDetailsTypes ) => {
  const getContentFragment = (index: number, text: TextTypes | Iterable<React.ReactNode>, obj: ObjTypes, type?: string) => {
    //in = 0, text [dfjaljafl], obj={type,children[{text: 'dfajlf'}]}, type: 'paragraph'
    let modifiedText= isTextType(text);
  //pone el texto enviado en el objeto en negrita, italica o subrayado si se especifica en la key del texto
    if (isObjText(obj)) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }
 //devuelve el texto conforme el tipo que se le envie

  const showItems = ()=>{
    if(Array.isArray(modifiedText)){
      return modifiedText.map((item: string, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)
    }
    return null
  }

  switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{showItems()}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{showItems()}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{showItems()}</h4>;
      case 'image':
        return <Image
            key={index}
            alt={obj?.title === "string" ? obj.title : ''}
            height={obj?.height}
            width={obj?.width}
            src={obj?.src === "string" ? obj.src : ''}
            loading='lazy'
          />;
      default:
        return modifiedText;
    }
  };

  return (
    <>
      {/*<Breadcrumbs items={post.categories} slug={post.slug}/>*/}
      <div className="bg-white rounded-lg lg:p-8 pb-12 mb-8 mt-10">
        <h1 className="mb-5 text-3xl font-bold border-b-2 pb-2 md:text-4xl">{post.title}</h1>
        <ul className="mb-5 pb-5 border-b-2"><li>{post.excerpt}</li></ul>
        <div className="relative overflow-hidden shadow-md mb-6">
          <Image src={post.featuredImage.url} width={400} height={400} alt={post.slug} loading='lazy' className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"/>
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center justify-around w-full border-b-2 pb-2">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
              <Image
                alt={post.author.name}
                height={30}
                width={30}
                src={post.author.photo.url}
                className="align-middle rounded-full"
                loading='lazy'
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle">{format(new Date(post.createdAt), 'MM/dd/yyyy')}</span>
            </div>
         </div>
            <div className='flex items-center justify-around mb-8 w-full border-b-2 pb-2'>
                <div className="flex w-full justify-evenly mt-10 text-xl">
                     <Link href="https://www.facebook.com/" className="hover:-translate-y-1 cursor-pointer">{social[0].facebookIcon}</Link>        
                     <Link href="https://www.twitter.com/" className="hover:-translate-y-1 cursor-pointer">{social[1].twitterIcon}</Link>        
                     <Link href="https://www.instagram.com/" className="hover:-translate-y-1 cursor-pointer">{social[2].instagramIcon}</Link>        
                     <Link href="https://www.youtube.com/" className="hover:-translate-y-1 cursor-pointer">{social[3].youtubeIcon}</Link>        
                     <Link href="https://www.linkedin.com/" className="hover:-translate-y-1 cursor-pointer">{social[4].linkedinIcon}</Link>        
                </div>
            </div>
          {post.content.raw.children.map((typeObj, index) => {
            //el children tendra el texto en un array generado por el map
            const children: TextTypes | Iterable<React.ReactNode> = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>

    </>
  );
};

export default PostDetail;
