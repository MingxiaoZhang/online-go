// src/components/RoomList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Piece, PlayerType, SocketAction } from '../../enum';
import { useNavigate } from "react-router-dom";
import { Room } from '../../types';
import { OnlineGameState, setBoardSize, setIsCreated, setPlayers, setRoomName, setTimeControl } from '../../redux/slices/onlineGameSlice';
import useGameState from '../../hooks/useGameState';
import axios from 'axios';

const RoomList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<Room[]>([]);
    const { gameState } = useGameState();
    const { roomId, isCreated } = gameState as OnlineGameState;

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rooms`);
        setRooms(response.data);
      } catch(error) {
        if (!axios.isAxiosError(error)) {
          return
        }
        if (error.response?.status === 303) {
          const roomId = (error.response.data as {roomId: number}).roomId;
          console.log(`/game/online/${roomId}`);
          dispatch(setIsCreated({isCreated: true, roomId: roomId}))
          navigate(`/game/online/${roomId}`);
        } else {
          console.error('Error creating room', error.response);
        }
      }
    }
    getRooms();
  }, []);
  const handleCreateRoom = () => {
    navigate('/game/online/');
  };

  const handleJoinRoom = (room: Room) => {
    navigate(`/game/online/${room.id}`);
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
