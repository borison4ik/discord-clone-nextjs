'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { useModal } from '@/hooks/use-modal-store';
import { modalTypes } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isModalOpen = isOpen && type === modalTypes.DELETE_SERVER;
  const { server } = data;

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      onClose();
      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center'>Delete Server</DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to delete <span className='font-semibold text-indigo-500'>{server?.name}</span>? <br />
            this server will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Button disabled={isLoading} onClick={onClose} variant={'ghost'}>
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={onConfirm} variant={'primary'}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
