'use client';

import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react';
import { MemberRole } from '@prisma/client';
import { modalTypes, ServerWithMembersWithProfiles } from '@/types';
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none' asChild>
        <button
          className='w-full text-md font-semibold px-3 flex items-center h-12 
        border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'>
          {server.name}
          <ChevronDown className='h-5 w-5 ml-auto cursor-pointer' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'>
        {isModerator && (
          <DropdownMenuItem onClick={() => onOpen(modalTypes.INVITE, { server })} className='text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer'>
            Invite People <UserPlus className='ml-auto h-4 w-4' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem onClick={() => onOpen(modalTypes.EDIT_SERVER, { server })} className='px-3 py-2 text-sm cursor-pointer'>
              Server settings <Settings className='ml-auto h-4 w-4' />
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onOpen(modalTypes.MEMBERS, { server })} className='px-3 py-2 text-sm cursor-pointer'>
              Manage Members <Users className='ml-auto h-4 w-4' />
            </DropdownMenuItem>
          </>
        )}
        {isModerator && (
          <DropdownMenuItem onClick={() => onOpen(modalTypes.CREATE_CHANNEL, { server })} className='px-3 py-2 text-sm cursor-pointer'>
            Create Channel <PlusCircle className='ml-auto h-4 w-4' />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem onClick={() => onOpen(modalTypes.DELETE_SERVER, { server })} className='text-rose-500 dark:text-rose-400 px-3 py-2 text-sm cursor-pointer'>
            Delete Server <Trash className='ml-auto h-4 w-4' />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem onClick={() => onOpen(modalTypes.LEAVE_SERVER, { server })} className='text-rose-500 dark:text-rose-400 px-3 py-2 text-sm cursor-pointer'>
            Leave Server <LogOut className='ml-auto h-4 w-4' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ServerHeader };
