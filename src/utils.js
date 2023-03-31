import { Board } from "./objects/board"

function bindShip(x, y, board, player) {
    if (!["p1", "p2"].includes(player)) {
        throw new Error("player should be p1 or p2")
    }
    if (!board instanceof Board) {
        throw new Error("board should be an instance of Board")
    }
    let orientation = "horizontal"
    let ship = new ShipFactory("yamato")

    console.log("Placing on:", x, y)
    // Given a click event, pass coordinates clicked to bindUI
    // bindUI will place a ship on a board, then also place a ship on the board internally
    try {
        const result = board.placeWholeShip(x, y, ship.hp, orientation)

        console.log(result)

        const node = document.querySelector(`.${player}_${x}-${y}`);
        node.classList.add("hasShip")

        board.showBoard()
        console.log("showed board")
    }
    catch (err) {
        console.log("WARNING: adding to board failed")
        console.log(err)
    }
}

function isPlaceable(x, y, length, board) {
    return true
}

// function isPlaceable(x, y, length, board) {
//     if (board.orientation === "horizontal") {
//         for (let i = y; i < y + length; i++) {
//             if (board[x][i] !== 0) {
//                 return false
//             }
//         }
//         return true
//     }
//     else if (board.orientation === "vertical") {
//         for (let i = x; i < x + length; i++) {
//             if (board[i][y] !== 0) {
//                 return false
//             }
//         }
//         return true
//     }
//     else {
//         throw new Error("Orientation can only be horizontal or vertical")

//     }
// }

export { bindShip, isPlaceable }