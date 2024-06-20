import { Request, Response } from 'express';
import { getAllRoomData, getRoomData, getUserRoom, saveRoomData, saveUserRoom } from '../redis/roomService';
import { AuthRequest, RoomData } from '../types/types';
import { v4 as uuidv4 } from 'uuid';
import { Piece } from '../enum';
import redisClient from '../redis/redisClient';
  
export const createRoom = async (req: AuthRequest, res: Response) => {
    const { playerName, roomName, boardSize, timeControl, players } = req.body;
    const userId = req.userId;

    if (!playerName || !roomName || !boardSize || !timeControl || !players) {
        return res.status(400).send('Missing required room data');
    }

    try {
        const id = await redisClient.incr('roomIdCounter');
        const newRoomData: RoomData = {
            id,
            creatorId: userId || 0,
            roomName,
            boardSize,
            timeControl,
            players,
            isStarted: false
        };
        console.log(newRoomData);
        await saveRoomData(String(id), newRoomData);
        await saveUserRoom(String(userId), String(id));
        res.status(201).json({roomId: id});
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

export const getRooms = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    const roomId = await getUserRoom(String(userId));
    if (roomId) {
        return res.status(303).json({roomId});
    }

    try {
        const roomList = await getAllRoomData();
        res.status(200).json(Object.values(roomList));
    } catch (error) {
        res.status(500).json({message: 'Error fetching room list from Redis'});
    }
}

export const getRoomById = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(400).json({message: 'Error in user connection'});
    }

    try {
        const roomData = await getRoomData(req.body.roomId);
        const players = roomData?.players;
        if (!players) {
            return res.status(500).json({message: 'Error in request data'});
        }
        if (players[Piece.BLACK].id !== userId && players[Piece.WHITE].id !== userId) {
            return res.status(500).json({message: 'Unauthorized access to game data'});
        } 
        res.status(200).json(roomData);
    } catch (error) {
        res.status(500).json({message: 'Error fetching room list from Redis'});
    }
}