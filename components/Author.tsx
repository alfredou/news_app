import Image from 'next/image';
import { newAuthor } from '@/types';

const Author = ({ author }: {author: newAuthor}) => (
  <div className="flex text-center gap-5 mt-20 mb-8 p-6 relative rounded-lg bg-white shadow-md bg-opacity-40">
    <div className="flex w-44">
      <Image
        alt={author.name}
        height={60}
        width={160}
        className="align-middle bg-slate-300 rounded-full"
        src={author.photo.url}
        loading="lazy"
      />
    </div>
    <div className='grid w-full justify-start'>
        <h3 className="text-black text-left mt-4 mb-4 text-xl font-bold">{author.name}</h3>
        <p className="text-black text-left text-ls">{author.bio}</p>
    </div>
  </div>
);

export default Author;
