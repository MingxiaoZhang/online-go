import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { BoardSize, GameMode, Piece, SocketAction, TimeControl } from '../enum';
import {
    placePiece as localPlacePiece,
    setBoardSize as setLocalBoardSize,
    setTimeControl as setLocalTimeControl
} from '../redux/slices/localGameSlice';
import useGameState from './useGameState';
import {
    OnlineGameState,
    setBoardSize as setOnlineBoardSize,
    setTimeControl as setOnlineTimeControl
} from '../redux/slices/onlineGameSlice';
import { LocalGameState } from '../redux/slices/localGameSlice';


const isOnlineGameState = (state: LocalGameState | OnlineGameState): state is OnlineGameState => {
    return (state as OnlineGameState).playerColor !== undefined;
}

const useActions = (gameMode: GameMode) => {
    const dispatch = useDispatch();
    const { gameState } = useGameState();

    const placePiece = useCallback(
        ({ row, col }: {row: number, col: number}) => {
            if (!isOnlineGameState(gameState)) {
                dispatch(localPlacePiece({row, col}));
                return
            } 
            if (gameState.currentPlayer !== gameState.playerColor) {
                return
            }
            dispatch({
                type: SocketAction.PLAY_MOVE,
                payload: {
                    playerName: gameState.playerName,
                    row,
                    col,
                    playerColor: String(gameState.playerColor)
                }
            });
        },
        [dispatch]
    );

    const setBoardSize = useCallback(
        (boardSize: keyof typeof BoardSize) => {
            if (gameMode === GameMode.LOCAL) {
                dispatch(setLocalBoardSize(boardSize));
            } else {
                dispatch(setOnlineBoardSize(boardSize));
            }
        },
        [dispatch]
    );

    const setTimeControl = useCallback(
        (timeControl: keyof typeof TimeControl) => {
            if (gameMode === GameMode.LOCAL) {
                dispatch(setLocalTimeControl(timeControl));
            } else {
                dispatch(setOnlineTimeControl(timeControl));
            }
        },
        [dispatch]
    );

    return { placePiece, setBoardSize, setTimeControl };
};

export default useActions;
