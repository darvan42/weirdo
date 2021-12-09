import goGetEnergy from '../task/goGetEnergy'
import { generateName } from './utils'

export const ROLE = 'starter'

export default function (creep: Creep) {
  if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    goGetEnergy(creep)
  } else {
    const target = creep.pos.findClosestByPath(FIND_MY_SPAWNS) as StructureSpawn
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    }
  }
}

export function areStarterNeeded (room: Room): boolean {
  const creeps = room.find(FIND_MY_CREEPS)
  return creeps.length === 0
}

export function spawnStarter (spawn: StructureSpawn) {
  return spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], generateName(ROLE))
}
