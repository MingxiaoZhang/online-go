// src/components/GoBoard.tsx
import React, { useEffect } from 'react';
import { BoardSize, BoardStyle, GameMode } from '../../enum';
import Intersection from '../Intersection';
import { useDispatch, useSelector } from 'react-redux';
import { resetBoard } from '../../redux/slices/onlineGameSlice';
import { IRootState } from '../../redux/store';
import useGameState from '../../hooks/useGameState';
import { useParams } from 'react-router-dom';

const GoBoard = () => {
  const dispatch = useDispatch();
  const { gameState } = useGameState();
  // const size = useSelector((state: {board: {boardSize: keyof typeof BoardSize}}) => state.board.boardSize);
  const boardSize = BoardSize[gameState.boardSize];

  useEffect(() => {
    dispatch(resetBoard())
  }, [gameState.boardSize]);

  return (
    <div className={`${BoardStyle[gameState.boardSize]} w-[580px] h-[580px]`}>
      {gameState.board && gameState.board.length > 0 && [...Array(boardSize * boardSize)].map((_, index) => {
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;
        return (
          <Intersection
            key={index}
            size={boardSize}
            row = {row}
            col = {col}
            piece = {gameState.board[row][col]}
          />
        )  
      })}
    </div>
  );
};

export default GoBoard;
