import goGetEnergy from '../task/goGetEnergy'
import goBuildStructure from '../task/goBuildStructure'
import { generateName, getRoleMembersInRoom } from './utils'

export const ROLENAME = 'builder'

export function eachTick (creep: Creep) {
  if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
    goBuildStructure(creep)
  } else {
    goGetEnergy(creep)
  }
}

export function getNumberBuilderNeeded (room: Room): number {
  const sites = room.find(FIND_MY_CONSTRUCTION_SITES).length
  const builders = getRoleMembersInRoom(room, ROLENAME).length

  if (sites == 0) return 0
  const sitesBuilderDiff = sites - builders
  if (sitesBuilderDiff <= 0) return 0
  if (sitesBuilderDiff >= 3) return 3 - builders
  return sitesBuilderDiff
}

export function spawnBuilder (spawn: StructureSpawn) {
  // TODO optimize body
  spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], generateName(ROLENAME))
}
