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

  const showItems = ()=>{
    if(Array.isArray(modifiedText)){
      return modifiedText.map((item: string, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)
    }
    return null
  }

  switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-2xl font-extrabold mb-4 text-primary">{showItems()}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8 text-gray-800 leading-relaxed">{showItems()}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-lg font-semibold mb-4 text-primary">{showItems()}</h4>;
      case 'image':
        return (
          <div key={index} className="relative w-full h-72 mb-6 overflow-hidden rounded-lg">
            {obj?.src && (
              <Image
                alt={typeof obj?.title === 'string' ? obj.title : ''}
                src={obj?.src as string}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                loading='lazy'
              />
            )}
          </div>
        );
      default:
        return modifiedText;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg lg:p-8 pb-12 mb-8 mt-10">
        <div className="mb-6">
          <h1 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">{post.title}</h1>
          <p className="text-muted italic mb-4">{post.excerpt}</p>
        </div>

        <div className="relative overflow-hidden shadow-lg mb-6 h-96 rounded-lg">
          {post.featuredImage?.url && (
            <Image src={post.featuredImage.url} alt={post.slug} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" loading='lazy' />
          )}
        </div>

        <div className="px-4 lg:px-0">
          <div className="flex items-center justify-between w-full border-b-2 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <Image
                alt={post.author.name}
                height={48}
                width={48}
                src={post.author.photo.url}
                className="align-middle rounded-full"
                loading='lazy'
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">{post.author.name}</p>
                <p className="text-xs text-muted">{format(new Date(post.createdAt), 'MM/dd/yyyy')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xl">
              {social.map((links, i)=>{
                  return <Link data-testid={`social-${i}`} key={i} href={links.url} className="text-primary/80 hover:text-primary transition">{links.icon}</Link>
              })}
            </div>
          </div>

          <article className="prose prose-lg max-w-none text-gray-800">
            {post.content.raw.children.map((typeObj, index) => {
              // el children tendra el texto en un array generado por el map
              const children: TextTypes | Iterable<React.ReactNode> = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
              return getContentFragment(index, children, typeObj, typeObj.type);
            })}
          </article>
        </div>
      </div>

    </>
  );
};

export default PostDetail;
