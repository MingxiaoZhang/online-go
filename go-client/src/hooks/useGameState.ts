import { useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import { GameMode } from '../enum';
import { useParams } from 'react-router-dom';

const useGameState = () => {
    const { gameMode } = useParams<{ gameMode: GameMode }>();
    if (gameMode !== GameMode.ONLINE) {
        return {gameState: useSelector((state: IRootState) => state.localGame), gameMode};
    } else {
        return {gameState: useSelector((state: IRootState) => state.onlineGame), gameMode};
    }
};

export default useGameState;