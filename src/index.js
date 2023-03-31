import { ShipFactory } from "./objects/ship.js"
import { Board } from "./objects/board.js"
import { isPlaceable } from "./utils"

import { bindShip } from "./utils.js"

// Create board on HTML container
// Triggers
createBoards()
createDraggableShips()

function createBoards() {
    const p1Board = ".containerPlayer1"
    const p2Board = ".containerPlayer2"
    drawBoard(p1Board, 1)
    drawBoard(p2Board, 2)

    // bind boards with DOM
    const p1BoardObject = new Board()
    const p2BoardObject = new Board()

    addClickhandler(p1Board, p1BoardObject)
    addClickhandler(p2Board, p2BoardObject)

    console.log("Adding hover")
    addHoverHandler(p1Board, p1BoardObject)
    addHoverHandler(p2Board, p2BoardObject)

}

function addHoverHandler(domObjectClassName, boardObject) {
    document.querySelector(domObjectClassName).addEventListener("mouseover", function (event) {

        const hoverTarget = event.target.closest(".cell")

        // only show ships if ships are placeable
        const cell = hoverTarget.className.slice(-3)
        const [x, y] = cell.split("-")
        console.log(x, y)

        const shipLength = 5
        // assume ship is length 5
        const endPoint = parseInt(x) + shipLength - 1;
        console.log("endpoint", endPoint)
        if (!(endPoint >= 10)) {
            for (let i = x; i < endPoint + 1; i++) {
                const parentRow = hoverTarget.parentElement
                const cellToReveal = parentRow.querySelector(`.p1_${i}-${y}`)
                cellToReveal.querySelector(".fa-ship").classList.remove("hidden")
            }
        }
    })

    document.querySelector(domObjectClassName).addEventListener("mouseout", function (event) {

        const hoverTarget = event.target.closest(".cell")

        // only show ships if ships are placeable
        const cell = hoverTarget.className.slice(-3)
        const [x, y] = cell.split("-")
        console.log("LEAVING ", x, y)

        const shipLength = 5
        // assume ship is length 5
        const endPoint = parseInt(x) + shipLength - 1;
        if (!(endPoint >= 10)) {
            for (let i = x; i < endPoint + 1; i++) {
                const parentRow = hoverTarget.parentElement
                const cellToReveal = parentRow.querySelector(`.p1_${i}-${y}`)
                cellToReveal.querySelector(".fa-ship").classList.add("hidden")
            }
        }
    })

}

function createDraggableShips() {
    const piecesContainer = document.querySelector(".pieces-container")
    const length5Ship = createShipArray(5)
    const length4Ship = createShipArray(4)
    const length3Ship = createShipArray(3)
    const length2Ship = createShipArray(2)

    piecesContainer.appendChild(length5Ship)
    piecesContainer.appendChild(length4Ship)
    piecesContainer.appendChild(length3Ship)
    piecesContainer.appendChild(length2Ship)

}

function createShipArray(num) {
    const ship = document.createElement("div")
    for (let i = 0; i < num; i++) {
        const shipIcon = document.createElement("i")
        shipIcon.className = "fa-solid fa-ship"

        ship.appendChild(shipIcon)
    }

    return ship
}

function addClickhandler(domObjectClassName, boardObject) {
    document.querySelector(domObjectClassName).addEventListener("click", function (event) {
        const clickedTarget = event.target.closest(".cell")
        console.log("Clicked on", clickedTarget)

        // only show ships if ships are placeable
        const cell = clickedTarget.className.slice(-3)
        const [x, y] = cell.split("-")

        if (isPlaceable(x, y, length, boardObject)) {
            for (let i = x; i < length; i++) {
                const cell = document.querySelector(`p1_${x}-${i}`)
                const child = clickedTarget.querySelector(".fa-ship")
                child.classList.remove("hidden")
            }
        }

    })
}

function drawBoard(attachToContainerName, tag) {
    const board = new Board()

    const container = document.querySelector(attachToContainerName)

    for (let y = 0; y < board.boardLength; y++) {
        const row = document.createElement("div")
        row.className = `row`
        for (let x = 0; x < board.boardLength; x++) {
            const cell = document.createElement("div")
            cell.className = `cell p${tag}_${x}-${y}`

            // must create a new ship on every iteration, cannot have before loop else it only moves the 1 ship
            const shipIcon = document.createElement("i")
            shipIcon.className = "fa-solid fa-ship hidden"

            cell.appendChild(shipIcon)
            row.appendChild(cell)
        }
        container.appendChild(row)
    }
}

// placing ship functions

// bindShip(1, 1, p1board, "p1")
// bindShip(9, 1, p2board, "p2")

console.log("Loaded script test")
