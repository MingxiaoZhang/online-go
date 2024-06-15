import { useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import { GameMode } from '../enum';
import { useLocation, useParams } from 'react-router-dom';
import { getGameMode } from '../util/stringUtil';

const useGameState = () => {
    const location = useLocation();
    const gameMode = getGameMode(location);

    if (gameMode !== GameMode.ONLINE) {
        return {gameState: useSelector((state: IRootState) => state.localGame), gameMode};
    } else {
        return {gameState: useSelector((state: IRootState) => state.onlineGame), gameMode};
    }
};

export default useGameState;