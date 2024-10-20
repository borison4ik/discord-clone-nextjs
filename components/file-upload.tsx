'use-client';
import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';

import { UploadDropzone } from '@/lib/uploadthing';

import '@uploadthing/react/styles.css';
import { useState } from 'react';

interface FileUploadProps {
  endpoint: 'messageFile' | 'serverImage';
  value: string;
  onChange: (url?: string) => void;
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  // const fileType = value?.split('.').pop();
  const [fileType, setFileType] = useState('');

  if (value && fileType !== 'pdf') {
    return (
      <div className='relative h-20 w-20'>
        <Image fill src={value} alt='Upload' className='rounded-full object-cover' />
        <button
          className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
          type='button'
          onClick={() => onChange('')}>
          <X className='h-4 w-4' />
        </button>
      </div>
    );
  }

  if (value && fileType === 'pdf') {
    return (
      <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
        <FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
        <a
          href={value}
          target='_blank'
          rel='noreferrer noopen'
          className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'>
          Download
        </a>
        <button
          className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
          type='button'
          onClick={() => onChange('')}>
          <X className='h-4 w-4' />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res?.[0].name.split('.').pop() === 'pdf') {
          setFileType('pdf');
        }
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log('Upload error', error);
      }}
    />
  );
};
