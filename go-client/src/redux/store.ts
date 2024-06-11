// src/redux/store.ts
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import localGameReducer from './slices/localGameSlice';
import onlineGameReducer from './slices/onlineGameSlice';
import roomReducer from './slices/roomSlice';
import { socket } from '../sockets/socket';
import socketMiddleware from './middleware/socketMiddleware';


console.log("Middleware")

const store = configureStore({
  reducer: {
    localGame: localGameReducer,
    onlineGame: onlineGameReducer,
    room: roomReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(socketMiddleware(socket)),
});

export type IRootState = ReturnType<typeof store.getState>

export default store;
