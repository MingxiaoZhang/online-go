// src/components/GamePage.tsx
import React, { useEffect, useState } from 'react';
import GoBoard from '../../components/GoBoard';
import { BoardSize, Piece } from '../../enum';
import { useDispatch, useSelector } from 'react-redux';
import { endGame, startGame, resetBoard, initBoard } from '../../redux/slices/localGameSlice';
import { IRootState } from '../../redux/store';
import GameOptions from '../../components/GameOptions';

const LocalGamePage = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: IRootState) => state.localGame.isGameStarted);

  const handleStartClick = () => {
    dispatch(resetBoard());
    dispatch(startGame());
  };

  const handleQuit = () => {
    dispatch(endGame());
  };

  useEffect(() => {
    dispatch(initBoard());
  }, []);

  return (
    <div className="flex flex-row">
      <GoBoard />
      <div className="flex-1">
        {
          isGameStarted ?
          <>
            <button onClick={handleQuit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
              Quit
            </button>
          </>
          :
          <>
            <GameOptions />
            <button onClick={handleStartClick} className="bg-blue-500 hover:bg-blue-700 text-white    font-bold py-2 px-4 mt-4 rounded">
              Start
            </button>
          </>
        }
      </div>
    </div>
  );
};

export default LocalGamePage;

