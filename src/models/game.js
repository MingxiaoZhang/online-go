export const states = {
    EMPTY: "",
    BLACK: "black",
    WHITE: "white"
};

export class Game {
    constructor(dim) {
        this.updateBoard = null
        this.player = states.BLACK
        this.players = {'black':false, 'white':false}
        this.start = false
        this.dim = dim;
        this.moves = [];
        this.board = [];
        for (let i = 0; i < dim; i++) {
            this.board[i] = [];
            for (let j = 0; j < dim; j++)
                this.board[i][j] = states.EMPTY;
        }
    }

    clear() {
        this.moves = []
        this.bot = states.EMPTY;
        for (let i = 0; i < this.dim; i++) {
            for (let j = 0; j < this.dim; j++)
                this.board[i][j] = states.EMPTY;
        }
        this.player = states.BLACK
    }
}

