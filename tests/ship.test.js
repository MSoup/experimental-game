import { ShipFactory } from "../src/objects/ship.js"

test("Ship creation succeeds with [2,5] hp", () => {
    const s1 = ShipFactory("miniboat")
    const s2 = ShipFactory("cruiser")
    const s3 = ShipFactory("battleship")
    const s4 = ShipFactory("yamato")

    expect((s1.hp)).toBe(2)
    expect((s2.hp)).toBe(3)
    expect((s3.hp)).toBe(4)
    expect((s4.hp)).toBe(5)

})

test('Ships created are case insensitive', () => {
    const s1 = ShipFactory("YAMATO")
    expect((s1.name)).toBe("yamato")
})

test('Ship is not sunk when hp remains', () => {
    const s1 = ShipFactory("YAMATO")
    s1.hit()
    s1.hit()
    s1.hit()
    expect((s1.isSunk())).toBe(false)
})

test('Ship is sunk when hp reaches 0', () => {
    const s1 = ShipFactory("YAMATO")
    s1.hit()
    s1.hit()
    s1.hit()
    s1.hit()
    s1.hit()
    expect((s1.isSunk())).toBe(true)
})

test('Throws if hp would go below 0', () => {
    const s1 = ShipFactory("yamato")
    s1.hit()
    s1.hit()
    s1.hit()
    s1.hit()
    s1.hit()

    expect(() => {
        s1.hit()
    }).toThrow()
})

test("Non existent ship generation should throw", () => {
    expect(() => ShipFactory(1)).toThrow()
})