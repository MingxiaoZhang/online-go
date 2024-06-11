import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { resetBoard, setBoardSize } from "../../redux/slices/onlineGameSlice";
import { startGame } from "../../redux/slices/localGameSlice";
import { BoardSize, GameMode, TimeControl } from "../../enum";
import useGameState from "../../hooks/useGameState";
import useActions from "../../hooks/useActions";

const GameOptions = () => {
    const dispatch = useDispatch();
    const { gameState, gameMode } = useGameState();
    const { setBoardSize, setTimeControl } = useActions(gameMode || GameMode.LOCAL);
    
    return (
        <>
            <h2>Options</h2>
            <label>
                Select Board Size:
                <select
                    value={gameState.boardSize}
                    onChange={(e) =>
                        setBoardSize(e.target.value as keyof typeof BoardSize)
                    }
                >
                    <option value={'SMALL'}>9x9</option>
                    <option value={'MEDIUM'}>13x13</option>
                    <option value={'LARGE'}>19x19</option>
                </select>
            </label>
            <label>
                Time Control:
                <select
                    value={gameState.timeControl}
                    onChange={(e) =>
                        setTimeControl(e.target.value as keyof typeof TimeControl)
                    }
                >
                    <option value={'BLITZ'}>3:00</option>
                    <option value={'RAPID'}>10:00</option>
                    <option value={'CLASSIC'}>30:00</option>
                </select>
            </label>
        </>
    );
}

export default GameOptions;