import { BoardSize, Piece, PlayerType, TimeControl } from "./enum"

export type Player = {
    name: string;
    id?: number;
}

export type Room = {
    id: string;
    creatorId: number;
    roomName: string;
    boardSize: keyof typeof BoardSize;
    timeControl: keyof typeof TimeControl;
    players: {[key in keyof Piece]: Player}
    isStarted: boolean;
}