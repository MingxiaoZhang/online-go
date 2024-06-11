// src/socketManager.ts
import { Server, Socket } from 'socket.io';
import { PlayerData, RoomData } from '../types/types';
import { BoardSize, Piece } from '../enum';
import { playMove } from '../utils/gameUtils';

const playerData: {[name: string]: PlayerData} = {};

const roomData: {[roomId: string]: RoomData} = {};

const gameData: {[roomId: string]: Piece[][]} = {};

let roomNumber = 0;

export const initializeSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected:', socket.id);
    socket.on('initPlayer', (player) => {
      playerData[player] = {
        id: socket.id,
        name: player,
        room: undefined
      };
      socket.emit('setId', socket.id);
    })

    socket.on('createRoom', ({playerName, roomName, boardSize, timeControl, players}) => {
      socket.join(String(roomNumber));
      roomData[String(roomNumber)] = {
        id: String(roomNumber),
        roomName,
        boardSize,
        timeControl,
        players,
        isStarted: false
      };
      playerData[playerName].room = String(roomNumber);
      socket.broadcast.emit('rooms', { rooms: Object.values(roomData) });
      roomNumber += 1;
    });
    socket.on('editRoom', ({playerName, roomName, boardSize, timeControl, players}) => {
      const room = playerData[playerName]?.room || '';
      roomData[room] = {
        id: room,
        roomName,
        boardSize,
        timeControl,
        players,
        isStarted: false
      };
      console.log(socket.id, roomData[room]);
      socket.broadcast.to(room).emit('roomOptions', roomData[room]);
    });

    socket.on('getRooms', () => {
      socket.emit('rooms', { rooms: Object.values(roomData) });
    });
    socket.on('joinRoom', ({playerName, room}) => {
      socket.join(room);
      if (roomData[room].players[Piece.BLACK].id !== '') {
        roomData[room].players[Piece.WHITE].name = playerName;
        roomData[room].players[Piece.WHITE].id = socket.id;
      } else {
        roomData[room].players[Piece.BLACK].name = playerName;
        roomData[room].players[Piece.BLACK].id = socket.id;
      }
      playerData[playerName].room = room;
      roomData[room].isStarted = true;
      io.to(room).emit('roomOptions', roomData[room]);
      const size = BoardSize[roomData[room].boardSize as keyof typeof BoardSize];
      gameData[room] = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
    });

    socket.on('playerMove', ({playerName, row, col, playerColor}) => {
      const room = playerData[playerName].room || '';
      const nextPlayer = playMove(gameData[room], row, col, playerColor);
      io.to(room).emit('updateBoard', {
        board: gameData[room],
        currentPlayer: nextPlayer
      });
    });

    socket.on('leaveRoom', (room) => {
      socket.broadcast.to(room).emit('playerLeft', socket.id);
      socket.leave(room);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
