import Image from 'next/image';
import { newAuthor } from '@/types';

const Author = ({ author }: {author: newAuthor}) => (
  <div className="flex items-start gap-5 mt-20 mb-8 p-6 rounded-lg bg-white shadow-lg">
    <div className="flex-none w-20 h-20 relative rounded-full overflow-hidden ring-2 ring-primary/20">
      <Image
        alt={author.name}
        height={80}
        width={80}
        className="object-cover"
        src={author.photo.url}
        loading="lazy"
      />
    </div>

    <div className='flex-1'>
        <h3 className="text-primary text-left mb-1 text-xl font-extrabold">{author.name}</h3>
        <p className="text-left text-gray-700 leading-relaxed">{author.bio}</p>
    </div>
  </div>
);

export default Author;
