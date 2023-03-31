import { Board } from "../src/objects/board"

// check existence of all corners of board
it("Board is a 10x10", () => {
    const board = new Board()
    expect(board.gameBoard[0][0]).toBe(0)
    expect(board.gameBoard[0][9]).toBe(0)
    expect(board.gameBoard[9][9]).toBe(0)
    expect(board.gameBoard[9][0]).toBe(0)
    expect(() => board.gameBoard[10][10]).toThrow()
    expect(() => board.gameBoard[-1][0]).toThrow()
})

it('Can place x at 0,0', () => {
    const board = new Board()
    board.placeShip(0, 0, 'x')
    expect(board.gameBoard[0][0]).toBe('x')
})

it('Cannot place a ship in existing ship spot', () => {
    const board = new Board()
    expect(() => {
        board.placeShip(0, 0, 'x')
        board.placeShip(0, 0, 'x')
    }).toThrow()
})

it('Cannot place a ship in out of bounds location', () => {
    const board = new Board()
    expect(() => board.placeShip(0, -1, 'x')).toThrow()
})

test("place whole ship from 0,0 to 0,2 (length 3)", () => {
    const board = new Board()
    board.placeWholeShip(0, 0, 3, "horizontal")
    expect(board.gameBoard[0][0]).toBe('x')
    expect(board.gameBoard[0][1]).toBe('x')
    expect(board.gameBoard[0][2]).toBe('x')
    expect(board.gameBoard[0][3]).toBe(0)
})

test("place whole ship vertically from 1,1 to 5,1 (length 5)", () => {
    const board = new Board()
    board.placeWholeShip(1, 1, 5, "vertical")
    expect(board.gameBoard[1][1]).toBe('x')
    expect(board.gameBoard[2][1]).toBe('x')
    expect(board.gameBoard[3][1]).toBe('x')
    expect(board.gameBoard[4][1]).toBe('x')
    expect(board.gameBoard[5][1]).toBe('x')
    expect(board.gameBoard[6][1]).toBe(0)
    expect(board.gameBoard[0][0]).toBe(0)
})

test("place ship ontop of another", () => {
    const board = new Board()
    board.placeWholeShip(1, 1, 5, "vertical")

    expect(() => board.placeWholeShip(0, 1, 5, "vertical")).toThrow()

})

// test("place invalid orientation", () => {
//     const board = new Board()
//     expect(() => board.placeWholeShip(1, 1, 5, "diagonal")).toThrow()
// })
