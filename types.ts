import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

import { Member, Profile, Server } from '@prisma/client';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponceServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export enum modalTypes {
  INVITE = 'invite',
  MEMBERS = 'members',
  CREATE_SERVER = 'createServer',
  EDIT_SERVER = 'editServer',
  CREATE_CHANNEL = 'createChannel',
  LEAVE_SERVER = 'leaveServer',
  DELETE_SERVER = 'deleteServer',
  DELETE_CHANNEL = 'deleteChannel',
  EDIT_CHANNEL = 'editChannel',
  MESSAGE_FILE = 'messageFile',
}
