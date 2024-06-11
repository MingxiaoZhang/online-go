import { BoardSize, Piece, PlayerType, TimeControl } from "./enum"

export type Player = {
    name: string;
    id: string;
}

export type Room = {
    id: string;
    roomName: string;
    boardSize: keyof typeof BoardSize;
    timeControl: keyof typeof TimeControl;
    players: {[key in keyof Piece]: string}
    isStarted: boolean;
}