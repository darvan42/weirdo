import spawnTick from './spawn/tick'
import creepTick from './creep/tick'
import roomTick from './room/tick'
import towerTick from './tower/tick'

declare global {
  interface CreepMemory {
    upgrading?: boolean
    mineTarget?: Id<Source>
    home?: string
    building?: boolean
  }

  interface RoomMemory {
    miningPlaces?: number
  }
}

export function loop () {
  for (const spawnName in Game.spawns) {
    spawnTick(Game.spawns[spawnName])
  }
  for (const creepName in Game.creeps) {
    try {
      creepTick(Game.creeps[creepName])
    } catch (e) {
      console.log(e)
    }
  }
  // Every visible room
  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName]
    // find towers and execute tick
    if (room.controller != null) {
      const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } })
      for (const tower of towers) {
        towerTick(tower as StructureTower)
      }
    }
    // execute room tick
    roomTick(room)
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete Memory.creeps[name]
    }
  }

  // Generate pixel if bucket is full
  if (Game.cpu.bucket >= 10000) {
    Game.cpu.generatePixel()
  }
}
