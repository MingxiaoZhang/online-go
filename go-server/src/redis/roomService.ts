// roomService.ts
import redisClient from './redisClient';
import { RoomData } from '../types/types';

const ROOM_DATA_KEY = 'roomData';

export const saveRoomData = async (roomId: string, roomData: RoomData): Promise<void> => {
  const roomDataJSON = JSON.stringify(roomData);
  await redisClient.hSet(ROOM_DATA_KEY, roomId, roomDataJSON);
};

export const getRoomData = async (roomId: string): Promise<RoomData | null> => {
  const roomDataJSON = await redisClient.hGet(ROOM_DATA_KEY, roomId);
  return roomDataJSON ? JSON.parse(roomDataJSON) : null;
};

export const getAllRoomData = async (): Promise<{[roomId: string]: RoomData}> => {
  const roomDataEntries: { [roomId: string]: string; } = await redisClient.hGetAll(ROOM_DATA_KEY);
  const allRoomData: {[roomId: string]: RoomData} = {};
  for (const [roomId, roomDataJSON] of Object.entries(roomDataEntries)) {
    allRoomData[roomId] = JSON.parse(roomDataJSON);
  }
  return allRoomData;
};

export const deleteRoomData = async (roomId: string): Promise<void> => {
  await redisClient.hDel(ROOM_DATA_KEY, roomId);
};
