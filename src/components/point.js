import React, {useEffect, useState} from "react";
import {GoBoard, SIZE} from "./goboard";
import {states } from "../models/go"

const Point = (props) => {
    const [classes, setClasses] = useState("intersection " + props.color)
    var style = {
        top: props.row * SIZE,
        left: props.col * SIZE,
        width: SIZE,
        height: SIZE,
    };

    useEffect(() => {
        if (props.color !== states.EMPTY) {
            setClasses("intersection " + props.color)
        } else {
            setClasses("intersection ")
        }
    }, [props]);

    const hover = () => {
        if (classes === "intersection ") {
            setClasses("intersection " + props.game.player + "-hover")
        }
    }

    const endHover = () => {
        if (classes === "intersection " + props.game.player + "-hover") {
            setClasses("intersection ")
        }
    }


    const move = () => {
        if (props.game.update(props.row, props.col)) {
            props.game.switchPlayer()
        }
    }

    return (
        <div className={classes} style={style} onClick={move} onMouseOver={hover} onMouseLeave={endHover}/>
    );
};

export default Point;
