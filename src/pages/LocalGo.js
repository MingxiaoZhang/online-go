import GoBoard from "../components/goboard";
import {GoGame} from "../models/go";
import React, {useState, useRef, useEffect} from "react";
import {GomokuGame} from "../models/gomokuGame";

const LocalGo = () => {
    let go = new GoGame(19)
    const [game, setGame] = useState(go)
    const board = useRef()
    const newGame = () => {
        go = new GomokuGame(13)
        setGame(go)
        board.current.update()
    }
    useEffect(() => {
        newGame()
    }, []);

    return (
        <div>
            <h1>GO</h1>
            <GoBoard game={go} ref={board}/>
            <button onClick={newGame}>New</button>
        </div>
    );
};

export default LocalGo;
