import GoBoard from "../components/goboard";
import {GomokuGame} from "../models/gomokuGame";
import React, {useState, useRef, useEffect} from "react";

const Gomoku = () => {
    let gomoku = new GomokuGame(13)
    const [game, setGame] = useState(gomoku)
    const board = useRef()
    const newGame = () => {
        let player1 = document.getElementById('player-black').selectedIndex
        let player2 = document.getElementById('player-white').selectedIndex
        gomoku.players['black'] = (player1 === 1)
        gomoku.players['white'] = (player2 === 1)
        gomoku.setBoardUpdate(updateBoard)
        gomoku.setPointUpdate(updatePoint)
        gomoku.start = true
        gomoku.clear()
        setGame(gomoku)
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
            <h1>Gomoku</h1>
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

export default Gomoku;
