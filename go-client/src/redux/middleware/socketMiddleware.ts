// Example socket middleware in src/redux/middleware/socketMiddleware.ts
import { Action, Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { SocketAction } from '../../enum';
import { resetBoard, setRoomName, setTimeControl, setPlayers, startGame, updateBoard, setBoardSize, setPlayerID, setIsCreated } from '../slices/onlineGameSlice';
import { Room } from '../../types';

interface PayloadAction<T = string, P = any> extends Action<string> {
  payload: P;
}

const socketMiddleware: (socket: Socket) => Middleware = (socket: Socket) => ({ dispatch }) => (next) => (action) => {
  switch ((action as Action).type) {
    case SocketAction.CONNECT:
      if (socket.connected) {
        break;
      }
      socket.connect();
      socket.on('setId', (id) => dispatch(setPlayerID(id)));
      socket.on('updateBoard', (board) => dispatch(updateBoard(board)));
      socket.on('start', () => {
        dispatch(startGame(undefined));
      });
      break;

    case SocketAction.CREATE_ROOM:
      socket.emit('createRoom', (action as PayloadAction).payload);
      break;

    case SocketAction.START_GAME:
      socket.emit('startGame', (action as PayloadAction).payload);
      break;

    case SocketAction.JOIN_ROOM:
      socket.emit('joinRoom', (action as PayloadAction).payload);
      break;
    
    case SocketAction.EDIT_ROOM:
      socket.emit('editRoom', (action as PayloadAction).payload);
      break;

    case SocketAction.GET_ROOMS:
      socket.emit('getRooms');
      break;

    case SocketAction.PLAY_MOVE:
      socket.emit('playerMove', (action as PayloadAction).payload);
      break;
    default:
      return next(action);
  }
};

export default socketMiddleware;
