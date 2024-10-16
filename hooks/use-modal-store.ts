import { modalTypes } from '@/types';
import { Channel, ChannelType, Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
  | modalTypes.CREATE_SERVER
  | modalTypes.INVITE
  | modalTypes.EDIT_SERVER
  | modalTypes.MEMBERS
  | modalTypes.CREATE_CHANNEL
  | modalTypes.LEAVE_SERVER
  | modalTypes.DELETE_SERVER
  | modalTypes.DELETE_CHANNEL
  | modalTypes.EDIT_CHANNEL;

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
