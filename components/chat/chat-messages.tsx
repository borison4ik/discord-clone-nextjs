'use client';

import { Member } from '@prisma/client';
import { Loader2, ServerCrash } from 'lucide-react';

import { useChatQuery } from '@/hooks/use-chat-query';

import { ChatWelcome } from './chat-welcome';

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
  type: 'channel' | 'conversation';
}
export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, status } = useChatQuery(
    {
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    },
  );

  if (isFetching) {
    return (
      <div className='flex-1 flex flex-col py-4 items-center justify-center'>
        <Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4' />
        <p className='text-zinc-500 trxt-xs dark:text-zinc-400'>Loading...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='flex-1 flex flex-col py-4 items-center justify-center'>
        <ServerCrash className='h-7 w-7 text-zinc-500 my-4' />
        <p className='text-zinc-500 trxt-xs dark:text-zinc-400'>Something went wrong!</p>
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col py-4 overflow-y-auto'>
      <div className='flex-1' />
      <ChatWelcome type={type} chatName={name} />
    </div>
  );
};
