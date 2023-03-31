import { isPlaceable } from "../utils";

class Board {
    constructor(n = 10) {
        if (n < 8 || n > 14) {
            throw new Error("Board size out of range, do [8,14]")
        }
        this.boardLength = n
        this.gameBoard = new Array(n)

        for (let i = 0; i < n; i++) {
            this.gameBoard[i] = new Array(n).fill(0);
        }
        this.orientation = "horizontal"
    }

    changeOrientation() {
        this.orientation = (this.orientation === "horizontal" ? "vertical" : "horizontal")
    }

    showBoard() {
        console.log(this.gameBoard)
        return 0
    }

    placeShip(x, y, value) {
        // This will cover undefined 'out of bounds' locations and also existing 'taken' locations
        if (this.gameBoard[x][y] !== 0) {
            throw new Error(`Area ${x}, ${y} is not an available spot. It's taken by ${this.gameBoard[x][y]}`)
        }
        this.gameBoard[x][y] = value
    }

    placeWholeShip(x, y, length, orientation = "horizontal") {
        if (!isPlaceable(x, y, length, this.gameBoard)) {
            throw new Error("Not placeable at this location:", x, y)
        }
        else if (orientation === "horizontal") {
            for (let i = y; i < y + length; i++) {
                this.placeShip(x, i, "x")
            }
        }
        else if (orientation === "vertical") {
            for (let i = x; i < x + length; i++) {
                this.placeShip(i, y, "x")
            }
        }
        return {
            x: x,
            y: y,
            length: length,
            orientation: orientation
        }
    }

    receiveAttack(x, y) {
        if (this.gameBoard[x][y] === undefined) {
            throw new Error("Attack out of bounds")
        }
        else if (this.gameBoard[x][y] !== 0) {
            // hit

        }
        else if (this.gameBoard[x][y] === 0) {

        }
    }
}

export { Board }