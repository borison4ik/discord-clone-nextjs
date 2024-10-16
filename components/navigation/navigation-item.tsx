'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ActionTooltip } from '@/components/action-tooltip';

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const router = useRouter();
  const { serverId } = useParams();

  const onClickHandler = () => {
    router.push(`/servers/${id}`);
  };
  return (
    <ActionTooltip side='right' align='center' label={name}>
      <button onClick={onClickHandler} className='group relative flex items-center'>
        <div
          className={cn('absolute -left-[2px] bg-primary rounded-full transition-all w-[6px]', serverId !== id && 'group-hover:h-[20px]', serverId === id ? 'h-[36px]' : 'h-[8px]')}
        />

        <div
          className={cn(
            'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
            serverId === id && 'bg-primary/10 text-primary rounded-[16px]',
          )}>
          <Image fill src={imageUrl} alt='Channel' />
        </div>
      </button>
    </ActionTooltip>
  );
};
