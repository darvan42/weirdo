import { generateName, getRoleMembersInRoom } from './utils'
import goGetEnergy from '../task/goGetEnergy'
import goDistributeEnergy from '../task/goDistributeEnergy'

export const ROLENAME = 'carry'

export function eachTick (creep: Creep) {
  if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    goGetEnergy(creep)
  } else {
    goDistributeEnergy(creep)
  }
}

export function areCarryNeeded (room: Room) {
  const carries = getRoleMembersInRoom(room, ROLENAME)
  return carries.length < 2
}

export function spawnCarry (spawn: StructureSpawn) {
  // TODO optimize body
  spawn.spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], generateName(ROLENAME))
}
