// src/components/Intersection.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GameMode, Piece, PieceStyle, PlayerType, SocketAction } from '../../enum';
import { IRootState } from '../../redux/store';
import useGameState from '../../hooks/useGameState';
import { useParams } from 'react-router-dom';
import useActions from '../../hooks/useActions';

interface IntersectionProps {
  size: number;
  row: number;
  col: number;
  piece: Piece;
}

const Intersection: React.FC<IntersectionProps> = ({ size, row, col, piece }) => {
  const dispatch = useDispatch();
  const { gameMode } = useGameState();
  const { placePiece } = useActions(gameMode || GameMode.LOCAL);
  // const gameState = useGameState(gameMode || GameMode.LOCAL);

  // const currentPlayer = useSelector((state: IRootState) => state.multiGame.currentPlayer);
  // const playerColor: Piece = useSelector((state: IRootState) => state.multiGame.playerColor);
  // const isLocal = useSelector((state: IRootState) => state.multiGame.isLocal);
  // const playerName = useSelector((state: IRootState) => state.multiGame.playerName);

  const getWStyle = (row: number, col: number) => {
    if (col === size - 1) {
      return `w-1/2 absolute top-1/2`;
    }
    return "w-full absolute top-1/2 left-1/2";
  };
  const getHStyle = (row: number, col: number) => {
    if (row === size - 1) {
      return "h-1/2 absolute left-1/2";
    }
    return "h-full absolute top-1/2 left-1/2";
  };
  const handleClick = () => {
    placePiece({row, col})
  };

  return (
    <div
      className={`flex-1 box-border relative hover:outline outline-blue-500 rounded-full ${PieceStyle[piece]}`}
      onClick={handleClick}
    >
      <div className={`${getWStyle(row, col)} h-px border-t border-black -z-10`}></div>
      <div className={`${getHStyle(row, col)} w-px border-l border-black -z-10`}></div>
    </div>
  );
};

export default Intersection;
