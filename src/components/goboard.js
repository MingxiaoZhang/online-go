import React, {useEffect, useState, forwardRef, useImperativeHandle, useRef} from "react";
import axios from "axios";
import Point from "./point";
import {states} from "../models/go"

export const SIZE = 30;

const GoBoard = forwardRef((props, ref) => {
    const [board, setBoard] = useState([])

    let intersections = [];
    const rerender = () => {
        intersections = [];
        for (let i = 0; i < props.game.dim; i++) {
            for (let j = 0; j < props.game.dim; j++) {
                intersections.push(<Point
                    color={props.game.board[i][j].state}
                    row={i}
                    col={j}
                    game={props.game}
                />);
            }
        }
        setBoard(intersections)
    }

    const updatePoint = (row, col) => {
        intersections[row * props.game.dim + col] = <Point
            color={props.game.board[row][col].state}
            row={row}
            col={col}
            game={props.game}
        />
    }

    useImperativeHandle(ref, () => ({
        update() {
            rerender()
        },
        back() {
            props.game.back()
            rerender()
        },
        updatePoint(row, col) {
            updatePoint(row, col)
        }
    }));

    const style = {
        width: props.game.dim * SIZE,
        height: props.game.dim * SIZE,
    };

    return (
        <div>
            <div id="board" style={style}>{board}</div>
        </div>

    );
});

export default GoBoard;
