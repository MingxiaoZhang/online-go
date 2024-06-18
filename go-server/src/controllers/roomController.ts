import { Request, Response } from 'express';
import { getAllRoomData, getRoomData, saveRoomData } from '../redis/roomService';
import { AuthRequest, RoomData } from '../types/types';
import { v4 as uuidv4 } from 'uuid';
import { Piece } from '../enum';

const generateUniqueRoomId = async (): Promise<string> => {
    let uniqueId: string;
    let isUnique: boolean = false;
  
    do {
      uniqueId = uuidv4();
      const existingRoom = await getRoomData(uniqueId);
      isUnique = existingRoom === null;
    } while (!isUnique);
  
    return uniqueId;
  };
  
export const createRoom = async (req: AuthRequest, res: Response) => {
    const { playerName, roomName, boardSize, timeControl, players } = req.body;
    const userId = req.userId;

    if (!playerName || !roomName || !boardSize || !timeControl || !players) {
        return res.status(400).send('Missing required room data');
    }

    try {
        const id = await generateUniqueRoomId();
        const newRoomData: RoomData = {
            id,
            creatorId: userId || 0,
            roomName,
            boardSize,
            timeControl,
            players,
            isStarted: false
        };
        await saveRoomData(id, newRoomData);
        res.status(201).json({id});
    } catch (error) {
        res.status(500).json({message: 'Error saving room data to Redis'});
    }
};

export const joinRoom = async (req: AuthRequest, res: Response) => {
    const { playerName, roomId } = req.body;
    const userId = req.userId;

    if (!userId || !playerName || !roomId) {
        return res.status(400).json({message: 'Missing required room data'});
    }

    try {
        const roomData = await getRoomData(roomId);
        if (!roomData) {
            return res.status(400).json({message: 'Room not found'});
        }
        if (roomData.players[Piece.BLACK].id) {
            roomData.players[Piece.WHITE].name = playerName;
            roomData.players[Piece.WHITE].id = userId;
          } else {
            roomData.players[Piece.BLACK].name = playerName;
            roomData.players[Piece.BLACK].id = userId;
          }
        res.status(201);
    } catch (error) {
        res.status(500).json({message: 'Error saving room data to Redis'});
    }
};

export const getRooms = async (req: Request, res: Response) => {
    try {
        const roomList = await getAllRoomData();
        res.status(200).json(Object.values(roomList));
    } catch (error) {
        res.status(500).json({message: 'Error fetching room list from Redis'});
    }
}