import { ShipFactory } from "./objects/ship.js"
import { Board } from "./objects/board.js"

// Globals
let SHIPLENGTH = 5;
const BOARDLENGTH = 10

// 0: horizontal, 1: vertical
let ORIENTATION = 1

main()

function main() {
    // Set default orientation text
    const text = document.querySelector("p.orientation")
    text.textContent = ORIENTATION === 0 ? "Horizontal" : "Vertical"

    createBoards()
    createDOMShips()
    setOrientationButton()
}

function setOrientationButton() {
    const button = document.querySelector(".orientation-toggle")
    const text = document.querySelector("p.orientation")

    button.addEventListener("click", function () {
        if (ORIENTATION === 0) {
            ORIENTATION = 1
        }
        else {
            ORIENTATION = 0
        }

        text.textContent = ORIENTATION === 0 ? "Horizontal" : "Vertical"
    })
}
// coordinates is a size 2 tuple representing the x and y position of a click reference
// SHIPLENGTH will change based off of what needs to be placed on the board
function isPlaceable(coordinates, SHIPLENGTH, ORIENTATION) {
    const isHorizontal = ORIENTATION === 0

    if (!((typeof coordinates[0] === "number") && (typeof coordinates[0] === "number"))) {
        throw new Error("isPlaceable coordinates should be two numbers")
    }

    let endPoint;

    if (isHorizontal) {
        endPoint = coordinates[0] + SHIPLENGTH - 1

        if (endPoint > BOARDLENGTH - 1) {
            return false
        }

        // TODO: Check if ship exists in coordinates to coordinates+shiplength
        for (let i = coordinates[0]; i < endPoint + 1; i++) {
            if (hasShip(i, coordinates[1])) {
                return false
            }
        }
    }
    else {
        endPoint = coordinates[1] + SHIPLENGTH - 1

        if (endPoint > BOARDLENGTH - 1) {
            return false
        }

        for (let i = coordinates[1]; i < endPoint + 1; i++) {
            if (hasShip(coordinates[0], i)) {
                return false
            }
        }
    }
    return true
}

function hasShip(x, y) {
    const cell = document.querySelector(`.p1_${x}-${y}`)
    const shipIcon = cell.querySelector(".fa-ship")
    return shipIcon.classList.contains("placed")
}

function createBoards() {
    const p1Board = ".containerPlayer1"
    const p2Board = ".containerPlayer2"
    drawBoard(p1Board, 1)
    drawBoard(p2Board, 2)

    // bind boards with DOM
    const p1BoardObject = new Board()
    const p2BoardObject = new Board()

    addPlaceShipClickhandler(p1Board, p1BoardObject)
    addHoverHandler(p1Board, p1BoardObject)

    // TODO Logic for P2
    // addClickhandler(p2Board, p2BoardObject)
    // addHoverHandler(p2Board, p2BoardObject)
}

function addHoverHandler(domObjectClassName, boardObject) {
    // show ships if ships are placeable
    document.querySelector(domObjectClassName).addEventListener("mouseover", function (event) {
        const hoverTarget = event.target.closest(".cell")
        const cell = hoverTarget.className.slice(-3)
        // x, y are the coordinates of where the mouse is hovering over
        const [x, y] = cell.split("-").map(el => parseInt(el))

        // check if horizontally placeable
        if (isPlaceable([x, y], SHIPLENGTH, ORIENTATION) && ORIENTATION === 0) {
            console.log(`Placeable with length ${SHIPLENGTH} at coordinates ${x}, ${y}`)
            for (let i = x; i < x + SHIPLENGTH; i++) {
                const parentRow = hoverTarget.parentElement
                const cellToReveal = parentRow.querySelector(`.p1_${i}-${y}`)
                const shipIcon = cellToReveal.querySelector(".fa-ship")

                shipIcon.style.color = "grey"
                shipIcon.classList.remove("hidden")
            }
        }
        // check if vertically placeable

        else if (isPlaceable([x, y], SHIPLENGTH, ORIENTATION) && ORIENTATION === 1) {
            console.log(`Placeable with length ${SHIPLENGTH} at coordinates ${x}, ${y}`)
            for (let i = y; i < y + SHIPLENGTH; i++) {
                const cellToReveal = document.querySelector(`.p1_${x}-${i}`)
                const shipIcon = cellToReveal.querySelector(".fa-ship")
                shipIcon.style.color = "grey"
                shipIcon.classList.remove("hidden")
            }
        }
        else {
            console.log(`Not placeable with length ${SHIPLENGTH} at coordinates ${x}, ${y}`)

        }
    })
    // ships disappear on hover away
    document.querySelector(domObjectClassName).addEventListener("mouseout", function (event) {
        const hoverTarget = event.target.closest(".cell")

        const cell = hoverTarget.className.slice(-3)
        const [x, y] = cell.split("-").map(el => parseInt(el))

        if (isPlaceable([x, y], SHIPLENGTH, ORIENTATION) && ORIENTATION === 0) {
            for (let i = x; i < x + SHIPLENGTH; i++) {
                const parentRow = hoverTarget.parentElement
                const cellToHide = parentRow.querySelector(`.p1_${i}-${y}`)
                const shipIcon = cellToHide.querySelector(".fa-ship")

                shipIcon.style.color = "black"
                if (!shipIcon.classList.contains("placed")) {
                    shipIcon.classList.add("hidden")
                }
            }
        }
        else if (isPlaceable([x, y], SHIPLENGTH, ORIENTATION) && ORIENTATION === 1) {
            for (let i = y; i < y + SHIPLENGTH; i++) {
                const cellToHide = document.querySelector(`.p1_${x}-${i}`)
                const shipIcon = cellToHide.querySelector(".fa-ship")
                shipIcon.style.color = "black"
                // only hide if it hasn't already been placed
                if (!shipIcon.classList.contains("placed")) {
                    shipIcon.classList.add("hidden")
                }
            }
        }
    })

}

function createDOMShips() {
    const piecesContainer = document.querySelector(".pieces-container")
    // createShip creates DOM visuals
    const length5Ship = createShip(5)
    const length4Ship = createShip(4)
    const length3Ship = createShip(3)
    const length2Ship = createShip(2)

    piecesContainer.appendChild(length5Ship)
    piecesContainer.appendChild(length4Ship)
    piecesContainer.appendChild(length3Ship)
    piecesContainer.appendChild(length2Ship)

    // create placeable ships from length 5 to 2


}

function getShipName(num) {
    if (!typeof num === "number") {
        throw new Error("num must be a number")
    }

    const names = {
        2: "miniboat",
        3: "cruiser",
        4: "battleship",
        5: "yamato",
    }

    if (names[num]) {
        return names[num]
    }

    throw new Error("num must be between [2,5]")
}
function createShip(num) {
    // DOM elements
    const ship = document.createElement("div")
    for (let i = 0; i < num; i++) {
        const shipIcon = document.createElement("i")
        shipIcon.className = "fa-solid fa-ship"
        ship.appendChild(shipIcon)
    }

    return ship
}

function addPlaceShipClickhandler(domObjectClassName, boardObject) {
    if (SHIPLENGTH < 2) {
        console.log("All ships placed")
        return
    }
    document.querySelector(domObjectClassName).addEventListener("click", function (event) {
        const clickedTarget = event.target.closest(".cell")

        const cell = clickedTarget.className.slice(-3)
        const [x, y] = cell.split("-").map(el => parseInt(el))

        const parentRow = clickedTarget.parentElement

        if (isPlaceable([x, y], SHIPLENGTH, ORIENTATION) && ORIENTATION === 0) {
            for (let i = x; i < x + SHIPLENGTH; i++) {
                const cellToPlace = parentRow.querySelector(`.p1_${i}-${y}`)
                const shipIcon = cellToPlace.querySelector(".fa-ship")
                shipIcon.style.color = "black"
                shipIcon.classList.remove("hidden")
                shipIcon.classList.add("placed")
            }
            SHIPLENGTH--
        }
        else if (isPlaceable([x, y], SHIPLENGTH, ORIENTATION) && ORIENTATION === 1) {
            for (let i = y; i < y + SHIPLENGTH; i++) {
                const cellToPlace = document.querySelector(`.p1_${x}-${i}`)
                const shipIcon = cellToPlace.querySelector(".fa-ship")
                shipIcon.style.color = "black"
                shipIcon.classList.add("placed")
                shipIcon.classList.remove("hidden")
            }
            SHIPLENGTH--
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


console.log("Loaded script test")
