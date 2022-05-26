export interface Position {
  x: number,
  y: number
}

export function getExtensionPositions (room: Room, number: number): Position[] {
  const sources = room.find(FIND_SOURCES)
  const spawns = room.find(FIND_MY_SPAWNS)

  // @ts-ignore
  const terrain: Uint8Array = room.getTerrain().getRawBuffer()

  for (const source of sources) {
    excludePosition(source.pos, terrain)
  }

  for (const spawn of spawns) {
    excludePosition(spawn.pos, terrain)
  }

  const paths = sources.map(source => {
    return PathFinder.search(source.pos, { pos: spawns[0].pos, range: 1 }).path
  })

  let result: Position[] = []

  for (const path of paths) {
    for (const pos of path) {
      terrain[getIndexFromPosition(pos)] = 6
    }

    const remaining = number - result.length
    if (remaining <= 0) {
      return result
    }
    result = result.concat(getExtensionsForPath(path, terrain, remaining))
  }

  return result
}

function excludePosition (origin: Position, terrain: Uint8Array) {
  const positions = getSurroundingPositions(origin)
  for (const pos of positions) {
    terrain[getIndexFromPosition(pos)] = 6
  }
}

function getExtensionsForPath (path: RoomPosition[], terrain: Uint8Array, number: number) {
  const result = []
  for (const pos of path) {
    for (const nonDiagonal of getNonDiagonal(pos)) {
      const positionTerrain = terrain[getIndexFromPosition(nonDiagonal)]
      if (positionTerrain != 1 && positionTerrain != 4 && positionTerrain != 6) {
        result.push(nonDiagonal)
        terrain[getIndexFromPosition(nonDiagonal)] = 6

        if (result.length >= number) {
          return result
        }

      }
    }
  }

  return result
}

function getNonDiagonal (pos: Position): Position[] {
  const result = []
  result.push({ x: pos.x, y: pos.y - 1 })
  result.push({ x: pos.x + 1, y: pos.y })
  result.push({ x: pos.x, y: pos.y + 1 })
  result.push({ x: pos.x - 1, y: pos.y })
  return result
}

function getIndexFromPosition (pos: Position): number {
  return pos.x * pos.y
}

/**
 * Gets surrounding positions including own position.
 * Only returns valid positions.
 * @param pos
 */
function getSurroundingPositions (pos: Position): Position[] {
  const positions = []
  const start = { x: pos.x - 1, y: pos.y - 1 }

  for (let dx = 0; dx < 3; dx++) {
    for (let dy = 0; dy < 3; dy++) {
      const tempPosition = { x: start.x + dx, y: start.y + dy }
      if (isValidPosition(tempPosition)) {
        positions.push(tempPosition)
      }
    }
  }

  return positions
}

function isValidPosition (pos: Position): boolean {
  return !(pos.x < 0 || pos.y < 0 || pos.x > 49 || pos.y > 49)
}
