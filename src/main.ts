import spawnTick from './spawn/tick'
import creepTick from './creep/tick'

declare global {
  interface CreepMemory {
    upgrading?: boolean
  }
}

export function loop () {
  for (const spawnName in Game.spawns) {
    spawnTick(Game.spawns[spawnName])
  }
  for (const creepName in Game.creeps) {
    creepTick(Game.creeps[creepName])
  }
}
