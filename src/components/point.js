import React, {useEffect, useState} from "react";
import {GoBoard, SIZE} from "./goboard";
import {states } from "../models/go"

const Point = (props) => {
    let classes = "intersection "
    var style = {
        top: props.row * SIZE,
        left: props.col * SIZE,
        width: SIZE,
        height: SIZE,
    };

    if (props.color !== states.EMPTY) {
        classes += props.color
    }

    const move = () => {
        if (props.game.update(props.row, props.col)) {
            props.game.switchPlayer()
        }
    }

    return (
        <div className={classes} style={style} onClick={move}/>
    );
};

export default Point;
