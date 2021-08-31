export const ROLE = 'starter'

export default function (creep: Creep) {
  if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    const target = creep.pos.findClosestByPath(FIND_SOURCES) as Source
    if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    }
  } else {
    const target = creep.pos.findClosestByPath(FIND_MY_SPAWNS) as StructureSpawn
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    }
  }
}
