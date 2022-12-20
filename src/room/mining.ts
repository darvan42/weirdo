export function getMiningPlaces(room: Room): number {
    let cache = room.memory.miningPlaces
    if (cache == null) {
        cache = calcMiningPlaces(room)
        room.memory.miningPlaces = cache
    }
    return cache
}

function calcMiningPlaces(room: Room): number {
    const terrain = room.getTerrain()
    const sourcePositions = room.find(FIND_SOURCES).map(source => source.pos)
    return sourcePositions.reduce((places, pos) => {
        let placesForPos = 0;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (placesForPos === 3) {
                    return places + placesForPos
                }
                if (terrain.get(pos.x + dx, pos.y + dy) !== TERRAIN_MASK_WALL) {
                    placesForPos++
                }
            }
        }
        return places + placesForPos
    }, 0)
}
