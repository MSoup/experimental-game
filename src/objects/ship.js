const ShipFactory = (name) => {
    // validate incoming data
    const shipName = name.toLowerCase()

    const getHpFromShipName = {
        "miniboat": 2,
        "cruiser": 3,
        "battleship": 4,
        "yamato": 5,
    }

    if (!getHpFromShipName[shipName]) {
        throw new Error("Invalid name for ship. Options: [Miniboat, Cruiser, Battleship, Yamato]")
    }


    return {
        hp: getHpFromShipName[shipName],
        name: shipName,
        isSunk: function () {
            return this.hp <= 0
        },

        hit: function () {
            this.hp--
            if (this.hp < 0) {
                throw new Error("HP below 0, check logic")
            }
        }
    }
}

export { ShipFactory }