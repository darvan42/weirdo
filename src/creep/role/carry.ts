import { generateName, getRoleMembersInRoom } from './utils'
import goGetEnergy from '../task/goGetEnergy'
import goDistributeEnergy from '../task/goDistributeEnergy'

export const ROLENAME = 'carry'

export function eachTick (creep: Creep) {
  if (creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 10) {
    goDistributeEnergy(creep)
  } else {
    goGetEnergy(creep)
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

export function getNumberCarryNeeded (room: Room): number {
  const carries = getRoleMembersInRoom(room, ROLENAME)
  return 2 - carries.length
}
