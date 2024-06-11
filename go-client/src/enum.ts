export enum BoardStyle {
    SMALL = 'grid grid-cols-9',
    MEDIUM = 'grid grid-cols-13',
    LARGE = 'grid grid-cols-19'
}

export enum BoardSize {
    SMALL = 9,
    MEDIUM = 13,
    LARGE = 19
}

export enum PieceStyle {
    WHITE = 'bg-[#FAF0E6] outline outline-1 outline-black',
    BLACK = 'bg-[#352F44] outline outline-1 outline-black',
    NONE = ''
}

export enum Piece {
    WHITE = 'WHITE',
    BLACK = 'BLACK',
    NONE = 'NONE'
}

export enum PlayerType {
    BOT,
    LOCAL,
    REMOTE
}

export enum ErrorCause {
    INV_MOVE,
    NETWORK
}

export enum SocketAction {
    CONNECT = 'CONNECT',
    DISCONNECT = 'DISCONNECT',
    JOIN_ROOM = 'JOIN_ROOM',
    CREATE_ROOM = 'CREATE_ROOM',
    START_GAME = 'START_GAME',
    PLAY_MOVE = 'PLAY_MOVE',
    LEAVE_ROOM = 'LEAVE_ROOM',
    EDIT_ROOM = 'EDIT_ROOM',
    GET_ROOMS = 'GET_ROOMS'
}

export enum TimeControl {
    BLITZ = 180,
    RAPID = 600,
    CLASSIC = 1800,
    CUSTOM = 0
}

export enum GameMode {
    LOCAL = 'local',
    ONLINE = 'online',
    VSBOT = 'vsbot'
}