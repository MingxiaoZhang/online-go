import { BoardSize, Piece, TimeControl } from "../enum";
import { Request } from 'express'

export type PlayerData = {
    id: string;
    name: string;
    room: string | undefined;
}

type Player = {
    id: string;
    name: string;
}

export type RoomData = {
    id: string;
    roomName: string;
    boardSize: keyof typeof BoardSize;
    timeControl: keyof typeof TimeControl;
    players: {[key in Piece]: Player}
    isStarted: boolean;
}

export interface AuthRequest extends Request {
    userId?: number;
}