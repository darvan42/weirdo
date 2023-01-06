import goGetEnergy from '../task/goGetEnergy'
import { generateName } from './utils'
import goDistributeEnergy from '../task/goDistributeEnergy'

export const ROLENAME = 'starter'

export function eachTick (creep: Creep) {
  if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    goGetEnergy(creep)
  } else {
    goDistributeEnergy(creep)
  }
}

export function areStarterNeeded (room: Room): boolean {
  const creeps = room.find(FIND_MY_CREEPS)
  return creeps.length === 0
}

export function spawnStarter (spawn: StructureSpawn) {
  return spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], generateName(ROLENAME))
}
