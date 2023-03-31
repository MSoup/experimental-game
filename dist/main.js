/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objects_ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects/ship.js */ \"./src/objects/ship.js\");\n/* harmony import */ var _objects_board_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects/board.js */ \"./src/objects/board.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\r\n\r\n\r\n\r\n// bindShip binds a cell on the UI with the data structure\r\n\r\n\r\n// Create board on HTML container\r\n// Triggers\r\ncreateBoards()\r\ncreateDraggableShips()\r\n\r\nfunction createBoards() {\r\n    const p1Board = \".containerPlayer1\"\r\n    const p2Board = \".containerPlayer2\"\r\n    drawBoard(p1Board, 1)\r\n    drawBoard(p2Board, 2)\r\n\r\n    // bind boards with DOM\r\n    const p1BoardObject = new _objects_board_js__WEBPACK_IMPORTED_MODULE_1__.Board()\r\n    const p2BoardObject = new _objects_board_js__WEBPACK_IMPORTED_MODULE_1__.Board()\r\n\r\n    addClickhandler(p1Board, p1BoardObject)\r\n    addClickhandler(p2Board, p2BoardObject)\r\n\r\n}\r\n\r\nfunction createDraggableShips() {\r\n    const piecesContainer = document.querySelector(\".pieces-container\")\r\n    const length5Ship = createShipArray(5)\r\n    const length4Ship = createShipArray(4)\r\n    const length3Ship = createShipArray(3)\r\n    const length2Ship = createShipArray(2)\r\n\r\n    piecesContainer.appendChild(length5Ship)\r\n    piecesContainer.appendChild(length4Ship)\r\n    piecesContainer.appendChild(length3Ship)\r\n    piecesContainer.appendChild(length2Ship)\r\n\r\n}\r\n\r\nfunction createShipArray(num) {\r\n    const ship = document.createElement(\"div\")\r\n    for (let i = 0; i < num; i++) {\r\n        const shipIcon = document.createElement(\"i\")\r\n        shipIcon.className = \"fa-solid fa-ship\"\r\n\r\n        ship.appendChild(shipIcon)\r\n    }\r\n    return ship\r\n}\r\n\r\nfunction addClickhandler(domObjectClassName, boardObject) {\r\n    document.querySelector(domObjectClassName).addEventListener(\"click\", function (event) {\r\n        const clickedTarget = event.target.closest(\".cell\")\r\n        console.log(\"Clicked on\", clickedTarget)\r\n\r\n        // only show ships if ships are placeable\r\n        const cell = clickedTarget.className.slice(-3)\r\n        const [x, y] = cell.split(\"-\")\r\n\r\n        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isPlaceable)(x, y, length, boardObject)) {\r\n            for (let i = x; i < length; i++) {\r\n                const cell = document.querySelector(`p1_${x}-${i}`)\r\n                const child = clickedTarget.querySelector(\".fa-ship\")\r\n                child.classList.remove(\"hidden\")\r\n            }\r\n        }\r\n\r\n    })\r\n}\r\n\r\nfunction drawBoard(attachToContainerName, tag) {\r\n    const board = new _objects_board_js__WEBPACK_IMPORTED_MODULE_1__.Board()\r\n\r\n    const container = document.querySelector(attachToContainerName)\r\n\r\n    for (let y = 0; y < board.boardLength; y++) {\r\n        const row = document.createElement(\"div\")\r\n        row.className = `row`\r\n        for (let x = 0; x < board.boardLength; x++) {\r\n            const cell = document.createElement(\"div\")\r\n            cell.className = `cell p${tag}_${x}-${y}`\r\n\r\n            // must create a new ship on every iteration, cannot have before loop else it only moves the 1 ship\r\n            const shipIcon = document.createElement(\"i\")\r\n            shipIcon.className = \"fa-solid fa-ship hidden\"\r\n\r\n            cell.appendChild(shipIcon)\r\n            row.appendChild(cell)\r\n        }\r\n        container.appendChild(row)\r\n    }\r\n}\r\n\r\n// placing ship functions\r\n\r\n// bindShip(1, 1, p1board, \"p1\")\r\n// bindShip(9, 1, p2board, \"p2\")\r\n\r\nconsole.log(\"Loaded script test\")\r\n\n\n//# sourceURL=webpack://battleship-daven/./src/index.js?");

/***/ }),

/***/ "./src/objects/board.js":
/*!******************************!*\
  !*** ./src/objects/board.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Board\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\r\n\r\nclass Board {\r\n    constructor(n = 10) {\r\n        if (n < 8 || n > 14) {\r\n            throw new Error(\"Board size out of range, do [8,14]\")\r\n        }\r\n        this.boardLength = n\r\n        this.gameBoard = new Array(n)\r\n\r\n        for (let i = 0; i < n; i++) {\r\n            this.gameBoard[i] = new Array(n).fill(0);\r\n        }\r\n        this.orientation = \"horizontal\"\r\n    }\r\n\r\n    changeOrientation() {\r\n        this.orientation = (this.orientation === \"horizontal\" ? \"vertical\" : \"horizontal\")\r\n    }\r\n\r\n    showBoard() {\r\n        console.log(this.gameBoard)\r\n        return 0\r\n    }\r\n\r\n    placeShip(x, y, value) {\r\n        // This will cover undefined 'out of bounds' locations and also existing 'taken' locations\r\n        if (this.gameBoard[x][y] !== 0) {\r\n            throw new Error(`Area ${x}, ${y} is not an available spot. It's taken by ${this.gameBoard[x][y]}`)\r\n        }\r\n        this.gameBoard[x][y] = value\r\n    }\r\n\r\n    placeWholeShip(x, y, length, orientation = \"horizontal\") {\r\n        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isPlaceable)(x, y, length, this.gameBoard)) {\r\n            throw new Error(\"Not placeable at this location:\", x, y)\r\n        }\r\n        else if (orientation === \"horizontal\") {\r\n            for (let i = y; i < y + length; i++) {\r\n                this.placeShip(x, i, \"x\")\r\n            }\r\n        }\r\n        else if (orientation === \"vertical\") {\r\n            for (let i = x; i < x + length; i++) {\r\n                this.placeShip(i, y, \"x\")\r\n            }\r\n        }\r\n        return {\r\n            x: x,\r\n            y: y,\r\n            length: length,\r\n            orientation: orientation\r\n        }\r\n    }\r\n\r\n    receiveAttack(x, y) {\r\n        if (this.gameBoard[x][y] === undefined) {\r\n            throw new Error(\"Attack out of bounds\")\r\n        }\r\n        else if (this.gameBoard[x][y] !== 0) {\r\n            // hit\r\n\r\n        }\r\n        else if (this.gameBoard[x][y] === 0) {\r\n\r\n        }\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://battleship-daven/./src/objects/board.js?");

/***/ }),

/***/ "./src/objects/ship.js":
/*!*****************************!*\
  !*** ./src/objects/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShipFactory\": () => (/* binding */ ShipFactory)\n/* harmony export */ });\nconst ShipFactory = (name) => {\r\n    // validate incoming data\r\n    const shipName = name.toLowerCase()\r\n\r\n    const getHpFromShipName = {\r\n        \"miniboat\": 2,\r\n        \"cruiser\": 3,\r\n        \"battleship\": 4,\r\n        \"yamato\": 5,\r\n    }\r\n\r\n    if (!getHpFromShipName[shipName]) {\r\n        throw new Error(\"Invalid name for ship. Options: [Miniboat, Cruiser, Battleship, Yamato]\")\r\n    }\r\n\r\n\r\n    return {\r\n        hp: getHpFromShipName[shipName],\r\n        name: shipName,\r\n        isSunk: function () {\r\n            return this.hp <= 0\r\n        },\r\n\r\n        hit: function () {\r\n            this.hp--\r\n            if (this.hp < 0) {\r\n                throw new Error(\"HP below 0, check logic\")\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://battleship-daven/./src/objects/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"bindShip\": () => (/* binding */ bindShip),\n/* harmony export */   \"isPlaceable\": () => (/* binding */ isPlaceable)\n/* harmony export */ });\n/* harmony import */ var _objects_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects/board */ \"./src/objects/board.js\");\n\r\n\r\nfunction bindShip(x, y, board, player) {\r\n    if (![\"p1\", \"p2\"].includes(player)) {\r\n        throw new Error(\"player should be p1 or p2\")\r\n    }\r\n    if (!board instanceof _objects_board__WEBPACK_IMPORTED_MODULE_0__.Board) {\r\n        throw new Error(\"board should be an instance of Board\")\r\n    }\r\n    let orientation = \"horizontal\"\r\n    let ship = new ShipFactory(\"yamato\")\r\n\r\n    console.log(\"Placing on:\", x, y)\r\n    // Given a click event, pass coordinates clicked to bindUI\r\n    // bindUI will place a ship on a board, then also place a ship on the board internally\r\n    try {\r\n        const result = board.placeWholeShip(x, y, ship.hp, orientation)\r\n\r\n        console.log(result)\r\n\r\n        const node = document.querySelector(`.${player}_${x}-${y}`);\r\n        node.classList.add(\"hasShip\")\r\n\r\n        board.showBoard()\r\n        console.log(\"showed board\")\r\n    }\r\n    catch (err) {\r\n        console.log(\"WARNING: adding to board failed\")\r\n        console.log(err)\r\n    }\r\n}\r\n\r\nfunction isPlaceable(x, y, length, board) {\r\n    return true\r\n}\r\n\r\n// function isPlaceable(x, y, length, board) {\r\n//     if (board.orientation === \"horizontal\") {\r\n//         for (let i = y; i < y + length; i++) {\r\n//             if (board[x][i] !== 0) {\r\n//                 return false\r\n//             }\r\n//         }\r\n//         return true\r\n//     }\r\n//     else if (board.orientation === \"vertical\") {\r\n//         for (let i = x; i < x + length; i++) {\r\n//             if (board[i][y] !== 0) {\r\n//                 return false\r\n//             }\r\n//         }\r\n//         return true\r\n//     }\r\n//     else {\r\n//         throw new Error(\"Orientation can only be horizontal or vertical\")\r\n\r\n//     }\r\n// }\r\n\r\n\n\n//# sourceURL=webpack://battleship-daven/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;