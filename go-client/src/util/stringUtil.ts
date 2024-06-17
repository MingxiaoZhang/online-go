import { GameMode } from "../enum"

export const getGameMode = (location: { pathname: string }) => {
    if (location.pathname[6] === 'o') {
        return GameMode.ONLINE;
    } else {
        return GameMode.LOCAL;
    }
}