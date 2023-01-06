import { getRoleMembersInRoom } from '../role/utils'
import { ROLENAME as upgrader } from '../role/upgrader'
import { ROLENAME as builder } from '../role/builder'

export default function (creep: Creep) {
  // looking for spawns and extensions and fill the nearest
  const spawns: Array<AnyStoreStructure | StructureSpawn> = creep.room.find(FIND_MY_SPAWNS)
  const extensions = creep.room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION } }) as Array<StructureExtension>
  const storesToFill = spawns.concat(extensions).filter(store => store.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
  if (storesToFill.length > 0) {
    const target = creep.pos.findClosestByPath(storesToFill) as AnyStoreStructure
    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    }
    return
  }

  // looking for creeps which need filling
  const upgraders = getRoleMembersInRoom(creep.room, upgrader)
  const builders = getRoleMembersInRoom(creep.room, builder)
  const creepsToFill = upgraders.concat(builders).filter(toFill => toFill.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
  if (creepsToFill.length > 0) {
    const nearestToFill = creep.pos.findClosestByPath(creepsToFill) as Creep
    if (creep.transfer(nearestToFill, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(nearestToFill)
    return
  }
}
