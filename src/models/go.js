import {Game} from "./game";

export const states = {
    EMPTY: "",
    BLACK: "black",
    WHITE: "white"
};

export class GoGame extends Game {
    update(row, col) {
        this.board[row][col] = this.player;
        if (this.player === states.BLACK) {
            this.player = states.WHITE
        } else {
            this.player = states.BLACK
        }
    }

}

