import spawnTick from './spawn/tick'
import creepTick from './creep/tick'
import roomTick from './room/tick'

declare global {
  interface CreepMemory {
    upgrading?: boolean
    mineTarget?: Id<Source>
    home?: string
    building: boolean
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
    roomTick(Game.rooms[roomName])
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
