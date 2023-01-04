import { getExtensionPositions } from './extensions'

const EXTENSIONS_PER_LEVEL = [0, 0, 5, 10, 20, 30, 40, 50, 60]

/**
 * Executes for each room each tick
 * @param room
 */
export default function tick (room: Room) {
  // Only executes every 10 ticks
  if (Game.time % 10 !== 0) return

  // Only executes for owned rooms
  if (!room.controller) return

  const extensionsUnderConstruction = room.find(FIND_MY_CONSTRUCTION_SITES, {
    filter: { structureType: STRUCTURE_EXTENSION },
  })

  const extensions = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION } })
  const extensionsNeeded = EXTENSIONS_PER_LEVEL[room.controller.level - extensions.length + extensionsUnderConstruction.length]
  if (extensionsNeeded <= 0) return
  const extensionPositions = getExtensionPositions(room, extensionsNeeded)

  for (let pos of extensionPositions) {
    room.createConstructionSite(pos.x, pos.y, STRUCTURE_EXTENSION)
  }
}
