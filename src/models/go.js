import {Game, Stone} from "./game";
import {forEach} from "react-bootstrap/ElementChildren";

export const states = {
    EMPTY: "",
    BLACK: "black",
    WHITE: "white"
};

class GoStone extends Stone {
    setNeighbors(board) {
        this.neighbors = [
            board[this.row + 1][this.col],
            board[this.row][this.col + 1],
            board[this.row - 1][this.col],
            board[this.row][this.col - 1]]
    }

    updateState(state, groups) {
        this.state = state
        let adjGroup = []
        for (let i = 0; i < 4; i++) {
            if (this.neighbors[i].group !== null
                && this.neighbors[i].group.state === state) {
                this.neighbors[i].group.addStone(this)
                adjGroup.push(this.neighbors[i].group)
            }
        }
    }

    getLiberties() {
        let count = 0
        for(let i = 0; i < 4; i++) {
            count += (this.neighbors[i].state === states.EMPTY)
        }
        return count
    }
}

class Group {
    constructor(stone) {
        this.state = stone.state
        this.stones = [stone]
        this.liberties = stone.liberties
    }
    addStone(stone) {
        this.stones.push(stone)
        this.liberties += stone.getLiberties() - 1
    }
}

export class GoGame extends Game {
    constructor(props) {
        super(props);
        for (let i = 0; i < this.dim; i++) {
            for (let j = 0; j < this.dim; j++)
                this.board[i][j].setNeighbors(this.board)
        }
        this.groups = []
    }

    update(row, col) {
        if (!this.start || !(this.board[row][col].state === states.EMPTY)) return false
        if (!this.checkValid(row, col)) return false
        this.board[row][col].updateState(this.player)
        this.moves.push([this.player, row, col])
        this.updateBoard()
        return true
    }

    checkValid(row, col) {

    }
}

