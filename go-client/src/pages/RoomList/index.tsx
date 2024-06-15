// src/components/RoomList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Piece, PlayerType, SocketAction } from '../../enum';
import { useNavigate } from "react-router-dom";
import { Room } from '../../types';
import { OnlineGameState, setBoardSize, setPlayers, setRoomName, setTimeControl } from '../../redux/slices/onlineGameSlice';
import useGameState from '../../hooks/useGameState';

const RoomList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { gameState } = useGameState();
    const { playerName, playerId } = gameState as OnlineGameState;
    const rooms = useSelector((state: any) => state.room.rooms);

  useEffect(() => {
    dispatch({ type: SocketAction.CONNECT, payload: playerName });
    dispatch({ type: SocketAction.GET_ROOMS })
  }, []);
  const handleCreateRoom = () => {
    dispatch(setPlayers(
      {
        [Piece.BLACK]: {
          name: playerName,
          id: playerId
        },
        [Piece.WHITE]:{
          name: '',
          id: ''
        },
        [Piece.NONE]: {
          name: '',
          id: ''
        },
      }
    ));
    navigate('/game/online');
  };

  const handleJoinRoom = (room: Room) => {
    dispatch({ type: SocketAction.JOIN_ROOM, payload: {playerName, room: room.id} })
    navigate('/game/online');
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Room List</h1>
      <button
        onClick={handleCreateRoom}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Create Room
      </button>
      <ul className="space-y-4">
        {rooms && rooms.map((room: any) => (
          <li key={room.id} className="bg-gray-100 p-4 rounded-md" onClick={() => handleJoinRoom(room)}>
            <span className="font-bold text-black">{room.roomName}</span>
            <span className="font-bold text-black">{room.boardSize}</span>
            <span className="font-bold text-black">{room.timeControl}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
