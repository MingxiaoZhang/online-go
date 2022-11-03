import {Game} from "./game";

export const states = {
    EMPTY: "",
    BLACK: "black",
    WHITE: "white"
};

export class GomokuGame extends Game{
    update(row, col) {
        if (!this.start || !(this.board[row][col].state === states.EMPTY)) return false
        this.board[row][col].state = this.player
        this.moves.push([this.player, row, col])
        if (this.checkWin(row, col)) {
            this.start = false
            alert("Player " + this.player + " wins!")
        }
        this.updatePoint(row, col)
        return true
    }

    clear() {
        super.clear()
        if (this.players[this.player]) {
            this.botMove()
        }
        this.updateBoard()
    }

    switchPlayer() {
        if (this.player === states.BLACK) {
            this.player = states.WHITE
        } else {
            this.player = states.BLACK
        }
        if (this.players[this.player]) {
            this.botMove()
        }
        this.updateBoard()
    }

    back() {
        const temp = this.moves.pop()
        this.board[temp[1]][temp[2]].state = states.EMPTY
        this.player = temp[0]
    }

    botMove() {
        if (!this.start) return
        let move = this.getMove()
        while (!this.update(move[0], move[1])) {
            move = this.getMove()
        }
        this.switchPlayer()
    }

    getMove() {
        let row = parseInt(Math.random() * 10)
        let col = parseInt(Math.random() * 10)
        setTimeout(function(){
            console.log(row + " " + col)
        }, 3000)
        return [row, col]
    }

    inRange(index) {
        return (index < this.dim && index >= 0)
    }

    checkWin(row, col) {
        const state = this.board[row][col].state
        let i = 0
        let j = 0
        while (this.inRange(row + i + 1) && this.board[row + i + 1][col].state === state) {
            i++
        }
        while (this.inRange(row - j - 1) && this.board[row - j - 1][col].state === state) {
            j++
        }
        if (i + j >= 4) {
            return true
        }
        i = 0
        j = 0
        while (this.inRange(col + i + 1) && this.board[row][col + i+ 1].state === state) {
            i++
        }
        while (this.inRange(col - j - 1) && this.board[row][col - j - 1].state === state) {
            j++
        }
        if (i + j >= 4) {
            return true
        }
        i = 0
        j = 0
        while (this.inRange(row + i + 1)
        && this.inRange(col + i + 1)
        && this.board[row + i + 1][col + i + 1].state === state) {
            i++
        }
        while (this.inRange(row - j - 1)
        && this.inRange(col - j - 1)
        && this.board[row - j - 1][col - j - 1].state === state) {
            j++
        }
        if (i + j >= 4) {
            return true
        }
        i = 0
        j = 0
        while (this.inRange(row + i + 1)
        && this.inRange(col - i - 1)
        && this.board[row + i + 1][col - i - 1].state === state) {
            i++
        }
        while (this.inRange(row - j - 1)
        && this.inRange(col + j + 1)
        && this.board[row - j - 1][col + j + 1].state === state) {
            j++
        }
        if (i + j >= 4) {
            return true
        }
        return false
    }
}

