import { GameMode } from "../enum"

export const getGameMode = (location: { pathname: string }) => {
    return location.pathname.substring(location.pathname.lastIndexOf('/') + 1) as GameMode;
}