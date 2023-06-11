import goGetEnergy from '../task/goGetEnergy'
import goBuildStructure from '../task/goBuildStructure'
import { calcWCMM, generateName, getRoleMembersInRoom } from './utils'

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
  if (sites == 1) return 1 - builders <= 0 ? 0 : 1 - builders
  if (sites == 2) return 2 - builders <= 0 ? 0 : 2 - builders
  return 3 - builders <= 0 ? 0 : 3 - builders
}

export function spawnBuilder (spawn: StructureSpawn, energy: number) {
  spawn.spawnCreep(calcWCMM(energy), generateName(ROLENAME))
}
