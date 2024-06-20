// src/components/GamePage.tsx
import React, { useEffect, useLayoutEffect, useState } from 'react';
import GoBoard from '../../components/GoBoard';
import { BoardSize, Piece, PlayerType, SocketAction, TimeControl } from '../../enum';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../../redux/slices/localGameSlice';
import { OnlineGameState, resetBoard, setBoardSize, setIsCreated, setPlayerColor, setPlayers, setRoomName, setTimeControl } from '../../redux/slices/onlineGameSlice';
import PlayerPanel from '../../components/PlayerPanel';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGameState from '../../hooks/useGameState';
import axios from 'axios';

const MultiGamePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { gameState, gameMode } = useGameState();
    const { isGameStarted, isCreated, players, playerId, playerName, roomName, boardSize, timeControl } = gameState as OnlineGameState

    useEffect(() => {
      const handleEditRoom = async () => {
        const settings = {
          id,
          roomName,
          boardSize,
          timeControl,
          players,
          playerName
        };
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rooms/edit`, settings);
        if (response.status !== 201) {
          console.error('Error editing room', response.data.message);
        }
      }
      if (isCreated && !isGameStarted) {
        handleEditRoom();  
      }
  }, [dispatch, roomName, boardSize, timeControl, players]);

    const handleCreateRoom = async () => {
      const settings = {
        playerName,
        roomName,
        boardSize,
        timeControl,
        players
      };
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rooms/create`, settings);
      if (response.status === 201) {
        dispatch(setIsCreated({isCreated: true, roomId: response.data.roomId}));
        navigate(`${location.pathname}${response.data.roomId}`, { replace: true });
      } else {
        console.error('Error creating room', response.data.message);
      }
    }

  return (
    <div className="flex flex-row">
      <GoBoard />
      <div className="flex-1">
        {!isGameStarted &&
          <>
          <input value={roomName}
              onChange={(e) =>
                dispatch(setRoomName(e.target.value))
              }></input>
          <h2>Options</h2>
          <label>
            Select Board Size:
            <select
              value={boardSize}
              onChange={(e) =>
                dispatch(setBoardSize(e.target.value))
              }
            >
              <option value={'SMALL'}>9x9</option>
              <option value={'MEDIUM'}>13x13</option>
              <option value={'LARGE'}>19x19</option>
            </select>
          </label>
          <label>
            Select Time Control:
            <select
              value={timeControl}
              onChange={(e) =>
                dispatch(setTimeControl(e.target.value))
              }
            >
              <option value={'BLITZ'}>3 Min</option>
              <option value={'RAPID'}>10 Min</option>
              <option value={'CLASSIC'}>30 Min</option>
            </select>
          </label>
          <div className='flex flex-row'>
            <div className='flex-1' onClick={() => {
              if (players[Piece.BLACK].id !== playerId) {
                dispatch(setPlayerColor(Piece.BLACK));
                dispatch(setPlayers({
                      [Piece.BLACK]: {
                        name: playerName,
                        id: playerId
                      },
                      [Piece.WHITE]: players[Piece.BLACK],
                      [Piece.NONE]: players[Piece.NONE]
                    }
                ));
              }
            }}>
              <PlayerPanel
                color={Piece.BLACK}
                playerName={players[Piece.BLACK].name + players[Piece.BLACK].id}
              />
            </div>
            <div className='flex-1' onClick={() => {
              if (players[Piece.WHITE].id !== playerId) {
                dispatch(setPlayerColor(Piece.WHITE));
                dispatch(setPlayers({
                  [Piece.WHITE]: {
                    name: playerName,
                    id: playerId
                  },
                  [Piece.BLACK]: players[Piece.WHITE],
                  [Piece.NONE]: players[Piece.NONE]
                }));
            }}}>
            <PlayerPanel
              color={Piece.WHITE}
              playerName={players[Piece.WHITE].name + players[Piece.WHITE].id}
            />
            </div>
          </div>
          {!isCreated &&
            <button onClick={handleCreateRoom} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
            Create Room
          </button>
          }
          
        </>
        }
      </div>
    </div>
  );
};

export default MultiGamePage;
