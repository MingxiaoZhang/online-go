import GoBoard from "../components/goboard";
import {GoGame} from "../models/go";
import React, {useState, useRef, useEffect} from "react";
import {GomokuGame} from "../models/gomokuGame";

const LocalGo = () => {
    let go = new GoGame(19)
    const [game, setGame] = useState(go)
    const board = useRef()
    const newGame = () => {
        let player1 = document.getElementById('player-black').selectedIndex
        let player2 = document.getElementById('player-white').selectedIndex
        go.players['black'] = (player1 === 1)
        go.players['white'] = (player2 === 1)
        go.setBoardUpdate(updateBoard)
        go.setPointUpdate(updatePoint)
        go.start = true
        go.clear()
        setGame(go)
        updateBoard()
    }

    const updateBoard = () => {
        board.current.update()
    }
    const back = () => {
        board.current.back()
    }
    const updatePoint = (row, col) => {
        board.current.updatePoint(row, col)
    }

    useEffect(() => {
        newGame()
    }, []);

    return (
        <div>
            <h1>GO</h1>
            <GoBoard game={game} ref={board}/>
            <button onClick={newGame}>New</button>
            <button onClick={back}>Back</button>
            <select id="player-black">
                <option value="0">Player</option>
                <option value="1">Bot</option>
            </select>
            <select id="player-white">
                <option value="0">Player</option>
                <option value="1">Bot</option>
            </select>
        </div>
    );
};

export default LocalGo;
